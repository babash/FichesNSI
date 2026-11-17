---
title: "Fiche NSI – Titre de la notion"
niveau: 1re
theme: "Algorithmique"
programme: nsi-1re-2019.algorithmique.parcours-sequentiel
ordre: 99
resume: "Une phrase qui dit ce que la fiche contient (affichée sur l'accueil)."
mots_cles: [mot, synonyme, terme anglais]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Une définition courte, avec le <strong>vocabulaire du programme</strong> en gras.</p>
<ul>
<li>Une propriété importante.</li>
<li>Une autre propriété.</li>
</ul>
</section>

<section class="exemple">
<h2>Exemple</h2>
<pre><code class="language-python">def somme(t):
    total = 0
    for x in t:
        total = total + x
    return total

print(somme([1, 2, 3]))
</code></pre>
<pre class="sortie"><code>6
</code></pre>
</section>

<section class="trace">
<h2>Trace</h2>
<table>
<thead><tr><th><code>x</code></th><th>1</th><th>2</th><th>3</th></tr></thead>
<tbody><tr><td><code>total</code></td><td>1</td><td>3</td><td>6</td></tr></tbody>
</table>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Une erreur fréquente, avec le message réel de Python.</li>
<li>Une conception erronée connue des élèves.</li>
</ul>
<pre data-suite data-erreur><code class="language-python">print(somme(5))
</code></pre>
<pre class="sortie"><code>TypeError: 'int' object is not iterable
</code></pre>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Une phrase à savoir par cœur.</li>
<li>Une autre.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Que renvoie <code>somme([4, 5])</code> ?</p>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers"><code>9</code> : 4 + 5.</div>
</details>
</section>
