---
title: "Fiche NSI – Piles et Files"
footer: "Fiche d'aide-mémoire - NSI Tani Mallandi"
---

<section>
<h2 data-icon="📚">La Pile (Stack - LIFO)</h2>
<p>Le dernier élément ajouté est le premier à sortir (<strong>Last In, First Out</strong>). Analogie : une pile d'assiettes.</p>
<ul>
<li><strong>Empiler (push) :</strong> Ajouter au sommet.</li>
<li><strong>Dépiler (pop) :</strong> Retirer le sommet.</li>
</ul>
<pre><code class="language-python"># Implémentation avec une liste
pile = []
pile.append(10)  # Empiler
pile.append(20)
sommet = pile.pop() # Dépiler -> renvoie 20
</code></pre>
</section>

<section>
<h2 data-icon="⏳">La File (Queue - FIFO)</h2>
<p>Le premier élément ajouté est le premier à sortir (<strong>First In, First Out</strong>). Analogie : une file d'attente au guichet.</p>
<ul>
<li><strong>Enfiler (enqueue) :</strong> Ajouter à la fin.</li>
<li><strong>Défiler (dequeue) :</strong> Retirer du début.</li>
</ul>
<pre><code class="language-python"># Implémentation avec une liste
file = []
file.append("Client 1") # Enfiler
file.append("Client 2")
prochain = file.pop(0)  # Défiler -> renvoie "Client 1"
</code></pre>
</section>

<section>
<h2 data-icon="⚙️">Opérations usuelles</h2>
<p>Quelle que soit la structure, on doit pouvoir tester si elle est vide et connaître sa taille.</p>
<pre><code class="language-python">def est_vide(s):
    return len(s) == 0

def taille(s):
    return len(s)
</code></pre>
</section>