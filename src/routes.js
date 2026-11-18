const express = require('express');
const { pageAccueil, pageFiche } = require('./pages');

/**
 * Les adresses du serveur local, les mêmes que celles du site publié :
 * - `/`                       l'accueil ;
 * - `/fiches/<fiche>/`        la page web d'une fiche ;
 * - `/fiches/<fiche>.pdf`     son PDF (fabriqué à la demande en local) ;
 * - `/fiches/all.pdf`         toutes les fiches ;
 * - `/pdf/<fiche>` et `/pdf/toutes` : les pages qui servent à fabriquer les PDF.
 */
class RoutesManager {
  constructor(fichesManager, pdfGenerator, port) {
    this.fichesManager = fichesManager;
    this.pdfGenerator = pdfGenerator;
    this.port = port;
    this.router = express.Router({ strict: true });
    this.setupRoutes();
  }

  async envoyerPdf(res, url, nom) {
    try {
      const pdf = await this.pdfGenerator.generatePDF(url, nom);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${nom}"`);
      res.send(pdf);
    } catch (error) {
      console.error(`[PDF] Erreur pour ${nom} :`, error);
      res.status(500).send('Erreur lors de la génération du PDF.');
    }
  }

  setupRoutes() {
    const fm = this.fichesManager;

    this.router.get('/', (req, res) => {
      res.send(pageAccueil(fm.parNiveau(), '/', ''));
    });

    // Pages des PDF
    this.router.get('/pdf/toutes', (req, res) => {
      res.send(this.pdfGenerator.generateAllFichesHTML(fm.getAllFichesSorted()));
    });
    this.router.get('/pdf/:slug', (req, res, next) => {
      const fiche = fm.getFiche(req.params.slug);
      if (!fiche) return next();
      res.send(this.pdfGenerator.generateSingleFicheHTML(fiche));
    });

    // PDF
    this.router.get('/fiches/all.pdf', (req, res) => {
      this.envoyerPdf(res, `http://localhost:${this.port}/pdf/toutes`, 'all.pdf');
    });
    this.router.get(/^\/fiches\/([\w-]+)\.pdf$/, (req, res, next) => {
      const slug = req.params[0];
      if (!fm.getFiche(slug)) return next();
      this.envoyerPdf(res, `http://localhost:${this.port}/pdf/${slug}`, `${slug}.pdf`);
    });

    // Pages web des fiches (avec la barre oblique finale, comme sur le site publié)
    this.router.get('/fiches/:slug', (req, res, next) => {
      if (!fm.getFiche(req.params.slug)) return next();
      res.redirect(301, `/fiches/${req.params.slug}/`);
    });
    this.router.get('/fiches/:slug/', (req, res, next) => {
      const fiche = fm.getFiche(req.params.slug);
      if (!fiche) return next();
      res.send(pageFiche(fiche, fm.voisines(fiche.slug), '/'));
    });

    this.router.use((req, res) => {
      res.status(404).send("Désolé, cette page n'existe pas. <a href=\"/\">Retour aux fiches</a>");
    });
  }

  getRouter() {
    return this.router;
  }
}

module.exports = RoutesManager;
