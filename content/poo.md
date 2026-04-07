---
title: "Fiche NSI – Programmation Orientée Objet (POO)"
footer: "Fiche d'aide-mémoire - NSI Tani Mallandi"
---

<section>
<h2 data-icon="🏗️">Le Constructeur et l'Instance</h2>
<p>La <strong>classe</strong> est le plan de construction. L'<strong>instance</strong> est l'objet réel créé à partir de ce plan.</p>
<p>Le <strong>constructeur</strong> (méthode <code>__init__</code>) est appelé automatiquement lors de la <strong>création d'une instance</strong> pour préparer l'objet.</p>
<pre><code class="language-python">class Robot:
    def __init__(self, nom, version=1.0): # Constructeur
        self.nom = nom              # Attribut passé en paramètre
        self.version = version      # Attribut avec valeur par défaut
        self.batterie = 100         # Attribut par défaut (fixe)

# Création d'une instance (instanciation)
mon_robot = Robot("R2D2") 
</code></pre>
</section>

[Image showing the relationship between a class and an instance in object oriented programming]

<section>
<h2 data-icon="📊">Les Attributs : Accès et Modification</h2>
<p>Un <strong>attribut</strong> est une variable interne à l'objet qui définit son état. On utilise la notation pointée <code>.</code> pour agir dessus.</p>
<pre><code class="language-python"># Accès à un attribut
print(mon_robot.nom)  # Affiche "R2D2"

# Modification d'un attribut
mon_robot.version = 2.0
print(mon_robot.version) # Affiche 2.0
</code></pre>
</section>

<section>
<h2 data-icon="⚙️">Les Méthodes et leur Appel</h2>
<p>Une <strong>méthode</strong> est une fonction définie à l'intérieur d'une classe. Elle représente un comportement de l'objet. Le paramètre <code>self</code> permet à la méthode d'accéder aux attributs de l'objet qui l'appelle.</p>
<pre><code class="language-python">class Robot:
    # ... (constructeur précédent) ...

    def saluer(self): # Définition d'une méthode
        print(f"Bonjour, je suis {self.nom}")

    def charger(self, energie):
        self.batterie += energie

# Appel de méthode
mon_robot.saluer()       # Affiche "Bonjour, je suis R2D2"
mon_robot.charger(20)    # Modifie l'état interne (batterie)
</code></pre>
</section>

<section>
<h2 data-icon="🧠">À retenir</h2>
<ul>
<li><strong>self</strong> : représente l'instance sur laquelle on travaille. Il doit être le 1er paramètre de chaque méthode.</li>
<li><strong>Attribut par défaut</strong> : peut être défini dans les arguments de <code>__init__</code> (ex: <code>version=1.0</code>) ou directement dans le corps du constructeur (ex: <code>self.batterie = 100</code>).</li>
<li><strong>Encapsulation</strong> : regrouper les données (attributs) et les fonctions (méthodes) au sein d'une même entité.</li>
</ul>
</section>