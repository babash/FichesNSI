const fs = require('fs').promises;
const path = require('path');
const marked = require('marked');
const fm = require('front-matter');

class FichesManager {
  constructor() {
    this.fiches = new Map();
  }

  /**
   * Charge toutes les fiches depuis le dossier content
   */
  async loadContent() {
    try {
      const contentDir = path.join(__dirname, '../content');
      const files = await fs.readdir(contentDir);

      for (const file of files) {
        if (path.extname(file) === '.md') {
          await this.loadFiche(contentDir, file);
        }
      }

      console.log(`[INFO] ${this.fiches.size} fiche(s) chargée(s) avec succès`);
    } catch (error) {
      console.error("Erreur lors du chargement des fiches :", error);
      throw error;
    }
  }

  /**
   * Charge une fiche individuelle
   */
  async loadFiche(contentDir, file) {
    const filePath = path.join(contentDir, file);
    const data = await fs.readFile(filePath, 'utf8');
    const page = fm(data);
    const slug = path.basename(file, '.md');

    this.fiches.set(slug, {
      slug,
      title: page.attributes.title || 'Titre manquant',
      footer: page.attributes.footer || '',
      content: marked.parse(page.body)
    });

    console.log(`[OK] Fiche chargée : ${slug}`);
  }

  /**
   * Récupère une fiche par son slug
   */
  getFiche(slug) {
    return this.fiches.get(slug);
  }

  /**
   * Récupère toutes les fiches
   */
  getAllFiches() {
    return Array.from(this.fiches.values());
  }

  /**
   * Récupère toutes les fiches triées par titre
   */
  getAllFichesSorted() {
    return this.getAllFiches().sort((a, b) => a.title.localeCompare(b.title));
  }
}

module.exports = FichesManager;