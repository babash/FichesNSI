const express = require('express');

class RoutesManager {
  constructor(fichesManager, pdfGenerator, port) {
    this.fichesManager = fichesManager;
    this.pdfGenerator = pdfGenerator;
    this.port = port;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    // Page d'accueil
    this.router.get('/', (req, res) => {
      res.render('index', { fiches: this.fichesManager.getAllFiches() });
    });

    // Fiche individuelle
    this.router.get('/fiches/:slug', (req, res, next) => {
      const fiche = this.fichesManager.getFiche(req.params.slug);
      if (!fiche) return next();
      res.render('fiche', { fiche });
    });

    // HTML pour PDF d'une fiche
    this.router.get('/fiches/:slug/html-for-pdf', (req, res, next) => {
      const fiche = this.fichesManager.getFiche(req.params.slug);
      if (!fiche) return next();
      
      const html = this.pdfGenerator.generateSingleFicheHTML(fiche);
      res.send(html);
    });

    // HTML pour impression d'une fiche (fallback)
    this.router.get('/fiches/:slug/print', (req, res, next) => {
      const fiche = this.fichesManager.getFiche(req.params.slug);
      if (!fiche) return next();
      
      const html = this.pdfGenerator.generateHTMLForPrint(fiche);
      res.send(html);
    });

    // PDF d'une fiche
    this.router.get('/fiches/:slug/pdf', async (req, res, next) => {
      const { slug } = req.params;
      const fiche = this.fichesManager.getFiche(slug);
      if (!fiche) return next();

      try {
        // Vérifier si Puppeteer est disponible
        if (!this.pdfGenerator.puppeteerAvailable) {
          // Rediriger vers la version HTML pour impression
          return res.redirect(`/fiches/${slug}/print`);
        }

        const url = `http://localhost:${this.port}/fiches/${slug}/html-for-pdf`;
        const pdfBuffer = await this.pdfGenerator.generatePDF(url, `${slug}.pdf`);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${slug}.pdf"`);
        res.setHeader('Content-Length', pdfBuffer.length);
        res.send(pdfBuffer);
      } catch (error) {
        console.error(`[PDF] Erreur lors de la génération du PDF pour ${slug}:`, error);
        
        // En cas d'erreur, rediriger vers la version HTML
        if (error.message.includes('Puppeteer n\'est pas disponible')) {
          return res.redirect(`/fiches/${slug}/print`);
        }
        
        res.status(500).send(`
          <h1>Erreur lors de la génération du PDF</h1>
          <p>${error.message}</p>
          <p><a href="/fiches/${slug}/print">Cliquez ici pour voir la version HTML optimisée pour l'impression</a></p>
        `);
      }
    });

    // HTML pour PDF de toutes les fiches
    this.router.get('/fiches/all-html', (req, res) => {
      const fiches = this.fichesManager.getAllFichesSorted();
      const html = this.pdfGenerator.generateAllFichesHTML(fiches);
      res.send(html);
    });

    // HTML pour impression de toutes les fiches (fallback)
    this.router.get('/fiches/all-print', (req, res) => {
      const fiches = this.fichesManager.getAllFichesSorted();
      const html = this.generateAllFichesHTMLForPrint(fiches);
      res.send(html);
    });

    // PDF de toutes les fiches
    this.router.get('/fiches/all/pdf', async (req, res) => {
      try {
        // Vérifier si Puppeteer est disponible
        if (!this.pdfGenerator.puppeteerAvailable) {
          // Rediriger vers la version HTML pour impression
          return res.redirect('/fiches/all-print');
        }

        const url = `http://localhost:${this.port}/fiches/all-html`;
        const pdfBuffer = await this.pdfGenerator.generatePDF(url, 'toutes-les-fiches-nsi.pdf');

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="toutes-les-fiches-nsi.pdf"');
        res.setHeader('Content-Length', pdfBuffer.length);
        res.send(pdfBuffer);
      } catch (error) {
        console.error('[PDF] Erreur lors de la génération du PDF combiné:', error);
        
        // En cas d'erreur, rediriger vers la version HTML
        if (error.message.includes('Puppeteer n\'est pas disponible')) {
          return res.redirect('/fiches/all-print');
        }
        
        res.status(500).send(`
          <h1>Erreur lors de la génération du PDF</h1>
          <p>${error.message}</p>
          <p><a href="/fiches/all-print">Cliquez ici pour voir la version HTML optimisée pour l'impression</a></p>
        `);
      }
    });

    // 404 Handler
    this.router.use((req, res) => {
      res.status(404).send("Désolé, la page que vous cherchez n'existe pas.");
    });
  }

  /**
   * Génère le HTML pour toutes les fiches avec instructions d'impression
   */
  generateAllFichesHTMLForPrint(fiches) {
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
        <title>Toutes les fiches NSI - Version Impression</title>
        <style>${this.pdfGenerator.cssContent}</style>
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
          <p>Utilisez Ctrl+P (ou Cmd+P sur Mac) pour imprimer toutes les fiches en PDF.</p>
          <p>Assurez-vous que "Arrière-plans" est activé dans les options d'impression.</p>
          <p>Chaque fiche sera automatiquement séparée par un saut de page.</p>
        </div>
        <main class="wrapper">${fichesHtml}</main>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
        <script>
          document.addEventListener('DOMContentLoaded', function() {
            hljs.highlightAll();
          });
        </script>
      </body>
      </html>`;
  }

  getRouter() {
    return this.router;
  }
}

module.exports = RoutesManager;