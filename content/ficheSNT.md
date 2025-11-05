---
title: "Fiche NSI – Les structures de controle élémentaires en Python"
footer: "Fiche d'aide-mémoire - NSI Tani Malandi"
---

<section>
<h2 data-icon="🔁">Les Boucles (Itérations)</h2>
<p>Les boucles permettent de répéter un bloc d'instructions. C'est essentiel pour automatiser des tâches ou parcourir des collections de données.</p>

<h3 data-icon="➡️">La Boucle `for` (Itération Définie)</h3>
<p>Elle est utilisée lorsque l'on connaît le nombre d'itérations à l'avance, souvent pour parcourir les éléments d'une séquence (comme une liste) ou un intervalle de nombres grâce à la fonction `range()`.</p>

<pre><code class="language-python"># Parcourir une séquence (liste)
prenoms = ["Alice", "Bob"]
for p in prenoms:
    print(f"Bonjour {p}")

# Affiche :
# Bonjour Alice
# Bonjour Bob
</code></pre>

<p><strong>Explication :</strong> La boucle exécute le bloc de code (ici le `print`) une fois pour chaque élément de la liste `prenoms`.</p>

<pre><code class="language-python"># Utilisation de range(n) pour répéter n fois (de 0 à n-1)
for i in range(3):
    print(f"Tour numéro {i}") # print permet d'afficher

# Affiche :
# Tour numéro 0
# Tour numéro 1
# Tour numéro 2
</code></pre>

<p><strong>Explication :</strong> `range(3)` génère la séquence 0, 1, 2. La boucle s'exécute 3 fois.</p>

<h3 data-icon="🔄">La Boucle `while` (Itération Conditionnelle)</h3>
<p>Elle s'exécute <strong>tant qu'une condition reste vraie</strong>. Il faut s'assurer que la condition devienne fausse à un moment pour éviter une <strong>boucle infinie</strong>.</p>
<pre><code class="language-python">compteur = 0
while compteur < 3:
    print(f"Compteur : {compteur}")
    compteur = compteur + 1 # Incrémentation pour éviter la boucle infinie

# Affiche :
# Compteur : 0
# Compteur : 1
# Compteur : 2
</code></pre>

<p><strong>Explication :</strong> Le code dans le `while` s'exécute tant que la variable `compteur` est strictement inférieure à 3. À chaque tour, on augmente `compteur` de 1, ce qui permet à la boucle de se terminer.</p>
</section>

<section>
<h2 data-icon="🚦">Les Conditions (Structures Conditionnelles)</h2>
<p>Les conditions permettent d'exécuter un code <strong>uniquement si une expression est vraie</strong>.</p>

<h3 data-icon="➡️">Structure `if` (Si)</h3>
<p>Exécute un bloc de code si la condition est vraie.</p>
<pre><code class="language-python">nombre = 10
if nombre > 5:
    print("Le nombre est supérieur à 5.")

# Affiche "Le nombre est supérieur à 5."
</code></pre>

<p><strong>Explication :</strong> L'instruction `print` est exécutée car la condition `nombre > 5` est vraie.</p>

<h3 data-icon="⚖️">Structure `if`...`else` (Si...Sinon)</h3>
<p>Exécute un premier bloc de code si la condition est vraie, <strong>sinon</strong> exécute un second bloc de code.</p>
<pre><code class="language-python">age = 15
if age >= 18:
    print("Vous êtes majeur.")
else:
    print("Vous êtes mineur.")

# Affiche "Vous êtes mineur."
<\code><\pre>

<p><strong>Explication :</strong> La condition `age >= 18` est fausse, donc le code sous le `else` est exécuté.</p>

<h3 data-icon="🔗">Structure `if`...`elif`...`else` (Si...Sinon Si...Sinon)</h3>
<p>Permet de tester <strong>plusieurs conditions</strong> en séquence.</p>
<pre><code class="language-python">note = 12
if note >= 15:
    print("Très bien")
elif note >= 10:
    print("Bien")
else:
    print("Insuffisant")

# Affiche "Bien"
</code></pre>

<p><strong>Explication :</strong> La première condition (`>= 15`) est fausse. La deuxième (`elif note > 10`) est vraie, donc le code sous le `elif` est exécuté et le reste est ignoré.</p>

</section>