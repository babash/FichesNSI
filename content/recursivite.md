---
title: "Fiche NSI – La récursivité"
niveau: Tle
theme: "Langages et programmation"
programme: nsi-tle-2019.langages.recursivite
ordre: 30
resume: "Fonction récursive : cas de base, appel sur un problème plus petit, pile d'appels, trace, RecursionError."
mots_cles: [récursivité, récursif, fonction récursive, cas de base, appel récursif, pile d'appels, factorielle, RecursionError, terminaison]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Une fonction <strong>récursive</strong> s'appelle elle-même. Elle a toujours deux parties :</p>
<ul>
<li>un <strong>cas de base</strong>, résolu directement, sans appel : il arrête la récursion ;</li>
<li>un <strong>appel récursif</strong> sur un problème <strong>plus petit</strong>, qui se rapproche du cas de base.</li>
</ul>
<p>Chaque appel a <strong>ses propres variables</strong>, comme une copie de la fonction. Les appels en attente sont rangés dans la <strong>pile d'appels</strong> : le dernier appelé est le premier à finir.</p>
</section>

<section class="exemple">
<h2>Exemple : la factorielle</h2>
<p><em>n</em>! = 1 × 2 × … × <em>n</em>, et 0! = 1. Donc <em>n</em>! = <em>n</em> × (<em>n</em> − 1)!.</p>
<pre><code class="language-python">def factorielle(n):
    if n == 0:                       # cas de base
        return 1
    # appel sur un problème plus petit
    return n * factorielle(n - 1)

print(factorielle(4))
</code></pre>
<pre class="sortie"><code>24
</code></pre>
</section>

<section class="trace">
<h2>Trace : descente puis remontée</h2>
<table>
<thead><tr><th>Appel</th><th>attend</th><th>renvoie</th></tr></thead>
<tbody>
<tr><td><code>factorielle(4)</code></td><td><code>4 * factorielle(3)</code></td><td>4 × 6 = <strong>24</strong></td></tr>
<tr><td><code>factorielle(3)</code></td><td><code>3 * factorielle(2)</code></td><td>3 × 2 = 6</td></tr>
<tr><td><code>factorielle(2)</code></td><td><code>2 * factorielle(1)</code></td><td>2 × 1 = 2</td></tr>
<tr><td><code>factorielle(1)</code></td><td><code>1 * factorielle(0)</code></td><td>1 × 1 = 1</td></tr>
<tr><td><code>factorielle(0)</code></td><td>rien : cas de base</td><td>1</td></tr>
</tbody>
</table>
<p>On lit la colonne « attend » de haut en bas (la pile d'appels grandit), puis la colonne « renvoie » de bas en haut (la pile se vide).</p>
</section>

<section class="exemple">
<h2>Exemple : sur un tableau</h2>
<pre data-suite><code class="language-python">def somme(t):
    if len(t) == 0:
        return 0
    # t[1:] : t sans son premier élément
    return t[0] + somme(t[1:])

print(somme([3, 8, 1]))
</code></pre>
<pre class="sortie"><code>12
</code></pre>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Oublier le cas de base, ou un appel qui ne s'en rapproche pas (<code>factorielle(n + 1)</code>) : les appels s'empilent sans fin.</li>
<li>Oublier le <code>return</code> devant l'appel récursif : la fonction renvoie <code>None</code>.</li>
<li>Croire que les appels partagent la même variable <code>n</code> : chaque appel a la sienne.</li>
<li>Appeler avec une valeur hors du domaine prévu : <code>factorielle(-1)</code> ne rencontre jamais <code>n == 0</code>.</li>
</ul>
<pre data-suite data-erreur><code class="language-python">print(factorielle(-1))
</code></pre>
<pre class="sortie"><code>RecursionError: maximum recursion depth exceeded
</code></pre>
<p>Python arrête après environ 1 000 appels en attente.</p>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Toujours écrire le cas de base en premier.</li>
<li>Chaque appel récursif doit rapprocher du cas de base : c'est ce qui assure la <strong>terminaison</strong>.</li>
<li><code>return</code> devant l'appel récursif.</li>
<li>Pour comprendre, faire la trace : descente des appels, puis remontée des résultats.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Que renvoie <code>mystere(2026)</code> ? Que calcule cette fonction ?</p>
<pre><code class="language-python">def mystere(n):
    if n &lt; 10:
        return 1
    return 1 + mystere(n // 10)
</code></pre>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers"><code>4</code> : 2026, 202, 20, 2. La fonction compte les chiffres d'un entier positif.</div>
</details>
</section>
