const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class PDFGenerator {
  constructor() {
    this.browser = null;
    this.cssContent = null;
    this.puppeteerAvailable = true;
  }

  /**
   * Initialise le navigateur Puppeteer
   */
  async init() {
    try {
      console.log('[Puppeteer] Lancement du navigateur...');
      this.browser = await puppeteer.launch({ 
        headless: 'new', 
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ] 
      });
      
      // Charger le CSS une seule fois
      this.cssContent = this.loadCSSContent();
      
      console.log('[Puppeteer] Navigateur prêt.');
      this.puppeteerAvailable = true;
    } catch (error) {
      console.error('[Puppeteer] Erreur lors du lancement:', error.message);
      console.log('[Puppeteer] Utilisation du mode fallback (HTML uniquement)');
      this.puppeteerAvailable = false;
      this.cssContent = this.loadCSSContent();
    }
  }

  /**
   * Charge le contenu CSS et le convertit en CSS inline
   */
  loadCSSContent() {
    try {
      const cssPath = path.join(__dirname, '../css/fiche-nsi.css');
      let css = fs.readFileSync(cssPath, 'utf8');
      
      // Corriger les chemins d'images pour les PDFs
      css = css.replace('../img/fond2.png', '/img/fond2.png');
      
      // Ajouter des styles spécifiques pour l'impression PDF
      css += `
        @media print {
          body { 
            margin: 0; 
            background: white !important;
          }
          body::before {
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('/img/fond2.png') no-repeat top center;
            background-size: cover;
            z-index: -1;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `;
      
      return css;
    } catch (error) {
      console.error('[CSS] Erreur lors du chargement du CSS:', error);
      return '';
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
        <style>${this.cssContent}</style>
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
        <script>
          // Attendre que le DOM soit chargé
          document.addEventListener('DOMContentLoaded', function() {
            // Appliquer la coloration syntaxique
            hljs.highlightAll();
            
            // Attendre un peu que highlight.js termine
            setTimeout(() => {
              // Forcer le rendu des polices
              document.fonts.ready.then(() => {
                console.log('Fonts ready');
              });
            }, 100);
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
        <style>${this.cssContent}</style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-light.min.css">
      </head>
      <body>
        <main class="wrapper">${fichesHtml}</main>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
        <script>
          document.addEventListener('DOMContentLoaded', function() {
            hljs.highlightAll();
            setTimeout(() => {
              document.fonts.ready.then(() => {
                console.log('Fonts ready');
              });
            }, 100);
          });
        </script>
      </body>
      </html>`;
  }

  /**
   * Génère un PDF depuis une URL
   */
  async generatePDF(url, filename) {
    if (!this.puppeteerAvailable) {
      throw new Error('Puppeteer n\'est pas disponible. Utilisez le mode HTML uniquement.');
    }

    if (!this.browser) {
      throw new Error('Le navigateur n\'est pas initialisé');
    }

    let page;
    try {
      console.log(`[PDF] Génération de ${filename}...`);
      page = await this.browser.newPage();

      // Configuration pour une meilleure qualité PDF
      await page.setViewport({ width: 1200, height: 1600 });
      
      // S'assurer d'utiliser les styles d'impression et que les couleurs de fond sont imprimées
      await page.emulateMediaType('print');

      // Intercepter les requêtes pour optimiser
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        if (req.resourceType() === 'image' || req.resourceType() === 'font') {
          req.continue();
        } else if (req.resourceType() === 'stylesheet' || req.resourceType() === 'script') {
          req.continue();
        } else {
          req.continue();
        }
      });

      await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });

      // Attendre que les polices soient chargées
      await page.evaluateHandle('document.fonts.ready');
      
      // Attendre que highlight.js termine la coloration
      await page.waitForFunction(() => {
        return document.querySelectorAll('pre code.hljs').length > 0 || 
               document.querySelectorAll('pre code').length === 0;
      }, { timeout: 10000 });

      // Attendre un peu plus pour s'assurer que tout est rendu
      await new Promise(resolve => setTimeout(resolve, 1000));

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
        tagged: false,
        timeout: 30000,
        displayHeaderFooter: false,
        scale: 1.0
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

  /**
   * Génère un fichier HTML pour impression (fallback quand PDF n'est pas disponible)
   */
  generateHTMLForPrint(fiche) {
    const visibleTitle = (fiche.title || '').replace('Fiche NSI – ', '');
    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>${fiche.title} - Version Impression</title>
        <style>${this.cssContent}</style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-light.min.css">
        <style>
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
          .print-instructions {
            background: #f0f0f0;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 8px;
            border-left: 4px solid #306998;
          }
        </style>
      </head>
      <body>
        <div class="print-instructions no-print">
          <h3>📄 Instructions d'impression</h3>
          <p>Utilisez Ctrl+P (ou Cmd+P sur Mac) pour imprimer cette page en PDF.</p>
          <p>Assurez-vous que "Arrière-plans" est activé dans les options d'impression.</p>
        </div>
        <main>
          <header><h1>${visibleTitle}</h1></header>
          <article class="container">
            ${fiche.content}
          </article>
          ${fiche.footer ? `<div class="footnote">${fiche.footer}</div>` : ''}
        </main>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
        <script>
          document.addEventListener('DOMContentLoaded', function() {
            hljs.highlightAll();
          });
        </script>
      </body>
      </html>`;
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
}

module.exports = PDFGenerator;