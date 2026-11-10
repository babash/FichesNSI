# Installer sa copie des Fiches de révision NSI

Ce guide reprend la partie technique de l'ancien README : lancer le générateur sur ton ordinateur, produire le site statique et les PDF, puis publier le tout sur GitHub Pages. Pour écrire une fiche et comprendre le code, voir [ARCHITECTURE.md](ARCHITECTURE.md).

## Prérequis

- Node.js 18 ou plus récent (le workflow de publication utilise Node.js 18) ;
- npm ;
- un système qui fait tourner Chromium, utilisé par html-pdf-node pour fabriquer les PDF.

## Installation et lancement

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/babash/FichesNSI.git
   cd FichesNSI
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```
   Cette commande installe html-pdf-node et Puppeteer 5.5, qui télécharge son propre Chromium.

3. **Lancer le serveur local** :
   ```bash
   npm start
   ```

4. **Générer le site statique** :
   ```bash
   npm run build
   ```
   Le dossier `dist/` est effacé puis recréé : les pages, puis les PDF, fabriqués par un serveur temporaire sur le port 3001.

5. **Ouvrir l'application** :
   - **en développement** : http://localhost:3000 ;
   - **le site statique** : ouvre `dist/index.html` dans ton navigateur, ou sers le dossier (voir « Commandes locales » plus bas).

6. **Exporter en PDF**, depuis la page d'accueil :
   - une fiche : l'icône à droite de son titre ;
   - toutes les fiches : **Tout télécharger**, en haut de la liste.

   Les PDF sont générés à l'avance, pendant `npm run build` : le téléchargement est immédiat.

### Si Puppeteer ne peut pas télécharger Chromium

Installe les dépendances sans le téléchargement, puis indique un Chrome ou un Chromium déjà installé :

```bash
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 npm ci
PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome npm run build
```

Avec un Chrome récent, la mise en page des PDF peut différer un peu de celle des PDF publiés, qui sont fabriqués par le Chromium de Puppeteer 5.5 (voir « Le pied des PDF » dans [ARCHITECTURE.md](ARCHITECTURE.md)). Les polices (Google Fonts) et la coloration du code (highlight.js, sur cdnjs) se chargent par Internet pendant la génération.

## L'interface web

- **La page d'accueil** liste toutes les fiches, avec une recherche par titre.
- **Le téléchargement d'une fiche** : l'icône PDF de chaque fiche.
- **Le téléchargement global** : le bouton **Tout télécharger** donne un seul PDF avec toutes les fiches.

## Le déploiement automatique

Le site est publié par GitHub Actions sur GitHub Pages, avec le workflow `.github/workflows/deploy-production.yml`.

### Branches et publication

**Production** (branche `main`) :
- **déclenchement** : un envoi sur `main`, ou un lancement à la main (`workflow_dispatch`) ;
- **adresse** : https://babash.github.io/FichesNSI/ ;
- **contenu** : le site statique complet, avec les PDF.

Le workflow pousse le dossier `dist/` qu'il vient de générer sur la branche `gh-pages`, qui est la source de GitHub Pages (*Settings › Pages › Deploy from a branch › `gh-pages`, `/ (root)`*). Le dossier `dist/` n'est pas versionné dans `main` (il est dans `.gitignore`) : il est refait à chaque publication.

### Méthode de travail recommandée

1. Créer une branche de fonctionnalité depuis `main`.
2. Ouvrir une Pull Request vers `main`, et vérifier en local la génération du site et des PDF (`npm run build`) : aucun workflow ne tourne sur les Pull Requests.
3. Fusionner dans `main` pour déclencher la publication.

### Le processus de build

1. **Installation** des dépendances Node.js (`npm ci`).
2. **Génération** du site statique avec ses PDF (`node scripts/generate-static.js`).
3. **Validation** des fichiers générés : `dist/index.html`, la feuille de style, une page de fiche, un PDF de fiche et le PDF complet.
4. **Déploiement** sur la branche `gh-pages`.
5. **Message** de réussite dans le journal du workflow.

### Commandes locales

```bash
# Générer le site statique
npm run build

# Tester le site généré
cd dist && python -m http.server 8000
# puis ouvrir http://localhost:8000
```

Voir aussi, dans ce dossier : [DEPLOYMENT.md](DEPLOYMENT.md) (la publication et son dépannage), [WORKFLOW.md](WORKFLOW.md) (le travail au quotidien), [BRANCHES.md](BRANCHES.md) (les branches) et [GUIDE_MARKDOWN.md](GUIDE_MARKDOWN.md) (la rédaction d'une fiche).
