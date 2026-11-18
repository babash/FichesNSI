---
title: "Fiche NSI – La recherche dichotomique"
niveau: 1re
theme: "Algorithmique"
programme: nsi-1re-2019.algorithmique.dichotomie
ordre: 42
resume: "Chercher dans un tableau trié en coupant l'intervalle en deux : algorithme, trace, terminaison, coût logarithmique."
mots_cles: [dichotomie, recherche dichotomique, tableau trié, milieu, intervalle, coût logarithmique, terminaison, variant, recherche binaire]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>La <strong>recherche dichotomique</strong> cherche une valeur dans un tableau <strong>trié</strong>. À chaque tour, on regarde l'élément du <strong>milieu</strong> de la zone de recherche :</p>
<ul>
<li>s'il est égal à la valeur cherchée, on a trouvé ;</li>
<li>s'il est plus petit, on garde la moitié <strong>droite</strong> ; s'il est plus grand, la moitié <strong>gauche</strong>.</li>
</ul>
<p><strong>Coût logarithmique</strong> : la zone est divisée par 2 à chaque tour. Pour 1 000 éléments, au plus 10 tours ; pour un million, au plus 20. Le parcours séquentiel peut en demander un million.</p>
<p><strong>Terminaison</strong> : <code>d - g</code> diminue à chaque tour ; la boucle s'arrête quand <code>g > d</code>.</p>
</section>

<section class="exemple">
<h2>L'algorithme</h2>
<pre><code class="language-python">def dichotomie(t, v):
    # zone de recherche : de t[g] à t[d]
    g, d = 0, len(t) - 1
    while g &lt;= d:
        m = (g + d) // 2   # milieu
        if t[m] == v:
            return m
        elif t[m] &lt; v:
            g = m + 1          # v est à droite
        else:
            d = m - 1          # v est à gauche
    return -1    # zone vide : absent

t = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(dichotomie(t, 23), dichotomie(t, 7))
</code></pre>
<pre class="sortie"><code>5 -1
</code></pre>
</section>

<section class="trace">
<h2>Traces</h2>
<table>
<thead><tr><th>Cherché</th><th><code>g</code></th><th><code>d</code></th><th><code>m</code></th><th><code>t[m]</code></th><th>Décision</th></tr></thead>
<tbody>
<tr><td rowspan="3">23</td><td>0</td><td>9</td><td>4</td><td>16</td><td>16 &lt; 23 : à droite</td></tr>
<tr><td>5</td><td>9</td><td>7</td><td>56</td><td>56 > 23 : à gauche</td></tr>
<tr><td>5</td><td>6</td><td>5</td><td>23</td><td>trouvé : renvoie 5</td></tr>
<tr><td rowspan="3">7</td><td>0</td><td>9</td><td>4</td><td>16</td><td>à gauche</td></tr>
<tr><td>0</td><td>3</td><td>1</td><td>5</td><td>à droite</td></tr>
<tr><td>2</td><td>3</td><td>2</td><td>8</td><td>à gauche : <code>d</code> = 1 &lt; <code>g</code>, renvoie −1</td></tr>
</tbody>
</table>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Chercher dans un tableau <strong>non trié</strong> : la réponse peut être fausse, sans message d'erreur.</li>
<li>Écrire <code>while g &lt; d</code> : la dernière case n'est jamais testée.</li>
<li>Écrire <code>g = m</code> au lieu de <code>g = m + 1</code> : la zone peut ne plus rétrécir, boucle infinie.</li>
<li>Calculer le milieu avec <code>/</code> : <code>m</code> est un flottant.</li>
</ul>
<pre data-erreur><code class="language-python">t = [2, 5, 8]
m = (0 + 2) / 2
print(t[m])
</code></pre>
<pre class="sortie"><code>TypeError: list indices must be integers or slices, not float
</code></pre>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Uniquement sur un tableau <strong>trié</strong>.</li>
<li>Milieu : <code>m = (g + d) // 2</code> ; puis <code>g = m + 1</code> ou <code>d = m - 1</code>.</li>
<li>La boucle tourne tant que <code>g &lt;= d</code>.</li>
<li>Coût logarithmique : doubler la taille ajoute <strong>un</strong> tour.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Avec <code>t = [1, 3, 5, 7, 9, 11]</code>, que renvoie <code>dichotomie(t, 9)</code>, et en combien de tours de boucle ?</p>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers"><code>4</code>, en 2 tours : <code>m = 2</code> (5 &lt; 9, donc <code>g = 3</code>), puis <code>m = 4</code> (trouvé).</div>
</details>
</section>
