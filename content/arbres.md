---
title: "Fiche NSI – Les arbres binaires"
niveau: Tle
theme: "Structures de données"
programme: [nsi-tle-2019.structures-de-donnees.arbres, nsi-tle-2019.algorithmique.arbres-binaires]
ordre: 12
resume: "Vocabulaire (racine, feuille, taille, hauteur), un arbre binaire en Python, taille et hauteur récursives, parcours préfixe, infixe, suffixe et en largeur."
mots_cles: [arbre, arbre binaire, nœud, racine, feuille, sous-arbre, taille, hauteur, profondeur, parcours, préfixe, infixe, suffixe, largeur]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Un <strong>arbre</strong> range des données de façon hiérarchique. Il est fait de <strong>nœuds</strong> ; le nœud du haut est la <strong>racine</strong>, un nœud sans enfant est une <strong>feuille</strong>.</p>
<p>Dans un <strong>arbre binaire</strong>, chaque nœud a au plus deux enfants : un <strong>sous-arbre gauche</strong> et un <strong>sous-arbre droit</strong>, éventuellement vides.</p>
<ul>
<li><strong>Taille</strong> : le nombre de nœuds.</li>
<li><strong>Profondeur</strong> d'un nœud : le nombre d'arêtes entre la racine et lui (la racine est à la profondeur 0).</li>
<li><strong>Hauteur</strong> : la plus grande profondeur d'un nœud, c'est-à-dire le nombre d'arêtes du plus long chemin de la racine à une feuille.</li>
</ul>
<p><strong>Convention de cette fiche</strong> : un arbre réduit à un nœud a une hauteur de <strong>0</strong> ; l'arbre vide, de <strong>−1</strong>. D'autres sujets comptent les nœuds et donnent 1 au nœud seul : un énoncé doit toujours préciser sa convention.</p>
<ul>
<li>Un arbre binaire de hauteur <em>h</em> a au plus 2<sup><em>h</em>+1</sup> − 1 nœuds.</li>
</ul>
</section>

<section class="exemple">
<h2>Exemple en Python</h2>
<pre><code class="language-python">class Noeud:
    def __init__(self, valeur, gauche=None, droit=None):
        self.valeur = valeur
        self.gauche = gauche
        self.droit = droit

def taille(a):
    if a is None:          # arbre vide
        return 0
    return 1 + taille(a.gauche) + taille(a.droit)

def hauteur(a):
    if a is None:          # convention : vide → -1
        return -1
    return 1 + max(hauteur(a.gauche), hauteur(a.droit))

def prefixe(a):
    if a is None:
        return []
    g, d = prefixe(a.gauche), prefixe(a.droit)
    return [a.valeur] + g + d

arbre = Noeud("A", Noeud("B", Noeud("D"), Noeud("E")),
                   Noeud("C", None, Noeud("F")))
print(taille(arbre), hauteur(arbre))
print(prefixe(arbre))
</code></pre>
<pre class="sortie"><code>6 2
['A', 'B', 'D', 'E', 'C', 'F']
</code></pre>
<p>Infixe : <code>g + [a.valeur] + d</code> ; suffixe : <code>g + d + [a.valeur]</code>.</p>
</section>

<section>
<h2>L'arbre de l'exemple et ses parcours</h2>
<svg class="schema" viewBox="0 0 230 120" width="230" height="120" role="img" aria-label="Arbre binaire : A a pour enfants B et C ; B a pour enfants D et E ; C a un enfant droit F.">
<g stroke="#306998" stroke-width="1.5"><line x1="115" y1="18" x2="60" y2="58"/><line x1="115" y1="18" x2="170" y2="58"/><line x1="60" y1="58" x2="30" y2="100"/><line x1="60" y1="58" x2="90" y2="100"/><line x1="170" y1="58" x2="200" y2="100"/></g>
<g fill="#fff" stroke="#306998" stroke-width="1.5"><circle cx="115" cy="18" r="13"/><circle cx="60" cy="58" r="13"/><circle cx="170" cy="58" r="13"/><circle cx="30" cy="100" r="13"/><circle cx="90" cy="100" r="13"/><circle cx="200" cy="100" r="13"/></g>
<g font-family="Lato, Arial, sans-serif" font-size="13" font-weight="700" text-anchor="middle" fill="#1f2328"><text x="115" y="23">A</text><text x="60" y="63">B</text><text x="170" y="63">C</text><text x="30" y="105">D</text><text x="90" y="105">E</text><text x="200" y="105">F</text></g>
</svg>
<p>Racine A ; feuilles D, E, F ; taille 6 ; hauteur 2 (D, E et F sont à la profondeur 2) ; B est la racine du sous-arbre gauche.</p>
<table>
<thead><tr><th>Parcours</th><th>Règle</th><th>Ordre</th></tr></thead>
<tbody>
<tr><td>préfixe</td><td>racine, gauche, droit</td><td>A B D E C F</td></tr>
<tr><td>infixe</td><td>gauche, racine, droit</td><td>D B E A C F</td></tr>
<tr><td>suffixe</td><td>gauche, droit, racine</td><td>D E B F C A</td></tr>
<tr><td>en largeur</td><td>niveau par niveau (avec une file)</td><td>A B C D E F</td></tr>
</tbody>
</table>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Oublier le cas de l'arbre vide : <code>AttributeError: 'NoneType' object has no attribute 'gauche'</code>.</li>
<li>Se tromper de convention pour la hauteur : ici un nœud seul a une hauteur 0 (et l'arbre vide −1) ; d'autres sujets prennent 1 : lire celle de l'énoncé.</li>
<li>Confondre taille (nombre de nœuds) et hauteur (nombre d'arêtes du plus long chemin).</li>
<li>Mélanger les parcours : le nom dit où est la racine : <strong>pré</strong>fixe avant, <strong>in</strong>fixe au milieu, <strong>suf</strong>fixe après.</li>
</ul>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Un arbre binaire est vide, ou un nœud avec un sous-arbre gauche et un droit.</li>
<li>Les fonctions sur les arbres sont <strong>récursives</strong> : cas de base l'arbre vide, puis appels sur les deux sous-arbres.</li>
<li>Taille = 1 + taille(gauche) + taille(droit) ; hauteur = 1 + max des deux hauteurs, avec −1 pour l'arbre vide (nœud seul : 0).</li>
<li>Largeur : une file ; profondeur (préfixe, infixe, suffixe) : la récursivité.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Donner le parcours infixe et la hauteur de cet arbre :</p>
<pre data-suite><code class="language-python">a = Noeud(5, Noeud(3, Noeud(1)), Noeud(8))
</code></pre>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers">Infixe : 1 3 5 8 (les valeurs sont dans l'ordre croissant : c'est un arbre binaire de recherche). Hauteur : 2 (avec la convention de la fiche : un nœud seul a une hauteur 0).</div>
</details>
</section>
