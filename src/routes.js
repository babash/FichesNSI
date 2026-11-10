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

    // PDF d'une fiche
    this.router.get('/fiches/:slug/pdf', async (req, res, next) => {
      const { slug } = req.params;
      const fiche = this.fichesManager.getFiche(slug);
      if (!fiche) return next();

      try {
        const url = `http://localhost:${this.port}/fiches/${slug}/html-for-pdf`;
        const pdfBuffer = await this.pdfGenerator.generatePDF(url, `${slug}.pdf`);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${slug}.pdf"`);
        res.setHeader('Content-Length', pdfBuffer.length);
        res.send(pdfBuffer);
      } catch (error) {
        console.error(`[PDF] Erreur lors de la génération du PDF pour ${slug}:`, error);
        res.status(500).send('Erreur lors de la génération du PDF.');
      }
    });

    // HTML pour PDF de toutes les fiches
    this.router.get('/fiches/all-html', (req, res) => {
      const fiches = this.fichesManager.getAllFichesSorted();
      const html = this.pdfGenerator.generateAllFichesHTML(fiches);
      res.send(html);
    });

    // PDF de toutes les fiches
    this.router.get('/fiches/all/pdf', async (req, res) => {
      try {
        const url = `http://localhost:${this.port}/fiches/all-html`;
        const pdfBuffer = await this.pdfGenerator.generatePDF(url, 'toutes-les-fiches-nsi.pdf');

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="toutes-les-fiches-nsi.pdf"');
        res.setHeader('Content-Length', pdfBuffer.length);
        res.send(pdfBuffer);
      } catch (error) {
        console.error('[PDF] Erreur lors de la génération du PDF combiné:', error);
        res.status(500).send('Erreur lors de la génération du PDF combiné.');
      }
    });

    // 404 Handler
    this.router.use((req, res) => {
      res.status(404).send("Désolé, la page que vous cherchez n'existe pas.");
    });
  }

  getRouter() {
    return this.router;
  }
}

module.exports = RoutesManager;