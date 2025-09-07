const htmlPdf = require('html-pdf-node');

class PDFGenerator {
  constructor() {
    // Pas besoin d'initialisation pour html-pdf-node
  }

  /**
   * Initialise le générateur PDF
   */
  async init() {
    console.log('[PDF] Générateur PDF initialisé.');
  }

  /**
   * Ferme le générateur PDF
   */
  async close() {
    console.log('[PDF] Générateur PDF fermé.');
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
        <link rel="stylesheet" href="/public/css/fiche-nsi.css">
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
    try {
      console.log(`[PDF] Génération de ${filename} depuis ${url}...`);
      
      const options = {
        format: 'A4',
        printBackground: true,
        margin: {
          top: '10mm',
          right: '10mm',
          bottom: '10mm',
          left: '10mm'
        },
        displayHeaderFooter: false,
        timeout: 30000
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