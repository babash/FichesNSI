---
title: "Fiche NSI – Les fonctions en Python"
niveau: 1re
theme: "Langages et programmation"
programme: [nsi-1re-2019.langages.constructions-elementaires, nsi-1re-2019.langages.specification, nsi-1re-2019.langages.mise-au-point]
ordre: 10
resume: "Définir et appeler une fonction, paramètres et arguments, return ou print, variables locales, spécification et assertions."
mots_cles: [fonction, def, return, paramètre, argument, appel, variable locale, portée, docstring, spécification, assert, test, print]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Une <strong>fonction</strong> est un bloc de code nommé, qu'on écrit une fois et qu'on <strong>appelle</strong> autant de fois qu'on veut.</p>
<ul>
<li>Les <strong>paramètres</strong> sont les noms écrits dans le <code>def</code> ; les <strong>arguments</strong> sont les valeurs données à l'appel.</li>
<li><code>return</code> <strong>renvoie</strong> une valeur à l'endroit de l'appel et <strong>arrête</strong> la fonction. Sans <code>return</code>, la fonction renvoie <code>None</code>.</li>
<li>Les variables créées dans la fonction sont <strong>locales</strong> : elles n'existent pas en dehors.</li>
</ul>
</section>

<section class="exemple">
<h2>Exemple</h2>
<pre><code class="language-python">def prix_total(prix, quantite, remise=0):
    """Renvoie le prix à payer, en euros.
    prix et quantite : nombres positifs ;
    remise : pourcentage entre 0 et 100."""
    total = prix * quantite
    return total * (100 - remise) / 100

a_payer = prix_total(2.5, 4)
print(a_payer)
print(prix_total(2.5, 4, remise=10))
</code></pre>
<pre class="sortie"><code>10.0
9.0
</code></pre>
<p>À l'appel <code>prix_total(2.5, 4)</code>, le paramètre <code>prix</code> reçoit 2.5 et <code>quantite</code> reçoit 4 ; <code>remise</code> garde sa valeur par défaut, 0.</p>
</section>

<section>
<h2>Spécifier et tester</h2>
<p>La <strong>spécification</strong> (la chaîne de documentation, entre triples guillemets) dit ce que la fonction attend et ce qu'elle renvoie. Une <strong>assertion</strong> vérifie un résultat attendu : rien ne s'affiche si c'est juste, sinon <code>AssertionError</code>.</p>
<pre data-suite><code class="language-python">assert prix_total(10, 3) == 30
assert prix_total(10, 1, remise=50) == 5
print("Tests réussis")
</code></pre>
<pre class="sortie"><code>Tests réussis
</code></pre>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Confondre <code>print</code> et <code>return</code> : <code>print</code> affiche à l'écran, <code>return</code> donne la valeur au programme, qui peut la ranger ou la réutiliser.</li>
<li>Écrire du code après un <code>return</code> : il ne s'exécute jamais.</li>
<li>Oublier les parenthèses : <code>prix_total</code> désigne la fonction sans l'appeler.</li>
<li>Utiliser hors de la fonction une variable locale : <code>NameError</code>.</li>
<li>Donner trop ou pas assez d'arguments : <code>TypeError</code>.</li>
</ul>
<pre><code class="language-python">def double_affiche(x):
    print(2 * x)

r = double_affiche(5)
print(r)
</code></pre>
<pre class="sortie"><code>10
None
</code></pre>
<p>La fonction affiche 10 mais ne renvoie rien : <code>r</code> vaut <code>None</code>.</p>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li><code>def nom(parametres):</code> puis un bloc décalé.</li>
<li>Paramètre dans la définition, argument à l'appel.</li>
<li><code>return</code> renvoie une valeur et termine la fonction.</li>
<li>Une fonction qui calcule <strong>renvoie</strong> ; elle n'affiche pas.</li>
<li>Spécifier avec une docstring, tester avec <code>assert</code>.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Qu'affiche ce programme ?</p>
<pre><code class="language-python">def f(n):
    if n > 10:
        return "grand"
    return "petit"
    print("fin")

print(f(12), f(3))
</code></pre>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers"><code>grand petit</code> : <code>print("fin")</code> est après le dernier <code>return</code>, il ne s'exécute jamais.</div>
</details>
</section>
