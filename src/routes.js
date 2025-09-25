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
        const pdfBuffer = await this.pdfGenerator.generatePDF(url, `${slug}.pdf`, fiche.footer);

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

    // ÉDITEUR: Page split markdown/pdf
    this.router.get('/editor/:slug?', (req, res) => {
      const { slug } = req.params;
      const fiche = slug ? this.fichesManager.getFiche(slug) : null;
      const initialMarkdown = fiche ? `---\n` +
        `title: ${fiche.title}\n` +
        `footer: ${fiche.footer || ''}\n` +
        `---\n\n` +
        `<!-- Corps en Markdown: utilisez la prévisualisation PDF -->\n` :
        `---\n` +
        `title: Titre de la fiche\n` +
        `footer: \n` +
        `---\n\n` +
        `# Nouveau contenu\n\nÉcrivez votre fiche en Markdown.`;
      res.render('editor', { slug: slug || '', initialMarkdown });
    });

    // ÉDITEUR: Preview PDF depuis markdown posté
    this.router.post('/editor/preview-pdf', async (req, res) => {
      try {
        const { markdown } = req.body || {};
        if (typeof markdown !== 'string') {
          return res.status(400).json({ error: 'Champ markdown manquant' });
        }

        const fm = require('front-matter');
        const marked = require('marked');
        const page = fm(markdown);
        const title = page.attributes.title || 'Titre manquant';
        const footer = page.attributes.footer || '';
        const content = marked.parse(page.body || '');

        const fiche = { title, footer, content, slug: 'preview' };
        const html = this.pdfGenerator.generateSingleFicheHTML(fiche);

        const pdfBuffer = await this.pdfGenerator.generatePDFFromHtml(html, 'preview.pdf', footer);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Cache-Control', 'no-store');
        res.send(pdfBuffer);
      } catch (error) {
        console.error('[EDITOR] Erreur preview PDF:', error);
        res.status(500).json({ error: 'Erreur lors de la génération du PDF' });
      }
    });

    // ÉDITEUR: Sauvegarde du markdown (écrase le fichier .md)
    this.router.post('/editor/save/:slug', async (req, res) => {
      try {
        const { slug } = req.params;
        const { markdown } = req.body || {};
        if (!slug) return res.status(400).json({ error: 'Slug requis' });
        if (typeof markdown !== 'string') {
          return res.status(400).json({ error: 'Champ markdown manquant' });
        }

        const path = require('path');
        const fs = require('fs').promises;
        const contentDir = path.join(__dirname, '../content');
        const filePath = path.join(contentDir, `${slug}.md`);
        await fs.writeFile(filePath, markdown, 'utf8');

        // Recharger la fiche en mémoire
        await this.fichesManager.loadFiche(contentDir, `${slug}.md`);

        res.json({ ok: true });
      } catch (error) {
        console.error('[EDITOR] Erreur sauvegarde:', error);
        res.status(500).json({ error: 'Erreur lors de la sauvegarde' });
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