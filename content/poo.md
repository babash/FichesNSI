---
title: "Fiche NSI – La Programmation Orientée Objet (POO)"
footer: "Fiche d'aide-mémoire - NSI Tani Mallandi"
---

<section>
<h2 data-icon="🏗️">Concepts de base</h2>
<p>La <strong>POO</strong> est un paradigme de programmation qui consiste à définir des <strong>objets</strong> représentant des entités réelles ou abstraites. Un objet regroupe des <strong>données</strong> (attributs) et des <strong>comportements</strong> (méthodes).</p>
<ul>
<li><strong>Classe :</strong> Le "plan de construction" (le moule).</li>
<li><strong>Objet :</strong> Une instance concrète créée à partir d'une classe.</li>
<li><strong>Attribut :</strong> Une variable propre à l'objet.</li>
<li><strong>Méthode :</strong> Une fonction définie dans une classe.</li>
</ul>
</section>

<section>
<h2 data-icon="🐍">Définition d'une classe</h2>
<p>On utilise le mot-clé <code>class</code>. La méthode spéciale <code>__init__</code> est le <strong>constructeur</strong> : elle initialise les attributs lors de la création de l'objet.</p>
<pre><code class="language-python">class Voiture:
    def __init__(self, marque, couleur):
        # Initialisation des attributs
        self.marque = marque
        self.couleur = couleur
        self.vitesse = 0

    def accelerer(self, valeur):
        # Une méthode pour modifier l'état de l'objet
        self.vitesse = self.vitesse + valeur

    def afficher_infos(self):
        print(f"Voiture {self.marque} de couleur {self.couleur}")
</code></pre>
</section>

<section>
<h2 data-icon="⚙️">Instanciation et Utilisation</h2>
<p>Créer un objet s'appelle l'<strong>instanciation</strong>. On accède aux attributs et méthodes avec le point <code>.</code>.</p>
<pre><code class="language-python"># Création de deux instances (objets)
ma_voiture = Voiture("Peugeot", "Bleue")
ta_voiture = Voiture("Tesla", "Rouge")

# Accès aux attributs
print(ma_voiture.marque)  # Affiche "Peugeot"

# Appel d'une méthode
ma_voiture.accelerer(30)
print(ma_voiture.vitesse) # Affiche 30
</code></pre>
<p>⚠️ <strong>Le mot-clé self :</strong> Il représente l'objet lui-même. Il est obligatoire comme premier paramètre de chaque méthode pour accéder aux attributs de l'instance.</p>
</section>