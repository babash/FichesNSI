---
title: "Fiche NSI – Les Listes en Python"
footer: "Fiche d'aide-mémoire - NSI Tani Mallandi"
---

<section>
<h2 data-icon="💡">Définition et Création</h2>
<p>Une liste est une collection de données ordonnée et modifiable, on parle de <strong>Mutable</strong>. Elle est reconnaissable par les crochets <strong>[]</strong> qui l'entourent. On peut y stocker des éléments de types différents (nombres, chaînes de caractères, booléens, etc.).</p>
<pre><code class="language-python"># Création une liste vide
ma_liste = []
# Création une liste avec des éléments
fruits = ["pomme", "banane", "orange"]
# Obtenir la longueur d'une liste avec len()
longueur = len(fruits)
print(f"La liste 'fruits' contient {longueur} éléments.") 
# Affiche "La liste 'fruits' contient 3 éléments."
</code></pre>
</section>

<section>
<h2 data-icon="🧭">Indexation et Accès aux éléments</h2>
<p>Chaque élément d'une liste possède une position, appelée index. En Python, ⚠️<strong>l'indexation commence à 0</strong>.</p>
<p>On peut aussi utiliser des index négatifs pour accéder aux éléments à partir de la fin de la liste. L'index -1 correspond au dernier élément, -2 à l'avant-dernier, et ainsi de suite.</p>
<pre><code class="language-python">animaux = ["chien", "chat", "oiseau", "poisson"]
# Indexation positive
print(animaux[0])   # Affiche "chien"
# Indexation négative
print(animaux[-1])  # Affiche "poisson"
# Le slicing : Extraire une partie de la liste [début:fin]
# ⚠️ La fin est exclue !
print(animaux[1:3]) # Affiche ['chat', 'oiseau']
print(animaux[2:])  # Affiche ['oiseau', 'poisson']
</code></pre>

</section>

<section>
<h2 data-icon="⚙️">Modification de la liste</h2>
<h3>Ajouter des éléments</h3>
<p><strong>append(element)</strong> : ajoute un élément à la fin de la liste.</br>
<strong>insert(index, element)</strong> : insère un élément à un index précis.</br>
<strong>extend(iterable)</strong> : ajoute tous les éléments d'un autre objet (comme une autre liste) à la fin.</p>
<pre><code class="language-python">jours = ["lundi", "mardi"]
jours.append("jeudi")
print(jours) # ['lundi', 'mardi', 'jeudi']
jours.insert(2, "mercredi")
print(jours) # ['lundi', 'mardi', 'mercredi', 'jeudi']
week_end = ["vendrei", "samedi"]
jours.extend(week_end)
print(jours)
# ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
</code></pre>

<h3>Supprimer des éléments</h3>
<strong>pop(index)</strong> : supprime l'élément à l'index donné et le renvoie. Si l'index est omis, il supprime et renvoie le dernier élément.
<pre><code class="language-python">nombres = [10, 20, 30, 40]
# Supprimer le dernier élément et le stocker
element_supprime = nombres.pop()
print(f"Élément supprimé : {element_supprime}")
# Élément supprimé : 40
print(nombres)    # [10, 30]
</code></pre>
</section>

<section>
<h2 data-icon="📜">Parcourir une liste</h2>
<p>La boucle for est l'outil principal pour parcourir une liste.</p>

<p><h3>1. Par élément :</h3> C'est la méthode la plus simple et la plus courante. On parcourt directement chaque valeur de la liste.</p>
<pre><code class="language-python">pizzas = ["reine", "calzone"]
for pizza in pizzas:
  print(pizza)
</code></pre>
<pre>Affiche :
reine
calzone
</pre>

<p><h3>2. Par index :</h3> Utile si vous avez besoin de la position de l'élément en plus de sa valeur. On utilise la fonction range(len(liste)). </p>
<pre><code class="language-python">pizzas = ["reine", "calzone"]
for i in range(len(pizzas)):
  print(f"Pizza n°{i} : {pizzas[i]}")
</code></pre>
<pre>Affiche :
Pizza n°0 : reine
Pizza n°1 : calzone
</pre>

<p><h3>3. Parcours mixte (avec enumerate) :</h3>  La méthode la plus élégante pour avoir à la fois l'index et l'élément. Elle est à privilégier par rapport à la méthode précédente.</p>
<pre><code class="language-python">pizzas = ["reine", "calzone"]
for index, pizza in enumerate(pizzas):
  print(f"Index {index} correspond à la {pizza}.")
</code></pre>
<pre>Affiche :
Index 0 correspond à la reine.
Index 1 correspond à la calzone.
</pre>
</section>

<section>
<h2 data-icon="🤔">Copier une liste</h2>
<p>⚠️ Si vous attribuez une liste à une autre variable avec le signe =, vous ne faites pas une copie ! Les deux variables pointent vers le même objet en mémoire. On appelle cela une référence.
Pour faire une vraie copie, on peut utiliser la technique du slicing ou la méthode <code>.copy()</code>.</p>
<pre><code class="language-python">liste_a = [1, 2, 3]
liste_b = liste_a  # C'est une référence, pas une copie !
liste_b.append(4)
print(liste_a) # Affiche [1, 2, 3, 4] !
liste_c = liste_a[:] # Vraie copie avec slicing
liste_c.append(5)
print(liste_a) # Affiche [1, 2, 3, 4]
print(liste_c) # Affiche [1, 2, 3, 4, 5]
</code></pre>
</section>
