# Architecture des Fiches de révision NSI

Ce guide reprend la partie technique de l'ancien README : ce que fait le générateur, comment écrire une fiche, comment sont fabriqués les PDF, et l'organisation du code. Pour installer et publier, voir [INSTALLER.md](INSTALLER.md).

Le générateur transforme des fichiers Markdown en fiches de révision mises en page pour l'impression, et produit pour chacune un PDF. Il construit un site statique, publié sur GitHub Pages.

## Les fonctionnalités

### La génération du contenu
- **Site statique** : un site compatible avec GitHub Pages.
- **Pages web** : chaque fichier Markdown devient une page mise en forme.
- **PDF** : un export PDF de chaque fiche, avec html-pdf-node.
- **PDF générés à l'avance** : tous les PDF sont produits pendant la génération du site, pour un téléchargement immédiat.
- **PDF complet** : toutes les fiches dans un seul PDF.

### La présentation
- **Une interface épurée**, en grille CSS.
- **Une mise en page en colonnes** (*masonry*, un affichage dense, en colonnes de hauteurs différentes).
- **Une mise en page A4**, pour imprimer directement.
- **La coloration du code** Python.
- **Un affichage adapté** à l'ordinateur et au téléphone.

### Les performances et l'organisation
- **Une architecture en modules** séparés, plus faciles à entretenir.
- **Un déploiement automatique** par GitHub Actions sur GitHub Pages.
- **Des fichiers statiques**, servis sans calcul.
- **Une génération rapide**, avec un serveur temporaire pour fabriquer les PDF.

### L'auteur et la licence dans les PDF
Chaque page des PDF porte, en bas à droite, la mention « Fiches de révision NSI » · Babash - NSI Tani Malandi · licence CC BY-SA 4.0 (voir « Le pied des PDF »). La page d'accueil porte la même licence, avec un lien vers son texte.

## Écrire une nouvelle fiche

### 1. Créer le fichier
Crée un fichier `.md` dans `content/` :
```bash
touch content/ma-nouvelle-fiche.md
```

### 2. La structure du fichier
````markdown
---
title: "Fiche NSI – Mon titre"
footer: "Facultatif : pied de page personnalisé"
---

<section>
  <h2 data-icon="💡">Titre de la section</h2>

  Contenu de la section en Markdown.

  ```python
  # Code Python avec coloration automatique
  def exemple():
      return "Bonjour NSI !"
  ```
</section>

<section>
  <h2 data-icon="🔧">Autre section</h2>

  - Point important 1
  - Point important 2
  - Formule : `O(n log n)`
</section>
````

- `title` : le titre de la fiche ; « Fiche NSI – » est retiré du titre affiché sur la fiche.
- `footer` : le texte à gauche du pied de page des PDF (« Fiche d'aide-mémoire » pour les fiches actuelles). L'auteur et la licence sont ajoutés automatiquement : inutile de les écrire ici.
- Chaque `<section>` devient un encadré. Les encadrés sont répartis sur deux colonnes.

Les recommandations de rédaction et les contraintes d'affichage en A4 (longueur des sections, du code, des tableaux) sont dans [GUIDE_MARKDOWN.md](../GUIDE_MARKDOWN.md).

### 3. Redémarrer le serveur
```bash
# Arrêter avec Ctrl+C, puis relancer
npm start
```

La nouvelle fiche apparaît automatiquement sur la page d'accueil. Pour la publier, avec son PDF, il suffit de l'envoyer sur `main` (voir [INSTALLER.md](INSTALLER.md)).

## La génération des PDF

Les PDF sont générés automatiquement, avec :
- les marges blanches supprimées ;
- l'auteur et la licence CC BY-SA 4.0 en bas de chaque page ;
- une qualité d'impression optimisée ;
- le style CSS conservé ;
- une génération à l'avance, pour un téléchargement immédiat ;
- une vérification automatique : un PDF vide, ou qui ne commence pas par `%PDF`, arrête la génération de ce fichier.

### Le pied des PDF

`src/pdf.js` construit le pied de page de deux façons :
- **le pied de page de Puppeteer** (`footerTemplate`) : à gauche le texte `footer` de la fiche (par défaut « Fiches de révision NSI »), au centre le numéro de page, à droite la date de génération ;
- **la mention de l'auteur et de la licence**, écrite dans la page elle-même (`position: fixed`, répétée sur chaque page, comme l'image de fond), en bas à droite.

La mention est dans la page parce que, dans les PDF publiés, fabriqués par le Chromium de Puppeteer 5.5, l'image de fond (`body::before`) recouvre le pied de page de Puppeteer, qui reste invisible. Avec un Chrome récent, les deux s'affichent, l'un au-dessus de l'autre.

## L'organisation du projet

```
FichesNSI/
├── src/                    # Modules principaux
│   ├── fiches.js           # Gestion des fiches Markdown
│   ├── pdf.js              # Génération PDF avec html-pdf-node
│   └── routes.js           # Routes Express
├── scripts/                # Scripts de build
│   └── generate-static.js  # Générateur du site statique
├── content/                # Fiches en Markdown
├── views/                  # Gabarits EJS
├── public/                 # Fichiers statiques (CSS, JS, images)
├── dist/                   # Site statique généré
├── docs/                   # Guides (installation, architecture)
├── .github/workflows/      # GitHub Actions
├── server.js               # Point d'entrée principal
└── package.json            # Configuration npm
```

### Les modules principaux

#### `src/fiches.js` : FichesManager
- Chargement automatique des fichiers Markdown.
- Lecture de l'en-tête (*front matter*).
- Cache en mémoire, pour les performances.

#### `src/pdf.js` : PDFGenerator
- Génération des PDF avec html-pdf-node.
- Pages HTML préparées pour les PDF (une fiche, ou toutes les fiches).
- Pied de page et mention de l'auteur et de la licence.
- Vérification des PDF générés.

#### `src/routes.js` : RoutesManager
- Routes web et API.
- Gestion des erreurs 404.
- Points d'accès pour générer les PDF.

#### `scripts/generate-static.js` : StaticSiteGenerator
- Génération du site statique complet.
- Serveur temporaire pour générer les PDF.
- Copie des fichiers statiques.
- Génération des pages HTML.

## Les technologies

### Serveur
- **Node.js** : l'environnement d'exécution JavaScript.
- **Express.js** : le serveur web.
- **html-pdf-node** : la génération des PDF par Chromium (Puppeteer).
- **EJS** : les gabarits des pages.

### Traitement
- **Marked** : la conversion du Markdown en HTML.
- **Front-matter** : la lecture de l'en-tête des fiches.

### Navigateur
- **CSS Grid** : une mise en page qui s'adapte à l'écran.
- **Mise en page *masonry*** : un affichage dense en colonnes.
- **Google Fonts** : les polices Lato, Orbitron et Fira Code.
- **JavaScript sans bibliothèque** : la recherche, l'affichage et le masquage de la liste.
- **highlight.js** : la coloration du code.

### Déploiement
- **GitHub Pages** : l'hébergement du site statique.
- **GitHub Actions** : le déploiement automatique.
- **Site statique** : des fichiers HTML, CSS et JS générés à l'avance.

## Contribuer

Les contributions sont les bienvenues :
- signaler un bug dans les [issues](https://github.com/babash/FichesNSI/issues) ;
- proposer une amélioration ;
- soumettre une Pull Request ;
- partager tes fiches de révision.
