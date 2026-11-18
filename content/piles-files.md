---
title: "Fiche NSI – Les piles et les files"
niveau: Tle
theme: "Structures de données"
programme: [nsi-tle-2019.structures-de-donnees.listes-piles-files, nsi-tle-2019.structures-de-donnees.interface-implementation]
ordre: 11
resume: "Pile (LIFO) et file (FIFO) : leur interface, une implémentation en Python, leurs usages ; la liste chaînée."
mots_cles: [pile, file, liste chaînée, cellule, LIFO, FIFO, empiler, dépiler, enfiler, défiler, stack, queue, interface, implémentation, deque]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Une <strong>pile</strong> et une <strong>file</strong> rangent des éléments les uns après les autres. Elles diffèrent par l'élément qui sort :</p>
<ul>
<li><strong>Pile</strong> (<em>stack</em>) : <strong>dernier entré, premier sorti</strong> (LIFO, <em>Last In, First Out</em>), comme une pile d'assiettes.</li>
<li><strong>File</strong> (<em>queue</em>) : <strong>premier entré, premier sorti</strong> (FIFO, <em>First In, First Out</em>), comme une file d'attente.</li>
</ul>
<svg class="schema" viewBox="0 0 330 92" width="330" height="92" role="img" aria-label="Une pile : on empile et on dépile par le haut. Une file : on enfile à droite et on défile à gauche.">
<g font-family="Lato, Arial, sans-serif" font-size="11" fill="#1f2328">
<rect x="20" y="30" width="60" height="18" fill="#fff" stroke="#306998"/><rect x="20" y="48" width="60" height="18" fill="#fff" stroke="#306998"/><rect x="20" y="66" width="60" height="18" fill="#fff" stroke="#306998"/>
<text x="50" y="43" text-anchor="middle">3</text><text x="50" y="61" text-anchor="middle">2</text><text x="50" y="79" text-anchor="middle">1</text>
<path d="M38 26 V8 M62 8 V26" stroke="#1f2328" stroke-width="1.5" fill="none"/><path d="M34 12 L38 6 L42 12 M58 22 L62 28 L66 22" stroke="#1f2328" fill="none"/>
<text x="95" y="14">empiler / dépiler</text><text x="95" y="28">par le sommet</text>
<rect x="175" y="48" width="36" height="22" fill="#fff" stroke="#306998"/><rect x="211" y="48" width="36" height="22" fill="#fff" stroke="#306998"/><rect x="247" y="48" width="36" height="22" fill="#fff" stroke="#306998"/>
<text x="193" y="63" text-anchor="middle">1</text><text x="229" y="63" text-anchor="middle">2</text><text x="265" y="63" text-anchor="middle">3</text>
<path d="M172 59 H156 M322 59 H288" stroke="#1f2328" stroke-width="1.5"/><path d="M160 55 L154 59 L160 63 M292 55 L286 59 L292 63" stroke="#1f2328" fill="none"/>
<text x="150" y="88">défiler</text><text x="285" y="88">enfiler</text>
</g>
</svg>
</section>

<section>
<h2>L'interface</h2>
<p>Ce sont les opérations qu'on utilise, sans savoir comment elles sont programmées (l'<strong>implémentation</strong>).</p>
<table>
<thead><tr><th>Pile</th><th>File</th><th>Rôle</th></tr></thead>
<tbody>
<tr><td><code>Pile()</code></td><td><code>File()</code></td><td>crée une structure vide</td></tr>
<tr><td><code>est_vide()</code></td><td><code>est_vide()</code></td><td>teste si elle est vide</td></tr>
<tr><td><code>empiler(x)</code></td><td><code>enfiler(x)</code></td><td>ajoute <code>x</code></td></tr>
<tr><td><code>depiler()</code></td><td><code>defiler()</code></td><td>retire et renvoie un élément</td></tr>
</tbody>
</table>
<p>Usages. Pile : annuler (Ctrl+Z), le bouton « précédent » du navigateur, les appels de fonctions. File : file d'impression, file d'attente, parcours en largeur d'un graphe.</p>
</section>

<section class="exemple">
<h2>Exemple : une pile</h2>
<pre><code class="language-python">class Pile:
    def __init__(self):
        self.contenu = []
    def est_vide(self):
        return self.contenu == []
    def empiler(self, x):
        self.contenu.append(x)    # au sommet
    def depiler(self):
        return self.contenu.pop()  # le sommet

p = Pile()
for page in ["accueil", "cours", "exercice"]:
    p.empiler(page)
print(p.depiler(), p.depiler(), p.est_vide())
</code></pre>
<pre class="sortie"><code>exercice cours False
</code></pre>
</section>

<section class="exemple">
<h2>Exemple : une file</h2>
<pre><code class="language-python">from collections import deque
f = deque()
for prenom in ["Anli", "Faïza", "Zaïna"]:
    f.append(prenom)              # enfiler
print(f.popleft(), f.popleft())   # défiler
</code></pre>
<pre class="sortie"><code>Anli Faïza
</code></pre>
<p><code>deque</code> retire au début en temps constant ; <code>t.pop(0)</code> sur une liste décale tous les éléments.</p>
</section>

<section>
<h2>Et la liste chaînée ?</h2>
<p>Une <strong>liste chaînée</strong> (une implémentation du type abstrait liste) est une suite de <em>cellules</em> : chacune contient une valeur et désigne la suivante. Ajouter en tête est immédiat ; atteindre le <em>n</em>-ième élément demande de passer par les précédents.</p>
<pre><code class="language-python">class Cellule:
    def __init__(self, valeur, suivante):
        self.valeur = valeur
        self.suivante = suivante

liste = Cellule(1, Cellule(2, Cellule(3, None)))
print(liste.valeur, liste.suivante.valeur)
</code></pre>
<pre class="sortie"><code>1 2
</code></pre>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Dépiler une pile vide : <code>IndexError: pop from empty list</code>. Tester <code>est_vide()</code> avant.</li>
<li>Confondre LIFO et FIFO : la pile rend le <strong>dernier</strong> arrivé, la file le <strong>premier</strong>.</li>
<li>Lire <code>p.contenu</code> directement : on passe par l'interface, pour pouvoir changer d'implémentation sans changer le reste du programme.</li>
<li>Confondre le type <code>list</code> de Python, qui est un <strong>tableau</strong>, et la liste chaînée.</li>
</ul>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Pile : LIFO, empiler et dépiler au sommet.</li>
<li>File : FIFO, enfiler à la fin, défiler au début.</li>
<li>L'interface dit <strong>quoi</strong> ; l'implémentation dit <strong>comment</strong>.</li>
<li>Avant de retirer, vérifier que la structure n'est pas vide.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Sur une pile vide, on fait : empiler 1, empiler 2, empiler 3, dépiler, empiler 4, dépiler, dépiler. Quels éléments sortent, dans l'ordre ? Et avec une file (enfiler, défiler) ?</p>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers">Pile : 3, 4, 2 (il reste 1). File : 1, 2, 3 (il reste 4).</div>
</details>
</section>
