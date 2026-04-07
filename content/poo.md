---
title: "Fiche NSI – Programmation Orientée Objet (POO)"
footer: "Fiche d'aide-mémoire - NSI Tani Mallandi"
---

<section>
<h2 data-icon="💡">Concept et Définition</h2>
<p>La <strong>POO</strong> (Programmation Orientée Objet) est un <strong>paradigme de programmation</strong> qui consiste à définir des "objets" informatiques. Au lieu de voir un programme comme une simple suite d'instructions, on le conçoit comme une interaction entre des entités autonomes.</p>

<strong>L'analogie du Robot :</strong>

<p>-><strong>La Classe (Le Plan) :</strong> C'est le schéma technique à l'usine. Il définit que tout robot <em>doit</em> avoir un nom et une batterie, et <em>sait</em> marcher. Ce n'est pas encore un robot réel, c'est un <strong>nouveau type</strong> de donnée que vous créez.</p>
<p>-><strong>L'Objet ou Instance (Le Robot réel) :</strong> C'est l'unité qui sort de l'usine. On peut créer des "jumeaux" issus du même plan : deux robots identiques au départ, mais qui mèneront leur propre vie.</p>
<p>-><strong>L'Attribut (Caractéristique) :</strong> Ce sont les propriétés du robot (son nom, son niveau de batterie). Même s'ils ont le même constructeur, un robot peut être à 100% de batterie et l'autre à 10%.</p>
<p>-><strong>La Méthode (Action) :</strong> Ce sont les capacités du robot (marcher, saluer). C'est une fonction interne à l'objet.</p>
<p>-><strong>Le Constructeur (L'assemblage) :</strong> C'est l'étape de fabrication qui donne ses caractéristiques initiales au robot au moment où il "naît".</p>

</section>

<section>
<h2 data-icon="🏗️">Le Constructeur</h2>
<p>En Python, le constructeur s'appelle <code>__init__</code>, il permet de donner une valeur aux attributs d'un objet. Il est appelé à la création de chaque objet.C'est ici que l'on transforme le plan en un objet concret avec ses propres valeurs.</p>
<pre><code class="language-python">class Robot:
    def __init__(self, nom, version=1.0):
        # Initialisation des attributs (état de l'objet)
        self.nom = nom        # Passé à l'assemblage
        self.v = version      # Valeur par défaut
        self.batt = 100       # Valeur fixe au départ
</code></pre>

<p>Contrairement aux autres méthodes, on ne l'appelle jamais manuellement (on n'écrit pas <code>robot.__init__()</code>) : Python l'exécute <strong>automatiquement</strong> en arrière-plan au moment précis où l'on crée l'objet (en utilisant le nom de la classe <code>Robot()</code>)pour garantir qu'il naisse dans un état valide.</p>
</section>

<section>
<h2 data-icon="🏗️">Création d'objet (Instanciation)</h2>
<p>Pour cree un objet on utilise <strong>le nom de la classe</strong> comme si c'etait une fonction. La fonction véritablenment appelé est <code>__init__</code> mais on ne l'appelle jamais explicitement.</p>

<strong>Creation d'objet</strong>
<p>Création de "jumeaux" (Appel automatique de __init__).</p>
<pre><code class="language-python">robot_A = Robot("R2D2")
robot_B = Robot("R2D2")
robot_C = Robot("C3PO", 4.0)
</code></pre>

<strong>Indépendance des objets</strong>
<p>Ils sont du même type (Robot) mais sont des objets distincts.</p>
<pre><code class="language-python">robot_A.batt = 20  # Robot_A est déchargé, mais pas Robot_B !
print(robot_A.batt) # Affiche 20
print(robot_B.batt) # Affiche 100
</code></pre>
</section>


<section>
<h2 data-icon="📊">Les Attributs : Accès et Modification</h2>
<p>Un <strong>attribut</strong> est une variable interne à l'objet qui définit son état. On utilise la notation pointée <code>.</code> pour agir dessus. On trouve usuellement les attributs dans le constructeur (__init__).</p>
<pre><code class="language-python"># Accès à un attribut
print(mon_robot.nom)  # Affiche "R2D2"
</code></pre>
<pre><code class="language-python"># Modification d'un attribut
mon_robot.v = 2.0
print(mon_robot.v) # Affiche 2.0
</code></pre>
</section>

<section>
<h2 data-icon="⚙️">Les Méthodes et leurs Appels</h2>
<p>Une <strong>méthode</strong> est une fonction définie à l'intérieur d'une classe. Elle représente un comportement de l'objet. Le paramètre <code>self</code> permet à la méthode d'accéder aux attributs de l'objet qui l'appelle.</p>

<strong>Définition de méthode</strong>
<pre><code class="language-python">class Robot:
    def __init__(self, nom, version=1.0):
        # Initialisation des attributs (état de l'objet)
        self.nom = nom        # Passé à l'assemblage
        self.v = version      # Valeur par défaut
        self.batt = 100       # Valeur fixe au départ

    def saluer(self): # Définition d'une méthode
        print(f"Bonjour, je suis {self.nom}")

    def charger(self, energie):
        self.batt += energie
</code></pre>

<strong>Appel de méthode</strong>
<p>Voyons maintenant un exemple d'appel de la méthode.</p>
<pre><code class="language-python"># Appel de méthode
mon_robot.saluer()       # Affiche "Bonjour, je suis R2D2"
mon_robot.charger(20)    # Modifie l'état interne (batterie)
</code></pre>
</section>

<section>
<h2 data-icon="🆔">Comprendre le mot-clé "self"</h2>
<p><strong>Self</strong> représente l'instance elle-même (le "moi"). C'est le lien entre le code générique de la classe et l'objet spécifique en mémoire.</p>
<p>-><strong>Pourquoi est-il partout ?</strong> Dans la classe, Python ne sait pas encore quel robot va appeler la méthode. <code>self</code> dit : "Applique cette action sur l'objet qui m'a appelé".</p>
<p>-><strong>Le paramètre invisible :</strong> Il doit être le <strong>premier argument</strong> de chaque méthode dans la classe, mais on ne lui passe <strong>jamais</strong> de valeur lors de l'appel.</p>
</ul>
<pre><code class="language-python">def afficher_nom(self):
    # Sans "self.", Python chercherait une variable locale
    # Avec "self.", il va chercher l'attribut DANS l'objet.
    print(f"Mon nom est {self.nom}")
</code></pre>
<p><strong>Self</strong> n'est jamais utilisé en dehors de la clqasse (en dehors des méthodes).</p>
<pre><code class="language-python">robot_A.afficher_nom() 
# Python fait secrètement : afficher_nom(robot_A)
</code></pre>
</section>