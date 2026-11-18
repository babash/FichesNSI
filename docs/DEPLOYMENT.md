# 🚀 Guide de déploiement - Fiches NSI (production seulement)

Ce document décrit la mise en production du site Fiches NSI, qui n'a qu'un environnement.

## 🌐 Environnement

### **Production**
- **Branche source** : `main`
- **Branche publiée** : `gh-pages`
- **Adresse** : `https://babash.github.io/FichesNSI/`
- **Workflow** : `.github/workflows/deploy-production.yml`
- **Déclenchement** : un envoi (push) sur `main`, ou un lancement à la main (`workflow_dispatch`)

## 🔄 Travailler

### 1. **Valider et mettre en production**
```bash
git checkout main
# Fais tes modifications, ou fusionne une Pull Request validée
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push origin main
```
→ **Publication automatique** sur `https://babash.github.io/FichesNSI/`

## 🎯 **Méthode recommandée**

1. **Développement** : une branche de fonctionnalité, puis une Pull Request vers `main`.
2. **Vérification** : en local, avant la fusion. Aucun workflow ne tourne sur une branche ou une Pull Request : génère le site avec `npm run build`, puis vérifie les pages et les PDF du dossier `dist/`.
3. **Production** : la fusion dans `main` lance la publication.

## 📋 Les étapes de la publication

Chaque publication suit ces étapes (les mêmes que « Le processus de build » de [INSTALLER.md](INSTALLER.md)) :

1. **Récupération** du code source (checkout).
2. **Installation** de Python 3.13 et des dépendances Node.js (`npm ci`).
3. **Tests** des fiches (`npm test`) : chaque fiche suit le gabarit commun, et chaque exemple de code est exécuté (Python 3 et SQLite) et comparé à l'affichage écrit dans la fiche.
4. **Génération** du site statique et des PDF, dans le dossier `dist/` (il n'est pas versionné). Avant les PDF, chaque fiche est ouverte dans Chromium : une fiche réduite pour tenir sur une page est signalée ; une fiche qui déborde encore, une erreur JavaScript ou une ressource introuvable arrêtent la génération, comme une erreur de fabrication d'un PDF.
5. **Vérification** des fichiers générés, et d'aucune ressource chargée d'un autre site.
6. **Publication** du dossier `dist/` sur la branche `gh-pages`.

## ✅ Vérifications automatiques

Le seul workflow du dépôt est `deploy-production.yml` : il ne tourne qu'à la publication (un envoi sur `main`, ou un lancement à la main). Une étape qui échoue (tests, mise en page, PDF) arrête le workflow : le site en ligne ne change pas. Après la génération, il vérifie aussi que ces fichiers existent :
- ✅ `dist/index.html` (la page d'accueil) ;
- ✅ `dist/css/fiche-nsi.css` (la feuille de style des fiches) ;
- ✅ `dist/fiches/liste/index.html` (la page d'une fiche) ;
- ✅ `dist/fiches/liste.pdf` (le PDF d'une fiche) ;
- ✅ `dist/fiches/all.pdf` (le PDF de toutes les fiches) ;

et qu'aucune page ni feuille de style ne charge de police, de script ou de style d'un autre site (Google Fonts, cdnjs, creativecommons.org). Le message de fin du workflow (« Tests validés ») ne fait qu'afficher du texte : il ne lance aucun autre essai.

## 🛠️ Commandes utiles

### Suivre les publications
```bash
# Les workflows du dépôt
gh workflow list

# Les dernières exécutions
gh run list
```

### Lancer une publication à la main
```bash
# Publication en production
gh workflow run "Deploy Production"
```

## 🔧 Réglages de GitHub Pages

### Production
- **Source** : Deploy from a branch
- **Branche** : `gh-pages`
- **Dossier** : `/ (root)`

### Développement et tests
- Les environnements de développement et de test ne servent plus.

## 📝 À savoir

- **Cache** : GitHub Pages peut mettre 5 à 10 minutes à se mettre à jour.
- **PDF** : ils sont générés automatiquement à chaque publication.
- **CSS et JS** : les chemins sont relatifs, pour fonctionner sur GitHub Pages.
- **Sécurité** : la publication utilise le jeton `GITHUB_TOKEN`.

## 🚨 En cas de problème

### Le site ne répond pas
1. Vérifie que la branche `gh-pages` existe.
2. Attends 5 à 10 minutes (cache de GitHub Pages).
3. Lis le journal du workflow dans GitHub Actions.

### Les PDF sont abîmés
1. Vérifie que `html-pdf-node` fonctionne sur ton ordinateur.
2. Lis le journal de la génération des PDF.
3. Essaie avec une fiche simple.

### Le CSS ou le JS ne se charge pas
1. Vérifie les chemins relatifs dans les fichiers HTML.
2. Vérifie que le fichier `.nojekyll` est présent.
3. Vérifie que les fichiers sont bien publiés.
