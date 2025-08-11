const puppeteer = require('puppeteer');

class PDFGenerator {
  constructor() {
    this.browser = null;
  }

  /**
   * Initialise le navigateur Puppeteer
   */
  async init() {
    console.log('[Puppeteer] Lancement du navigateur...');
    this.browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    console.log('[Puppeteer] Navigateur prêt.');
  }

  /**
   * Ferme le navigateur
   */
  async close() {
    if (this.browser) {
      console.log('[Puppeteer] Fermeture du navigateur...');
      await this.browser.close();
      this.browser = null;
    }
  }

  /**
   * Génère le HTML pour une fiche individuelle
   */
  generateSingleFicheHTML(fiche) {
    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>${fiche.title}</title>
        <link rel="stylesheet" href="/css/fiche-nsi.css">
      </head>
      <body>
        <article class="fiche">${fiche.content}</article>
        <footer style="position: fixed; bottom: 10px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; color: #666; text-align: center;">
          « Fiches de révision NSI » par <a href="https://github.com/babash" style="color: #666;">babash</a> est placé sous la licence <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.fr" style="color: #666;">CC0 1.0</a>
        </footer>
      </body>
      </html>`;
  }

  /**
   * Génère le HTML pour toutes les fiches
   */
  generateAllFichesHTML(fiches) {
    const fichesHtml = fiches.map(fiche => `
      <article class="fiche">
        ${fiche.content}
      </article>
      <div style="page-break-after: always;"></div>
    `).join('');

    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Toutes les fiches NSI</title>
        <link rel="stylesheet" href="/css/fiche-nsi.css">
      </head>
      <body>
        <main class="container">${fichesHtml}</main>
        <footer style="position: fixed; bottom: 10px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; color: #666; text-align: center;">
          « Fiches de révision NSI » par <a href="https://github.com/babash" style="color: #666;">babash</a> est placé sous la licence <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.fr" style="color: #666;">CC0 1.0</a>
        </footer>
      </body>
      </html>`;
  }

  /**
   * Génère un PDF depuis une URL
   */
  async generatePDF(url, filename) {
    if (!this.browser) {
      throw new Error('Le navigateur n\'est pas initialisé');
    }

    let page;
    try {
      console.log(`[PDF] Génération de ${filename}...`);
      page = await this.browser.newPage();
      
      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.evaluateHandle('document.fonts.ready');

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        tagged: false,
        timeout: 0,
      });

      console.log(`[PDF] ${filename} généré avec succès`);
      return pdfBuffer;

    } catch (error) {
      console.error(`[PDF] Erreur lors de la génération de ${filename}:`, error);
      throw error;
    } finally {
      if (page) await page.close();
    }
  }
}

module.exports = PDFGenerator;