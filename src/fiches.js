const fs = require('fs').promises;
const path = require('path');
const marked = require('marked');
const fm = require('front-matter');
const hljs = require('highlight.js/lib/core');

hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));

/**
 * Les niveaux, dans l'ordre de l'accueil et du PDF complet.
 * Une fiche peut avoir plusieurs niveaux (`niveau: [SNT, 1re]`) : elle est
 * rangée sous le premier.
 */
const NIVEAUX = {
  SNT: { ordre: 0, libelle: 'SNT et début de 1re NSI' },
  '1re': { ordre: 1, libelle: 'Première NSI' },
  Tle: { ordre: 2, libelle: 'Terminale NSI' },
};

/** Remet les caractères spéciaux d'un code écrit en HTML dans le Markdown. */
function decoder(texte) {
  return texte
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

function echapper(texte) {
  return texte.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Colore le code au moment de la génération (plus de highlight.js chargé par
 * le navigateur depuis un autre site) :
 * - `<pre><code class="language-python">` et `language-sql` sont colorés ;
 * - `<pre class="sortie">` (l'affichage du programme) reste en texte brut.
 * Chaque bloc reçoit `tabindex="0"` : il défile au clavier sur un petit écran.
 */
function colorer(html) {
  return html.replace(
    /<pre([^>]*)><code(?: class="language-(\w+)")?>([\s\S]*?)<\/code><\/pre>/g,
    (tout, attributs, langage, code) => {
      const brut = decoder(code);
      let corps;
      if (langage && hljs.getLanguage(langage)) {
        corps = hljs.highlight(brut, { language: langage, ignoreIllegals: true }).value;
      } else {
        corps = echapper(brut);
      }
      const classeLangage = langage ? ` class="hljs language-${langage}"` : '';
      const attrs = /class="/.test(attributs)
        ? attributs
        : `${attributs} class="${langage ? 'code' : 'sortie'}"`;
      return `<pre${attrs} tabindex="0"${langage ? ` data-langage="${langage}"` : ''}><code${classeLangage}>${corps}</code></pre>`;
    }
  );
}

/**
 * Typographie française : une espace insécable après « et avant », et avant
 * : ; ? ! (hors des blocs de code, mis de côté avant l'appel). Ainsi un
 * guillemet ou un deux-points ne se retrouve jamais seul en début de ligne.
 */
const INSECABLE = String.fromCharCode(0xa0);
function espacesInsecables(texte) {
  return texte
    .replace(/« /g, '«' + INSECABLE)
    .replace(/ »/g, INSECABLE + '»')
    .replace(/ ([:;?!])(?=[\s<])/g, INSECABLE + '$1');
}

/** Une valeur du front matter, toujours sous forme de liste. */
function liste(valeur) {
  if (valeur === undefined || valeur === null || valeur === '') return [];
  return Array.isArray(valeur) ? valeur.map(String) : [String(valeur)];
}

class FichesManager {
  constructor() {
    this.fiches = new Map();
  }

  /**
   * Charge toutes les fiches depuis le dossier content
   */
  async loadContent() {
    const contentDir = path.join(__dirname, '../content');
    const files = (await fs.readdir(contentDir)).sort();

    for (const file of files) {
      if (path.extname(file) === '.md') {
        await this.loadFiche(contentDir, file);
      }
    }

    console.log(`[INFO] ${this.fiches.size} fiche(s) chargée(s) avec succès`);
  }

  /**
   * Charge une fiche individuelle
   */
  async loadFiche(contentDir, file) {
    const filePath = path.join(contentDir, file);
    const data = await fs.readFile(filePath, 'utf8');
    const page = fm(data);
    const a = page.attributes;
    const slug = path.basename(file, '.md');
    // Les blocs <pre> sont mis de côté pendant la conversion du Markdown : une
    // ligne vide dans un code ne doit pas couper le bloc HTML (marked y
    // ajouterait des paragraphes).
    const blocsPre = [];
    const corpsProtege = page.body.replace(/<pre[\s\S]*?<\/pre>/g, (bloc) => {
      blocsPre.push(bloc);
      return `<!--pre-${blocsPre.length - 1}-->`;
    });
    const html = marked.parse(espacesInsecables(corpsProtege)).replace(/<!--pre-(\d+)-->/g, (t, i) => blocsPre[Number(i)]);
    const title = a.title || 'Titre manquant';
    const niveaux = liste(a.niveau).filter((n) => NIVEAUX[n]);

    this.fiches.set(slug, {
      slug,
      title,
      // Le titre affiché sur la fiche, sans le préfixe « Fiche NSI – ».
      titre: title.replace(/^Fiche NSI – /, ''),
      niveaux: niveaux.length ? niveaux : ['1re'],
      theme: a.theme || 'Autres fiches',
      programme: liste(a.programme),
      ordre: Number(a.ordre) || 999,
      resume: a.resume || '',
      // Fiche « remplie » : elle occupe exactement la page A4 (voir fiche-nsi.css).
      remplie: a.remplie === true,
      motsCles: liste(a.mots_cles),
      footer: a.footer || '',
      content: colorer(html),
    });

    console.log(`[OK] Fiche chargée : ${slug}`);
  }

  getFiche(slug) {
    return this.fiches.get(slug);
  }

  getAllFiches() {
    return Array.from(this.fiches.values());
  }

  /**
   * Les fiches dans l'ordre de l'accueil et du PDF complet : par niveau, puis
   * par numéro d'ordre (qui suit la progression du programme), puis par titre.
   */
  getAllFichesSorted() {
    return this.getAllFiches().sort((a, b) =>
      NIVEAUX[a.niveaux[0]].ordre - NIVEAUX[b.niveaux[0]].ordre ||
      a.ordre - b.ordre ||
      a.titre.localeCompare(b.titre, 'fr'));
  }

  /** La fiche précédente et la suivante, dans l'ordre de l'accueil. */
  voisines(slug) {
    const toutes = this.getAllFichesSorted();
    const i = toutes.findIndex((f) => f.slug === slug);
    return { precedente: toutes[i - 1] || null, suivante: toutes[i + 1] || null };
  }

  /** Les fiches regroupées par niveau, puis par thème (dans l'ordre d'apparition). */
  parNiveau() {
    const groupes = [];
    for (const fiche of this.getAllFichesSorted()) {
      const cle = fiche.niveaux[0];
      let groupe = groupes.find((g) => g.niveau === cle);
      if (!groupe) {
        groupe = { niveau: cle, libelle: NIVEAUX[cle].libelle, themes: [] };
        groupes.push(groupe);
      }
      let theme = groupe.themes.find((t) => t.libelle === fiche.theme);
      if (!theme) {
        theme = { libelle: fiche.theme, fiches: [] };
        groupe.themes.push(theme);
      }
      theme.fiches.push(fiche);
    }
    return groupes;
  }
}

FichesManager.NIVEAUX = NIVEAUX;
module.exports = FichesManager;
