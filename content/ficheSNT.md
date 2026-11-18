---
title: "Fiche NSI – Les conditions et les boucles en Python"
niveau: [SNT, 1re]
theme: "Les bases de Python"
programme: nsi-1re-2019.langages.constructions-elementaires
ordre: 2
resume: "Les instructions conditionnelles if, elif, else, les boucles for et while, range, et la trace d'une boucle."
mots_cles: [if, elif, else, condition, boucle, for, while, range, indentation, bloc, structures de contrôle, boucle infinie]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Un <strong>bloc</strong> d'instructions suit les deux-points <code>:</code> et il est <strong>indenté</strong> (décalé de 4 espaces). Le bloc s'arrête à la première ligne qui n'est plus décalée.</p>
<ul>
<li><strong>Instruction conditionnelle</strong> <code>if</code> / <code>elif</code> / <code>else</code> : Python teste les conditions dans l'ordre et exécute <strong>un seul</strong> bloc, celui de la première condition vraie (ou le <code>else</code>).</li>
<li><strong>Boucle <code>for</code></strong> : répète un bloc pour chaque valeur d'une séquence. Le nombre de tours est connu. <code>range(5)</code> donne 0, 1, 2, 3, 4 ; <code>range(2, 6)</code> donne 2, 3, 4, 5 ; <code>range(0, 10, 3)</code> donne 0, 3, 6, 9.</li>
<li><strong>Boucle <code>while</code></strong> (« tant que ») : répète un bloc tant qu'une condition est vraie. La condition est testée <strong>avant chaque tour</strong>.</li>
</ul>
</section>

<section class="exemple">
<h2>Exemple : une condition</h2>
<pre><code class="language-python">note = 12
if note >= 16:
    print("Très bien")
elif note >= 10:
    print("Admis·e")
else:
    print("Non admis·e")
print("Fin")
</code></pre>
<pre class="sortie"><code>Admis·e
Fin
</code></pre>
<p><code>note >= 16</code> est faux ; <code>note >= 10</code> est vrai : son bloc s'exécute et le <code>else</code> est sauté. <code>print("Fin")</code> n'est pas décalé : il est hors du <code>if</code>.</p>
</section>

<section class="exemple">
<h2>Exemple : deux boucles et leur trace</h2>
<pre><code class="language-python">total = 0
for i in range(1, 5):
    total = total + i
print(total)

n = 0
x = 1
while x &lt; 100:
    x = x * 3
    n = n + 1
print(n, x)
</code></pre>
<pre class="sortie"><code>10
5 243
</code></pre>
<p>Boucle <code>for</code> : <code>total</code> vaut 1, 3, 6 puis 10. Boucle <code>while</code> :</p>
<table>
<thead><tr><th>Tour</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead>
<tbody>
<tr><td><code>x &lt; 100</code> ?</td><td>1 : oui</td><td>3 : oui</td><td>9 : oui</td><td>27 : oui</td><td>81 : oui</td></tr>
<tr><td><code>x</code> après</td><td>3</td><td>9</td><td>27</td><td>81</td><td>243</td></tr>
</tbody>
</table>
<p>Au 6<sup>e</sup> test, <code>243 &lt; 100</code> est faux : la boucle s'arrête.</p>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Oublier les deux-points ou le décalage : <code>SyntaxError</code> ou <code>IndentationError</code>.</li>
<li>Croire que le bloc du <code>if</code> et celui du <code>else</code> s'exécutent tous les deux : un seul s'exécute.</li>
<li>Croire qu'un <code>while</code> s'arrête au milieu du bloc dès que sa condition devient fausse : elle n'est testée qu'au début du tour suivant (ci-dessus, <code>x</code> dépasse 100 et vaut 243).</li>
<li>Oublier de modifier la variable testée par le <code>while</code> : boucle infinie (arrêt avec Ctrl+C).</li>
<li>Décaler une ligne qui devait être après la boucle : elle s'exécute à chaque tour.</li>
<li>Remplacer un <code>elif</code> par un second <code>if</code> : le second test devient indépendant, et son bloc peut s'exécuter aussi.</li>
</ul>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Un bloc : <code>:</code> en fin de ligne, puis 4 espaces de décalage.</li>
<li><code>if</code> / <code>elif</code> / <code>else</code> : un seul bloc, celui de la première condition vraie.</li>
<li><code>for</code> quand on connaît le nombre de tours, <code>while</code> sinon.</li>
<li><code>range(a, b)</code> va de <code>a</code> à <code>b - 1</code> : la fin n'est jamais atteinte.</li>
<li>Pour comprendre une boucle, faire sa <strong>trace</strong> : la valeur des variables à chaque tour.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Qu'affiche ce programme ?</p>
<pre><code class="language-python">x = 5
for k in range(3):
    if x % 2 == 0:
        x = x // 2
    else:
        x = 3 * x + 1
print(x)
</code></pre>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers"><code>4</code> : 5 est impair, donne 16 ; 16 est pair, donne 8 ; 8 donne 4. Trois tours.</div>
</details>
</section>
