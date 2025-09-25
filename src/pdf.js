const { chromium } = require('playwright');

class PDFGenerator {
  constructor() {
    // Pas besoin d'initialisation pour html-pdf-node
  }

  /**
   * Initialise le générateur PDF
   */
  async init() {
    console.log('[PDF] Générateur PDF initialisé avec playwright.');
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
        </main>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
        <script>hljs.highlightAll();</script>
        <script>
        // Script pour répartir intelligemment les sections en deux colonnes
        document.addEventListener('DOMContentLoaded', function() {
          const container = document.querySelector('.container');
          const leftColumn = document.getElementById('column-left');
          const rightColumn = document.getElementById('column-right');
          
          // Récupérer toutes les sections
          const sections = Array.from(container.querySelectorAll('section'));
          
          // Répartir les sections de manière équilibrée
          let leftHeight = 0;
          let rightHeight = 0;
          
          sections.forEach((section, index) => {
            // Mesurer temporairement la section
            const tempDiv = document.createElement('div');
            tempDiv.style.position = 'absolute';
            tempDiv.style.visibility = 'hidden';
            tempDiv.appendChild(section.cloneNode(true));
            document.body.appendChild(tempDiv);
            const sectionHeight = tempDiv.scrollHeight;
            document.body.removeChild(tempDiv);
            
            // Ajouter la section à la colonne la plus courte
            if (leftHeight <= rightHeight) {
              leftColumn.appendChild(section);
              leftHeight += sectionHeight;
            } else {
              rightColumn.appendChild(section);
              rightHeight += sectionHeight;
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
  async generatePDF(url, filename, ficheFooter = null) {
    let browser = null;
    try {
      console.log(`[PDF] Génération de ${filename} depuis ${url}...`);
      
      const now = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
      const footerText = ficheFooter || 'Fiches de révision NSI';
      
      browser = await chromium.launch();
      const page = await browser.newPage();
      
      await page.goto(url, { waitUntil: 'networkidle' });
      
      const pdfBuffer = await page.pdf({
        format: 'A4',
        margin: {
          top: '6mm',
          right: '0mm',
          bottom: '8mm',
          left: '0mm'
        }
      });
      
      await browser.close();

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
      if (browser) {
        await browser.close();
      }
      console.error(`[PDF] Erreur lors de la génération de ${filename}:`, error);
      throw error;
    }
  }

  /**
   * Génère un PDF à partir d'un HTML brut (string) sans URL publique
   */
  async generatePDFFromHtml(html, filename, ficheFooter = null) {
    let browser = null;
    try {
      console.log(`[PDF] Génération (raw HTML) de ${filename}...`);

      browser = await chromium.launch();
      const page = await browser.newPage();
      
      await page.setContent(html, { waitUntil: 'networkidle' });
      
      const pdfBuffer = await page.pdf({
        format: 'A4',
        margin: {
          top: '6mm',
          right: '0mm',
          bottom: '8mm',
          left: '0mm'
        }
      });
      
      await browser.close();

      if (!pdfBuffer || pdfBuffer.length === 0) {
        throw new Error('Le PDF généré est vide');
      }
      const pdfHeader = pdfBuffer.slice(0, 4).toString();
      if (pdfHeader !== '%PDF') {
        console.error(`[PDF] En-tête invalide: ${pdfHeader}`);
        throw new Error('Le fichier généré n\'est pas un PDF valide');
      }

      console.log(`[PDF] ${filename} (raw HTML) généré avec succès (${pdfBuffer.length} bytes)`);
      return pdfBuffer;
    } catch (error) {
      if (browser) {
        await browser.close();
      }
      console.error(`[PDF] Erreur lors de la génération (raw HTML) de ${filename}:`, error);
      throw error;
    }
  }
}

module.exports = PDFGenerator;