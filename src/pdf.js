const htmlPdf = require('html-pdf-node');

const { pagePdf } = require('./pages');

/** Les options de Chromium, pour html-pdf-node comme pour la vérification. */
const ARGS_CHROMIUM = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--disable-accelerated-2d-canvas',
  '--no-first-run',
  '--no-zygote',
  '--disable-gpu',
  '--font-render-hinting=none'
];

class PDFGenerator {
  constructor() {
    // Pas besoin d'initialisation pour html-pdf-node
  }

  /**
   * Initialise le générateur PDF
   */
  async init() {
    console.log('[PDF] Générateur PDF initialisé avec html-pdf-node.');
  }

  /**
   * Ferme le générateur PDF
   */
  async close() {
    console.log('[PDF] Générateur PDF fermé.');
  }

  /** Le HTML qui sert à fabriquer le PDF d'une fiche. */
  generateSingleFicheHTML(fiche) {
    return pagePdf([fiche], fiche.title);
  }

  /** Le HTML qui sert à fabriquer le PDF de toutes les fiches (une par page). */
  generateAllFichesHTML(fiches) {
    return pagePdf(fiches, 'Toutes les fiches de révision NSI');
  }

  /**
   * Vérifie, avant de fabriquer les PDF, que chaque fiche tient sur une page A4
   * sans réduction. Renvoie, pour chaque adresse, le zoom appliqué (1 : aucune
   * réduction) et si le contenu déborde encore.
   */
  async verifierPages(urls) {
    const puppeteer = require('puppeteer');
    const navigateur = await puppeteer.launch({ args: ARGS_CHROMIUM });
    const resultats = [];
    try {
      const page = await navigateur.newPage();
      const erreurs = [];
      page.on('pageerror', (e) => erreurs.push(e.message));
      page.on('requestfailed', (r) => erreurs.push(`ressource introuvable : ${r.url()}`));
      for (const url of urls) {
        erreurs.length = 0;
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
        await page.waitForSelector('body[data-pret]', { timeout: 30000 });
        const fiches = await page.$$eval('.fiche-pdf', (els) => els.map((el) => ({
          slug: el.dataset.slug,
          zoom: Number(el.dataset.zoom),
          hauteur: Number(el.dataset.hauteur),
          deborde: el.dataset.deborde === 'oui',
          coupees: JSON.parse(el.dataset.coupees || '[]'),
        })));
        resultats.push({ url, fiches, erreurs: erreurs.slice() });
      }
    } finally {
      await navigateur.close();
    }
    return resultats;
  }

  /**
   * Génère un PDF depuis une URL
   */
  async generatePDF(url, filename) {
    try {
      console.log(`[PDF] Génération de ${filename} depuis ${url}...`);

      // Pas de pied de page de Puppeteer (footerTemplate) : l'image de fond le
      // recouvrait, et l'auteur et la licence sont écrits dans la page (MENTION_LICENCE).
      const options = {
        format: 'A4',
        printBackground: true,
        // Les marges sont celles de la règle `@page` de fiche-nsi.css.
        displayHeaderFooter: false,
        preferCSSPageSize: true,
        timeout: 60000, // Timeout augmenté pour laisser le temps au JS de s'exécuter
        waitUntil: 'networkidle0', // Attendre que le réseau soit inactif
        args: ARGS_CHROMIUM
      };

      const pdfBuffer = await htmlPdf.generatePdf({ url }, options);

      // Vérifier que le PDF est valide
      if (!pdfBuffer || pdfBuffer.length === 0) {
        throw new Error('Le PDF généré est vide');
      }

      // Vérifier que c'est bien un PDF (commence par %PDF)
      const pdfHeader = pdfBuffer.slice(0, 4).toString();
      if (pdfHeader !== '%PDF') {
        console.error(`[PDF] En-tête invalide: ${pdfHeader}`);
        throw new Error('Le fichier généré n\'est pas un PDF valide');
      }

      console.log(`[PDF] ${filename} généré avec succès (${pdfBuffer.length} bytes)`);
      return pdfBuffer;

    } catch (error) {
      console.error(`[PDF] Erreur lors de la génération de ${filename}:`, error);
      throw error;
    }
  }
}

module.exports = PDFGenerator;