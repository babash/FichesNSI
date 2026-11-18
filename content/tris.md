---
title: "Fiche NSI – Les tris par sélection et par insertion"
niveau: 1re
theme: "Algorithmique"
programme: nsi-1re-2019.algorithmique.tris
ordre: 41
resume: "Deux tris à savoir écrire : sélection et insertion. Leur principe, leur trace, leur invariant et leur coût quadratique."
mots_cles: [tri, trier, tri par sélection, tri par insertion, échange, invariant, coût quadratique, complexité, sort, sorted]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<ul>
<li><strong>Tri par sélection</strong> : on cherche le plus petit élément de la partie non triée et on l'<strong>échange</strong> avec le premier élément de cette partie.</li>
<li><strong>Tri par insertion</strong> : on prend les éléments un par un et on <strong>insère</strong> chacun à sa place dans la partie déjà triée, à gauche, en décalant les plus grands.</li>
</ul>
<p>Les deux trient le tableau <strong>en place</strong> : ils le modifient et ne renvoient rien.</p>
<p><strong>Coût quadratique</strong> : pour <em>n</em> éléments, de l'ordre de <em>n</em>² comparaisons (exactement <em>n</em>(<em>n</em> − 1)/2 pour la sélection). Un tableau 10 fois plus grand demande environ 100 fois plus de temps. L'insertion est rapide sur un tableau presque trié.</p>
</section>

<section class="exemple">
<h2>Les deux algorithmes</h2>
<pre><code class="language-python">def tri_selection(t):
    n = len(t)
    for i in range(n - 1):
        i_min = i
        for j in range(i + 1, n):
            if t[j] &lt; t[i_min]:
                i_min = j
        t[i], t[i_min] = t[i_min], t[i]

def tri_insertion(t):
    for i in range(1, len(t)):
        cle = t[i]
        j = i - 1
        while j >= 0 and t[j] > cle:
            # décale t[j] vers la droite
            t[j + 1] = t[j]
            j = j - 1
        t[j + 1] = cle

notes = [5, 2, 8, 1]
tri_selection(notes)
print(notes)
autres = [5, 2, 8, 1]
tri_insertion(autres)
print(autres)
</code></pre>
<pre class="sortie"><code>[1, 2, 5, 8]
[1, 2, 5, 8]
</code></pre>
</section>

<section class="trace">
<h2>Traces sur [5, 2, 8, 1]</h2>
<table>
<thead><tr><th>Après le tour</th><th>Sélection</th><th>Insertion</th></tr></thead>
<tbody>
<tr><td><code>i = 0</code></td><td><strong>[1</strong>, 2, 8, 5] (1 ↔ 5)</td><td>—</td></tr>
<tr><td><code>i = 1</code></td><td><strong>[1, 2</strong>, 8, 5]</td><td><strong>[2, 5</strong>, 8, 1]</td></tr>
<tr><td><code>i = 2</code></td><td><strong>[1, 2, 5, 8]</strong> (5 ↔ 8)</td><td><strong>[2, 5, 8</strong>, 1]</td></tr>
<tr><td><code>i = 3</code></td><td>—</td><td><strong>[1, 2, 5, 8]</strong></td></tr>
</tbody>
</table>
<p>En gras, la partie triée. <strong>Invariant</strong> de la sélection : après le tour <code>i</code>, <code>t[0..i]</code> contient les plus petits éléments, triés, à leur place définitive. Insertion : <code>t[0..i]</code> est trié, mais d'autres éléments peuvent encore s'y insérer.</p>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Écrire <code>t = tri_selection(t)</code> : la fonction ne renvoie rien, <code>t</code> vaut alors <code>None</code>.</li>
<li>Échanger en deux lignes, <code>t[i] = t[i_min]</code> puis <code>t[i_min] = t[i]</code> : une valeur est perdue. Écrire <code>t[i], t[i_min] = t[i_min], t[i]</code>.</li>
<li>Retenir la plus petite <strong>valeur</strong> au lieu de son <strong>indice</strong> : on ne sait plus où faire l'échange.</li>
<li>Oublier <code>j >= 0</code> dans le <code>while</code> : <code>j</code> devient négatif, <code>t[-1]</code>, <code>t[-2]</code>… sont lus, et le programme s'arrête le plus souvent sur <code>IndexError: list index out of range</code> (ou donne un résultat faux).</li>
<li>Confondre <code>t.sort()</code> (trie <code>t</code>, renvoie <code>None</code>) et <code>sorted(t)</code> (renvoie un nouveau tableau trié).</li>
</ul>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Sélection : chercher le minimum du reste, l'échanger.</li>
<li>Insertion : prendre l'élément suivant, décaler les plus grands, l'insérer.</li>
<li>Deux boucles imbriquées : coût quadratique (en <em>n</em>²).</li>
<li>L'invariant explique pourquoi l'algorithme est correct.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Donner l'état du tableau <code>[4, 3, 1, 2]</code> après les deux premiers tours du tri par sélection.</p>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers"><code>[1, 2, 4, 3]</code> : tour 0, 1 ↔ 4 donne [1, 3, 4, 2] ; tour 1, 2 ↔ 3.</div>
</details>
</section>
