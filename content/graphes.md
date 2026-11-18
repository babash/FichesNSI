---
title: "Fiche NSI – Les graphes"
niveau: Tle
theme: "Structures de données"
programme: [nsi-tle-2019.structures-de-donnees.graphes, nsi-tle-2019.algorithmique.graphes]
ordre: 13
resume: "Sommets, arêtes, voisins, chemins ; matrice et listes d'adjacence ; parcours en largeur (file) et en profondeur (récursivité)."
mots_cles: [graphe, sommet, arête, arc, orienté, pondéré, voisin, degré, chemin, cycle, connexe, matrice d'adjacence, liste d'adjacence, parcours en largeur, parcours en profondeur, BFS, DFS]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Un <strong>graphe</strong> est fait de <strong>sommets</strong> reliés par des <strong>arêtes</strong>. Si les liens ont un sens, le graphe est <strong>orienté</strong> et on parle d'<strong>arcs</strong>. S'ils portent un nombre (une distance, une durée), il est <strong>pondéré</strong>.</p>
<ul>
<li><strong>Voisins</strong> : deux sommets reliés par une arête. Le <strong>degré</strong> d'un sommet est son nombre de voisins.</li>
<li><strong>Chemin</strong> : une suite de sommets voisins. Un <strong>cycle</strong> est un chemin qui revient à son départ.</li>
<li>Un graphe est <strong>connexe</strong> si un chemin relie chaque paire de sommets. L'<strong>ordre</strong> d'un graphe est son nombre de sommets.</li>
</ul>
</section>

<section>
<h2>Un graphe et ses représentations</h2>
<svg class="schema" viewBox="0 0 308 156" width="308" height="156" role="img" aria-label="Graphe : Koungou relié à Mamoudzou ; Mamoudzou relié à Ouangani et à Dembéni ; Ouangani relié à Sada ; Sada relié à Chirongui ; Chirongui relié à Dembéni.">
<g stroke="#306998" stroke-width="1.6"><line x1="150" y1="20" x2="232" y2="55"/><line x1="232" y1="55" x2="125" y2="72"/><line x1="232" y1="55" x2="215" y2="118"/><line x1="125" y1="72" x2="45" y2="105"/><line x1="45" y1="105" x2="128" y2="135"/><line x1="128" y1="135" x2="215" y2="118"/></g>
<g fill="#ffd43b" stroke="#1f2328"><circle cx="150" cy="20" r="5"/><circle cx="232" cy="55" r="5"/><circle cx="125" cy="72" r="5"/><circle cx="215" cy="118" r="5"/><circle cx="45" cy="105" r="5"/><circle cx="128" cy="135" r="5"/></g>
<g font-family="Lato, Arial, sans-serif" font-size="11" fill="#1f2328"><text x="158" y="16">Koungou</text><text x="241" y="51">Mamoudzou</text><text x="96" y="64">Ouangani</text><text x="222" y="132">Dembéni</text><text x="8" y="96">Sada</text><text x="96" y="149">Chirongui</text></g>
</svg>
<p>Réseau simplifié, sans valeur géographique. Avec un <strong>dictionnaire d'adjacence</strong> (chaque sommet donne la liste de ses voisins) :</p>
<pre><code class="language-python">g = {"Mamoudzou": ["Koungou", "Dembéni",
                   "Ouangani"],
     "Koungou": ["Mamoudzou"],
     "Dembéni": ["Mamoudzou", "Chirongui"],
     "Ouangani": ["Mamoudzou", "Sada"],
     "Sada": ["Ouangani", "Chirongui"],
     "Chirongui": ["Dembéni", "Sada"]}
</code></pre>
<p>Avec une <strong>matrice d'adjacence</strong>, les sommets sont numérotés et <code>m[i][j]</code> vaut 1 s'il y a une arête de <code>i</code> à <code>j</code>, 0 sinon. Non orienté : la matrice est symétrique.</p>
</section>

<section class="exemple">
<h2>Les deux parcours</h2>
<pre data-suite><code class="language-python">from collections import deque
def largeur(g, depart):
    vus = [depart]
    file = deque([depart])
    while len(file) > 0:
        s = file.popleft()
        for v in g[s]:
            if v not in vus:
                vus.append(v)
                file.append(v)
    return vus
def profondeur(g, s, vus=None):
    if vus is None:
        vus = []
    vus.append(s)
    for v in g[s]:
        if v not in vus:
            profondeur(g, v, vus)
    return vus

print(largeur(g, "Mamoudzou"))
print(profondeur(g, "Mamoudzou"))
</code></pre>
<pre class="sortie"><code>['Mamoudzou', 'Koungou', 'Dembéni', 'Ouangani', 'Chirongui', 'Sada']
['Mamoudzou', 'Koungou', 'Dembéni', 'Chirongui', 'Sada', 'Ouangani']
</code></pre>
<p><strong>Largeur</strong> : les voisins (distance 1), puis leurs voisins (distance 2)… <strong>Profondeur</strong> : le plus loin possible, puis retour en arrière.</p>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Oublier de noter les sommets déjà vus : à cause des cycles, le parcours tourne sans fin (<code>RecursionError</code> en profondeur).</li>
<li>Confondre les outils : <strong>largeur = file</strong>, <strong>profondeur = pile</strong> (ou récursivité).</li>
<li>Dans un graphe non orienté, n'écrire l'arête que dans un sens.</li>
<li>Écrire <code>vus=[]</code> comme valeur par défaut : la même liste resterait d'un appel à l'autre. D'où <code>vus=None</code>.</li>
</ul>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Représentations : matrice d'adjacence ou dictionnaire de listes de voisins.</li>
<li>Parcours en largeur : une file ; il donne les plus courts chemins en nombre d'arêtes.</li>
<li>Parcours en profondeur : récursivité (ou une pile).</li>
<li>Toujours marquer les sommets visités.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Quel est le degré de Mamoudzou ? Dans quel ordre le parcours en largeur depuis Sada visite-t-il les sommets ?</p>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers">Degré 3. Largeur depuis Sada : Sada, Ouangani, Chirongui, Mamoudzou, Dembéni, Koungou.</div>
</details>
</section>
