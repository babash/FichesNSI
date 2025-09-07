const fs = require('fs');
const path = require('path');
const express = require('express');
const FichesManager = require('../src/fiches');
const PDFGenerator = require('../src/pdf');
const RoutesManager = require('../src/routes');

/**
 * Générateur de site statique pour GitHub Pages
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
    console.log('[STATIC] Fiches chargées:', this.fichesManager.getAllFiches().length);
  }

  /**
   * Démarre un serveur temporaire pour générer les PDFs
   */
  async startTempServer() {
    console.log('[STATIC] Démarrage du serveur temporaire...');
    
    const app = express();
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));
    app.use(express.static(path.join(__dirname, '../public')));
    
    const routesManager = new RoutesManager(this.fichesManager, this.pdfGenerator, this.tempPort);
    app.use('/', routesManager.getRouter());
    
    return new Promise((resolve) => {
      this.tempServer = app.listen(this.tempPort, () => {
        console.log(`[STATIC] Serveur temporaire démarré sur le port ${this.tempPort}`);
        resolve();
      });
    });
  }

  /**
   * Arrête le serveur temporaire
   */
  async stopTempServer() {
    if (this.tempServer) {
      console.log('[STATIC] Arrêt du serveur temporaire...');
      await new Promise((resolve) => {
        this.tempServer.close(resolve);
      });
      this.tempServer = null;
    }
  }

  /**
   * Génère les PDFs pour toutes les fiches
   */
  async generatePDFs() {
    console.log('[STATIC] Génération des PDFs...');
    
    const fiches = this.fichesManager.getAllFiches();
    const pdfDir = path.join(this.outputDir, 'fiches');
    
    // Créer le dossier PDFs
    fs.mkdirSync(pdfDir, { recursive: true });
    
    for (const fiche of fiches) {
      try {
        console.log(`[STATIC] Génération PDF: ${fiche.slug}`);
        
        // URL pour générer le PDF
        const url = `http://localhost:${this.tempPort}/fiches/${fiche.slug}/html-for-pdf`;
        
        // Générer le PDF
        const pdfBuffer = await this.pdfGenerator.generatePDF(url, `${fiche.slug}.pdf`);
        
        // Sauvegarder le PDF
        const pdfPath = path.join(pdfDir, `${fiche.slug}.pdf`);
        fs.writeFileSync(pdfPath, pdfBuffer);
        
        console.log(`[STATIC] PDF généré: ${fiche.slug}.pdf (${pdfBuffer.length} bytes)`);
      } catch (error) {
        console.error(`[STATIC] Erreur génération PDF ${fiche.slug}:`, error);
      }
    }
    
    // Générer le PDF de toutes les fiches
    try {
      console.log('[STATIC] Génération PDF complet...');
      const url = `http://localhost:${this.tempPort}/fiches/all-html`;
      const pdfBuffer = await this.pdfGenerator.generatePDF(url, 'toutes-les-fiches-nsi.pdf');
      
      const pdfPath = path.join(pdfDir, 'all.pdf');
      fs.writeFileSync(pdfPath, pdfBuffer);
      
      console.log(`[STATIC] PDF complet généré: all.pdf (${pdfBuffer.length} bytes)`);
    } catch (error) {
      console.error('[STATIC] Erreur génération PDF complet:', error);
    }
    
    console.log('[STATIC] Génération des PDFs terminée');
  }

  /**
   * Génère le HTML pour la page d'accueil
   */
  generateIndexHTML() {
    const fiches = this.fichesManager.getAllFiches();
    
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accueil - Fiches de révision NSI</title>
    <link rel="stylesheet" href="css/fiche-nsi.css">
    <link rel="stylesheet" href="css/index.css">
</head>
<body>
    <div class="index-container">
        <h1>Fiches de révision NSI</h1>

        <div class="search-container">
            <input type="text" id="search-bar" placeholder="Rechercher une fiche par titre...">
        </div>

        <div class="list-header" id="toggle-fiches" title="Cliquer pour afficher/masquer la liste">
            <h2>Liste des fiches disponibles</h2>
            <a href="fiches/all.pdf" download class="download-all-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>Tout télécharger</span>
            </a>
        </div>

        <ul class="fiche-list" id="fiches-list">
            ${fiches.map(fiche => `
                <li>
                    <a href="fiches/${fiche.slug}" class="fiche-name">${fiche.title}</a>
                    <a href="fiches/${fiche.slug}.pdf" download class="download-link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon" title="Télécharger en PDF"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    </a>
                </li>
            `).join('')}
        </ul>

        <footer class="index-footer">
            <div class="footer-license">
                <span>« Fiches de révision NSI » par <a href="https://github.com/babash" target="_blank" rel="noopener noreferrer">babash</a> est placé sous la licence <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.fr" target="_blank" rel="license">CC0 1.0</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" class="license-icon" alt="Creative Commons"><img src="https://mirrors.creativecommons.org/presskit/icons/zero.svg" class="license-icon" alt="Zero"></span>
            </div>
            <div class="footer-project">
                <a href="https://github.com/babash/fiches-nsi" target="_blank" rel="noopener noreferrer" class="footer-link-item" title="Voir le projet sur GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                    <span>Projet sur GitHub</span>
                </a>
            </div>
        </footer>
    </div>
    <script src="js/index.js"></script>
    <script src="js/masonry-layout.js"></script>
</body>
</html>`;
  }

  /**
   * Génère le HTML pour une fiche individuelle
   */
  generateFicheHTML(fiche) {
    const visibleTitle = fiche.title.replace('Fiche NSI – ', '');
    
    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>${fiche.title}</title>
  <link rel="stylesheet" href="../../css/fiche-nsi.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-light.min.css">
</head>
<body>

<main>
  <header><h1>${visibleTitle}</h1></header>
  <article class="container">
    ${fiche.content}
  </article>
  
  ${fiche.footer ? `<div class="footnote">${fiche.footer}</div>` : ''}
  
</main>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
  <script>hljs.highlightAll();</script>
</body>
</html>`;
  }

  /**
   * Copie les fichiers statiques
   */
  copyStaticFiles() {
    console.log('[STATIC] Copie des fichiers statiques...');
    
    // Créer les dossiers
    fs.mkdirSync(path.join(this.outputDir, 'css'), { recursive: true });
    fs.mkdirSync(path.join(this.outputDir, 'js'), { recursive: true });
    fs.mkdirSync(path.join(this.outputDir, 'img'), { recursive: true });
    fs.mkdirSync(path.join(this.outputDir, 'fiches'), { recursive: true });
    
    // Copier les CSS
    fs.copyFileSync(
      path.join(__dirname, '../public/css/fiche-nsi.css'),
      path.join(this.outputDir, 'css/fiche-nsi.css')
    );
    fs.copyFileSync(
      path.join(__dirname, '../public/css/index.css'),
      path.join(this.outputDir, 'css/index.css')
    );
    
    // Copier les JS
    fs.copyFileSync(
      path.join(__dirname, '../public/js/index.js'),
      path.join(this.outputDir, 'js/index.js')
    );
    fs.copyFileSync(
      path.join(__dirname, '../public/js/masonry-layout.js'),
      path.join(this.outputDir, 'js/masonry-layout.js')
    );
    
    // Copier les images
    const imgDir = path.join(__dirname, '../public/img');
    if (fs.existsSync(imgDir)) {
      const images = fs.readdirSync(imgDir);
      images.forEach(img => {
        fs.copyFileSync(
          path.join(imgDir, img),
          path.join(this.outputDir, 'img', img)
        );
      });
    }
    
    console.log('[STATIC] Fichiers statiques copiés');
  }

  /**
   * Génère toutes les pages
   */
  async generatePages() {
    console.log('[STATIC] Génération des pages...');
    
    // Page d'accueil
    const indexHTML = this.generateIndexHTML();
    fs.writeFileSync(path.join(this.outputDir, 'index.html'), indexHTML);
    console.log('[STATIC] Page d\'accueil générée');
    
    // Pages des fiches
    const fiches = this.fichesManager.getAllFiches();
    for (const fiche of fiches) {
      const ficheDir = path.join(this.outputDir, 'fiches', fiche.slug);
      fs.mkdirSync(ficheDir, { recursive: true });
      
      const ficheHTML = this.generateFicheHTML(fiche);
      fs.writeFileSync(path.join(ficheDir, 'index.html'), ficheHTML);
      
      console.log(`[STATIC] Fiche générée: ${fiche.slug}`);
    }
    
    console.log(`[STATIC] ${fiches.length} fiches générées`);
  }

  /**
   * Génère le site statique complet
   */
  async generate() {
    console.log('[STATIC] Début de la génération du site statique...');
    
    // Créer le dossier de sortie
    if (fs.existsSync(this.outputDir)) {
      fs.rmSync(this.outputDir, { recursive: true });
    }
    fs.mkdirSync(this.outputDir, { recursive: true });
    
    await this.init();
    this.copyStaticFiles();
    await this.generatePages();
    
    // Générer les PDFs
    await this.startTempServer();
    try {
      await this.generatePDFs();
    } finally {
      await this.stopTempServer();
      await this.pdfGenerator.close();
    }
    
    console.log('[STATIC] Site statique généré avec succès !');
    console.log(`[STATIC] Dossier de sortie: ${this.outputDir}`);
  }
}

// Exécution si appelé directement
if (require.main === module) {
  const generator = new StaticSiteGenerator();
  generator.generate().catch(console.error);
}

module.exports = StaticSiteGenerator;