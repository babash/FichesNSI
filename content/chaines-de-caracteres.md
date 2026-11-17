---
title: "Fiche NSI – Les chaînes de caractères en Python"
niveau: 1re
theme: "Chaînes et types construits"
programme: [nsi-1re-2019.langages.constructions-elementaires, nsi-1re-2019.types-de-base.texte]
ordre: 20
resume: "Indices et tranches, concaténation, parcours d'une chaîne, split, join, replace, immuabilité."
mots_cles: [str, chaîne, string, caractère, indice, tranche, slicing, concaténation, split, join, upper, immuable, f-string]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Une <strong>chaîne de caractères</strong> (type <code>str</code>, de l'anglais <em>string</em>) est une suite de caractères écrite entre guillemets : <code>"Sada"</code> ou <code>'Sada'</code>.</p>
<ul>
<li>Chaque caractère a un <strong>indice</strong> : de <code>0</code> à <code>len(s) - 1</code>. L'indice <code>-1</code> désigne le dernier.</li>
<li>Une chaîne est <strong>immuable</strong> : on ne peut pas changer un de ses caractères. On fabrique une nouvelle chaîne.</li>
</ul>
</section>

<section>
<h2>Les opérations</h2>
<table>
<thead><tr><th>Écriture</th><th>Résultat avec <code>s = "barge"</code></th></tr></thead>
<tbody>
<tr><td><code>len(s)</code></td><td><code>5</code> (le nombre de caractères)</td></tr>
<tr><td><code>s[0]</code>, <code>s[-1]</code></td><td><code>'b'</code>, <code>'e'</code></td></tr>
<tr><td><code>s[1:4]</code> (tranche)</td><td><code>'arg'</code> : de l'indice 1 inclus à 4 exclu</td></tr>
<tr><td><code>s + "s"</code>, <code>"ha" * 3</code></td><td><code>'barges'</code>, <code>'hahaha'</code></td></tr>
<tr><td><code>"ar" in s</code></td><td><code>True</code></td></tr>
<tr><td><code>s.upper()</code>, <code>s.replace("b", "l")</code></td><td><code>'BARGE'</code>, <code>'large'</code></td></tr>
<tr><td><code>"a b c".split(" ")</code></td><td><code>['a', 'b', 'c']</code> (une liste)</td></tr>
<tr><td><code>"-".join(["a", "b"])</code></td><td><code>'a-b'</code></td></tr>
<tr><td><code>f"{s} n°{3}"</code></td><td><code>'barge n°3'</code> (chaîne formatée)</td></tr>
</tbody>
</table>
</section>

<section class="exemple">
<h2>Exemple : parcourir une chaîne</h2>
<pre><code class="language-python">mot = "Mamoudzou"
print(len(mot), mot[0], mot[-1], mot[2:5])
voyelles = 0
for lettre in mot:
    if lettre in "aeiouy":
        voyelles = voyelles + 1
print(voyelles)
</code></pre>
<pre class="sortie"><code>9 M u mou
5
</code></pre>
<p>Pour avoir aussi la position : <code>for i in range(len(mot)):</code>, puis <code>mot[i]</code>.</p>
</section>

<section class="exemple">
<h2>Exemple : découper et recoller</h2>
<pre><code class="language-python">phrase = "la barge part à 7h"
mots = phrase.split(" ")
print(mots)
print("-".join(mots).upper())
</code></pre>
<pre class="sortie"><code>['la', 'barge', 'part', 'à', '7h']
LA-BARGE-PART-À-7H
</code></pre>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Lire après la fin : avec <code>mot = "Mamoudzou"</code>, <code>mot[9]</code> provoque <code>IndexError</code>. Le dernier indice est <code>len(mot) - 1</code>.</li>
<li>Coller un nombre à une chaîne : <code>"Total : " + 5</code> provoque <code>TypeError</code>. Écrire <code>"Total : " + str(5)</code> ou <code>f"Total : {5}"</code>.</li>
<li>Croire que <code>s.upper()</code> modifie <code>s</code> : elle renvoie une nouvelle chaîne. Écrire <code>s = s.upper()</code>.</li>
<li>Comparer des nombres écrits en chaînes : <code>"10" &lt; "9"</code> vaut <code>True</code> (ordre alphabétique, caractère par caractère).</li>
</ul>
<pre data-erreur><code class="language-python">mot = "Sada"
mot[0] = "s"
</code></pre>
<pre class="sortie"><code>TypeError: 'str' object does not support item assignment
</code></pre>
<p>Correction : <code>mot = "s" + mot[1:]</code>.</p>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Indices de <code>0</code> à <code>len(s) - 1</code> ; <code>s[-1]</code> est le dernier caractère.</li>
<li><code>s[a:b]</code> : de <code>a</code> inclus à <code>b</code> exclu.</li>
<li><code>for c in s:</code> parcourt les caractères un par un.</li>
<li>Une chaîne ne se modifie pas : on en crée une nouvelle.</li>
<li><code>split</code> donne une liste, <code>join</code> refait une chaîne.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Qu'affiche ce programme ?</p>
<pre><code class="language-python">s = "NSI"
r = ""
for c in s:
    r = c + r
print(r)
</code></pre>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers"><code>ISN</code> : chaque caractère est ajouté <strong>devant</strong> <code>r</code>, ce qui retourne la chaîne.</div>
</details>
</section>
