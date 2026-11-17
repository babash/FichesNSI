/*
 * Accueil des Fiches de révision NSI : la recherche.
 * Elle cherche dans le titre, le résumé, le thème et les mots-clés de chaque
 * fiche, sans tenir compte des accents ni des majuscules. Sans JavaScript,
 * toutes les fiches restent affichées.
 */
(function () {
  var champ = document.getElementById('recherche');
  var compte = document.getElementById('compte');
  var aucune = document.getElementById('aucune');
  if (!champ) return;

  var cartes = Array.prototype.slice.call(document.querySelectorAll('.carte'));
  var themes = Array.prototype.slice.call(document.querySelectorAll('.theme'));
  var niveaux = Array.prototype.slice.call(document.querySelectorAll('.niveau'));

  function normaliser(texte) {
    return texte.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  cartes.forEach(function (carte) {
    carte.cle = normaliser(carte.getAttribute('data-recherche') || carte.textContent);
  });

  function filtrer() {
    var mots = normaliser(champ.value).split(/\s+/).filter(Boolean);
    var visibles = 0;
    cartes.forEach(function (carte) {
      var ok = mots.every(function (m) { return carte.cle.indexOf(m) !== -1; });
      carte.hidden = !ok;
      if (ok) visibles++;
    });
    themes.forEach(function (t) { t.hidden = !t.querySelector('.carte:not([hidden])'); });
    niveaux.forEach(function (n) { n.hidden = !n.querySelector('.carte:not([hidden])'); });
    aucune.hidden = visibles !== 0;
    compte.textContent = mots.length
      ? visibles + (visibles > 1 ? ' fiches trouvées' : ' fiche trouvée')
      : cartes.length + ' fiches';
  }

  champ.addEventListener('input', filtrer);
  filtrer();
})();
