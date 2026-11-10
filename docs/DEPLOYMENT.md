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
2. **Validation** : la CI sur la Pull Request.
3. **Production** : la fusion dans `main` lance la publication.

## 📋 Les étapes de la publication

Chaque publication suit ces étapes :

1. **Récupération** du code source (checkout).
2. **Installation** des dépendances Node.js.
3. **Génération** du site statique et des PDF, dans le dossier `dist/` (il n'est pas versionné).
4. **Vérification** des fichiers générés.
5. **Publication** du dossier `dist/` sur la branche `gh-pages`.

## ✅ Vérifications automatiques

Chaque publication vérifie :
- ✅ la génération du site statique ;
- ✅ la présence des fichiers CSS et JS ;
- ✅ la génération des PDF de chaque fiche ;
- ✅ la génération du PDF de toutes les fiches ;
- ✅ la réussite de la publication.

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
