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
   * Génère le HTML pour une fiche individuelle (structure alignée sur fiche.ejs)
   */
  generateSingleFicheHTML(fiche) {
    const visibleTitle = (fiche.title || '').replace('Fiche NSI – ', '');
    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>${fiche.title}</title>
        <link rel="stylesheet" href="/css/fiche-nsi.css">
      </head>
      <body>
        <main>
          <header><h1>${visibleTitle}</h1></header>
          <article class="container">
            ${fiche.content}
          </article>
          ${fiche.footer ? `<div class="footnote">${fiche.footer}</div>` : ''}
        </main>
      </body>
      </html>`;
  }

  /**
   * Génère le HTML pour toutes les fiches (structure homogène + saut de page)
   */
  generateAllFichesHTML(fiches) {
    const fichesHtml = fiches.map(fiche => {
      const visibleTitle = (fiche.title || '').replace('Fiche NSI – ', '');
      return `
        <section class="fiche">
          <header><h1>${visibleTitle}</h1></header>
          <article class="container">
            ${fiche.content}
          </article>
          ${fiche.footer ? `<div class="footnote">${fiche.footer}</div>` : ''}
        </section>
        <div style="page-break-after: always;"></div>
      `;
    }).join('');

    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Toutes les fiches NSI</title>
        <link rel="stylesheet" href="/css/fiche-nsi.css">
      </head>
      <body>
        <main class="wrapper">${fichesHtml}</main>
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

      // S'assurer d'utiliser les styles d'impression et que les couleurs de fond sont imprimées
      await page.emulateMediaType('print');

      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.evaluateHandle('document.fonts.ready');

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' },
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