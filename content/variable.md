---
title: "Fiche NSI – Les variables et les opérateurs en Python"
niveau: [SNT, 1re]
theme: "Les bases de Python"
programme: [nsi-1re-2019.langages.constructions-elementaires, nsi-1re-2019.types-de-base.booleens]
ordre: 1
resume: "Affecter une valeur, nommer une variable, les types int, float, str et bool, les opérateurs de calcul, de comparaison et logiques."
mots_cles: [variable, affectation, type, int, float, str, bool, opérateur, modulo, division entière, input, conversion]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Une <strong>variable</strong> est un nom qui désigne une valeur rangée dans la mémoire de l'ordinateur.</p>
<p>L'<strong>affectation</strong> <code>x = 5</code> se lit « x reçoit 5 » : Python calcule d'abord la partie <strong>à droite</strong> du <code>=</code>, puis range le résultat dans la variable <strong>à gauche</strong>. Une variable ne garde que sa <strong>dernière</strong> valeur.</p>
<p>Le <strong>type</strong> vient de la valeur : <code>int</code> (entier, <code>15</code>), <code>float</code> (flottant, <code>1.75</code>), <code>str</code> (chaîne, <code>"Sada"</code>), <code>bool</code> (booléen, <code>True</code> ou <code>False</code>). La fonction <code>type(x)</code> le donne.</p>
</section>

<section>
<h2>Nommer une variable</h2>
<ul>
<li>Lettres, chiffres et <code>_</code> ; jamais de chiffre au début, ni d'espace.</li>
<li>Pas de mot réservé : <code>if</code>, <code>for</code>, <code>class</code>…</li>
<li><code>age</code> et <code>Age</code> sont deux variables différentes.</li>
<li>Un nom qui dit ce qu'il contient : <code>prix_total</code> plutôt que <code>p</code>.</li>
</ul>
</section>

<section>
<h2>Les opérateurs</h2>
<table>
<thead><tr><th>Calcul</th><th>Exemple</th><th>Résultat</th></tr></thead>
<tbody>
<tr><td><code>+</code> <code>-</code> <code>*</code></td><td><code>7 * 2</code></td><td><code>14</code></td></tr>
<tr><td>division</td><td><code>7 / 2</code></td><td><code>3.5</code> (un <code>float</code>)</td></tr>
<tr><td>quotient entier</td><td><code>7 // 2</code></td><td><code>3</code></td></tr>
<tr><td>reste (modulo)</td><td><code>7 % 2</code></td><td><code>1</code></td></tr>
<tr><td>puissance</td><td><code>2 ** 3</code></td><td><code>8</code></td></tr>
</tbody>
</table>
<p><strong>Comparaisons</strong> (résultat <code>True</code> ou <code>False</code>) : <code>==</code> égal, <code>!=</code> différent, <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code>.</p>
<p><strong>Logique</strong> : <code>a and b</code> vrai si les deux sont vrais ; <code>a or b</code> vrai si au moins un est vrai ; <code>not a</code> inverse.</p>
<p><strong>Raccourcis</strong> : <code>x += 1</code> veut dire <code>x = x + 1</code> (de même <code>-=</code>, <code>*=</code>, <code>/=</code>).</p>
</section>

<section class="exemple">
<h2>Exemple et trace</h2>
<pre><code class="language-python">a = 7
b = 2
a = a + b
b = a * 2
print(a, b)
print(a // 2, a % 2, a / 2)
print(a % 2 == 0)
</code></pre>
<pre class="sortie"><code>9 18
4 1 4.5
False
</code></pre>
<table>
<thead><tr><th>Après la ligne</th><th><code>a</code></th><th><code>b</code></th></tr></thead>
<tbody>
<tr><td>1 et 2</td><td>7</td><td>2</td></tr>
<tr><td>3 : <code>a = a + b</code></td><td>9</td><td>2</td></tr>
<tr><td>4 : <code>b = a * 2</code></td><td>9</td><td>18</td></tr>
</tbody>
</table>
<p><code>a % 2 == 0</code> teste si <code>a</code> est pair : le reste de 9 par 2 vaut 1.</p>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Confondre <code>=</code> (affecter) et <code>==</code> (comparer) : <code>if x = 3:</code> provoque <code>SyntaxError</code>.</li>
<li>Oublier que <code>input()</code> renvoie toujours une <strong>chaîne</strong> : convertir avec <code>int(...)</code> ou <code>float(...)</code>.</li>
<li>Croire qu'après <code>y = x</code>, changer <code>x</code> change aussi <code>y</code> : non, <code>y</code> a reçu la valeur une fois pour toutes.</li>
<li>Attendre un calcul exact avec des flottants : <code>0.1 + 0.2 == 0.3</code> vaut <code>False</code>.</li>
<li>Utiliser une variable avant de lui donner une valeur : <code>NameError</code>.</li>
</ul>
<pre data-erreur data-entree="15"><code class="language-python">age = input("Ton âge ? ")
print(age + 1)
</code></pre>
<pre class="sortie"><code>Ton âge ? 15
TypeError: can only concatenate str (not "int") to str
</code></pre>
<p>Correction : <code>age = int(input("Ton âge ? "))</code>.</p>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li><code>x = expression</code> : on calcule à droite, puis on range à gauche.</li>
<li>Une variable ne garde que sa dernière valeur.</li>
<li><code>/</code> donne un <code>float</code> ; <code>//</code> le quotient entier ; <code>%</code> le reste.</li>
<li>Une comparaison vaut <code>True</code> ou <code>False</code>.</li>
<li><code>input()</code> donne une chaîne : convertir avant de calculer.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Qu'affiche ce programme ?</p>
<pre><code class="language-python">x = 3
y = x
x = x + 1
print(x, y, x > y)
</code></pre>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers"><code>4 3 True</code> : <code>y</code> a reçu 3 à la ligne 2 et ne change plus quand <code>x</code> change.</div>
</details>
</section>
