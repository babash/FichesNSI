---
title: "Fiche NSI – Le parcours séquentiel d'un tableau"
niveau: 1re
theme: "Algorithmique"
programme: nsi-1re-2019.algorithmique.parcours-sequentiel
ordre: 40
resume: "Les algorithmes usuels : chercher une valeur, compter, calculer un maximum ou une moyenne ; coût linéaire."
mots_cles: [parcours séquentiel, recherche, maximum, minimum, moyenne, somme, compter, occurrence, accumulateur, coût linéaire, complexité, algorithmes usuels]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Un <strong>parcours séquentiel</strong> examine les éléments d'un tableau un par un, du premier au dernier. Il sert à <strong>chercher</strong> une valeur, <strong>compter</strong>, calculer une <strong>somme</strong>, une <strong>moyenne</strong>, un <strong>maximum</strong>.</p>
<p>Une variable, l'<strong>accumulateur</strong>, garde le résultat partiel : on l'initialise <strong>avant</strong> la boucle, on la met à jour <strong>dans</strong> la boucle, on la renvoie <strong>après</strong>.</p>
<p><strong>Coût linéaire</strong> : pour un tableau de <em>n</em> éléments, au plus <em>n</em> tours de boucle. Un tableau deux fois plus grand demande environ deux fois plus de temps.</p>
</section>

<section class="exemple">
<h2>Les algorithmes à savoir écrire</h2>
<pre><code class="language-python">def maximum(t):
    m = t[0]
    for x in t:
        if x > m:
            m = x
    return m

def moyenne(t):
    s = 0
    for x in t:
        s = s + x
    return s / len(t)

def indice(t, v):
    for i in range(len(t)):
        if t[i] == v:
            return i   # trouvé : on s'arrête
    return -1          # tout parcouru : absent
</code></pre>
<pre data-suite><code class="language-python">pluie = [12, 0, 35, 8, 35]   # mm par jour
print(maximum(pluie), moyenne(pluie))
print(indice(pluie, 35), indice(pluie, 4))
</code></pre>
<pre class="sortie"><code>35 18.0
2 -1
</code></pre>
</section>

<section class="trace">
<h2>Trace de maximum(pluie)</h2>
<table>
<thead><tr><th><code>x</code></th><th>départ</th><th>12</th><th>0</th><th>35</th><th>8</th><th>35</th></tr></thead>
<tbody><tr><td><code>m</code></td><td>12</td><td>12</td><td>12</td><td>35</td><td>35</td><td>35</td></tr></tbody>
</table>
<p><code>indice(pluie, 35)</code> renvoie <code>2</code> : le premier 35 rencontré. Le <code>return</code> arrête la fonction, le reste du tableau n'est pas lu.</p>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Initialiser le maximum à <code>0</code> : faux si toutes les valeurs sont négatives. Partir de <code>t[0]</code>.</li>
<li>Écrire <code>return -1</code> dans un <code>else</code> à l'intérieur de la boucle : la fonction s'arrête dès le premier élément.</li>
<li>Oublier le tableau vide : <code>t[0]</code> provoque <code>IndexError</code>, <code>s / len(t)</code> provoque <code>ZeroDivisionError</code>.</li>
<li>Confondre l'indice <code>i</code> et la valeur <code>t[i]</code>.</li>
</ul>
<pre><code class="language-python">def indice_faux(t, v):
    for i in range(len(t)):
        if t[i] == v:
            return i
        else:
            return -1

print(indice_faux([12, 0, 35], 35))
</code></pre>
<pre class="sortie"><code>-1
</code></pre>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Initialiser avant la boucle, mettre à jour dedans, renvoyer après.</li>
<li>Maximum : partir du premier élément.</li>
<li>Recherche : <code>return</code> dès qu'on trouve, <code>return -1</code> (ou <code>False</code>) <strong>après</strong> la boucle.</li>
<li>Coût linéaire : proportionnel à la taille du tableau.</li>
<li>Python a <code>max</code>, <code>sum</code> et <code>in</code>, mais il faut savoir les écrire avec une boucle.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Que renvoie <code>f([4, 7, 10, 3])</code> ? Que calcule <code>f</code> ?</p>
<pre><code class="language-python">def f(t):
    c = 0
    for x in t:
        if x % 2 == 0:
            c = c + 1
    return c
</code></pre>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers"><code>2</code> : <code>f</code> compte les nombres pairs du tableau (4 et 10).</div>
</details>
</section>
