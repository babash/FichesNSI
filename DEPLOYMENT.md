# 🚀 Guide de Déploiement - Fiches NSI (Production only)

Ce document décrit le déploiement en production unique du site Fiches NSI.

## 🌐 Environnement disponible

### **Production** 
- **Branche source** : `main`
- **Branche de déploiement** : `gh-pages`
- **URL** : `https://babash.github.io/FichesNSI/`
- **Workflow** : `.github/workflows/deploy-production.yml`
- **Déclenchement** : Push sur `main` ou `workflow_dispatch`

## 🔄 Workflow de développement

### 1. **Validation et mise en production**
```bash
git checkout main
# Faire vos modifications / merger une PR validée
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push origin main
```
→ **Déploiement automatique** sur `https://babash.github.io/FichesNSI/`

## 🎯 **Méthode de travail recommandée**

1. **Développement** : Branches de fonctionnalités + PR vers `main`
2. **Validation** : CI sur la PR
3. **Production** : Merge vers `main` déclenche le déploiement

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
```

## 🔧 Configuration GitHub Pages

### Production
- **Source** : Deploy from a branch
- **Branch** : `gh-pages`
- **Folder** : `/ (root)`

### Développement et Tests
- Les environnements de développement et de test ne sont plus utilisés

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