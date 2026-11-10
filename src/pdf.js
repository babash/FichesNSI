const htmlPdf = require('html-pdf-node');

/**
 * Hauteur utile d'une page A4 des PDF, en px CSS (96 px par pouce) : 297 mm, moins
 * 4 mm laissés libres en bas pour la mention de l'auteur et de la licence.
 * Les pages n'ont pas de marge : la règle `@page { margin: 0 }` de fiche-nsi.css
 * l'emporte sur les marges passées à Puppeteer (vérifié avec Chromium 88 et 153).
 */
const HAUTEUR_UTILE_PX = Math.floor((297 - 4) * 96 / 25.4);

/**
 * Styles propres aux pages qui servent à fabriquer les PDF.
 *
 * - La mention de l'auteur et de la licence est écrite dans la page elle-même
 *   (position: fixed, répétée sur chaque page imprimée, comme l'image de fond).
 * - Pas de hauteur minimale : `.container` (297 mm) et `body` (100vh), prévus pour
 *   l'écran, dépassaient la page utile et ajoutaient une page vide à chaque PDF.
 * - Le code va à la ligne : sur papier, une ligne trop longue était coupée à droite.
 *
 * Ces règles ne dépendent pas du média, pour que la mesure faite au chargement
 * (média screen) soit celle de l'impression.
 */
const STYLE_PDF = `
        <style>
          body, .container { min-height: 0; }
          pre, pre code { white-space: pre-wrap; overflow-wrap: anywhere; }
          .fiche { break-after: page; page-break-after: always; }
          .fiche:last-child { break-after: auto; page-break-after: auto; }
          .pdf-mention {
            position: fixed;
            right: 4mm;
            bottom: 0.8mm;
            z-index: 10;
            padding: 0.2mm 1.2mm;
            background: rgba(255, 255, 255, 0.85);
            color: #495057;
            font-family: 'Lato', sans-serif;
            font-size: 6pt;
            line-height: 1.2;
            white-space: nowrap;
          }
        </style>`;
const MENTION_LICENCE = `<div class="pdf-mention">« Fiches de révision NSI » · Babash - NSI Tani Malandi · licence CC BY-SA 4.0</div>`;

/**
 * Script des pages qui servent à fabriquer les PDF.
 *
 * 1. Répartit les sections d'une fiche entre ses deux colonnes, chaque section
 *    allant dans la colonne la plus courte.
 * 2. Une fois les polices chargées, réduit la fiche (zoom de son contenu) si elle
 *    est plus haute que la page utile : chaque fiche tient sur une page A4, sans
 *    rien couper. La hauteur est mesurée sur un parent non zoomé.
 */
const SCRIPT_PDF = `
        <script>
        (function () {
          var HAUTEUR_UTILE = ${HAUTEUR_UTILE_PX};
          var ZOOM_MIN = 0.7;

          function repartir(fiche) {
            var container = fiche.querySelector('.container');
            var gauche = fiche.querySelector('.column[id^="column-left"]');
            var droite = fiche.querySelector('.column[id^="column-right"]');
            if (!container || !gauche || !droite) return;
            var sections = Array.prototype.slice.call(container.querySelectorAll('section'));
            var hGauche = 0;
            var hDroite = 0;
            sections.forEach(function (section) {
              // Mesurer la section à part
              var temp = document.createElement('div');
              temp.style.position = 'absolute';
              temp.style.visibility = 'hidden';
              temp.appendChild(section.cloneNode(true));
              document.body.appendChild(temp);
              var h = temp.scrollHeight;
              document.body.removeChild(temp);
              // L'ajouter à la colonne la plus courte
              if (hGauche <= hDroite) {
                gauche.appendChild(section);
                hGauche += h;
              } else {
                droite.appendChild(section);
                hDroite += h;
              }
            });
          }

          function ajuster(fiche) {
            var container = fiche.querySelector('.container');
            if (!container) return;
            var zoom = 1;
            while (fiche.getBoundingClientRect().height > HAUTEUR_UTILE && zoom > ZOOM_MIN) {
              zoom = Math.round((zoom - 0.01) * 100) / 100;
              container.style.zoom = zoom;
            }
            if (fiche.getBoundingClientRect().height > HAUTEUR_UTILE) {
              console.warn('[PDF] Fiche trop longue pour une page, même réduite : ' + (fiche.dataset.slug || ''));
            }
          }

          document.addEventListener('DOMContentLoaded', function () {
            var fiches = document.querySelectorAll('.fiche-pdf');
            Array.prototype.forEach.call(fiches, repartir);
            var polices = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
            polices.then(function () {
              Array.prototype.forEach.call(fiches, ajuster);
            });
          });
        })();
        </script>`;

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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-light.min.css">${STYLE_PDF}
      </head>
      <body>
        ${MENTION_LICENCE}
        <main class="fiche-pdf" data-slug="${fiche.slug}">
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
        <script>hljs.highlightAll();</script>${SCRIPT_PDF}
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
        <section class="fiche fiche-pdf" data-slug="${fiche.slug}">
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
        </section>`;
    }).join('');

    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Toutes les fiches NSI</title>
        <link rel="stylesheet" href="/css/fiche-nsi.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-light.min.css">${STYLE_PDF}
      </head>
      <body>
        ${MENTION_LICENCE}
        <main class="wrapper">${fichesHtml}
        </main>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
        <script>hljs.highlightAll();</script>${SCRIPT_PDF}
      </body>
      </html>`;
  }

  /**
   * Génère un PDF depuis une URL
   */
  async generatePDF(url, filename) {
    try {
      console.log(`[PDF] Génération de ${filename} depuis ${url}...`);

      // Pas de pied de page de Puppeteer (footerTemplate) : l'image de fond le
      // recouvrait, et l'auteur et la licence sont écrits dans la page (MENTION_LICENCE).
      const options = {
        format: 'A4',
        printBackground: true,
        // Sans effet : la règle `@page { margin: 0 }` de fiche-nsi.css l'emporte.
        margin: {
          top: '6mm',
          right: '0mm',
          bottom: '8mm',
          left: '0mm'
        },
        displayHeaderFooter: false,
        timeout: 60000, // Timeout augmenté pour laisser le temps au JS de s'exécuter
        waitUntil: 'networkidle0', // Attendre que le réseau soit inactif
        preferCSSPageSize: false, // Ignorer les marges CSS @page
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
          '--run-all-compositor-stages-before-draw',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding'
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