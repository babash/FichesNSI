---
title: "Fiche NSI – Les Chaînes de Caractères en Python"
footer: "Fiche d'aide-mémoire - NSI Tani Mallandi"
---

<section>
<h2 data-icon="💡">Définition et Création</h2>
<p>Une <strong>chaîne de caractères</strong> (ou <code>string</code>) est une séquence ordonnée et <strong>immuable</strong> de caractères. On la reconnaît par les guillemets simples <code>''</code> ou doubles <code>""</code> qui l'entourent. Une chaîne de caractères peut contenir des lettres, des chiffres, des symboles et des espaces.</p>
<pre><code class="language-python"># Création d'une chaîne de caractères vide
ma_chaine = ""
# Création d'une chaîne avec du texte
salutation = "Bonjour le monde"
# Obtenir la longueur d'une chaîne avec len()
longueur = len(salutation)
print(f"La chaîne 'salutation' contient {longueur} caractères.") 
# Affiche "La chaîne 'salutation' contient 16 caractères."
</code></pre>
</section>

<section>
<h2 data-icon="🧭">Indexation et Accès aux éléments</h2>
<p>Chaque caractère d'une chaîne possède une position, appelée index. En Python, ⚠️<strong>l'indexation commence à 0</strong>.</p>
<p>On peut aussi utiliser des index négatifs pour accéder aux caractères à partir de la fin de la chaîne. L'index -1 correspond au dernier caractère, -2 à l'avant-dernier, et ainsi de suite.</p>
<pre><code class="language-python">mot = "Python"
# Indexation positive
print(mot[0])   # Affiche "P"
# Indexation négative
print(mot[-1])  # Affiche "n"
# Le slicing : Extraire une partie de la chaîne [début:fin]
# ⚠️ La fin est exclue !
print(mot[1:4]) # Affiche "yth"
print(mot[2:])  # Affiche "thon"
</code></pre>

</section>

<section>
<h2 data-icon="⚙️">Saisie et Traitement</h2>
<h3>Saisie avec <code>input()</code></h3>
<p>La fonction <code>input()</code> permet de demander à l'utilisateur de saisir une chaîne de caractères. Le programme s'arrête en attendant que l'utilisateur entre du texte et appuie sur Entrée. La valeur saisie est renvoyée sous forme de chaîne de caractères.</p>
<pre><code class="language-python">nom = input("Entrez votre nom : ")
print(f"Bonjour, {nom} !")
# Si l'utilisateur tape "Alice", la console affichera : "Bonjour, Alice !"
</code></pre>
<h3>Méthodes de modification de la casse</h3>
<p>Les chaînes de caractères sont <strong>immuables</strong>, ce qui signifie que vous ne pouvez pas modifier un caractère existant directement. Les méthodes suivantes renvoient une <strong>nouvelle</strong> chaîne de caractères modifiée.</p>
<p><strong>.upper()</strong> : renvoie une nouvelle chaîne avec tous les caractères en majuscules.</p>
<p><strong>.lower()</strong> : renvoie une nouvelle chaîne avec tous les caractères en minuscules.</p>
<p><strong>.capitalize()</strong> : renvoie une nouvelle chaîne avec la première lettre en majuscule.</p>
<pre><code class="language-python">chaine = "Hello World"
print(chaine.upper())    # Affiche "HELLO WORLD"
print(chaine.lower())    # Affiche "hello world"
</code></pre>
</section>

<section>
<h2 data-icon="📜">Parcourir une chaîne</h2>
<p>La boucle for est l'outil principal pour parcourir une chaîne de caractères.</p>

<p><h3>1. Par caractère :</h3> C'est la méthode la plus simple et la plus courante.</p>
<pre><code class="language-python">mot = "code"
for caractere in mot:
  print(caractere)
Affiche :
c
o
d
e
</code></pre>

<p><h3>2. Par index :</h3> Utile si vous avez besoin de la position du caractère en plus de sa valeur. On utilise la fonction range(len(chaine)).</p>
<pre><code class="language-python">mot = "code"
for i in range(len(mot)):
  print(f"Caractère n°{i} : {mot[i]}")
Affiche :
Caractère n°0 : c
Caractère n°1 : o
Caractère n°2 : d
Caractère n°3 : e
</code></pre>
</section>

<section>
<h2 data-icon="🤔">Immuabilité</h2>
<p>⚠️ Une chaîne de caractères ne peut pas être modifiée après sa création. Toutes les opérations qui semblent "modifier" une chaîne, comme le remplacement d'un caractère, créent en réalité une <strong>nouvelle</strong> chaîne en mémoire.</p>
<pre><code class="language-python">slogan = "J'adore Python"
# Cette instruction générera une erreur !
# slogan[8] = 'C'
# TypeError: 'str' object does not support item assignment
# Pour obtenir le résultat souhaité, il faut créer une nouvelle chaîne
nouveau_slogan = slogan[:8] + "le Python"
print(nouveau_slogan) # Affiche "J'adore le Python"
</code></pre>
</section>
