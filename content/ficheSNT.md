---
title: "Fiche NSI – Les structures de controle élémentaires en Python"
footer: "Fiche d'aide-mémoire - NSI Tani Malandi"
---

<section>
<h2 data-icon="🔁">Les Boucles (Itérations)</h2>
<p>Les boucles permettent de répéter un bloc d'instructions. C'est essentiel pour automatiser des tâches ou parcourir des collections de données.</p>

<h3 data-icon="➡️">La Boucle <code>for</code> (Itération Définie)</h3>
<p>Elle est utilisée lorsque l'on connaît le nombre d'itérations à l'avance, souvent pour parcourir les éléments d'une séquence (comme une liste) ou un intervalle de nombres grâce à la fonction <code>range()</code>.</p>

<pre><code class="language-python"># Parcourir une séquence (liste)
prenoms = ["Alice", "Bob"]
for p in prenoms:
    print(f"Bonjour {p}")

# Affiche :
# Bonjour Alice
# Bonjour Bob
</code></pre>

<p><strong>Explication :</strong> La boucle exécute le bloc de code (ici le <code>print</code>) une fois pour chaque élément de la liste <code>prenoms</code>.</p>

<pre><code class="language-python"># Utilisation de range(n) pour répéter n fois (de 0 à n-1)
for i in range(3):
    print(f"Tour numéro {i}") # print permet d'afficher

# Affiche :
# Tour numéro 0
# Tour numéro 1
# Tour numéro 2
</code></pre>

<p><strong>Explication :</strong> <code>range(3)</code> génère la séquence 0, 1, 2. La boucle s'exécute 3 fois.</p>

<h3 data-icon="🔄">La Boucle <code>while</code> (Itération Conditionnelle)</h3>
<p>Elle s'exécute <strong>tant qu'une condition reste vraie</strong>. Il faut s'assurer que la condition devienne fausse à un moment pour éviter une <strong>boucle infinie</strong>.</p>
<pre><code class="language-python">compteur = 0
while compteur < 3:
    print(f"Compteur : {compteur}")
    # Incrémentation pour éviter la boucle infinie
    compteur = compteur + 1

# Affiche :
# Compteur : 0
# Compteur : 1
# Compteur : 2

</code></pre>

<p><strong>Explication :</strong> Le code dans le <code>while</code> s'exécute tant que la variable <code>compteur</code> est strictement inférieure à 3. À chaque tour, on augmente <code>compteur</code> de 1, ce qui permet à la boucle de se terminer.</p>
</section>

<section>
<h2 data-icon="🚦">Les Conditions (Structures Conditionnelles)</h2>
<p>Les conditions permettent d'exécuter un code <strong>uniquement si une expression est vraie</strong>.</p>

<h3 data-icon="➡️">Structure <code>if</code> (Si)</h3>
<p>Exécute un bloc de code si la condition est vraie.</p>
<pre><code class="language-python">nombre = 10
if nombre > 5:
    print("Le nombre est supérieur à 5.")

# Affiche "Le nombre est supérieur à 5."

</code></pre>

<p><strong>Explication :</strong> L'instruction <code>print</code> est exécutée car la condition <code>nombre > 5</code> est vraie.</p>

<h3 data-icon="⚖️">Structure <code>if</code>...<code>else</code> (Si...Sinon)</h3>
<p>Exécute un premier bloc de code si la condition est vraie, <strong>sinon</strong> exécute un second bloc de code.</p>
<pre><code class="language-python">age = 15
if age >= 18:
    print("Vous êtes majeur.")
else:
    print("Vous êtes mineur.")

# Affiche "Vous êtes mineur."
</code></pre>

<p><strong>Explication :</strong> La condition <code>age &gt;= 18</code> est fausse, donc le code sous le <code>else</code> est exécuté.</p>

<h3 data-icon="🔗">Structure <code>if</code>...<code>elif</code>...<code>else</code> (Si...Sinon Si...Sinon)</h3>
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

<p><strong>Explication :</strong> La première condition (<code>&gt;= 15</code>) est fausse. La deuxième (<code>elif note &gt; 10</code>) est vraie, donc le code sous le <code>elif</code> est exécuté et le reste est ignoré.</p>

</section>
