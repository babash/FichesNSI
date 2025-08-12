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
    
    // Générer un index.html personnalisé
    this.generateCustomIndex();
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
   * Génère un index.html personnalisé avec les liens d'impression
   */
  generateCustomIndex() {
    console.log('📝 Génération de l\'index.html personnalisé...');
    
    const fiches = this.getFichesList();
    const currentDate = new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const indexHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accueil - Fiches de révision NSI</title>
    <link rel="stylesheet" href="css/fiche-nsi.css">
    <link rel="stylesheet" href="css/index.css">
</head>
<body>
    <div class="index-container">
        <h1>Fiches de révision NSI</h1>

        <div class="search-container">
            <input type="text" id="search-bar" placeholder="Rechercher une fiche par titre...">
        </div>

        <div class="list-header" id="toggle-fiches" title="Cliquer pour afficher/masquer la liste">
            <h2>Liste des fiches disponibles</h2>
            <a href="print/toutes-les-fiches-nsi.html" class="download-all-link" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>📚 Toutes les fiches (HTML pour impression)</span>
            </a>
        </div>

        <ul class="fiche-list" id="fiches-list">
            ${fiches.map(fiche => `
                <li>
                    <a href="fiches/${fiche.slug}.html" class="fiche-name">${fiche.title}</a>
                    <a href="print/${fiche.slug}.html" class="download-link" target="_blank" title="Version HTML pour impression">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    </a>
                </li>
            `).join('')}
        </ul>

        <div class="print-section">
          <h2>📄 Versions d'impression</h2>
          <div class="print-links">
            <a href="print/toutes-les-fiches-nsi.html" class="print-link" target="_blank">
              📚 Toutes les fiches (HTML pour impression)
            </a>
            <div class="individual-prints">
              <h3>Fiches individuelles :</h3>
              ${fiches.map(fiche => 
                `<a href="print/${fiche.slug}.html" class="print-link" target="_blank">📄 ${fiche.slug.replace(/-/g, ' ')}</a>`
              ).join('')}
            </div>
          </div>
          <div class="print-info">
            <p><strong>💡 Astuce :</strong> Ouvrez ces pages dans votre navigateur et utilisez Ctrl+P (ou Cmd+P sur Mac) pour les imprimer en PDF avec une qualité optimale.</p>
          </div>
        </div>

        <footer class="index-footer">
            <div class="footer-license">
                <span>« Fiches de révision NSI » par <a href="https://github.com/babash" target="_blank" rel="noopener noreferrer">babash</a> est placé sous la licence <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.fr" target="_blank" rel="license">CC0 1.0</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" class="license-icon" alt="Creative Commons"><img src="https://mirrors.creativecommons.org/presskit/icons/zero.svg" class="license-icon" alt="Zero"></span>
            </div>
            <div class="footer-project">
                <a href="https://github.com/babash/fiches-nsi" target="_blank" rel="noopener noreferrer" class="footer-link-item" title="Voir le projet sur GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                    <span>Projet sur GitHub</span>
                </a>
            </div>
            <div class="last-updated" style="margin-top:6px;color:#777;font-size:0.85rem;text-align:center">Dernière mise à jour: ${currentDate}</div>
        </footer>
    </div>
    <script src="js/index.js"></script>
</body>
</html>`;
    
    fs.writeFileSync(path.join(this.ghPagesDir, 'index.html'), indexHtml);
    console.log('✅ Index.html personnalisé généré');
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