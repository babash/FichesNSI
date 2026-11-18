const fs = require('fs');
const path = require('path');
const express = require('express');
const FichesManager = require('../src/fiches');
const PDFGenerator = require('../src/pdf');
const RoutesManager = require('../src/routes');
const { pageAccueil, pageFiche } = require('../src/pages');

/**
 * Générateur du site statique publié sur GitHub Pages (dossier `dist/`) :
 * - `index.html` : l'accueil ;
 * - `fiches/<fiche>/index.html` : la page web de chaque fiche ;
 * - `fiches/<fiche>.pdf` et `fiches/all.pdf` : les PDF ;
 * - `css/`, `js/`, `img/`, `fonts/` : copiés depuis `public/`.
 *
 * Avant les PDF, il vérifie que chaque fiche tient sur une page A4 : une fiche
 * réduite est signalée, une fiche qui déborde encore arrête la génération.
 */
class StaticSiteGenerator {
  constructor() {
    this.fichesManager = new FichesManager();
    this.pdfGenerator = new PDFGenerator();
    this.outputDir = path.join(__dirname, '../dist');
    this.tempServer = null;
    this.tempPort = 3001;
  }

  async init() {
    console.log('[STATIC] Initialisation du générateur...');
    await this.fichesManager.loadContent();
    await this.pdfGenerator.init();
  }

  async startTempServer() {
    const app = express();
    app.use(express.static(path.join(__dirname, '../public')));
    const routesManager = new RoutesManager(this.fichesManager, this.pdfGenerator, this.tempPort);
    app.use('/', routesManager.getRouter());
    await new Promise((resolve) => {
      this.tempServer = app.listen(this.tempPort, resolve);
    });
    console.log(`[STATIC] Serveur temporaire démarré sur le port ${this.tempPort}`);
  }

  async stopTempServer() {
    if (this.tempServer) {
      await new Promise((resolve) => this.tempServer.close(resolve));
      this.tempServer = null;
    }
  }

  /** Vérifie que chaque fiche tient sur sa page, sans réduction si possible. */
  async verifierMiseEnPage() {
    const fiches = this.fichesManager.getAllFichesSorted();
    const urls = fiches.map((f) => `http://localhost:${this.tempPort}/pdf/${f.slug}`);
    const resultats = await this.pdfGenerator.verifierPages(urls);
    let echec = false;
    for (const r of resultats) {
      for (const f of r.fiches) {
        if (f.deborde) {
          echec = true;
          console.error(`[VÉRIF] ${f.slug} : trop longue pour une page, même réduite à ${Math.round(f.zoom * 100)} %`);
        } else if (f.zoom < 1) {
          console.warn(`[VÉRIF] ${f.slug} : réduite à ${Math.round(f.zoom * 100)} % pour tenir sur une page (à raccourcir)`);
        } else {
          console.log(`[VÉRIF] ${f.slug} : une page, sans réduction (${f.hauteur} px sur ${require('../src/pages').HAUTEUR_UTILE_PX})`);
        }
      }
      for (const f of r.fiches) {
        for (const ligne of f.coupees) {
          echec = true;
          console.error(`[VÉRIF] ${f.slug} : ligne de code trop longue, elle passerait à la ligne sur papier : ${ligne}`);
        }
      }
      for (const e of r.erreurs) {
        echec = true;
        console.error(`[VÉRIF] ${r.url} : ${e}`);
      }
    }
    if (echec) throw new Error('Vérification de la mise en page : échec (voir ci-dessus)');
  }

  async generatePDFs() {
    console.log('[STATIC] Génération des PDF...');
    const pdfDir = path.join(this.outputDir, 'fiches');
    fs.mkdirSync(pdfDir, { recursive: true });

    for (const fiche of this.fichesManager.getAllFichesSorted()) {
      const url = `http://localhost:${this.tempPort}/pdf/${fiche.slug}`;
      const pdf = await this.pdfGenerator.generatePDF(url, `${fiche.slug}.pdf`);
      fs.writeFileSync(path.join(pdfDir, `${fiche.slug}.pdf`), pdf);
    }

    const pdf = await this.pdfGenerator.generatePDF(`http://localhost:${this.tempPort}/pdf/toutes`, 'all.pdf');
    fs.writeFileSync(path.join(pdfDir, 'all.pdf'), pdf);
    console.log('[STATIC] Génération des PDF terminée');
  }

  /** Copie récursive d'un dossier de `public/`. */
  copier(source, cible) {
    fs.mkdirSync(cible, { recursive: true });
    for (const nom of fs.readdirSync(source)) {
      const s = path.join(source, nom);
      const c = path.join(cible, nom);
      if (fs.statSync(s).isDirectory()) this.copier(s, c);
      else fs.copyFileSync(s, c);
    }
  }

  copyStaticFiles() {
    for (const dossier of ['css', 'js', 'img', 'fonts']) {
      const source = path.join(__dirname, '../public', dossier);
      if (fs.existsSync(source)) this.copier(source, path.join(this.outputDir, dossier));
    }
    console.log('[STATIC] Fichiers statiques copiés');
  }

  generatePages() {
    const fm = this.fichesManager;
    const horodatage = new Date().toLocaleString('fr-FR', {
      timeZone: 'Indian/Mayotte',
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
    }) + ' (heure de Mayotte)';

    fs.writeFileSync(path.join(this.outputDir, 'index.html'), pageAccueil(fm.parNiveau(), '', horodatage));

    for (const fiche of fm.getAllFichesSorted()) {
      const dossier = path.join(this.outputDir, 'fiches', fiche.slug);
      fs.mkdirSync(dossier, { recursive: true });
      fs.writeFileSync(path.join(dossier, 'index.html'), pageFiche(fiche, fm.voisines(fiche.slug), '../../'));
    }

    // Page 404 de GitHub Pages
    fs.writeFileSync(path.join(this.outputDir, '404.html'), `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page introuvable · Fiches de révision NSI</title>
<style>body{font-family:Arial,sans-serif;max-width:40rem;margin:3rem auto;padding:0 1rem;line-height:1.5;color:#1f2328}a{color:#0b5394}</style></head>
<body><h1>Page introuvable</h1><p>Cette page n'existe pas (ou plus). Toutes les fiches sont sur <a href="/FichesNSI/">la page d'accueil des Fiches de révision NSI</a>.</p></body></html>
`);
    console.log(`[STATIC] ${fm.getAllFiches().length} pages de fiches générées`);
  }

  async generate() {
    if (fs.existsSync(this.outputDir)) fs.rmSync(this.outputDir, { recursive: true });
    fs.mkdirSync(this.outputDir, { recursive: true });

    await this.init();
    this.copyStaticFiles();
    this.generatePages();

    await this.startTempServer();
    try {
      await this.verifierMiseEnPage();
      await this.generatePDFs();
    } finally {
      await this.stopTempServer();
      await this.pdfGenerator.close();
    }
    console.log(`[STATIC] Site statique généré dans ${this.outputDir}`);
  }
}

if (require.main === module) {
  new StaticSiteGenerator().generate().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

module.exports = StaticSiteGenerator;
