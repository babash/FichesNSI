---
title: "Fiche NSI – Les bases de données et le langage SQL"
niveau: Tle
theme: "Bases de données"
programme: [nsi-tle-2019.bases-de-donnees.modele-relationnel, nsi-tle-2019.bases-de-donnees.base-relationnelle, nsi-tle-2019.bases-de-donnees.sql]
ordre: 20
resume: "Modèle relationnel (relation, attribut, clés primaire et étrangère) ; requêtes SELECT, WHERE, ORDER BY, JOIN, fonctions d'agrégation ; INSERT, UPDATE, DELETE."
mots_cles: [SQL, base de données, relation, table, attribut, domaine, clé primaire, clé étrangère, schéma relationnel, SGBD, SELECT, WHERE, JOIN, ORDER BY, DISTINCT, COUNT, INSERT, UPDATE, DELETE, jointure]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Une base de données <strong>relationnelle</strong> range ses données dans des <strong>relations</strong> (des tables). Une colonne est un <strong>attribut</strong>, avec un <strong>domaine</strong> (son type) ; une ligne, un <strong>enregistrement</strong>.</p>
<ul>
<li><strong>Clé primaire</strong> (soulignée) : un attribut qui identifie chaque ligne ; deux lignes ne peuvent pas avoir la même valeur.</li>
<li><strong>Clé étrangère</strong> (précédée de #) : un attribut qui fait référence à la clé primaire d'une autre relation.</li>
<li>Le <strong>SGBD</strong> (système de gestion de bases de données) vérifie ces contraintes et gère les accès simultanés.</li>
</ul>
<p><strong>Schéma relationnel</strong> de l'exemple (données fictives) :<br>
eleve (<u>id</u>, prenom, age, #id_classe), à gauche ;<br>
classe (<u>id</u>, nom, salle), à droite.</p>
<table>
<thead><tr><th>id</th><th>prenom</th><th>age</th><th>id_classe</th><th style="border-left: 3px solid #1f2328">id</th><th>nom</th><th>salle</th></tr></thead>
<tbody>
<tr><td>1</td><td>Anli</td><td>16</td><td>1</td><td style="border-left: 3px solid #1f2328">1</td><td>1G1</td><td>B12</td></tr>
<tr><td>2</td><td>Faïza</td><td>17</td><td>1</td><td style="border-left: 3px solid #1f2328">2</td><td>TG2</td><td>C04</td></tr>
<tr><td>3</td><td>Zaïna</td><td>18</td><td>2</td><td colspan="3" style="border-left: 3px solid #1f2328"></td></tr>
<tr><td>4</td><td>Nassim</td><td>17</td><td>2</td><td colspan="3" style="border-left: 3px solid #1f2328"></td></tr>
<tr><td>5</td><td>Moinécha</td><td>16</td><td>1</td><td colspan="3" style="border-left: 3px solid #1f2328"></td></tr>
</tbody>
</table>
</section>

<section class="exemple">
<h2>Interroger : SELECT</h2>
<pre data-base="lycee"><code class="language-sql">SELECT prenom, age FROM eleve
WHERE age >= 17
ORDER BY age DESC, prenom;
</code></pre>
<pre class="sortie" data-titre="Résultat"><code>prenom | age
Zaïna | 18
Faïza | 17
Nassim | 17
</code></pre>
<pre data-base="lycee"><code class="language-sql">SELECT COUNT(*), MAX(age) FROM eleve
WHERE id_classe = 1;
</code></pre>
<pre class="sortie" data-titre="Résultat"><code>COUNT(*) | MAX(age)
3 | 17
</code></pre>
<p>Fonctions d'agrégation : <code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code>. <code>SELECT DISTINCT age</code> retire les doublons.</p>
</section>

<section class="exemple">
<h2>Relier deux tables : JOIN</h2>
<pre data-base="lycee"><code class="language-sql">SELECT eleve.prenom, classe.nom
FROM eleve
JOIN classe ON eleve.id_classe = classe.id
WHERE classe.salle = 'C04'
ORDER BY eleve.prenom;
</code></pre>
<pre class="sortie" data-titre="Résultat"><code>prenom | nom
Nassim | TG2
Zaïna | TG2
</code></pre>
<p>La condition <code>ON</code> associe chaque élève à <strong>sa</strong> classe : clé étrangère = clé primaire.</p>
</section>

<section class="exemple">
<h2>Modifier : INSERT, UPDATE, DELETE</h2>
<pre data-base="lycee"><code class="language-sql">INSERT INTO eleve (id, prenom, age, id_classe)
VALUES (6, 'Saïd', 15, 1);
UPDATE eleve SET age = 17 WHERE prenom = 'Anli';
DELETE FROM eleve WHERE id = 4;
SELECT * FROM eleve;
</code></pre>
<pre class="sortie" data-titre="Résultat"><code>id | prenom | age | id_classe
1 | Anli | 17 | 1
2 | Faïza | 17 | 1
3 | Zaïna | 18 | 2
5 | Moinécha | 16 | 1
6 | Saïd | 15 | 1
</code></pre>
<p><code>SELECT *</code> donne toutes les colonnes : Saïd est ajouté, Anli a 17 ans, Nassim (id 4) est supprimé. Les valeurs de <code>VALUES</code> suivent l'ordre de la liste des colonnes.</p>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Oublier la condition de jointure : chaque élève est associé à <strong>chaque</strong> classe (5 × 2 = 10 lignes).</li>
<li>Oublier le <code>WHERE</code> d'un <code>UPDATE</code> ou d'un <code>DELETE</code> : <strong>toutes</strong> les lignes sont modifiées ou supprimées.</li>
<li>Insérer une clé primaire déjà prise : <code>UNIQUE constraint failed</code> ; une clé étrangère sans ligne correspondante : <code>FOREIGN KEY constraint failed</code>.</li>
<li>Écrire les chaînes sans apostrophes : <code>WHERE prenom = Anli</code> cherche une <strong>colonne</strong> Anli.</li>
<li>Mettre une fonction d'agrégation dans le <code>WHERE</code> :</li>
</ul>
<pre data-base="lycee" data-erreur><code class="language-sql">SELECT prenom FROM eleve WHERE age = MAX(age);
</code></pre>
<pre class="sortie" data-titre="Résultat"><code>Erreur : misuse of aggregate function MAX()
</code></pre>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Clé primaire : identifie une ligne. Clé étrangère : référence la clé primaire d'une autre table.</li>
<li><code>SELECT</code> colonnes (ou <code>*</code>) <code>FROM</code> table <code>WHERE</code> condition <code>ORDER BY</code> colonne.</li>
<li><code>JOIN … ON</code> clé étrangère = clé primaire.</li>
<li><code>INSERT INTO</code> table (colonnes) <code>VALUES</code> (valeurs), <code>UPDATE … SET … WHERE</code>, <code>DELETE FROM … WHERE</code>.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Écrire la requête qui donne le prénom des élèves de la classe <code>1G1</code>, par ordre alphabétique.</p>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers"><code>SELECT eleve.prenom FROM eleve JOIN classe ON eleve.id_classe = classe.id WHERE classe.nom = '1G1' ORDER BY eleve.prenom;</code> (Anli, Faïza, Moinécha)</div>
</details>
</section>
