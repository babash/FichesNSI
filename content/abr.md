---
title: "Fiche NSI – Les arbres binaires de recherche"
niveau: Tle
theme: "Algorithmique"
programme: nsi-tle-2019.algorithmique.arbres-binaires
ordre: 50
resume: "La propriété d'un ABR, la recherche et l'insertion d'une clé, le parcours infixe trié, le coût lié à la hauteur."
mots_cles: [ABR, arbre binaire de recherche, clé, recherche, insertion, parcours infixe, hauteur, équilibré, filiforme, coût]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Un <strong>arbre binaire de recherche</strong> (ABR) est un arbre binaire où, pour <strong>chaque</strong> nœud :</p>
<ul>
<li>toutes les clés du sous-arbre <strong>gauche</strong> sont <strong>plus petites</strong> que la clé du nœud ;</li>
<li>toutes les clés du sous-arbre <strong>droit</strong> sont <strong>plus grandes</strong>.</li>
</ul>
<p>Conséquences : le <strong>parcours infixe</strong> donne les clés dans l'ordre croissant ; pour chercher une clé, on descend à gauche ou à droite, sans explorer tout l'arbre. Une recherche fait au plus <em>h</em> + 1 comparaisons, où <em>h</em> est la <strong>hauteur</strong> : <em>h</em> vaut environ log<sub>2</sub>(<em>n</em>) si l'arbre est équilibré, mais <em>n</em> − 1 s'il est filiforme (une seule branche).</p>
<p><strong>Convention</strong> : un arbre réduit à un nœud a une hauteur 0 (l'arbre dessiné a une hauteur 2) ; d'autres sujets prennent 1 : un énoncé doit toujours la préciser.</p>
<svg class="schema" viewBox="0 0 230 120" width="230" height="120" role="img" aria-label="ABR : racine 12 ; à gauche 5, qui a pour enfants 2 et 9 ; à droite 18, qui a pour enfant gauche 15.">
<g stroke="#306998" stroke-width="1.5"><line x1="115" y1="18" x2="60" y2="58"/><line x1="115" y1="18" x2="170" y2="58"/><line x1="60" y1="58" x2="30" y2="100"/><line x1="60" y1="58" x2="90" y2="100"/><line x1="170" y1="58" x2="140" y2="100"/></g>
<g fill="#fff" stroke="#306998" stroke-width="1.5"><circle cx="115" cy="18" r="13"/><circle cx="60" cy="58" r="13"/><circle cx="170" cy="58" r="13"/><circle cx="30" cy="100" r="13"/><circle cx="90" cy="100" r="13"/><circle cx="140" cy="100" r="13"/></g>
<g font-family="Lato, Arial, sans-serif" font-size="12" font-weight="700" text-anchor="middle" fill="#1f2328"><text x="115" y="22">12</text><text x="60" y="62">5</text><text x="170" y="62">18</text><text x="30" y="104">2</text><text x="90" y="104">9</text><text x="140" y="104">15</text></g>
</svg>
</section>

<section class="exemple">
<h2>Recherche</h2>
<pre><code class="language-python">class Noeud:
    def __init__(self, valeur, gauche=None, droit=None):
        self.valeur = valeur
        self.gauche = gauche
        self.droit = droit

def rechercher(a, v):
    if a is None:
        return False
    if v == a.valeur:
        return True
    if v &lt; a.valeur:
        return rechercher(a.gauche, v)
    return rechercher(a.droit, v)
</code></pre>
<p>Chercher 9 : 9 &lt; 12, à gauche ; 9 > 5, à droite ; trouvé en 3 comparaisons.</p>
</section>

<section class="exemple">
<h2>Insertion</h2>
<pre data-suite><code class="language-python">def inserer(a, v):     # renvoie la racine
    if a is None:
        return Noeud(v)
    if v &lt; a.valeur:
        a.gauche = inserer(a.gauche, v)
    else:
        a.droit = inserer(a.droit, v)
    return a

def infixe(a):
    if a is None:
        return []
    return infixe(a.gauche) + [a.valeur] + infixe(a.droit)

abr = None
for v in [12, 5, 18, 2, 9, 15]:
    abr = inserer(abr, v)
print(rechercher(abr, 9), rechercher(abr, 10))
print(infixe(abr))
</code></pre>
<pre class="sortie"><code>True False
[2, 5, 9, 12, 15, 18]
</code></pre>
<p>La nouvelle clé devient toujours une <strong>feuille</strong>, à l'endroit où la recherche s'arrête.</p>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Vérifier la propriété avec les seuls enfants directs : si 5 avait un enfant droit 14, on aurait 14 > 5, mais 14 serait dans le sous-arbre gauche de 12 : ce n'est plus un ABR.</li>
<li>Insérer des clés déjà triées (2, 5, 9, 12…) : l'arbre devient filiforme et la recherche coûte autant qu'un parcours séquentiel.</li>
<li>Oublier de ranger le résultat : écrire <code>inserer(abr, v)</code> au lieu de <code>abr = inserer(abr, v)</code> perd l'arbre quand il est vide.</li>
</ul>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>À gauche plus petit, à droite plus grand, pour <strong>tous</strong> les nœuds des sous-arbres.</li>
<li>Recherche et insertion : on descend d'un seul côté à chaque nœud.</li>
<li>Coût : au plus hauteur + 1 comparaisons.</li>
<li>Parcours infixe = clés triées.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Dans l'ABR dessiné dans « L'essentiel », où va la clé 7 si on l'insère ?</p>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers">7 &lt; 12 : à gauche ; 7 > 5 : à droite ; 7 &lt; 9 : elle devient l'enfant gauche de 9.</div>
</details>
</section>
