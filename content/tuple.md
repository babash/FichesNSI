---
title: "Fiche NSI – Les p-uplets (tuples) en Python"
niveau: 1re
theme: "Types construits"
programme: nsi-1re-2019.types-construits.p-uplets
ordre: 21
resume: "Créer un p-uplet, lire ses éléments, l'affectation multiple, une fonction qui renvoie plusieurs valeurs, les p-uplets nommés."
mots_cles: [tuple, p-uplet, n-uplet, immuable, affectation multiple, déballage, unpacking, renvoyer plusieurs valeurs, p-uplet nommé]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Un <strong>p-uplet</strong> (type <code>tuple</code>) est une suite <strong>ordonnée</strong> de valeurs, écrite entre parenthèses : <code>(12, "Sada", True)</code>. Les valeurs peuvent être de types différents.</p>
<ul>
<li>On lit ses éléments par leur <strong>indice</strong>, comme une liste : <code>t[0]</code>, <code>t[-1]</code>.</li>
<li>Il est <strong>immuable</strong> : on ne peut ni ajouter, ni retirer, ni changer un élément.</li>
<li>Usages : des coordonnées, une date, une fonction qui <strong>renvoie plusieurs valeurs</strong>, une clé de dictionnaire.</li>
</ul>
</section>

<section>
<h2>Les opérations</h2>
<table>
<thead><tr><th>Écriture</th><th>Résultat avec <code>t = (3, 5, 8)</code></th></tr></thead>
<tbody>
<tr><td><code>t[0]</code>, <code>t[-1]</code>, <code>t[0:2]</code></td><td><code>3</code>, <code>8</code>, <code>(3, 5)</code></td></tr>
<tr><td><code>len(t)</code></td><td><code>3</code></td></tr>
<tr><td><code>5 in t</code></td><td><code>True</code></td></tr>
<tr><td><code>t + (13,)</code></td><td><code>(3, 5, 8, 13)</code> : un <strong>nouveau</strong> p-uplet</td></tr>
<tr><td><code>a, b, c = t</code></td><td><code>a</code> vaut 3, <code>b</code> 5, <code>c</code> 8 (affectation multiple)</td></tr>
<tr><td><code>for x in t:</code></td><td>parcourt 3, puis 5, puis 8</td></tr>
</tbody>
</table>
<p>Un p-uplet d'un seul élément s'écrit avec une virgule : <code>(5,)</code>.</p>
</section>

<section class="exemple">
<h2>Exemple : renvoyer deux valeurs</h2>
<pre><code class="language-python">def extremes(valeurs):
    return min(valeurs), max(valeurs)

notes = [12, 8, 15, 11]
resultat = extremes(notes)
print(resultat)
bas, haut = extremes(notes)
print(bas, haut)
</code></pre>
<pre class="sortie"><code>(8, 15)
8 15
</code></pre>
<p><code>return a, b</code> renvoie <strong>un</strong> p-uplet de deux valeurs, qu'on peut ranger dans deux variables.</p>
</section>

<section class="exemple">
<h2>Exemple : coordonnées et échange</h2>
<pre><code class="language-python"># Mamoudzou : (latitude, longitude)
mamoudzou = (-12.78, 45.23)
latitude, longitude = mamoudzou
print(latitude)
a, b = 1, 2
a, b = b, a   # échange sans variable de plus
print(a, b)
</code></pre>
<pre class="sortie"><code>-12.78
2 1
</code></pre>
</section>

<section>
<h2>Les p-uplets nommés</h2>
<p>Le programme appelle <strong>p-uplet nommé</strong> un p-uplet dont chaque élément a un nom. En Python, on l'écrit avec un dictionnaire :</p>
<pre><code class="language-python">eleve = {"prenom": "Faïza", "classe": "1G3",
         "age": 16}
print(eleve["classe"])
</code></pre>
<pre class="sortie"><code>1G3
</code></pre>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Vouloir modifier un élément : <code>t[0] = 10</code> provoque <code>TypeError: 'tuple' object does not support item assignment</code>.</li>
<li>Oublier la virgule : <code>(5)</code> est l'entier 5, pas un p-uplet.</li>
<li>Ne pas mettre autant de variables que de valeurs :</li>
</ul>
<pre data-erreur><code class="language-python">x, y = (1, 2, 3)
</code></pre>
<pre class="sortie"><code>ValueError: too many values to unpack (expected 2)
</code></pre>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Un p-uplet : des valeurs entre parenthèses, lues par indice.</li>
<li>Il ne se modifie pas.</li>
<li><code>return a, b</code> renvoie un p-uplet ; <code>x, y = f()</code> le déballe.</li>
<li>Un p-uplet nommé s'écrit avec un dictionnaire en Python.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Qu'affiche ce programme ?</p>
<pre><code class="language-python">a, b = 3, 8
a, b = b, a + b
print(a, b)
</code></pre>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers"><code>8 11</code> : la partie droite <code>(8, 3 + 8)</code> est calculée <strong>avant</strong> l'affectation.</div>
</details>
</section>
