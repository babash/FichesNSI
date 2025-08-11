### Guide de rédaction Markdown (fiches NSI)

- **Front matter obligatoire**:
  - `title`: texte court (max 80 caractères) commençant idéalement par « Fiche NSI – »
  - `footer`: texte court (source, auteur, promo), facultatif
- **Structure de la page**:
  - Utiliser des blocs `<section>` pour chaque idée/chapitre. Chaque `section` correspond à une « carte » dans une grille 2 colonnes.
  - Titre de section en `<h2 data-icon="…">` pour afficher une icône dans le halo jaune.
- **Densité et longueur**:
  - **Par section**: 80–120 mots ou équivalent.
  - **Nombre de sections par fiche**: 4–10 pour une page A4 lisible.
  - **Listes**: 3–8 items courts (7–12 mots par item).
- **Code**:
  - Préférer `<pre><code class="language-python">…</code></pre>` pour garantir un rendu stable (même dans le PDF).
  - **Longueur**: 5–15 lignes, 70–80 colonnes max (éviter l’horizontal scroll en impression).
  - Montrer l’output clé seulement; éviter les commentaires verbeux.
- **Images**:
  - Utiliser des images légères (≤ 200 KB) et dimensionnées: `width="500"` max sur une colonne.
  - Référencer depuis `public/` avec des URLs absolues: `/img/mon-schema.png`.
- **Tableaux**:
  - Max 3–4 colonnes; texte concis. Éviter les tableaux larges (risque de débordement en PDF).
- **Typographie et lisibilité**:
  - Préférer des phrases courtes, verbes à l’infinitif pour procédures.
  - Éviter les blocs très denses; aérer avec des listes et sous-titres.
- **Accessibilité**:
  - Icônes informatives seulement; ne pas encoder l’essentiel par la couleur.
  - Pour les images: `alt` descriptif bref.
- **Bonnes pratiques Markdown**:
  - Mélanger Markdown et HTML est possible; éviter les imbrications complexes.
  - Pas de balises `<script>` dans le contenu.

Contraintes d’affichage (A4 optimisé)
- **Format**: A4, marges: 20 mm × 15 mm (gérées par le CSS global).
- **Grille**: 2 colonnes. Une section doit tenir dans une colonne quand c’est possible.
- **Sauts de page**: pour les exports groupés, un saut de page est inséré automatiquement entre fiches.
- **Polices**: police monospace pour code, lisible pour texte (gérées par le thème).

Exemple de squelette minimal

```
---
title: "Fiche NSI – Sujet"
footer: "Promo 2025"
---

<section>
  <h2 data-icon="💡">Idée clé</h2>
  <ul>
    <li>Définition courte…</li>
    <li>Règle/principe…</li>
  </ul>
</section>

<section>
  <h2 data-icon="🧪">Exemple</h2>
  <pre><code class="language-python">x = 1
print(x)
</code></pre>
</section>
```