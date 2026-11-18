/**
 * Vérifie que chaque fiche de `content/` suit le gabarit commun :
 * - en-tête : title, niveau (SNT, 1re ou Tle), theme, ordre, resume ;
 * - encadrés obligatoires, dans l'ordre : essentiel, erreurs, retenir, eclair ;
 * - une réponse repliée dans l'exercice éclair ;
 * - aucune ressource chargée d'un autre site (src="http…", url(http…), <script>).
 *
 * Usage : node scripts/verifier-fiches.js   (lancé par `npm test`)
 */
const fs = require('fs');
const path = require('path');
const fm = require('front-matter');

const dossier = path.join(__dirname, '../content');
const NIVEAUX = ['SNT', '1re', 'Tle'];
const OBLIGATOIRES = ['essentiel', 'erreurs', 'retenir', 'eclair'];
let erreurs = 0;

function signaler(fichier, message) {
  console.error(`ÉCHEC ${fichier} : ${message}`);
  erreurs++;
}

const fichiers = fs.readdirSync(dossier).filter((f) => f.endsWith('.md')).sort();
const ordres = new Map();

for (const fichier of fichiers) {
  const texte = fs.readFileSync(path.join(dossier, fichier), 'utf8');
  const { attributes: a, body } = fm(texte);
  for (const champ of ['title', 'niveau', 'theme', 'ordre', 'resume']) {
    if (a[champ] === undefined || a[champ] === '') signaler(fichier, `champ « ${champ} » manquant`);
  }
  const niveaux = Array.isArray(a.niveau) ? a.niveau : [a.niveau];
  for (const n of niveaux) {
    if (!NIVEAUX.includes(String(n))) signaler(fichier, `niveau inconnu : ${n}`);
  }
  const cle = `${niveaux[0]}-${a.ordre}`;
  if (ordres.has(cle)) signaler(fichier, `même ordre que ${ordres.get(cle)} (${cle})`);
  ordres.set(cle, fichier);

  const classes = [...body.matchAll(/<section(?: class="([^"]*)")?>/g)].map((m) => m[1] || '');
  let position = -1;
  for (const type of OBLIGATOIRES) {
    const i = classes.indexOf(type);
    if (i === -1) signaler(fichier, `encadré « ${type} » manquant`);
    else if (i < position) signaler(fichier, `encadré « ${type} » mal placé`);
    else position = i;
  }
  if (!/<details class="reponse">/.test(body)) signaler(fichier, 'exercice éclair sans réponse repliée');
  if (/<script/i.test(body)) signaler(fichier, 'balise <script> interdite');
  if (/(src|href)="\/\//.test(body) || /src="https?:/.test(body) || /url\(\s*['"]?https?:/.test(body)) {
    signaler(fichier, 'ressource chargée depuis un autre site');
  }
  if (/data-icon=/.test(body)) signaler(fichier, 'icône émoji (data-icon) : invisible dans les PDF');
}

console.log(`${fichiers.length} fiches vérifiées, ${erreurs} échec(s)`);
process.exit(erreurs ? 1 : 0);
