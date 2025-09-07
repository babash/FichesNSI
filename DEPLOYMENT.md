# 🚀 Guide de Déploiement - Fiches NSI

Ce document explique le système de déploiement multi-environnements du site Fiches NSI.

## 🌐 Environnements disponibles

### **Production** 
- **Branche source** : `main`
- **Branche de déploiement** : `gh-pages`
- **URL** : `https://babash.github.io/FichesNSI/`
- **Workflow** : `.github/workflows/deploy-production.yml`
- **Déclenchement** : Push sur `main` ou `workflow_dispatch`

### **Développement**
- **Branche source** : `dev`
- **Branche de déploiement** : `gh-pages-dev`
- **URL** : `https://babash.github.io/FichesNSI/dev/`
- **Workflow** : `.github/workflows/deploy-development.yml`
- **Déclenchement** : Push sur `dev` ou `workflow_dispatch`

### **Tests**
- **Branche source** : `test/*`
- **Branche de déploiement** : `gh-pages-test`
- **URL** : `https://babash.github.io/FichesNSI/test/nom-de-la-branche/`
- **Workflow** : `.github/workflows/deploy-test.yml`
- **Déclenchement** : Push sur `test/*` ou Pull Request

## 🔄 Workflow de développement

### 1. **Développement quotidien**
```bash
# Travailler sur la branche dev
git checkout dev
# Faire vos modifications
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push origin dev
```
→ **Déploiement automatique** sur `https://babash.github.io/FichesNSI/dev/`

### 2. **Tests de fonctionnalités**
```bash
# Créer une branche de test
git checkout -b test/ma-nouvelle-fonctionnalite
# Faire vos modifications
git push origin test/ma-nouvelle-fonctionnalite
```
→ **Déploiement automatique** sur `https://babash.github.io/FichesNSI/test/ma-nouvelle-fonctionnalite/`

### 3. **Mise en production**
```bash
# Fusionner dev dans main
git checkout main
git merge dev
git push origin main
```
→ **Déploiement automatique** sur `https://babash.github.io/FichesNSI/`

## 📋 Processus de déploiement

Chaque déploiement suit ces étapes :

1. **Checkout** du code source
2. **Installation** des dépendances Node.js
3. **Génération** du site statique avec PDFs
4. **Validation** des fichiers générés
5. **Déploiement** sur la branche GitHub Pages appropriée

## ✅ Tests automatiques

Chaque déploiement vérifie :
- ✅ Génération du site statique
- ✅ Présence des fichiers CSS et JS
- ✅ Génération des PDFs individuels
- ✅ Génération du PDF combiné
- ✅ Déploiement réussi

## 🛠️ Commandes utiles

### Vérifier le statut des déploiements
```bash
# Voir les workflows en cours
gh workflow list

# Voir les runs récents
gh run list
```

### Déclencher un déploiement manuel
```bash
# Déploiement de production
gh workflow run "Deploy Production"

# Déploiement de développement
gh workflow run "Deploy Development"
```

## 🔧 Configuration GitHub Pages

### Production
- **Source** : Deploy from a branch
- **Branch** : `gh-pages`
- **Folder** : `/ (root)`

### Développement et Tests
- Les branches `gh-pages-dev` et `gh-pages-test` sont automatiquement créées
- Pas de configuration GitHub Pages nécessaire (sous-dossiers)

## 📝 Notes importantes

- **Cache** : GitHub Pages peut mettre 5-10 minutes à se mettre à jour
- **PDFs** : Générés automatiquement à chaque déploiement
- **CSS/JS** : Chemins relatifs pour compatibilité GitHub Pages
- **Sécurité** : Utilise `GITHUB_TOKEN` pour les déploiements

## 🚨 Dépannage

### Site non accessible
1. Vérifier que la branche de déploiement existe
2. Attendre 5-10 minutes (cache GitHub Pages)
3. Vérifier les logs du workflow GitHub Actions

### PDFs corrompus
1. Vérifier que `html-pdf-node` fonctionne localement
2. Consulter les logs de génération PDF
3. Tester avec une fiche simple

### CSS/JS non chargés
1. Vérifier les chemins relatifs dans les fichiers HTML
2. S'assurer que `.nojekyll` est présent
3. Vérifier que les fichiers sont bien déployés