---
title: "Fiche NSI – Le langage SQL"
footer: "Fiche d'aide-mémoire - NSI Tani Mallandi"
---

<section>
<h2 data-icon="🔍">Consultation (SELECT)</h2>
<p>La commande <code>SELECT</code> permet de récupérer des données dans une table. On peut filtrer avec <code>WHERE</code> et trier avec <code>ORDER BY</code>.</p>
<pre><code class="language-sql">-- Récupérer le nom et le prix des produits de plus de 10€
SELECT nom, prix 
FROM produits 
WHERE prix > 10 
ORDER BY prix DESC;

-- Récupérer toutes les colonnes
SELECT * FROM eleves;
</code></pre>
</section>

<section>
<h2 data-icon="➕">Action sur les données (CRUD)</h2>
<p>Les opérations de mise à jour et d'insertion permettent de manipuler le contenu des tables.</p>
<pre><code class="language-sql">-- Insérer une nouvelle ligne
INSERT INTO eleves (nom, prenom, classe) 
VALUES ('Dupont', 'Jean', 'Terminale');

-- Mettre à jour une valeur
UPDATE produits 
SET prix = 12.5 
WHERE id = 4;

-- Supprimer une ligne
DELETE FROM eleves 
WHERE id = 10;
</code></pre>
</section>

<section>
<h2 data-icon="📊">Agrégateurs et Jointures</h2>
<p>Les fonctions d'agrégation permettent d'effectuer des calculs sur un ensemble de lignes.</p>
<pre><code class="language-sql">SELECT COUNT(*) FROM eleves;        -- Compte le nombre total
SELECT AVG(note) FROM evaluations; -- Moyenne des notes
SELECT MAX(prix) FROM produits;    -- Prix le plus élevé
</code></pre>
<p>La <strong>jointure</strong> permet de lier deux tables grâce à une clé étrangère.</p>
<pre><code class="language-sql">SELECT eleves.nom, classes.nom_classe
FROM eleves
JOIN classes ON eleves.classe_id = classes.id;
</code></pre>
</section>