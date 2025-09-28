const { chromium } = require('playwright');

class PDFGenerator {
  constructor() {
    // Pas besoin d'initialisation pour html-pdf-node
  }

  /**
   * Initialise le générateur PDF
   */
  async init() {
    console.log('[PDF] Générateur PDF initialisé avec playwright.');
    
    // Vérifier que Playwright est correctement installé
    try {
      const { execSync } = require('child_process');
      execSync('npx playwright --version', { stdio: 'pipe' });
      console.log('[PDF] Playwright vérifié avec succès.');
    } catch (error) {
      console.error('[PDF] ❌ Playwright n\'est pas correctement installé !');
      console.error('[PDF] 💡 Exécutez: npm run install:playwright');
      console.error('[PDF] 💡 Puis: sudo npm run install:playwright-deps');
      throw new Error('Playwright n\'est pas installé. Exécutez npm run install:playwright');
    }
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
            <div class="columns-wrapper">
              <div class="column" id="column-left"></div>
              <div class="column" id="column-right"></div>
            </div>
            ${fiche.content}
          </article>
        </main>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
        <script>hljs.highlightAll();</script>
        <script>
        // Layout fixe sans répartition automatique pour éviter les débordements
        document.addEventListener('DOMContentLoaded', function() {
          const container = document.querySelector('.container');
          const leftColumn = document.getElementById('column-left');
          const rightColumn = document.getElementById('column-right');
          
          // Récupérer toutes les sections
          const sections = Array.from(container.querySelectorAll('section'));
          
          // Répartition simple : une section sur deux à gauche, une sur deux à droite
          sections.forEach((section, index) => {
            if (index % 2 === 0) {
              leftColumn.appendChild(section);
            } else {
              rightColumn.appendChild(section);
            }
          });
        });
        </script>
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
            <div class="columns-wrapper">
              <div class="column" id="column-left-${fiche.slug}">
                <!-- Le contenu sera réparti dynamiquement entre les colonnes -->
              </div>
              <div class="column" id="column-right-${fiche.slug}">
                <!-- Le contenu sera réparti dynamiquement entre les colonnes -->
              </div>
            </div>
            ${fiche.content}
          </article>
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-light.min.css">
      </head>
      <body>
        <main class="wrapper">${fichesHtml}</main>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
        <script>hljs.highlightAll();</script>
        <script>
        // Script pour répartir automatiquement les sections en deux colonnes pour toutes les fiches
        document.addEventListener('DOMContentLoaded', function() {
          const fiches = document.querySelectorAll('.fiche');
          
          fiches.forEach(fiche => {
            const container = fiche.querySelector('.container');
            const leftColumn = fiche.querySelector('[id^="column-left"]');
            const rightColumn = fiche.querySelector('[id^="column-right"]');
            
            if (container && leftColumn && rightColumn) {
              // Récupérer toutes les sections de cette fiche
              const sections = container.querySelectorAll('section');
              
              // Répartir les sections alternativement entre les deux colonnes
              sections.forEach((section, index) => {
                if (index % 2 === 0) {
                  leftColumn.appendChild(section);
                } else {
                  rightColumn.appendChild(section);
                }
              });
            }
          });
        });
        </script>
      </body>
      </html>`;
  }

  /**
   * Génère un PDF depuis une URL
   */
  async generatePDF(url, filename, ficheFooter = null) {
    let browser = null;
    try {
      console.log(`[PDF] Génération de ${filename} depuis ${url}...`);
      
      const now = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
      const footerText = ficheFooter || 'Fiches de révision NSI';
      const footerTemplate = `
        <div style="font-size:5pt;width:100%; padding: 0 6mm; color:#6c757d; line-height:1.1;">
          <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
            <span style="white-space:nowrap;">${footerText}</span>
            <span style="white-space:nowrap;">Page <span class="pageNumber"></span>/<span class="totalPages"></span></span>
            <span style="white-space:nowrap;">${now} (CET)</span>
          </div>
        </div>`;

      browser = await chromium.launch({ 
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
          '--run-all-compositor-stages-before-draw',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding'
        ]
      });
      const page = await browser.newPage();
      
      await page.goto(url, { waitUntil: 'networkidle0' });
      
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '6mm',
          right: '0mm',
          bottom: '8mm',
          left: '0mm'
        },
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate,
        preferCSSPageSize: true
      });
      
      await browser.close();

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
      if (browser) {
        await browser.close();
      }
      console.error(`[PDF] Erreur lors de la génération de ${filename}:`, error);
      throw error;
    }
  }

  /**
   * Génère un PDF à partir d'un HTML brut (string) sans URL publique
   */
  async generatePDFFromHtml(html, filename, ficheFooter = null) {
    let browser = null;
    try {
      console.log(`[PDF] Génération (raw HTML) de ${filename}...`);
      
      const now = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
      const footerText = ficheFooter || 'Fiches de révision NSI';
      const footerTemplate = `
        <div style="font-size:5pt;width:100%; padding: 0 6mm; color:#6c757d; line-height:1.1;">
          <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
            <span style="white-space:nowrap;">${footerText}</span>
            <span style="white-space:nowrap;">Page <span class="pageNumber"></span>/<span class="totalPages"></span></span>
            <span style="white-space:nowrap;">${now} (CET)</span>
          </div>
        </div>`;

      browser = await chromium.launch({ 
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
          '--run-all-compositor-stages-before-draw',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding'
        ]
      });
      const page = await browser.newPage();
      
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '6mm',
          right: '0mm',
          bottom: '8mm',
          left: '0mm'
        },
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate,
        preferCSSPageSize: true
      });
      
      await browser.close();

      if (!pdfBuffer || pdfBuffer.length === 0) {
        throw new Error('Le PDF généré est vide');
      }
      const pdfHeader = pdfBuffer.slice(0, 4).toString();
      if (pdfHeader !== '%PDF') {
        console.error(`[PDF] En-tête invalide: ${pdfHeader}`);
        throw new Error('Le fichier généré n\'est pas un PDF valide');
      }

      console.log(`[PDF] ${filename} (raw HTML) généré avec succès (${pdfBuffer.length} bytes)`);
      return pdfBuffer;
    } catch (error) {
      if (browser) {
        await browser.close();
      }
      console.error(`[PDF] Erreur lors de la génération (raw HTML) de ${filename}:`, error);
      throw error;
    }
  }
}

module.exports = PDFGenerator;