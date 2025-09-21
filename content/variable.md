---
title: "Fiche NSI – Les Variables et Opérateurs en Python"
footer: "Fiche d'aide-mémoire - NSI Tani Mallandi"
---

<section>
<h2 data-icon="💡">Définition et Création</h2>
<p>Une <strong>variable</strong> est un espace de stockage nommé qui contient une valeur. En Python, vous n'avez pas besoin de déclarer le type de la variable ; l'interpréteur le détermine automatiquement en fonction de la valeur que vous lui attribuez.</p>
</section>

<section>
<h2 data-icon="📝">Règles pour nommer les variables</h2>
<p>Les noms de variables doivent suivre des règles précises pour être valides en Python. S'ils ne les respectent pas, cela entraînera une erreur de syntaxe.</p>
<ul>
<li>Un nom de variable doit commencer par une lettre (<code>a-z</code>, <code>A-Z</code>) ou un trait de soulignement (<code>_</code>). Il ne peut pas commencer par un chiffre.</li>
<li>Un nom de variable ne peut contenir que des caractères alphanumériques (<code>a-z</code>, <code>A-Z</code>, <code>0-9</code>) et des traits de soulignement (<code>_</code>).</li>
<li>Les noms de variables sont sensibles à la casse (<code>age</code>, <code>Age</code> et <code>AGE</code> sont des variables différentes).</li>
<li>Un nom de variable ne peut pas être un mot-clé Python réservé (comme <code>if</code>, <code>for</code>, <code>class</code>, etc.).</li>
</ul>
<pre><code class="language-python"># Exemples de noms de variables valides
mon_age = 30
_nom_utilisateur = "admin"
vitesse_1 = 120
</code></pre>
</section>

<section>
<h2 data-icon="💾">Types de Données de Base</h2>
<p>Python dispose de plusieurs types de données fondamentaux :</p>
<ul>
<li><strong>Nombres entiers (<code>int</code>)</strong> : Pour les nombres sans décimales. Exemple : <code>age = 25</code>.</li>
<li><strong>Nombres flottants (<code>float</code>)</strong> : Pour les nombres à virgule. Exemple : <code>taille = 1.75</code>.</li>
<li><strong>Chaînes de caractères (<code>str</code>)</strong> : Pour le texte. Elles sont délimitées par des guillemets simples ou doubles. Exemple : <code>nom = "Alice"</code>.</li>
<li><strong>Booléens (<code>bool</code>)</strong> : Représentent une valeur de vérité, qui peut être soit <strong>True</strong> (vrai) soit <strong>False</strong> (faux). Exemple : <code>est_majeur = True</code>.</li>
</ul>
</section>

<section>
<h2 data-icon="🛠️">Les Opérateurs Fondamentaux</h2>
<h3>1. L'Opérateur d'Affectation (<code>=</code>)</h3>
<p>Cet opérateur est utilisé pour attribuer une valeur à une variable. Les opérateurs combinés permettent de simplifier les opérations d'affectation en les fusionnant avec un opérateur arithmétique.</p>
<pre><code class="language-python"># Affectation d'une valeur à une variable
a = 10
# Opérateur d'affectation combiné
a += 5  # équivaut à a = a + 5. 'a' vaut maintenant 15.
a -= 2  # équivaut à a = a - 2. 'a' vaut maintenant 13.
a *= 3  # équivaut à a = a * 3. 'a' vaut maintenant 39.
a /= 2  # équivaut à a = a / 2. 'a' vaut maintenant 19.5.
</code></pre>
</section>

<section>
<h3>2. Les Opérateurs Arithmétiques ➗</h3>
<p>Ils servent à effectuer des opérations mathématiques.</p>
<table>
<thead>
<tr>
<th>Opérateur</th>
<th>Description</th>
<th>Exemple</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>+</code></td>
<td>Addition</td>
<td><code>5 + 3</code> donne <code>8</code></td>
</tr>
<tr>
<td><code>-</code></td>
<td>Soustraction</td>
<td><code>10 - 4</code> donne <code>6</code></td>
</tr>
<tr>
<td><code>*</code></td>
<td>Multiplication</td>
<td><code>2 * 5</code> donne <code>10</code></td>
</tr>
<tr>
<td><code>/</code></td>
<td>Division</td>
<td><code>10 / 3</code> donne <code>3.333...</code></td>
</tr>
<tr>
<td><code>//</code></td>
<td>Division entière</td>
<td><code>10 // 3</code> donne <code>3</code></td>
</tr>
<tr>
<td><code>%</code></td>
<td>Modulo (reste de la division)</td>
<td><code>10 % 3</code> donne <code>1</code></td>
</tr>
<tr>
<td><code>**</code></td>
<td>Puissance</td>
<td><code>2 ** 3</code> donne <code>8</code></td>
</tr>
</tbody>
</table>
</section>

<section>
<h3>3. Les Opérateurs de Comparaison ⚖️</h3>
<p>Ils comparent deux valeurs et renvoient toujours un résultat booléen (<strong>True</strong> ou <strong>False</strong>).</p>
<table>
<thead>
<tr>
<th>Opérateur</th>
<th>Description</th>
<th>Exemple</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>==</code></td>
<td>Égal à</td>
<td><code>5 == 5</code> est <strong>True</strong></td>
</tr>
<tr>
<td><code>!=</code></td>
<td>Différent de</td>
<td><code>5 != 6</code> est <strong>True</strong></td>
</tr>
<tr>
<td><code>></code></td>
<td>Strictement supérieur à</td>
<td><code>5 > 3</code> est <strong>True</strong></td>
</tr>
<tr>
<td><code><</code></td>
<td>Strictement inférieur à</td>
<td><code>5 < 3</code> est <strong>False</strong></td>
</tr>
<tr>
<td><code>>=</code></td>
<td>Supérieur ou égal à</td>
<td><code>5 >= 5</code> est <strong>True</strong></td>
</tr>
<tr>
<td><code><=</code></td>
<td>Inférieur ou égal à</td>
<td><code>5 <= 3</code> est <strong>False</strong></td>
</tr>
</tbody>
</table>
</section>

<section>
<h3>4. Les Opérateurs Logiques 🧠</h3>
<p>Ils permettent de combiner des conditions booléennes.</p>
<ul>
<li><strong><code>and</code></strong> : L'expression est <strong>True</strong> si <strong>toutes</strong> les conditions sont <strong>True</strong>.</li>
<li><strong><code>or</code></strong> : L'expression est <strong>True</strong> si au moins <strong>une</strong> des conditions est <strong>True</strong>.</li>
<li><strong><code>not</code></strong> : Inverse le résultat de la condition.</li>
</ul>
<pre><code class="language-python">x = 5
y = 10
print(x > 0 and y > 0) # Affiche True
print(x > 10 or y > 5)  # Affiche True
print(not (x == 5))     # Affiche False
</code></pre>
</section>
