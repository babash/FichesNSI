---
title: "Fiche NSI – Les tableaux (listes) en Python"
niveau: 1re
theme: "Chaînes et types construits"
programme: nsi-1re-2019.types-construits.tableaux
ordre: 22
resume: "Tableaux indexés : lire, modifier, ajouter, parcourir, construire en compréhension, tableaux de tableaux, copie et référence."
mots_cles: [list, liste, tableau, indice, append, pop, compréhension, matrice, tableau de tableaux, référence, copie, IndexError]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Un <strong>tableau</strong> est une suite <strong>ordonnée</strong> de valeurs, repérées par leur <strong>indice</strong> : de <code>0</code> à <code>len(t) - 1</code>. En Python, c'est le type <code>list</code>, écrit entre crochets : <code>[28, 31, 30]</code>.</p>
<p>Un tableau est <strong>modifiable</strong> (<em>mutable</em>) : on peut changer, ajouter ou retirer des éléments.</p>
</section>

<section>
<h2>Les opérations</h2>
<table>
<thead><tr><th>Écriture</th><th>Effet</th></tr></thead>
<tbody>
<tr><td><code>t[i]</code>, <code>t[-1]</code></td><td>l'élément d'indice <code>i</code>, le dernier</td></tr>
<tr><td><code>t[i] = v</code></td><td>remplace l'élément d'indice <code>i</code></td></tr>
<tr><td><code>t.append(v)</code></td><td>ajoute <code>v</code> à la fin</td></tr>
<tr><td><code>t.pop()</code></td><td>retire le dernier élément et le renvoie</td></tr>
<tr><td><code>len(t)</code>, <code>v in t</code></td><td>la taille ; <code>True</code> si <code>v</code> est présent</td></tr>
<tr><td><code>t[a:b]</code></td><td>nouveau tableau, de <code>a</code> inclus à <code>b</code> exclu</td></tr>
<tr><td><code>[0] * 5</code></td><td><code>[0, 0, 0, 0, 0]</code></td></tr>
<tr><td><code>[x * x for x in range(4)]</code></td><td><code>[0, 1, 4, 9]</code> : tableau <strong>en compréhension</strong></td></tr>
<tr><td><code>[x for x in t if x > 0]</code></td><td>les éléments positifs de <code>t</code></td></tr>
</tbody>
</table>
<p>Parcourir : <code>for x in t:</code> (les valeurs) ou <code>for i in range(len(t)):</code> (les indices).</p>
</section>

<section class="exemple">
<h2>Exemple</h2>
<pre><code class="language-python">releves = [28, 31, 30, 33, 29]   # températures
releves.append(32)
print(len(releves), releves[0], releves[-1])
chauds = [t for t in releves if t >= 31]
print(chauds)
</code></pre>
<pre class="sortie"><code>6 28 32
[31, 33, 32]
</code></pre>
</section>

<section class="exemple">
<h2>Tableau de tableaux (matrice)</h2>
<pre><code class="language-python">grille = [[1, 2, 3],
          [4, 5, 6]]
print(grille[1][2], len(grille), len(grille[0]))
for ligne in grille:
    print(sum(ligne))
</code></pre>
<pre class="sortie"><code>6 2 3
6
15
</code></pre>
<p><code>grille[1][2]</code> : ligne d'indice 1, puis colonne d'indice 2.</p>
</section>

<section class="exemple">
<h2>Référence et copie</h2>
<pre><code class="language-python">a = [1, 2, 3]
b = a          # b désigne LE MÊME tableau
b.append(4)
c = list(a)    # c est une copie
c.append(5)
print(a, c)
</code></pre>
<pre class="sortie"><code>[1, 2, 3, 4] [1, 2, 3, 4, 5]
</code></pre>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Lire <code>t[len(t)]</code> : <code>IndexError: list index out of range</code>. Le dernier indice est <code>len(t) - 1</code>.</li>
<li>Croire que <code>b = a</code> copie le tableau (voir ci-dessus).</li>
<li>Écrire <code>t = t.append(5)</code> : <code>append</code> modifie <code>t</code> et renvoie <code>None</code>, donc <code>t</code> vaut <code>None</code>.</li>
<li>Créer une matrice avec <code>[[0] * 3] * 2</code> : les deux lignes sont le <strong>même</strong> tableau. Écrire <code>[[0] * 3 for i in range(2)]</code>.</li>
</ul>
<pre><code class="language-python">g = [[0] * 3] * 2
g[0][0] = 9
print(g)
</code></pre>
<pre class="sortie"><code>[[9, 0, 0], [9, 0, 0]]
</code></pre>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Indices de <code>0</code> à <code>len(t) - 1</code>.</li>
<li><code>append</code> ajoute à la fin et modifie le tableau.</li>
<li><code>[expression for x in ... if condition]</code> construit un tableau en compréhension.</li>
<li><code>m[i][j]</code> : ligne <code>i</code>, colonne <code>j</code>.</li>
<li><code>b = a</code> ne copie pas : <code>list(a)</code> ou <code>a[:]</code> copie.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Qu'affiche ce programme ?</p>
<pre><code class="language-python">t = [5, 2, 7]
t[1] = t[0] + t[2]
t.append(t[1] * 2)
print(t)
</code></pre>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers"><code>[5, 12, 7, 24]</code> : <code>t[1]</code> devient 5 + 7 = 12, puis 24 est ajouté à la fin.</div>
</details>
</section>
