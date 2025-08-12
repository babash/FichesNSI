const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class GitHubPagesBuilder {
  constructor() {
    this.ghPagesDir = 'gh-pages';
    this.sourceDir = '.';
  }

  /**
   * Nettoie et prépare le répertoire de build
   */
  prepareBuildDirectory() {
    console.log('🧹 Préparation du répertoire de build...');
    
    if (fs.existsSync(this.ghPagesDir)) {
      fs.rmSync(this.ghPagesDir, { recursive: true, force: true });
    }
    fs.mkdirSync(this.ghPagesDir, { recursive: true });
  }

  /**
   * Copie les fichiers statiques
   */
  copyStaticFiles() {
    console.log('📁 Copie des fichiers statiques...');
    
    // Copier les fichiers principaux
    const staticFiles = [
      'index.html',
      'css/',
      'js/',
      'img/',
      'fiches/',
      'docs/',
      'LICENSE',
      'README.md',
      '.nojekyll'
    ];

    staticFiles.forEach(file => {
      const sourcePath = path.join(this.sourceDir, file);
      const destPath = path.join(this.ghPagesDir, file);
      
      if (fs.existsSync(sourcePath)) {
        if (fs.lstatSync(sourcePath).isDirectory()) {
          this.copyDirectory(sourcePath, destPath);
        } else {
          fs.copyFileSync(sourcePath, destPath);
        }
      }
    });
  }

  /**
   * Copie récursivement un répertoire
   */
  copyDirectory(source, destination) {
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    const files = fs.readdirSync(source);
    files.forEach(file => {
      const sourcePath = path.join(source, file);
      const destPath = path.join(destination, file);
      
      if (fs.lstatSync(sourcePath).isDirectory()) {
        this.copyDirectory(sourcePath, destPath);
      } else {
        fs.copyFileSync(sourcePath, destPath);
      }
    });
  }

  /**
   * Génère les versions HTML optimisées pour l'impression
   */
  generatePrintVersions() {
    console.log('🔄 Génération des versions HTML pour impression...');
    
    const printDir = path.join(this.ghPagesDir, 'print');
    fs.mkdirSync(printDir, { recursive: true });
    
    // Générer la version HTML pour impression de toutes les fiches
    const allFichesHtml = this.generateAllFichesHTMLForPrint();
    fs.writeFileSync(path.join(printDir, 'toutes-les-fiches-nsi.html'), allFichesHtml);
    console.log('✅ Version HTML combinée générée');
    
    // Générer les versions individuelles
    const fiches = this.getFichesList();
    fiches.forEach(fiche => {
      const html = this.generateSingleFicheHTMLForPrint(fiche);
      fs.writeFileSync(path.join(printDir, `${fiche.slug}.html`), html);
    });
    console.log(`✅ ${fiches.length} versions HTML individuelles générées`);
  }

  /**
   * Génère le HTML pour toutes les fiches avec instructions d'impression
   */
  generateAllFichesHTMLForPrint() {
    const fiches = this.getFichesList();
    const cssContent = this.loadCSSContent();
    
    const fichesHtml = fiches.map(fiche => {
      const content = this.loadFicheContent(fiche.filename);
      const visibleTitle = (fiche.title || '').replace('Fiche NSI – ', '');
      return `
        <section class="fiche">
          <header><h1>${visibleTitle}</h1></header>
          <article class="container">
            ${content}
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
        <title>Toutes les fiches NSI - Version Impression</title>
        <style>${cssContent}</style>
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

  /**
   * Génère le HTML pour une fiche individuelle avec instructions d'impression
   */
  generateSingleFicheHTMLForPrint(fiche) {
    const cssContent = this.loadCSSContent();
    const content = this.loadFicheContent(fiche.filename);
    const visibleTitle = (fiche.title || '').replace('Fiche NSI – ', '');
    
    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>${fiche.title} - Version Impression</title>
        <style>${cssContent}</style>
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
          <p>Utilisez Ctrl+P (ou Cmd+P sur Mac) pour imprimer cette fiche en PDF.</p>
          <p>Assurez-vous que "Arrière-plans" est activé dans les options d'impression.</p>
        </div>
        <main>
          <header><h1>${visibleTitle}</h1></header>
          <article class="container">
            ${content}
          </article>
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
   * Charge le contenu d'une fiche
   */
  loadFicheContent(filename) {
    try {
      const contentPath = path.join(this.sourceDir, 'content', filename);
      const content = fs.readFileSync(contentPath, 'utf8');
      
      // Extraire le contenu après le front-matter
      const contentMatch = content.match(/---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)/);
      if (contentMatch) {
        return contentMatch[2];
      }
      return content;
    } catch (error) {
      console.error(`Erreur lors du chargement de ${filename}:`, error.message);
      return '';
    }
  }

  /**
   * Charge le contenu CSS
   */
  loadCSSContent() {
    try {
      const cssPath = path.join(this.sourceDir, 'css/fiche-nsi.css');
      let css = fs.readFileSync(cssPath, 'utf8');
      
      // Corriger les chemins d'images
      css = css.replace('../img/fond2.png', '/img/fond2.png');
      
      return css;
    } catch (error) {
      console.error('Erreur lors du chargement du CSS:', error.message);
      return '';
    }
  }

  /**
   * Récupère la liste des fiches avec leurs métadonnées
   */
  getFichesList() {
    const contentDir = path.join(this.sourceDir, 'content');
    if (!fs.existsSync(contentDir)) return [];
    
    const files = fs.readdirSync(contentDir);
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const content = fs.readFileSync(path.join(contentDir, file), 'utf8');
        const titleMatch = content.match(/title:\s*"([^"]+)"/);
        const footerMatch = content.match(/footer:\s*"([^"]+)"/);
        
        return {
          slug: file.replace('.md', ''),
          filename: file,
          title: titleMatch ? titleMatch[1] : file.replace('.md', ''),
          footer: footerMatch ? footerMatch[1] : null
        };
      });
  }

  /**
   * Met à jour l'index.html avec les liens vers les versions d'impression
   */
  updateIndexWithPrintLinks() {
    console.log('🔗 Mise à jour des liens d\'impression...');
    
    const indexPath = path.join(this.ghPagesDir, 'index.html');
    if (!fs.existsSync(indexPath)) return;
    
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Ajouter les liens vers les versions d'impression
    const printSection = `
        <div class="print-section">
          <h2>📄 Versions d'impression</h2>
          <div class="print-links">
            <a href="/print/toutes-les-fiches-nsi.html" class="print-link" target="_blank">
              📚 Toutes les fiches (HTML pour impression)
            </a>
            <div class="individual-prints">
              <h3>Fiches individuelles :</h3>
              ${this.getFichesList().map(fiche => 
                `<a href="/print/${fiche.slug}.html" class="print-link" target="_blank">📄 ${fiche.slug.replace(/-/g, ' ')}</a>`
              ).join('')}
            </div>
          </div>
          <div class="print-info">
            <p><strong>💡 Astuce :</strong> Ouvrez ces pages dans votre navigateur et utilisez Ctrl+P (ou Cmd+P) pour les imprimer en PDF avec une qualité optimale.</p>
          </div>
        </div>`;
    
    // Insérer avant la fermeture de la div index-container
    indexContent = indexContent.replace(
      '</div>\n    </div>',
      `${printSection}\n    </div>\n    </div>`
    );
    
    fs.writeFileSync(indexPath, indexContent);
    console.log('✅ Index mis à jour avec les liens d\'impression');
  }

  /**
   * Ajoute des styles CSS pour la section d'impression
   */
  addPrintStyles() {
    console.log('🎨 Ajout des styles pour l\'impression...');
    
    const cssPath = path.join(this.ghPagesDir, 'css/index.css');
    if (!fs.existsSync(cssPath)) return;
    
    let cssContent = fs.readFileSync(cssPath, 'utf8');
    
    const printStyles = `
/* Styles pour la section d'impression */
.print-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--accent-bg);
  border-radius: 12px;
  border-left: 4px solid var(--python-blue);
}

.print-section h2 {
  color: var(--python-blue);
  margin-bottom: 1rem;
  font-family: 'Orbitron', sans-serif;
}

.print-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.print-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--python-blue);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-align: center;
  font-weight: 600;
}

.print-link:hover {
  background: #1e4a7a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(48, 105, 152, 0.3);
}

.individual-prints h3 {
  margin: 1rem 0 0.5rem 0;
  color: #333;
  font-size: 1rem;
}

.individual-prints {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
}

.individual-prints .print-link {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
}

.print-info {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 212, 59, 0.1);
  border-radius: 8px;
  border-left: 4px solid var(--python-yellow);
}

.print-info p {
  margin: 0;
  color: #555;
  font-size: 0.9rem;
}`;
    
    cssContent += printStyles;
    fs.writeFileSync(cssPath, cssContent);
    console.log('✅ Styles d\'impression ajoutés');
  }

  /**
   * Construit le site complet
   */
  async build() {
    try {
      console.log('🚀 Début de la construction du site GitHub Pages...\n');
      
      this.prepareBuildDirectory();
      this.copyStaticFiles();
      this.generatePrintVersions();
      this.updateIndexWithPrintLinks();
      this.addPrintStyles();
      
      console.log('\n✅ Construction terminée avec succès !');
      console.log(`📁 Site généré dans le répertoire : ${this.ghPagesDir}`);
      console.log('📄 Versions d\'impression HTML générées dans /print/');
      console.log('🌐 Pour déployer sur GitHub Pages :');
      console.log('   1. git add gh-pages/');
      console.log('   2. git commit -m "Update GitHub Pages"');
      console.log('   3. git subtree push --prefix gh-pages origin gh-pages');
      console.log('\n💡 Note: Les PDFs ne sont pas générés automatiquement dans cet environnement.');
      console.log('   Utilisez les versions HTML optimisées pour l\'impression avec Ctrl+P.');
      
    } catch (error) {
      console.error('\n❌ Erreur lors de la construction:', error.message);
      process.exit(1);
    }
  }
}

// Exécution du build
if (require.main === module) {
  const builder = new GitHubPagesBuilder();
  builder.build();
}

module.exports = GitHubPagesBuilder;