---
title: "Fiche NSI – Les algorithmes gloutons"
niveau: 1re
theme: "Algorithmique"
programme: nsi-1re-2019.algorithmique.gloutons
ordre: 43
resume: "Faire à chaque étape le meilleur choix immédiat : rendu de monnaie, sac à dos, et pourquoi le résultat n'est pas toujours optimal."
mots_cles: [glouton, algorithme glouton, rendu de monnaie, sac à dos, optimisation, choix local, optimal, heuristique]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Un <strong>problème d'optimisation</strong> cherche la meilleure solution parmi beaucoup de solutions possibles (le moins de pièces, le plus de valeur…).</p>
<p>Un algorithme <strong>glouton</strong> construit la solution étape par étape, en faisant à chaque étape le <strong>meilleur choix du moment</strong>, sans jamais revenir en arrière.</p>
<ul>
<li>Il est simple et rapide.</li>
<li>Il donne <strong>une</strong> solution, mais <strong>pas toujours la meilleure</strong> (la solution <strong>optimale</strong>).</li>
</ul>
</section>

<section class="exemple">
<h2>Exemple : le rendu de monnaie</h2>
<p>Rendre une somme avec le moins de pièces possible. Choix glouton : la plus grande pièce qui ne dépasse pas ce qui reste à rendre.</p>
<pre><code class="language-python">def rendu(somme, pieces):
    """pieces : par valeur décroissante."""
    resultat = []
    for p in pieces:
        while somme >= p:
            resultat.append(p)
            somme = somme - p
    return resultat

print(rendu(37, [20, 10, 5, 2, 1]))
print(rendu(6, [4, 3, 1]))
</code></pre>
<pre class="sortie"><code>[20, 10, 5, 2]
[4, 1, 1]
</code></pre>
<p>Avec les euros, le glouton est optimal. Avec des pièces de 4, 3 et 1, il rend 3 pièces pour 6, alors que <strong>3 + 3</strong> n'en demande que 2.</p>
</section>

<section class="trace">
<h2>Trace de rendu(37, …)</h2>
<table>
<thead><tr><th>Pièce <code>p</code></th><th>20</th><th>10</th><th>5</th><th>2</th><th>1</th></tr></thead>
<tbody>
<tr><td>prises</td><td>20</td><td>10</td><td>5</td><td>2</td><td>—</td></tr>
<tr><td><code>somme</code> après</td><td>17</td><td>7</td><td>2</td><td>0</td><td>0</td></tr>
</tbody>
</table>
</section>

<section class="exemple">
<h2>Exemple : le sac à dos</h2>
<p>Un sac supporte 10 kg. Choisir des objets pour avoir la plus grande valeur. Choix glouton : l'objet de plus grande <strong>valeur par kilo</strong> qui rentre encore.</p>
<table>
<thead><tr><th>Objet</th><th>Masse</th><th>Valeur</th><th>Valeur par kg</th></tr></thead>
<tbody>
<tr><td>A</td><td>6 kg</td><td>30 €</td><td>5</td></tr>
<tr><td>B</td><td>5 kg</td><td>20 €</td><td>4</td></tr>
<tr><td>C</td><td>5 kg</td><td>20 €</td><td>4</td></tr>
</tbody>
</table>
<p>Glouton : A (6 kg), puis B ne rentre plus (11 kg), ni C : <strong>30 €</strong>. Optimal : B + C (10 kg) : <strong>40 €</strong>.</p>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Croire qu'un glouton donne toujours la meilleure solution : il faut le prouver, ou trouver un contre-exemple.</li>
<li>Oublier de trier les choix (pièces de la plus grande à la plus petite, objets par valeur par kilo) : le glouton ne fait plus le bon choix.</li>
<li>Écrire <code>if</code> au lieu de <code>while</code> dans le rendu : chaque pièce n'est prise qu'une fois : pour 40, on obtiendrait 20, 10, 5, 2, 1, et il resterait 2 à rendre.</li>
</ul>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Glouton : le meilleur choix immédiat, sans retour en arrière.</li>
<li>Rapide, mais pas toujours optimal : un contre-exemple suffit à le montrer.</li>
<li>Rendu de monnaie : optimal avec les euros, pas avec n'importe quel système de pièces.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Avec des pièces de 10, 6 et 1, que rend l'algorithme glouton pour 12 ? Est-ce optimal ?</p>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers">10, 1, 1 : 3 pièces. Ce n'est pas optimal : 6 + 6 n'utilise que 2 pièces.</div>
</details>
</section>
