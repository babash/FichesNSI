### Guide de rédaction Markdown (fiches NSI)

Un exemple complet de mise en forme est dans [exemple-affichage.md](exemple-affichage.md) : sections, code, tableau et image. Il n'est pas publié. Pour voir son rendu, copie-le dans `content/` et lance `npm start` ; retire-le ensuite de `content/`, sinon il serait publié avec les fiches.

- **En-tête (front matter)** :
  - `title` (obligatoire) : un texte court (80 caractères au plus), qui commence de préférence par « Fiche NSI – » ;
  - `footer` (facultatif) : un texte court. Il n'apparaît ni dans les PDF ni sur le site publié, seulement en bas de la page du serveur local (`npm start`). L'auteur et la licence sont ajoutés automatiquement aux PDF et aux pages : inutile de les écrire.
- **Structure de la page** :
  - Utilise un bloc `<section>` pour chaque idée ou chapitre. Chaque `section` devient un encadré, réparti sur deux colonnes.
  - Donne à chaque section un titre `<h2 data-icon="…">`, pour afficher une icône dans le halo jaune.
- **Densité et longueur** :
  - **Par section** : 80 à 120 mots, ou l'équivalent.
  - **Nombre de sections par fiche** : 4 à 10, pour une page A4 lisible.
  - **Listes** : 3 à 8 éléments courts (7 à 12 mots chacun).
- **Code** :
  - Préfère `<pre><code class="language-python">…</code></pre>` pour un rendu stable, y compris dans le PDF.
  - **Longueur** : 5 à 15 lignes, 70 à 80 caractères par ligne au plus. Dans le PDF, une ligne trop longue passe à la ligne suivante ; à l'écran, elle fait défiler le bloc de code.
  - Montre seulement le résultat important ; évite les commentaires trop longs.
- **Images** :
  - Utilise des images légères (200 Ko au plus), avec une taille : `width="500"` au plus sur une colonne.
  - Range-les dans `public/img/` et appelle-les avec une adresse relative : `../../img/mon-schema.png`. Elle marche partout : sur le site publié, avec le serveur local (`npm start`) et dans les PDF. Une adresse absolue (`/img/mon-schema.png`) ne marche pas sur le site publié : elle vise `https://babash.github.io/img/…`, hors du site `https://babash.github.io/FichesNSI/`.
- **Tableaux** :
  - 3 ou 4 colonnes au plus, avec un texte court. Évite les tableaux larges, qui risquent de déborder dans le PDF.
- **Écriture et lisibilité** :
  - Préfère les phrases courtes, et l'infinitif pour les procédures.
  - Évite les blocs très denses : aère avec des listes et des sous-titres.
- **Accessibilité** :
  - Les icônes ne font qu'accompagner le texte : ne fais jamais passer l'essentiel par la seule couleur.
  - Pour une image, écris un `alt` court qui la décrit.
- **Markdown et HTML** :
  - Tu peux mélanger Markdown et HTML ; évite les imbrications compliquées.
  - Pas de balise `<script>` dans le contenu.

Contraintes d'affichage (A4)
- **Format** : A4, sans marge (la règle `@page { margin: 0 }` de `public/css/fiche-nsi.css`). Les 4 derniers millimètres de la page sont laissés à la mention de l'auteur et de la licence.
- **Une page par fiche** : si une fiche est plus haute que la page, son contenu est réduit pour tenir sur une page (jusqu'à 70 % de sa taille). Vise une fiche qui tient sans réduction : le texte reste plus lisible.
- **Grille** : 2 colonnes. Une section doit tenir dans une colonne, si possible.
- **Sauts de page** : dans le PDF de toutes les fiches, chaque fiche commence sur une nouvelle page.
- **Polices** : une police à chasse fixe pour le code, une police lisible pour le texte (gérées par le thème).

Exemple de squelette minimal

```
---
title: "Fiche NSI – Sujet"
---

<section>
  <h2 data-icon="💡">Idée clé</h2>
  <ul>
    <li>Définition courte…</li>
    <li>Règle ou principe…</li>
  </ul>
</section>

<section>
  <h2 data-icon="🧪">Exemple</h2>
  <pre><code class="language-python">x = 1
print(x)
</code></pre>
</section>
```
