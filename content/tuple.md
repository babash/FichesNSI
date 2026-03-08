---
title: "Fiche NSI – Les Tuples en Python"
footer: "Fiche d'aide-mémoire - NSI Tani Mallandi"
---

<section>
<h2 data-icon="💡">Définition et Création</h2>
<p>Un <strong>tuple</strong> (ou pultet) est une collection de données <strong>ordonnée</strong> mais <strong>immuable</strong> (non modifiable). Une fois créé, on ne peut ni ajouter, ni supprimer, ni modifier ses éléments. Il est reconnaissable par les parenthèses <strong>()</strong> qui l'entourent.</p>
<pre><code class="language-python"># Création d'un tuple vide
mon_tuple = ()
# Création d'un tuple avec des éléments
point = (10, 20)
# Un tuple peut contenir des types différents
personne = ("Bob", 18, True)
# Obtenir le nombre d'éléments avec len()
taille = len(personne)
print(f"Le tuple contient {taille} éléments.") 
# Affiche "Le tuple contient 3 éléments."
</code></pre>
<p>⚠️ <strong>Attention :</strong> Pour créer un tuple avec <strong>un seul</strong> élément, il faut obligatoirement mettre une virgule : <code>mon_tuple = (5,)</code></p>
</section>

<section>
<h2 data-icon="🧭">Indexation et Accès aux éléments</h2>
<p>Comme pour les listes et les chaînes, chaque élément possède un index. ⚠️<strong>L'indexation commence à 0</strong>.</p>
<pre><code class="language-python">couleurs = ("rouge", "vert", "bleu", "jaune")
# Accès par index positif
print(couleurs[0])   # Affiche "rouge"
# Accès par index négatif
print(couleurs[-1])  # Affiche "jaune"
# Le slicing : Extraire une partie [début:fin]
print(couleurs[1:3]) # Affiche ('vert', 'bleu')
</code></pre>
</section>

<section>
<h2 data-icon="🤔">Immuabilité</h2>
<p>⚠️ Contrairement aux listes, le tuple est <strong>immuable</strong>. On ne peut pas modifier son contenu après sa création. C'est une structure sécurisée pour des données qui ne doivent pas changer (ex: coordonnées GPS, constantes).</p>
<pre><code class="language-python">triplet = (1, 2, 3)
# Cette instruction générera une erreur !
# triplet[0] = 10 
# TypeError: 'tuple' object does not support item assignment
</code></pre>
</section>

<section>
<h2 data-icon="📜">Parcourir un tuple</h2>
<p>On utilise la boucle <code>for</code> exactement comme avec une liste.</p>
<p><h3>1. Par élément :</h3> C'est la méthode la plus simple et la plus courante. On parcourt directement chaque valeur du tuple.</p>
<pre><code class="language-python">notes = (12, 15, 18)
for n in notes:
    print(n)

Affiche :
12
15
18
</code></pre>

<p><h3>2. Par index :</h3> Utile si vous avez besoin de la position de l'élément en plus de sa valeur. On utilise la fonction range(len(t)). </p>
<pre><code class="language-python">notes = (12, 15, 18)
for i in range(len(notes)):
    print(f"Note n°{i} : {notes[i]}")

Affiche :
Note n°0 : 12
Note n°2 : 15
Note n°2 : 18
</code></pre>

<p><h3>3. Parcours mixte (avec enumerate) :</h3>  La méthode la plus élégante pour avoir à la fois l'index et l'élément. Elle est à privilégier par rapport à la méthode précédente.</p>
<pre><code class="language-python">notes = (12, 15, 18)
for i, n in enumerate(notes):
    print(f"Note n°{i} : {n}")

Affiche :
Note n°0 : 12
Note n°2 : 15
Note n°2 : 18
</code></pre>
</section>

<section>
<h2 data-icon="🕵️">Vérifier la présence d'une valeur</h2>
<p>On utilise l'opérateur <strong>in</strong> pour tester si un élément appartient au tuple.</p>
<pre><code class="language-python">langages = ("Python", "C", "Java")
if "Python" in langages:
    print("Le langage est présent.")
# Affiche "Le langage est présent."
if "HTML" not in langages:
    print("Le langage n'est pas présent.")
# Affiche "Le langage n'est pas présent."
</code></pre>
</section>

<section>
<h2 data-icon="⚙️">Affectation Multiple (Unpacking)</h2>
<p>Le tuple permet d'affecter plusieurs variables d'un coup. C'est une fonctionnalité très utilisée en Python, notamment pour retourner plusieurs valeurs avec une fonction.</p>
<pre><code class="language-python"># Affectation multiple
coordonnees = (48.85, 2.35)
latitude, longitude = coordonnees
print(latitude)  # 48.85

# Échanger deux variables sans variable temporaire
a = 5
b = 10
a, b = b, a
print(a, b) # Affiche 10 5
</code></pre>
</section>
