---
title: "Fiche NSI – Algorithmes Usuels"
footer: "Fiche d'aide-mémoire - NSI Tani Mallandi"
---

<section>
<h2 data-icon="🧮">Calculs sur une liste</h2>
<p>Implémentations classiques impératives utilisant des boucles <code>for</code>.</p>
<pre><code class="language-python"># Recherche du maximum
def maximum(liste):
    m = liste[0]
    for i in range(1, len(liste)):
        if liste[i] > m:
            m = liste[i]
    return m

# Calcul de la moyenne
def moyenne(liste):
    somme = 0
    for x in liste:
        somme = somme + x
    return somme / len(liste)
</code></pre>
</section>

<section>
<h2 data-icon="🔍">Recherche et Filtre</h2>
<pre><code class="language-python"># Recherche linéaire
def recherche(liste, cible):
    for i in range(len(liste)):
        if liste[i] == cible:
            return i # Retourne l'index
    return -1 # Non trouvé

# Filtrer les éléments (ex: garder les pairs)
def filtrer_pairs(liste):
    resultat = []
    for x in liste:
        if x % 2 == 0:
            resultat.append(x)
    return resultat
</code></pre>
</section>