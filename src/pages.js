/**
 * Les pages HTML du site, écrites une seule fois pour le serveur local
 * (`npm start`) et pour le site statique (`npm run build`) :
 * - l'accueil, classé par niveau et par thème, avec une recherche ;
 * - la page web d'une fiche, avec la navigation entre les fiches ;
 * - les pages qui servent à fabriquer les PDF (une fiche, ou toutes).
 *
 * Aucune ressource n'est chargée depuis un autre site : polices, styles et
 * scripts sont dans le dossier `public/`, et le code est coloré à la génération.
 */

const DEPOT = 'https://github.com/babash/FichesNSI';
const LICENCE = 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr';
const SITE_RESSOURCES = 'https://babash.github.io/Babash-NSI-SNT/';

const ICONE_PDF = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icone" aria-hidden="true" focusable="false"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';
const ICONE_GITHUB = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icone" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';

const MENTION = '« Fiches de révision NSI » · Babash - NSI Tani Malandi · licence CC BY-SA 4.0';

function attr(texte) {
  return String(texte).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/** Le niveau d'une fiche en clair : « SNT et 1re », « Terminale »… */
function niveauEnClair(fiche) {
  const noms = { SNT: 'SNT', '1re': '1re NSI', Tle: 'Terminale NSI' };
  return fiche.niveaux.map((n) => noms[n]).join(' · ');
}

/** L'en-tête d'une fiche : son titre et une ligne « niveau · thème ». */
function enTete(fiche) {
  return `<header class="fiche-entete">
      <p class="fiche-niveau">${niveauEnClair(fiche)} · ${fiche.theme}</p>
      <h1>${fiche.titre}</h1>
    </header>`;
}

/** Le corps d'une fiche, le même à l'écran et dans les PDF. */
function corps(fiche) {
  return `<article class="fiche-corps">
${fiche.content}
    </article>`;
}

function pied(prefixe) {
  return `<footer class="pied">
    <p>« Fiches de révision NSI » par Babash - NSI Tani Malandi, sous licence <a href="${LICENCE}" rel="license">CC BY-SA 4.0</a> · <a href="${DEPOT}" class="lien-icone">${ICONE_GITHUB}<span>Code source sur GitHub</span></a></p>
    <p>Toutes les ressources de NSI et de SNT : <a href="${SITE_RESSOURCES}">Ressources NSI et SNT</a>.</p>
  </footer>`;
}

/**
 * La page web d'une fiche.
 * @param prefixe chemin vers la racine du site ('../../' pour le site statique)
 */
function pageFiche(fiche, voisines, prefixe) {
  const { precedente, suivante } = voisines;
  const lien = (f) => `${prefixe}fiches/${f.slug}/`;
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${fiche.titre} · Fiches de révision NSI</title>
  <meta name="description" content="${attr(fiche.resume || fiche.titre)}">
  <link rel="icon" href="${prefixe}img/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${prefixe}css/fiche-nsi.css">
</head>
<body class="ecran">
  <a class="evitement" href="#contenu">Aller à la fiche</a>
  <nav class="barre" aria-label="Navigation">
    <a href="${prefixe}" class="bouton">← Toutes les fiches</a>
    <a href="${prefixe}fiches/${fiche.slug}.pdf" class="bouton" download>${ICONE_PDF}<span>PDF A4</span></a>
  </nav>
  <main id="contenu" class="fiche">
    ${enTete(fiche)}
    ${corps(fiche)}
  </main>
  <nav class="voisines" aria-label="Fiches voisines">
    ${precedente ? `<a href="${lien(precedente)}" rel="prev"><span class="sens">← Fiche précédente</span>${precedente.titre}</a>` : '<span></span>'}
    ${suivante ? `<a href="${lien(suivante)}" rel="next" class="suivante"><span class="sens">Fiche suivante →</span>${suivante.titre}</a>` : '<span></span>'}
  </nav>
  ${pied(prefixe)}
  <script>
    // À l'impression depuis le navigateur, la réponse de l'exercice éclair est dépliée.
    window.addEventListener('beforeprint', function () {
      document.querySelectorAll('details.reponse').forEach(function (d) { d.open = true; });
    });
  </script>
</body>
</html>
`;
}

/**
 * La page d'accueil : les fiches par niveau et par thème, une recherche.
 * Sans JavaScript, la liste complète reste affichée.
 */
function pageAccueil(groupes, prefixe, horodatage, liens) {
  const lienFiche = liens && liens.fiche ? liens.fiche : (f) => `${prefixe}fiches/${f.slug}/`;
  const lienPdf = liens && liens.pdf ? liens.pdf : (f) => `${prefixe}fiches/${f.slug}.pdf`;
  const lienTout = liens && liens.tout ? liens.tout : `${prefixe}fiches/all.pdf`;
  const total = groupes.reduce((n, g) => n + g.themes.reduce((m, t) => m + t.fiches.length, 0), 0);

  const carte = (f) => {
    const recherche = [f.titre, f.theme, f.resume, ...f.motsCles, ...f.niveaux].join(' ');
    return `<li class="carte" data-recherche="${attr(recherche)}">
            <a class="carte-titre" href="${lienFiche(f)}">${f.titre}</a>
            ${f.resume ? `<p class="carte-resume">${f.resume}</p>` : ''}
            <p class="carte-liens"><span class="carte-niveau">${niveauEnClair(f)}</span>
              <a class="carte-pdf" href="${lienPdf(f)}" download aria-label="${attr(`PDF de la fiche ${f.titre}`)}">${ICONE_PDF}<span>PDF</span></a></p>
          </li>`;
  };

  const sections = groupes.map((g) => `
      <section class="niveau niveau-${g.niveau.toLowerCase()}" aria-labelledby="niveau-${g.niveau}">
        <h2 id="niveau-${g.niveau}">${g.libelle}</h2>
        ${g.themes.map((t) => `<div class="theme">
          <h3>${t.libelle}</h3>
          <ul class="cartes">
          ${t.fiches.map(carte).join('\n          ')}
          </ul>
        </div>`).join('\n        ')}
      </section>`).join('\n');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Fiches de révision NSI</title>
  <meta name="description" content="Une fiche A4 par notion de NSI et de SNT : l'essentiel, un exemple de code exécuté, les erreurs fréquentes, à retenir et un exercice éclair.">
  <link rel="icon" href="${prefixe}img/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${prefixe}css/fiche-nsi.css">
  <link rel="stylesheet" href="${prefixe}css/index.css">
</head>
<body class="ecran accueil">
  <a class="evitement" href="#fiches">Aller aux fiches</a>
  <header class="accueil-entete">
    <h1>Fiches de révision NSI</h1>
    <p class="accroche">Une page A4 par notion : l'essentiel, un exemple de code exécuté, les erreurs fréquentes, à retenir et un exercice éclair. À lire en ligne ou à imprimer.</p>
    <div class="outils">
      <label for="recherche" class="visuellement-cache">Rechercher une fiche</label>
      <input type="search" id="recherche" placeholder="Rechercher : boucle, dictionnaire, SQL, récursivité…" autocomplete="off">
      <a href="${lienTout}" class="bouton bouton-plein" download>${ICONE_PDF}<span>Toutes les fiches (PDF, ${total} pages)</span></a>
    </div>
    <p class="compte" id="compte" aria-live="polite"></p>
  </header>
  <main id="fiches">
${sections}
    <p class="aucune" id="aucune" hidden>Aucune fiche ne correspond. Essaie un autre mot (par exemple « liste », « tri », « réseau »).</p>
  </main>
  ${pied(prefixe)}
  ${horodatage ? `<p class="horodatage">Dernière mise à jour : ${horodatage}</p>` : ''}
  <script src="${prefixe}js/index.js"></script>
</body>
</html>
`;
}

/** Une fiche telle qu'elle est mise en page dans un PDF. */
function fichePdf(fiche) {
  return `<section class="fiche fiche-pdf" data-slug="${fiche.slug}">
      <div class="zoom">
      ${enTete(fiche)}
      ${corps(fiche)}
      </div>
    </section>`;
}

/**
 * Script des pages qui servent à fabriquer les PDF : une fois les polices
 * chargées, il vérifie que chaque fiche tient sur sa page. Si une fiche est
 * trop haute, son contenu est réduit (au plus jusqu'à 85 %) et la page le
 * signale (`data-zoom`) : la vérification de la génération l'affiche.
 */
function scriptPdf(hauteurUtile) {
  return `<script>
  (function () {
    var HAUTEUR = ${hauteurUtile};
    var ZOOM_MIN = 0.85;
    // Les encadrés remplissent la colonne de gauche, puis celle de droite
    // (column-fill: auto, hauteur fixe). Une fiche trop longue crée une
    // troisième colonne, hors de la page : on la détecte par la largeur.
    function deborde(corps) { return corps.scrollWidth > corps.clientWidth + 1; }
    function ajuster(fiche) {
      var interieur = fiche.querySelector('.zoom');
      var corps = fiche.querySelector('.fiche-corps');
      var zoom = 1;
      interieur.style.height = HAUTEUR + 'px';
      while (deborde(corps) && zoom > ZOOM_MIN) {
        zoom = Math.round((zoom - 0.01) * 100) / 100;
        interieur.style.zoom = zoom;
        interieur.style.height = (HAUTEUR / zoom) + 'px';
      }
      // Hauteur occupée : le bas du plus bas des encadrés.
      var bas = 0;
      var haut = interieur.getBoundingClientRect().top;
      Array.prototype.forEach.call(corps.children, function (s) {
        bas = Math.max(bas, s.getBoundingClientRect().bottom - haut);
      });
      fiche.setAttribute('data-zoom', zoom);
      fiche.setAttribute('data-hauteur', Math.round(bas));
      if (deborde(corps)) fiche.setAttribute('data-deborde', 'oui');
    }
    function fin() {
      Array.prototype.forEach.call(document.querySelectorAll('details'), function (d) { d.open = true; });
      Array.prototype.forEach.call(document.querySelectorAll('.fiche-pdf'), ajuster);
      document.body.setAttribute('data-pret', 'oui');
    }
    var polices = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    polices.then(fin);
  })();
  </script>`;
}

/**
 * Hauteur disponible pour une fiche dans une page A4, en px CSS (96 px par
 * pouce) : 297 mm, moins 7 mm de marge en haut et 17 mm en bas, où la mention
 * de l'auteur et de la licence est écrite à 10 mm du bord.
 */
const HAUTEUR_UTILE_PX = Math.floor((297 - 7 - 17) * 96 / 25.4);

function pagePdf(fiches, titre) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>${titre}</title>
  <link rel="stylesheet" href="/css/fiche-nsi.css">
  <style>@page { size: A4; margin: 0; }</style>
</head>
<body class="pdf">
  <div class="pdf-mention">${MENTION}</div>
  ${fiches.map(fichePdf).join('\n  ')}
  ${scriptPdf(HAUTEUR_UTILE_PX)}
</body>
</html>
`;
}

module.exports = { pageFiche, pageAccueil, pagePdf, HAUTEUR_UTILE_PX, MENTION };
