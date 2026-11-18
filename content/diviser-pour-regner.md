---
title: "Fiche NSI – Diviser pour régner : le tri fusion"
niveau: Tle
theme: "Algorithmique"
programme: nsi-tle-2019.algorithmique.diviser-pour-regner
ordre: 51
resume: "Diviser un problème en sous-problèmes, les résoudre récursivement, combiner : le tri fusion et son coût en n log n."
mots_cles: [diviser pour régner, tri fusion, fusion, récursivité, merge sort, coût, n log n, complexité]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>La méthode <strong>diviser pour régner</strong> a trois étapes :</p>
<ol>
<li><strong>diviser</strong> le problème en sous-problèmes plus petits, du même type ;</li>
<li><strong>régner</strong> : résoudre chaque sous-problème, souvent par un appel récursif ;</li>
<li><strong>combiner</strong> les solutions des sous-problèmes.</li>
</ol>
<p>Le <strong>tri fusion</strong> coupe le tableau en deux moitiés, trie chaque moitié, puis <strong>fusionne</strong> les deux moitiés triées. Son coût est de l'ordre de <em>n</em> log<sub>2</sub>(<em>n</em>) : pour un million d'éléments, environ 20 millions d'opérations, contre environ 500 milliards de comparaisons pour un tri par sélection.</p>
</section>

<section class="exemple">
<h2>Le tri fusion en Python</h2>
<pre><code class="language-python">def fusion(a, b):
    """Fusionne a et b, déjà triés."""
    resultat = []
    i, j = 0, 0
    while i &lt; len(a) and j &lt; len(b):
        if a[i] &lt;= b[j]:
            resultat.append(a[i])
            i = i + 1
        else:
            resultat.append(b[j])
            j = j + 1
    # on ajoute ce qui reste de a ou de b
    return resultat + a[i:] + b[j:]

def tri_fusion(t):
    if len(t) &lt;= 1:    # cas de base
        return t
    m = len(t) // 2
    gauche = tri_fusion(t[:m])
    droite = tri_fusion(t[m:])
    return fusion(gauche, droite)

print(tri_fusion([38, 27, 43, 3, 9, 82, 10]))
</code></pre>
<pre class="sortie"><code>[3, 9, 10, 27, 38, 43, 82]
</code></pre>
</section>

<section class="trace">
<h2>Trace</h2>
<table>
<thead><tr><th>Étape</th><th>Tableaux</th></tr></thead>
<tbody>
<tr><td>diviser</td><td>[38, 27, 43] · [3, 9, 82, 10]</td></tr>
<tr><td>diviser</td><td>[38] · [27, 43] · [3, 9] · [82, 10]</td></tr>
<tr><td>diviser</td><td>[38] · [27] · [43] · [3] · [9] · [82] · [10]</td></tr>
<tr><td>fusionner</td><td>[38] · [27, 43] · [3, 9] · [10, 82]</td></tr>
<tr><td>fusionner</td><td>[27, 38, 43] · [3, 9, 10, 82]</td></tr>
<tr><td>fusionner</td><td>[3, 9, 10, 27, 38, 43, 82]</td></tr>
</tbody>
</table>
<p>Il y a environ log<sub>2</sub>(<em>n</em>) niveaux, et chaque niveau de fusions coûte environ <em>n</em> : d'où <em>n</em> log<sub>2</sub>(<em>n</em>).</p>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Oublier le cas de base : <code>RecursionError</code>.</li>
<li>Oublier, à la fin de la fusion, les éléments qui restent dans <code>a</code> ou dans <code>b</code> : ils sont perdus.</li>
<li>Fusionner des tableaux qui ne sont pas triés : le résultat ne l'est pas non plus.</li>
<li>Couper avec <code>len(t) / 2</code> : un flottant ne peut pas servir d'indice.</li>
<li>Croire que « diviser » suffit : sans l'étape « combiner », rien n'est trié.</li>
</ul>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Diviser, régner (récursivement), combiner.</li>
<li>Tri fusion : couper en deux, trier les moitiés, fusionner.</li>
<li>La fusion de deux tableaux triés se fait en un seul parcours.</li>
<li>Coût en <em>n</em> log <em>n</em>, bien meilleur que <em>n</em>² pour les grands tableaux.</li>
<li>La recherche dichotomique est aussi un « diviser pour régner ».</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Que renvoie <code>fusion([1, 4, 9], [2, 3, 10])</code> ? Combien de comparaisons <code>a[i] &lt;= b[j]</code> sont faites ?</p>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers"><code>[1, 2, 3, 4, 9, 10]</code>, en 5 comparaisons ; 10 est ensuite ajouté sans comparaison.</div>
</details>
</section>
