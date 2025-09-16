const htmlPdf = require('html-pdf-node');

class PDFGenerator {
  constructor() {
    // Pas besoin d'initialisation pour html-pdf-node
  }

  /**
   * Initialise le générateur PDF
   */
  async init() {
    console.log('[PDF] Générateur PDF initialisé avec html-pdf-node.');
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
              <div class="column" id="column-left">
                <!-- Le contenu sera réparti dynamiquement entre les colonnes -->
              </div>
              <div class="column" id="column-right">
                <!-- Le contenu sera réparti dynamiquement entre les colonnes -->
              </div>
            </div>
            ${fiche.content}
          </article>
          ${fiche.footer ? `<div class="footnote">${fiche.footer}</div>` : ''}
        </main>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
        <script>hljs.highlightAll();</script>
        <script>
        // Script pour répartir automatiquement les sections en deux colonnes
        document.addEventListener('DOMContentLoaded', function() {
          const container = document.querySelector('.container');
          const leftColumn = document.getElementById('column-left');
          const rightColumn = document.getElementById('column-right');
          
          // Récupérer toutes les sections
          const sections = container.querySelectorAll('section');
          
          // Répartir les sections alternativement entre les deux colonnes
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
  async generatePDF(url, filename) {
    try {
      console.log(`[PDF] Génération de ${filename} depuis ${url}...`);
      
      const options = {
        format: 'A4',
        printBackground: true,
        margin: {
          top: '0mm',
          right: '0mm',
          bottom: '0mm',
          left: '0mm'
        },
        displayHeaderFooter: false,
        timeout: 60000, // Timeout augmenté pour laisser le temps au JS de s'exécuter
        waitUntil: 'networkidle0', // Attendre que le réseau soit inactif
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      };

      const pdfBuffer = await htmlPdf.generatePdf({ url }, options);

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
      console.error(`[PDF] Erreur lors de la génération de ${filename}:`, error);
      throw error;
    }
  }
}

module.exports = PDFGenerator;