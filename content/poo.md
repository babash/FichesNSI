---
title: "Fiche NSI – La programmation orientée objet"
niveau: Tle
theme: "Structures de données"
programme: nsi-tle-2019.structures-de-donnees.poo
ordre: 10
resume: "Classe, objet (instance), attributs, méthodes, constructeur __init__ et rôle de self."
mots_cles: [POO, objet, classe, instance, attribut, méthode, constructeur, __init__, self, interface, encapsulation]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Une <strong>classe</strong> définit un nouveau type : c'est le plan. Un <strong>objet</strong> (une <strong>instance</strong>) est fabriqué à partir de ce plan ; on peut en créer autant qu'on veut, chacun avec ses propres valeurs.</p>
<table>
<tbody>
<tr><td><strong>attribut</strong></td><td>une donnée de l'objet : <code>b1.passagers</code></td></tr>
<tr><td><strong>méthode</strong></td><td>une fonction de la classe, appelée sur un objet : <code>b1.embarquer(120)</code></td></tr>
<tr><td><strong>constructeur</strong></td><td>la méthode <code>__init__</code>, appelée automatiquement par <code>Barge(...)</code> : elle donne leur valeur de départ aux attributs</td></tr>
<tr><td><code>self</code></td><td>le premier paramètre de chaque méthode : l'objet sur lequel la méthode travaille</td></tr>
</tbody>
</table>
<p>L'<strong>interface</strong> d'une classe, ce sont ses méthodes : on s'en sert sans connaître son code (l'<strong>implémentation</strong>).</p>
</section>

<section class="exemple">
<h2>Exemple : une barge (fictive)</h2>
<pre><code class="language-python">class Barge:
    def __init__(self, nom, capacite):
        self.nom = nom
        self.capacite = capacite
        self.passagers = 0

    def embarquer(self, n):
        if self.passagers + n &lt;= self.capacite:
            self.passagers = self.passagers + n
            return True
        return False

    def places_libres(self):
        return self.capacite - self.passagers

b1 = Barge("Barge 1", 300)
b2 = Barge("Barge 2", 250)
print(b1.embarquer(120), b1.embarquer(200))
print(b1.passagers, b1.places_libres(),
      b2.passagers)
</code></pre>
<pre class="sortie"><code>True False
120 180 0
</code></pre>
</section>

<section class="trace">
<h2>Ce qui se passe</h2>
<ol>
<li><code>Barge("Barge 1", 300)</code> crée un objet, puis appelle <code>__init__(objet, "Barge 1", 300)</code> : <code>self</code> est le nouvel objet.</li>
<li><code>b1.embarquer(120)</code> est traduit en <code>Barge.embarquer(b1, 120)</code> : 0 + 120 ≤ 300, donc 120 passagers.</li>
<li><code>b1.embarquer(200)</code> : 120 + 200 > 300, l'objet ne change pas.</li>
<li><code>b2</code> a ses propres attributs : ses passagers restent à 0.</li>
</ol>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Oublier <code>self</code> dans la définition : <code>def places_libres():</code> provoque <code>TypeError: Barge.places_libres() takes 0 positional arguments but 1 was given</code>.</li>
<li>Oublier <code>self.</code> devant un attribut : <code>return capacite - passagers</code> provoque <code>NameError</code>.</li>
<li>Confondre la classe et l'objet : <code>Barge.passagers</code> provoque <code>AttributeError</code> ; c'est <code>b1.passagers</code>.</li>
<li>Donner une valeur à <code>self</code> dans l'appel : on écrit <code>b1.embarquer(5)</code>, jamais <code>b1.embarquer(b1, 5)</code>.</li>
<li>Croire que <code>b3 = b1</code> crée un nouvel objet : <code>b3</code> et <code>b1</code> désignent le même.</li>
</ul>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li><code>class Nom:</code> définit le type ; <code>Nom(...)</code> crée un objet.</li>
<li><code>__init__</code> initialise les attributs, avec <code>self.attribut = ...</code>.</li>
<li>Chaque méthode a <code>self</code> en premier paramètre, mais on ne le donne pas à l'appel.</li>
<li>Notation pointée : <code>objet.attribut</code> et <code>objet.methode(...)</code>.</li>
<li>Chaque objet a ses propres valeurs d'attributs.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Qu'affiche ce programme ?</p>
<pre><code class="language-python">class Compteur:
    def __init__(self):
        self.valeur = 0

    def ajouter(self):
        self.valeur = self.valeur + 1

a = Compteur()
b = Compteur()
a.ajouter()
a.ajouter()
b.ajouter()
print(a.valeur, b.valeur)
</code></pre>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers"><code>2 1</code> : <code>a</code> et <code>b</code> sont deux objets distincts, chacun avec son attribut <code>valeur</code>.</div>
</details>
</section>
