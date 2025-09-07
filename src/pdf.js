const puppeteer = require('puppeteer');
const htmlPdf = require('html-pdf-node');

class PDFGenerator {
  constructor() {
    this.browser = null;
  }

  /**
   * Initialise le navigateur Puppeteer
   */
  async init() {
    console.log('[Puppeteer] Lancement du navigateur...');
    try {
      this.browser = await puppeteer.launch({ 
        headless: 'new', 
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor'
        ]
      });
      console.log('[Puppeteer] Navigateur prêt.');
      
      // Test rapide pour vérifier que le navigateur fonctionne
      const testPage = await this.browser.newPage();
      await testPage.goto('data:text/html,<h1>Test</h1>');
      await testPage.close();
      console.log('[Puppeteer] Test de fonctionnement réussi.');
      
    } catch (error) {
      console.error('[Puppeteer] Erreur lors du lancement:', error);
      throw error;
    }
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
        <link rel="stylesheet" href="/css/fiche-nsi.css">
      </head>
      <body>
        <main class="wrapper">${fichesHtml}</main>
      </body>
      </html>`;
  }

  /**
   * Génère un PDF depuis une URL avec Puppeteer
   */
  async generatePDFWithPuppeteer(url, filename) {
    if (!this.browser) {
      throw new Error('Le navigateur n\'est pas initialisé');
    }

    let page;
    try {
      console.log(`[PDF] Génération de ${filename} avec Puppeteer depuis ${url}...`);
      page = await this.browser.newPage();

      // Configuration de la page
      await page.setViewport({ width: 1200, height: 800 });
      await page.emulateMediaType('print');

      console.log(`[PDF] Navigation vers ${url}...`);
      const response = await page.goto(url, { 
        waitUntil: 'networkidle2', 
        timeout: 30000 
      });
      
      if (!response || !response.ok()) {
        throw new Error(`Erreur HTTP: ${response ? response.status() : 'Pas de réponse'}`);
      }
      
      // Vérifier que le CSS est chargé
      const cssLoaded = await page.evaluate(() => {
        const link = document.querySelector('link[href="/css/fiche-nsi.css"]');
        return link && link.sheet && link.sheet.cssRules.length > 0;
      });
      
      if (!cssLoaded) {
        console.warn('[PDF] CSS non chargé, tentative de rechargement...');
        await page.reload({ waitUntil: 'networkidle2' });
      }
      
      console.log(`[PDF] Attente du chargement des polices...`);
      await page.evaluateHandle('document.fonts.ready');
      
      // Attendre un peu plus pour que tout soit chargé
      await page.waitForTimeout(2000);
      
      console.log(`[PDF] Génération du PDF...`);
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: false,
        margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
        tagged: false,
        timeout: 30000,
      });

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

      console.log(`[PDF] ${filename} généré avec succès avec Puppeteer (${pdfBuffer.length} bytes)`);
      return pdfBuffer;

    } catch (error) {
      console.error(`[PDF] Erreur Puppeteer pour ${filename}:`, error);
      throw error;
    } finally {
      if (page) await page.close();
    }
  }

  /**
   * Génère un PDF depuis une URL avec html-pdf-node (fallback)
   */
  async generatePDFWithHtmlPdf(url, filename) {
    try {
      console.log(`[PDF] Génération de ${filename} avec html-pdf-node depuis ${url}...`);
      
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

      console.log(`[PDF] ${filename} généré avec succès avec html-pdf-node (${pdfBuffer.length} bytes)`);
      return pdfBuffer;

    } catch (error) {
      console.error(`[PDF] Erreur html-pdf-node pour ${filename}:`, error);
      throw error;
    }
  }

  /**
   * Génère un PDF depuis une URL (avec fallback automatique)
   */
  async generatePDF(url, filename) {
    // Essayer d'abord avec Puppeteer si disponible
    if (this.browser) {
      try {
        return await this.generatePDFWithPuppeteer(url, filename);
      } catch (error) {
        console.warn(`[PDF] Puppeteer a échoué pour ${filename}, utilisation du fallback html-pdf-node...`);
      }
    }
    
    // Fallback vers html-pdf-node
    return await this.generatePDFWithHtmlPdf(url, filename);
  }
}

module.exports = PDFGenerator;