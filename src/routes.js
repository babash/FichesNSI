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
    this.router.get('/editor/:slug?', async (req, res) => {
      const { slug } = req.params;
      let initialMarkdown = '';
      
      if (slug) {
        // Charger le contenu markdown brut du fichier
        try {
          const fs = require('fs').promises;
          const path = require('path');
          const contentDir = path.join(__dirname, '../content');
          const filePath = path.join(contentDir, `${slug}.md`);
          const rawContent = await fs.readFile(filePath, 'utf8');
          initialMarkdown = rawContent;
        } catch (error) {
          console.error(`[EDITOR] Erreur chargement ${slug}.md:`, error);
          // Fallback vers la fiche en mémoire si le fichier n'existe pas
          const fiche = this.fichesManager.getFiche(slug);
          if (fiche) {
            initialMarkdown = `---\ntitle: ${fiche.title}\nfooter: ${fiche.footer || ''}\n---\n\n<!-- Corps en Markdown -->\n`;
          }
        }
      }
      
      if (!initialMarkdown) {
        // Utiliser "exemple-affichage" comme template par défaut pour les nouvelles fiches
        try {
          const fs = require('fs').promises;
          const path = require('path');
          const contentDir = path.join(__dirname, '../content');
          const templatePath = path.join(contentDir, 'exemple-affichage.md');
          initialMarkdown = await fs.readFile(templatePath, 'utf8');
        } catch (error) {
          console.error('[EDITOR] Erreur chargement template exemple-affichage:', error);
          // Fallback vers un template simple
          initialMarkdown = `---\ntitle: Titre de la fiche\nfooter: \n---\n\n# Nouveau contenu\n\nÉcrivez votre fiche en Markdown.`;
        }
      }
      
      res.render('editor', { slug: slug || '', initialMarkdown });
    });

    // ÉDITEUR: Preview HTML temporaire pour PDF
    this.router.post('/editor/preview-html', (req, res) => {
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
        
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 'no-store');
        res.send(html);
      } catch (error) {
        console.error('[EDITOR] Erreur preview HTML:', error);
        res.status(500).json({ error: 'Erreur lors de la génération du HTML', details: error.message });
      }
    });

    // ÉDITEUR: Preview PDF depuis markdown posté
    this.router.post('/editor/preview-pdf', async (req, res) => {
      try {
        console.log('[EDITOR] Début preview PDF...');
        const { markdown } = req.body || {};
        if (typeof markdown !== 'string') {
          console.log('[EDITOR] Erreur: markdown manquant ou invalide');
          return res.status(400).json({ error: 'Champ markdown manquant' });
        }

        console.log('[EDITOR] Parsing markdown...');
        const fm = require('front-matter');
        const marked = require('marked');
        const page = fm(markdown);
        const title = page.attributes.title || 'Titre manquant';
        const footer = page.attributes.footer || '';
        const content = marked.parse(page.body || '');

        console.log('[EDITOR] Génération HTML...');
        const fiche = { title, footer, content, slug: 'preview' };
        const html = this.pdfGenerator.generateSingleFicheHTML(fiche);

        console.log('[EDITOR] Génération PDF via URL...');
        // Créer un ID unique pour cette session
        const sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        
        // Stocker temporairement le HTML (en mémoire pour cette session)
        if (!this.tempHtmlSessions) {
          this.tempHtmlSessions = new Map();
        }
        this.tempHtmlSessions.set(sessionId, html);
        
        // Nettoyer après 5 minutes
        setTimeout(() => {
          if (this.tempHtmlSessions) {
            this.tempHtmlSessions.delete(sessionId);
          }
        }, 5 * 60 * 1000);
        
        const url = `http://localhost:${this.port}/editor/temp-html/${sessionId}`;
        const pdfBuffer = await this.pdfGenerator.generatePDF(url, 'preview.pdf', footer);
        
        console.log('[EDITOR] PDF généré avec succès, envoi...');
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Cache-Control', 'no-store');
        res.send(pdfBuffer);
      } catch (error) {
        console.error('[EDITOR] Erreur preview PDF:', error);
        console.error('[EDITOR] Stack trace:', error.stack);
        res.status(500).json({ error: 'Erreur lors de la génération du PDF', details: error.message });
      }
    });

    // ÉDITEUR: HTML temporaire pour PDF
    this.router.get('/editor/temp-html/:sessionId', (req, res) => {
      const { sessionId } = req.params;
      if (!this.tempHtmlSessions || !this.tempHtmlSessions.has(sessionId)) {
        return res.status(404).send('Session expirée');
      }
      
      const html = this.tempHtmlSessions.get(sessionId);
      res.setHeader('Content-Type', 'text/html');
      res.send(html);
    });

    // ÉDITEUR: Sauvegarde désactivée - les utilisateurs ne peuvent pas sauvegarder les fiches
    this.router.post('/editor/save/:slug', async (req, res) => {
      res.status(403).json({ error: 'Sauvegarde désactivée - les fiches ne peuvent pas être modifiées' });
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