# 📚 Générateur de Fiches de Révision NSI

Un serveur web Node.js moderne qui transforme des fichiers Markdown en fiches de révision NSI élégantes avec génération automatique de PDF. Optimisé pour l'impression et la distribution.

## ✨ Fonctionnalités

### 📄 Génération de Contenu
* **Pages Web Dynamiques** : Conversion automatique des fichiers Markdown en pages web stylisées
* **Génération PDF Automatique** : Export PDF haute qualité avec un clic
* **PDF Sans Marges** : Optimisé pour l'impression avec marges supprimées
* **PDF Combiné** : Téléchargement de toutes les fiches en un seul PDF

### 🎨 Présentation
* **Interface Moderne** : Design épuré avec CSS Grid et typographie professionnelle
* **Mise en Page A4** : Style optimisé pour l'impression directe
* **Coloration Syntaxique** : Mise en forme automatique du code Python
* **Responsive** : Compatible mobile et desktop

### ⚡ Performance & Organisation
* **Architecture Modulaire** : Code organisé en modules séparés pour la maintenabilité
* **Navigateur Partagé** : Instance Puppeteer réutilisée pour des performances optimales
* **Arrêt Propre** : Gestion gracieuse des signaux système

### 📜 Licence Intégrée
* **CC0 1.0** : Licence Creative Commons intégrée automatiquement dans tous les PDFs
* **Attribution Automatique** : Crédits ajoutés automatiquement

---

## 🚀 Installation et Lancement

### Prérequis
- Node.js 16+ 
- npm
- Système avec support Chromium (pour Puppeteer)

### Installation

1. **Cloner le projet** :
   ```bash
   git clone <URL_DU_DEPOT>
   cd fiches-nsi
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```
   *Cette commande installe automatiquement Puppeteer avec Chromium.*

3. **Lancer le serveur** :
   ```bash
   npm start
   ```

4. **Accéder à l'application** :
   Ouvrez http://localhost:3000 dans votre navigateur.

---

## 📖 Utilisation

### Interface Web
- **Page d'accueil** : Liste toutes les fiches avec recherche intégrée
- **Téléchargement individuel** : Icône PDF sur chaque fiche
- **Téléchargement global** : Bouton "Tout télécharger" pour un PDF combiné

### Génération PDF
Les PDFs sont générés automatiquement avec :
- ✅ Suppression des marges blanches
- ✅ Licence CC0 en bas de page
- ✅ Qualité d'impression optimisée
- ✅ Préservation du style CSS

---

## ✍️ Créer une Nouvelle Fiche

### 1. Créer le fichier
Créez un fichier `.md` dans `/content/` :
```bash
touch content/ma-nouvelle-fiche.md
```

### 2. Structure du fichier
```markdown
---
title: "Fiche NSI – Mon Titre"
footer: "Optionnel : pied de page personnalisé"
---

<section>
  <h2 data-icon="💡">Titre de Section</h2>
  
  Contenu de la section en Markdown.
  
  ```python
  # Code Python avec coloration automatique
  def exemple():
      return "Hello NSI!"
  ```
</section>

<section>
  <h2 data-icon="🔧">Autre Section</h2>
  
  - Point important 1
  - Point important 2
  - Formule : `O(n log n)`
</section>
```

### 3. Redémarrer le serveur
```bash
# Arrêter avec Ctrl+C puis relancer
npm start
```

La nouvelle fiche apparaît automatiquement sur la page d'accueil.

---

## 🏗️ Architecture du Projet

```
fiches-nsi/
├── src/                    # Modules principaux
│   ├── fiches.js          # Gestion des fiches Markdown
│   ├── pdf.js             # Génération PDF avec Puppeteer
│   └── routes.js          # Routes Express
├── content/               # Fiches en Markdown
├── views/                 # Templates EJS
├── public/               # Assets statiques (CSS, JS, images)
├── server.js             # Point d'entrée principal
└── package.json          # Configuration npm
```

### Modules Principaux

#### `src/fiches.js` - FichesManager
- Chargement automatique des fichiers Markdown
- Parsing avec front-matter
- Cache en mémoire pour les performances

#### `src/pdf.js` - PDFGenerator  
- Instance Puppeteer partagée
- Génération HTML optimisée pour PDF
- Licence CC0 automatique

#### `src/routes.js` - RoutesManager
- Routes web et API
- Gestion des erreurs 404
- Endpoints de génération PDF

---

## 🛠️ Technologies

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Puppeteer** - Génération PDF via Chromium
- **EJS** - Moteur de templates

### Processing
- **Marked** - Parser Markdown vers HTML
- **Front-matter** - Extraction métadonnées

### Frontend
- **CSS Grid** - Mise en page responsive
- **Google Fonts** - Typographie (Lato, Orbitron, Fira Code)
- **Vanilla JS** - Interactions (recherche, affichage/masquage)

---

## 📝 Licence

Ce projet est sous licence MIT. Le contenu généré (fiches) est automatiquement placé sous licence [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/deed.fr) (domaine public).

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs via les issues
- Proposer des améliorations
- Soumettre des pull requests
- Partager vos fiches de révision

---

*Généré avec ❤️ pour la communauté NSI*