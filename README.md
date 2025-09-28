# 📚 Générateur de Fiches de Révision NSI

Un générateur de site statique moderne qui transforme des fichiers Markdown en fiches de révision NSI élégantes avec génération automatique de PDF. Optimisé pour l'impression, la distribution et le déploiement sur GitHub Pages.

## ✨ Fonctionnalités

### 📄 Génération de Contenu
* **Site Statique** : Génération de site statique compatible GitHub Pages
* **Pages Web Optimisées** : Conversion automatique des fichiers Markdown en pages web stylisées
* **Génération PDF Automatique** : Export PDF haute qualité avec Playwright
* **PDFs Pré-générés** : Tous les PDFs générés lors du build pour un déploiement rapide
* **PDF Combiné** : Téléchargement de toutes les fiches en un seul PDF

### 🎨 Présentation
* **Interface Moderne** : Design épuré avec CSS Grid et typographie professionnelle
* **Layout Masonry** : Affichage dense en colonnes pour une meilleure organisation
* **Mise en Page A4** : Style optimisé pour l'impression directe
* **Coloration Syntaxique** : Mise en forme automatique du code Python
* **Responsive** : Compatible mobile et desktop

### ⚡ Performance & Organisation
* **Architecture Modulaire** : Code organisé en modules séparés pour la maintenabilité
* **Déploiement Automatique** : GitHub Actions pour déploiement automatique sur GitHub Pages
* **Site Statique** : Génération de fichiers statiques pour des performances optimales
* **Build Optimisé** : Génération rapide avec serveur temporaire pour les PDFs

### 📜 Licence Intégrée
* **CC0 1.0** : Licence Creative Commons intégrée automatiquement dans tous les PDFs
* **Attribution Automatique** : Crédits ajoutés automatiquement

---

## 🚀 Installation et Lancement

### Prérequis
- Node.js 18+ 
- npm
- Système avec support Chromium (pour Playwright)
- **Permissions sudo** (pour installer les dépendances système de Playwright)

### Installation

1. **Cloner le projet** :
   ```bash
   git clone <URL_DU_DEPOT>
   cd fiches-nsi
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   npm run install:playwright
   sudo npm run install:playwright-deps
   ```
   
   **Ou en une seule commande** :
   ```bash
   npm run install:all
   ```
   
   *Ces commandes installent automatiquement Playwright avec Chromium et les dépendances système.*

3. **Lancer le serveur local** :
   ```bash
   npm start
   ```

4. **Générer le site statique** :
   ```bash
   npm run build
   ```

5. **Accéder à l'application** :
   - **Développement** : http://localhost:3000
   - **Site statique** : Ouvrir `dist/index.html` dans votre navigateur

6. **Exporter en PDF** :
    - Depuis la page d'accueil:
      - Télécharger une fiche: cliquer sur l'icône à droite d'un titre
      - Télécharger toutes les fiches: « Tout télécharger » en haut de liste
    - Les PDFs sont pré-générés lors du build pour un accès instantané.

---

## 📖 Utilisation

### Interface Web
- **Page d'accueil** : Liste toutes les fiches avec recherche intégrée
- **Téléchargement individuel** : Icône PDF sur chaque fiche
- **Téléchargement global** : Bouton "Tout télécharger" pour un PDF combiné

Voir aussi: `GUIDE_MARKDOWN.md` pour des recommandations de rédaction et contraintes d'affichage optimisées A4.

### Génération PDF
Les PDFs sont générés automatiquement avec :
- ✅ Suppression des marges blanches
- ✅ Licence CC0 en bas de page
- ✅ Qualité d'impression optimisée
- ✅ Préservation du style CSS
- ✅ Pré-génération pour un accès instantané
- ✅ Validation automatique des PDFs

### Scripts Disponibles

#### **Installation et Vérification**
```bash
npm run install:playwright      # Installer les navigateurs Playwright
npm run install:playwright-deps # Installer les dépendances système (sudo requis)
npm run install:all            # Installation complète en une commande
npm run check:playwright       # Vérifier l'installation de Playwright
```

#### **Développement et Build**
```bash
npm start                      # Démarrer le serveur de développement
npm run build                  # Générer le site statique
npm test                       # Exécuter les tests
```

#### **Déploiement**
```bash
npm run deploy                 # Déploiement automatique
npm run deploy:force           # Déploiement forcé
```

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
│   ├── pdf.js             # Génération PDF avec Playwright
│   └── routes.js          # Routes Express
├── scripts/               # Scripts de build et installation
│   ├── generate-static.js # Générateur de site statique
│   └── install-playwright.js # Installation automatique Playwright
├── content/               # Fiches en Markdown
├── views/                 # Templates EJS
├── public/               # Assets statiques (CSS, JS, images)
├── dist/                 # Site statique généré
├── .github/workflows/    # GitHub Actions
├── server.js             # Point d'entrée principal
└── package.json          # Configuration npm
```

### Modules Principaux

#### `src/fiches.js` - FichesManager
- Chargement automatique des fichiers Markdown
- Parsing avec front-matter
- Cache en mémoire pour les performances

#### `src/pdf.js` - PDFGenerator  
- Génération PDF avec Playwright
- Vérification automatique de l'installation
- Génération HTML optimisée pour PDF
- Licence CC0 automatique
- Validation des PDFs générés

#### `src/routes.js` - RoutesManager
- Routes web et API
- Gestion des erreurs 404
- Endpoints de génération PDF

#### `scripts/generate-static.js` - StaticSiteGenerator
- Génération de site statique complet
- Serveur temporaire pour génération PDF
- Copie des assets statiques
- Génération des pages HTML

#### `scripts/install-playwright.js` - Installation Automatique
- Installation des navigateurs Playwright
- Installation des dépendances système
- Vérification de l'installation
- Messages d'erreur clairs avec solutions

---

## 🛠️ Technologies

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Playwright** - Génération PDF via Chromium
- **EJS** - Moteur de templates

### Processing
- **Marked** - Parser Markdown vers HTML
- **Front-matter** - Extraction métadonnées

### Frontend
- **CSS Grid** - Mise en page responsive
- **Layout Masonry** - Affichage dense en colonnes
- **Google Fonts** - Typographie (Lato, Orbitron, Fira Code)
- **Vanilla JS** - Interactions (recherche, affichage/masquage)

### Déploiement
- **GitHub Pages** - Hébergement de site statique
- **GitHub Actions** - Déploiement automatique
- **Site Statique** - Génération de fichiers HTML/CSS/JS

---

## 🚀 Déploiement Automatique

Le projet utilise GitHub Actions pour un déploiement automatique sur GitHub Pages :

### Branches et Déploiement

#### **Production** (branche `main`)
- **Déclenchement** : Push sur `main` ou action manuelle
- **URL** : https://babash.github.io/FichesNSI/
- **Contenu** : Site statique complet avec PDFs

### 🎯 Méthode de travail recommandée

1. Créer une branche de fonctionnalité depuis `main`
2. Ouvrir une Pull Request vers `main` avec CI verte
3. Merger vers `main` pour déclencher la production

### Processus de Build

1. **Installation** des dépendances Node.js et Playwright
2. **Génération** du site statique avec `npm run build`
3. **Validation** des fichiers générés (HTML, CSS, PDFs)
4. **Déploiement** automatique sur GitHub Pages
5. **Notification** en cas d'erreur

### Commandes Locales

```bash
# Générer le site statique localement
npm run build

# Tester le site généré
cd dist && python -m http.server 8000
# Puis ouvrir http://localhost:8000
```

---

## 🔧 Dépannage

### Playwright non installé
```bash
# Vérifier l'installation
npm run check:playwright

# Installer si nécessaire
npm run install:playwright
sudo npm run install:playwright-deps
```

### Erreurs de génération PDF
1. Vérifier que Playwright fonctionne : `npm run check:playwright`
2. Consulter les logs de génération PDF
3. Tester avec une fiche simple

### Site non accessible
1. Vérifier que la branche de déploiement existe
2. Attendre 5-10 minutes (cache GitHub Pages)
3. Vérifier les logs du workflow GitHub Actions

### CSS/JS non chargés
1. Vérifier les chemins relatifs dans les fichiers HTML
2. S'assurer que `.nojekyll` est présent
3. Vérifier que les fichiers sont bien déployés

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

### Workflow de Contribution

1. **Fork** le projet
2. **Créer** une branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. **Commit** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

---

*Généré avec ❤️ pour la communauté NSI*