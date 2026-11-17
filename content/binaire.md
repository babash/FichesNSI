---
title: "Fiche NSI – L'écriture binaire et hexadécimale"
niveau: 1re
theme: "Types et valeurs de base"
programme: nsi-1re-2019.types-de-base.entiers-base-b
ordre: 30
resume: "Écrire un entier naturel en base 2 et en base 16, passer d'une base à l'autre, bits et octets."
mots_cles: [binaire, base 2, hexadécimal, base 16, base 10, décimal, bit, octet, conversion, divisions successives, bin, hex, int]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>En <strong>base 10</strong>, chaque chiffre vaut une puissance de 10. En <strong>base 2</strong> (binaire), il n'y a que deux chiffres, 0 et 1, appelés <strong>bits</strong>, et chacun vaut une puissance de 2. En <strong>base 16</strong> (hexadécimal), seize chiffres : 0 à 9, puis A (10) à F (15).</p>
<p>Un <strong>octet</strong> est un groupe de 8 bits : il code les entiers de 0 à 255. Avec <em>n</em> bits, on code les entiers de 0 à 2<sup><em>n</em></sup> − 1. Un chiffre hexadécimal correspond à exactement 4 bits.</p>
<table>
<thead><tr><th>Puissance</th><th>2<sup>7</sup></th><th>2<sup>6</sup></th><th>2<sup>5</sup></th><th>2<sup>4</sup></th><th>2<sup>3</sup></th><th>2<sup>2</sup></th><th>2<sup>1</sup></th><th>2<sup>0</sup></th></tr></thead>
<tbody><tr><td>Valeur</td><td>128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr></tbody>
</table>
</section>

<section class="exemple">
<h2>De la base 2 à la base 10</h2>
<p>On additionne les puissances de 2 sous les bits à 1 :</p>
<p><code>1011 0110</code><sub>2</sub> = 128 + 32 + 16 + 4 + 2 = <strong>182</strong></p>
<h3>De la base 10 à la base 2</h3>
<p>Divisions successives par 2 ; on lit les restes <strong>de bas en haut</strong>.</p>
<table>
<thead><tr><th>Division</th><th>Quotient</th><th>Reste</th></tr></thead>
<tbody>
<tr><td>45 ÷ 2</td><td>22</td><td>1</td></tr>
<tr><td>22 ÷ 2</td><td>11</td><td>0</td></tr>
<tr><td>11 ÷ 2</td><td>5</td><td>1</td></tr>
<tr><td>5 ÷ 2</td><td>2</td><td>1</td></tr>
<tr><td>2 ÷ 2</td><td>1</td><td>0</td></tr>
<tr><td>1 ÷ 2</td><td>0</td><td>1</td></tr>
</tbody>
</table>
<p>45 = <code>101101</code><sub>2</sub>. Vérification : 32 + 8 + 4 + 1 = 45.</p>
<h3>Base 2 et base 16</h3>
<p>On coupe en paquets de 4 bits, en partant de la droite : <code>1011 0110</code> → <code>1011</code> = 11 = B et <code>0110</code> = 6, donc 182 = <code>B6</code><sub>16</sub>.</p>
</section>

<section class="exemple">
<h2>En Python</h2>
<pre><code class="language-python">def en_binaire(n):
    if n == 0:
        return "0"
    bits = ""
    while n > 0:
        bits = str(n % 2) + bits   # le reste, à gauche
        n = n // 2
    return bits

print(en_binaire(45), bin(45), hex(182))
print(int("10110110", 2), int("B6", 16), 0b101101)
</code></pre>
<pre class="sortie"><code>101101 0b101101 0xb6
182 182 45
</code></pre>
<p>Les préfixes <code>0b</code> et <code>0x</code> indiquent la base 2 et la base 16.</p>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Lire les restes de haut en bas : on obtient l'écriture à l'envers.</li>
<li>Croire qu'on ne peut écrire en binaire que les nombres jusqu'à 255 : 255 est la limite d'<strong>un octet</strong> ; avec plus de bits, on va plus loin.</li>
<li>Croire qu'un nombre hexadécimal contient forcément des lettres : <code>42</code><sub>16</sub> = 66 n'en a pas. Préciser la base.</li>
<li>Commencer les paquets de 4 bits par la gauche : <code>101101</code> se coupe en <code>10 1101</code>, soit <code>2D</code><sub>16</sub>.</li>
<li>Oublier qu'avec <em>n</em> bits le plus grand nombre est 2<sup><em>n</em></sup> − 1, et non 2<sup><em>n</em></sup>.</li>
</ul>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Base 2 → base 10 : additionner les puissances de 2.</li>
<li>Base 10 → base 2 : divisions par 2, restes lus de bas en haut.</li>
<li>1 chiffre hexadécimal = 4 bits ; 1 octet = 8 bits = 2 chiffres hexadécimaux.</li>
<li><em>n</em> bits : de 0 à 2<sup><em>n</em></sup> − 1.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Écrire 2026 en hexadécimal, sachant que 2026 = 7 × 256 + 14 × 16 + 10.</p>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers"><code>7EA</code><sub>16</sub> : 7, puis 14 = E, puis 10 = A. En Python, <code>hex(2026)</code> donne <code>'0x7ea'</code>.</div>
</details>
</section>
