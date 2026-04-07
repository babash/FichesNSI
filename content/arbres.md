---
title: "Fiche NSI – Les Arbres"
footer: "Fiche d'aide-mémoire - NSI Tani Mallandi"
---

<section>
<h2 data-icon="🌳">Vocabulaire des Arbres</h2>
<p>Un arbre est une structure hiérarchique composée de <strong>nœuds</strong>.</p>
<ul>
<li><strong>Racine :</strong> Le nœud supérieur unique.</li>
<li><strong>Feuille :</strong> Un nœud sans enfant.</li>
<li><strong>Taille :</strong> Nombre total de nœuds.</li>
<li><strong>Hauteur :</strong> Longueur du plus long chemin entre la racine et une feuille.</li>
</ul>
</section>

<section>
<h2 data-icon="⚙️">Implémentation d'un Arbre Binaire</h2>
<p>Chaque nœud possède au plus deux fils (gauche et droit).</p>
<pre><code class="language-python">class Noeud:
    def __init__(self, valeur):
        self.valeur = valeur
        self.gauche = None
        self.droit = None

# Création manuelle
racine = Noeud("A")
racine.gauche = Noeud("B")
racine.droit = Noeud("C")
</code></pre>
</section>

<section>
<h2 data-icon="🧭">Parcours d'un arbre</h2>
<p>Il existe deux grandes familles de parcours :</p>
<ol>
<li><strong>Parcours en largeur (BFS) :</strong> On parcourt étage par étage (utilise une <strong>file</strong>).</li>
<li><strong>Parcours en profondeur (DFS) :</strong>
    <ul>
    <li><strong>Préfixe :</strong> Racine, Gauche, Droit.</li>
    <li><strong>Infixe :</strong> Gauche, Racine, Droit.</li>
    <li><strong>Suffixe :</strong> Gauche, Droit, Racine.</li>
    </ul>
</li>
</ol>
<pre><code class="language-python">def parcours_prefixe(noeud):
    if noeud is not None:
        print(noeud.valeur)
        parcours_prefixe(noeud.gauche)
        parcours_prefixe(noeud.droit)
</code></pre>
</section>