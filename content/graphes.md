---
title: "Fiche NSI – Les Graphes"
footer: "Fiche d'aide-mémoire - NSI Tani Mallandi"
---

<section>
<h2 data-icon="🕸️">Vocabulaire et Définitions</h2>
<p>Un graphe est composé de <strong>sommets</strong> (ou nœuds) reliés par des <strong>arêtes</strong> (non orienté) ou des <strong>arcs</strong> (orienté).</p>
<ul>
<li><strong>Ordre :</strong> Nombre de sommets.</li>
<li><strong>Degré :</strong> Nombre d'arêtes liées à un sommet.</li>
<li><strong>Cycle :</strong> Chemin qui revient à son point de départ.</li>
</ul>
</section>

<section>
<h2 data-icon="⚙️">Implémentations (Représentations)</h2>
<p>Il existe deux manières classiques de représenter un graphe en mémoire :</p>

<p><strong>1. Matrice d'adjacence :</strong> Un tableau 2D (0 ou 1 si lien).</p>
<pre><code class="language-python"># Graphe avec 3 sommets A(0), B(1), C(2)
matrice = [
    [0, 1, 1], # A est lié à B et C
    [1, 0, 0], # B est lié à A
    [1, 0, 0]  # C est lié à A
]
</code></pre>

<p><strong>2. Dictionnaire d'adjacence :</strong> Clés = sommets, Valeurs = listes des voisins.</p>
<pre><code class="language-python">graphe = {
    'A': ['B', 'C'],
    'B': ['A'],
    'C': ['A']
}
</code></pre>
</section>

<section>
<h2 data-icon="🧭">Algorithmes de Parcours</h2>
<ul>
<li><strong>Parcours en Largeur (BFS) :</strong> Utilise une <strong>file</strong>. Trouve le chemin le plus court (en nombre d'arêtes).</li>
<li><strong>Parcours en Profondeur (DFS) :</strong> Utilise la <strong>récursivité</strong> (ou une pile). Explore un chemin le plus loin possible avant de revenir.</li>
</ul>
</section>