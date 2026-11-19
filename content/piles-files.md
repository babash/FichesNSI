---
title: "Fiche NSI – Les piles et les files"
niveau: Tle
theme: "Structures de données"
programme: [nsi-tle-2019.structures-de-donnees.listes-piles-files, nsi-tle-2019.structures-de-donnees.interface-implementation]
ordre: 11
resume: "Pile (LIFO) et file (FIFO) : interface, deux implémentations de chacune (liste Python, liste chaînée, deux piles), coûts, usages, parenthésage tracé pas à pas."
mots_cles: [pile, file, LIFO, FIFO, empiler, dépiler, enfiler, défiler, sommet, tête, stack, queue, interface, implémentation, liste chaînée, cellule, file à deux piles, deque, parenthésage, coût]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p><strong>Pile</strong> (<em>stack</em>) : <strong>dernier entré, premier sorti</strong> (LIFO, <em>Last In, First Out</em>). Tout se passe au <strong>sommet</strong>.</p>
<svg class="schema" viewBox="0 0 250 64" width="215" height="55" role="img" aria-label="Une pile de trois éléments, 1 en bas, 3 au sommet. On empile et on dépile par le sommet.">
<g fill="#fff" stroke="#306998" stroke-width="1.5"><rect x="20" y="16" width="56" height="15"/><rect x="20" y="31" width="56" height="15"/><rect x="20" y="46" width="56" height="15"/></g>
<g font-family="Lato, Arial, sans-serif" font-size="12.8" text-anchor="middle" fill="#1f2328"><text x="48" y="27">3</text><text x="48" y="42">2</text><text x="48" y="57">1</text></g>
<g stroke="#1f2328" stroke-width="1.4" fill="none"><path d="M36 13 V2"/><path d="M32 7 L36 1 L40 7"/><path d="M60 2 V13"/><path d="M56 8 L60 14 L64 8"/><path d="M82 24 H94"/></g>
<g font-family="Lato, Arial, sans-serif" font-size="12.8" fill="#1f2328"><text x="72" y="10">empiler / dépiler</text><text x="98" y="28">sommet (dernier entré)</text><text x="84" y="58">premier entré</text></g>
</svg>
<p><strong>File</strong> (<em>queue</em>) : <strong>premier entré, premier sorti</strong> (FIFO, <em>First In, First Out</em>). On enfile à la <strong>queue</strong>, on défile à la <strong>tête</strong>.</p>
<svg class="schema" viewBox="0 0 300 46" width="258" height="40" role="img" aria-label="Une file de trois éléments : 1 en tête, à gauche, 3 en queue, à droite. On défile à la tête et on enfile à la queue.">
<g fill="#fff" stroke="#306998" stroke-width="1.5"><rect x="92" y="4" width="38" height="20"/><rect x="130" y="4" width="38" height="20"/><rect x="168" y="4" width="38" height="20"/></g>
<g font-family="Lato, Arial, sans-serif" font-size="12.8" text-anchor="middle" fill="#1f2328"><text x="111" y="18">1</text><text x="149" y="18">2</text><text x="187" y="18">3</text></g>
<g stroke="#1f2328" stroke-width="1.4" fill="none"><path d="M88 14 H60"/><path d="M66 10 L60 14 L66 18"/><path d="M246 14 H212"/><path d="M218 10 L212 14 L218 18"/></g>
<g font-family="Lato, Arial, sans-serif" font-size="12.8" fill="#1f2328"><text x="14" y="18">défiler</text><text x="252" y="18">enfiler</text><text x="98" y="40">tête</text><text x="176" y="40">queue</text></g>
</svg>
<p><strong>Usages</strong>. Pile : appels de fonctions, annuler, parenthésage. File : file d'attente, ordonnancement, parcours en largeur.</p>
</section>

<section>
<h2>L'interface (et la pile en liste Python)</h2>
<table>
<thead><tr><th>Pile</th><th>File</th><th>Pile en liste</th></tr></thead>
<tbody>
<tr><td><code>creer_pile_vide()</code></td><td><code>creer_file_vide()</code></td><td><code>[]</code></td></tr>
<tr><td><code>est_vide(p)</code></td><td><code>est_vide(f)</code></td><td><code>p == []</code></td></tr>
<tr><td><code>empiler(p, e)</code></td><td><code>enfiler(f, e)</code></td><td><code>p.append(e)</code></td></tr>
<tr><td><code>depiler(p)</code></td><td><code>defiler(f)</code></td><td><code>p.pop()</code></td></tr>
<tr><td><code>sommet(p)</code></td><td><code>tete(f)</code></td><td><code>p[-1]</code></td></tr>
<tr><td><code>taille(p)</code></td><td><code>taille(f)</code></td><td><code>len(p)</code></td></tr>
</tbody>
</table>
<p><strong>Interface</strong> : les opérations ; <strong>implémentation</strong> : leur code.</p>
</section>

<section class="exemple">
<h2>Pile en liste chaînée</h2>
<p>Une <em>cellule</em> = (valeur, cellule suivante) ; <code>None</code> marque la fin.</p>
<pre><code class="language-python">class Pile:
    def __init__(self):
        self.haut = None    # cellule du sommet
    def est_vide(self):
        return self.haut is None
    def empiler(self, e):
        self.haut = (e, self.haut)
    def depiler(self):
        e, self.haut = self.haut
        return e
</code></pre>
</section>

<section class="exemple">
<h2>File : liste ou deux piles</h2>
<p><strong>Liste</strong> : <code>append</code> et <code>pop(0)</code>, qui décale tout le reste.</p>
<p><strong>Deux piles</strong> : défiler depuis <code>sortie</code> ; si elle est vide, y verser <code>entree</code> : le premier arrivé passe au sommet.</p>
<pre data-suite><code class="language-python">class File:
    def __init__(self):
        self.entree, self.sortie = [], []
    def enfiler(self, e):
        self.entree.append(e)
    def defiler(self):
        if self.sortie == []:
            while self.entree != []:
                e = self.entree.pop()
                self.sortie.append(e)
        return self.sortie.pop()
f = File()
f.enfiler("Anli")
f.enfiler("Faïza")
print(f.defiler())
</code></pre>
<pre class="sortie"><code>Anli
</code></pre>
</section>

<section>
<h2>Les coûts</h2>
<table>
<thead><tr><th>Implémentation</th><th>Ajouter</th><th>Retirer</th></tr></thead>
<tbody>
<tr><td>pile : liste ou chaînée</td><td>constant</td><td>constant</td></tr>
<tr><td>file : liste avec <code>pop(0)</code></td><td>constant</td><td>proportionnel à <em>n</em></td></tr>
<tr><td>file : deux piles</td><td>constant</td><td>constant en moyenne</td></tr>
</tbody>
</table>
</section>

<section class="trace">
<h2>Exemple tracé : le parenthésage</h2>
<pre data-suite><code class="language-python">def bien_parenthese(texte):
    p = Pile()
    for c in texte:
        if c == "(":
            p.empiler(c)
        elif c == ")":
            if p.est_vide():
                return False
            p.depiler()
    return p.est_vide()
print(bien_parenthese("(a(b)c)"),
      bien_parenthese("(()"))
</code></pre>
<pre class="sortie"><code>True False
</code></pre>
<table>
<thead><tr><th><code>c</code></th><th>(</th><th>a</th><th>(</th><th>b</th><th>)</th><th>c</th><th>)</th></tr></thead>
<tbody><tr><td>taille de <code>p</code></td><td>1</td><td>1</td><td>2</td><td>2</td><td>1</td><td>1</td><td>0</td></tr></tbody>
</table>
<p>Avec <code>"(()"</code>, il reste une « ( » : <code>False</code>.</p>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Dépiler une pile vide : <code>IndexError: pop from empty list</code>. Tester <code>est_vide</code> avant.</li>
<li>Défiler par <code>pop()</code> : on obtient le <strong>dernier</strong> arrivé.</li>
<li>Vider la pile reçue en paramètre : celle de l'appelant est détruite (même objet). La reconstituer avec une pile auxiliaire.</li>
<li>Verser <code>entree</code> dans une <code>sortie</code> non vide : l'ordre est perdu.</li>
</ul>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Pile : LIFO, au sommet. File : FIFO, queue et tête.</li>
<li>N'utiliser que l'interface de l'énoncé (fonctions ou méthodes <code>p.empiler(e)</code>) ; <code>depiler</code> retire, <code>sommet</code> lit.</li>
<li>Pile : liste Python ou liste chaînée, coût constant. File : pas de <code>pop(0)</code> ; deux piles ou <code>deque</code>.</li>
<li>Parcourir une pile sans la perdre : une pile auxiliaire.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Écrire <code>compter(p, x)</code>, le nombre d'éléments égaux à <code>x</code> dans la pile <code>p</code> ; à la fin, <code>p</code> doit être comme au départ.</p>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers">
<pre data-suite><code class="language-python">def compter(p, x):
    aux, n = Pile(), 0
    while not p.est_vide():
        e = p.depiler()
        if e == x:
            n = n + 1
        aux.empiler(e)
    while not aux.est_vide():
        p.empiler(aux.depiler())
    return n
</code></pre>
</div>
</details>
</section>
