# 🌿 Organisation des Branches - Fiches NSI

## 📋 **Branches principales**

### **`main`** 🏷️ **production**
- **Rôle** : Branche de production stable
- **URL** : `https://babash.github.io/FichesNSI/`
- **Usage** : Code validé et testé, prêt pour la production
- **Workflow** : Fusion depuis `dev` après validation
- **Tag** : `production`

### **`dev`** 🏷️ **development**
- **Rôle** : Branche de développement principal
- **URL** : `https://babash.github.io/FichesNSI/dev/`
- **Usage** : Développement quotidien, tests avant production
- **Workflow** : Branche de travail principale
- **Tag** : `development`

### **`gh-pages`** 🏷️ **deployment**
- **Rôle** : Branche de déploiement GitHub Pages
- **Contenu** : Site statique + dossier `/dev/`
- **Usage** : Déploiement automatique via GitHub Actions
- **Structure** :
  ```
  gh-pages/
  ├── index.html          # Production
  ├── css/               # Production
  ├── js/                # Production
  ├── fiches/            # Production
  ├── img/               # Production
  └── dev/               # Développement
      ├── index.html
      ├── css/
      ├── js/
      ├── fiches/
      └── img/
  ```
- **Tag** : `deployment`

## 🧪 **Branches de test**

### **Aucune branche de test active**
- **Raison** : La branche `test/pdf-optimization-and-print-fixes` a été intégrée dans `dev`
- **Améliorations intégrées** :
  - ✅ Validation PDF améliorée avec `head` command
  - ✅ Chemins CSS corrigés dans la génération statique
  - ✅ CSS optimisé pour éviter les erreurs de parsing
- **Statut** : ✅ **Intégrée et supprimée**

## 🔄 **Workflow de développement**

### **1. Développement quotidien**
```bash
git checkout dev
# Faire vos modifications
git add .
git commit -m "feat: description"
git push origin dev
```
→ **Test** sur `https://babash.github.io/FichesNSI/dev/`

### **2. Mise en production**
```bash
git checkout main
git merge dev
git push origin main
```
→ **Production** sur `https://babash.github.io/FichesNSI/`

## 🏷️ **Tags de référence**

- **`production`** : Marque la branche de production stable
- **`development`** : Marque la branche de développement
- **`deployment`** : Marque la branche de déploiement GitHub Pages

## 🧹 **Branches supprimées**

### **Branches obsolètes supprimées :**
- ❌ `cursor/fix-masonry-layout-on-columns-fe2d`
- ❌ `cursor/ajuster-la-hauteur-des-blocs-de-fiche-649c`
- ❌ `gh-pages-dev` (remplacée par `/dev/` dans `gh-pages`)
- ❌ `test/pdf-optimization-and-print-fixes` (intégrée dans `dev`)

### **Raison de la suppression :**
- **Branches Cursor** : Fonctionnalités intégrées dans `main`/`dev`
- **`gh-pages-dev`** : Architecture simplifiée avec un seul déploiement
- **`test/pdf-optimization-and-print-fixes`** : Améliorations intégrées dans `dev`

## 📊 **État actuel**

### **Branches actives :**
- ✅ `main` (production)
- ✅ `dev` (développement)
- ✅ `gh-pages` (déploiement)

### **Environnements :**
- 🌐 **Production** : `https://babash.github.io/FichesNSI/`
- 🌐 **Développement** : `https://babash.github.io/FichesNSI/dev/`

## 🎯 **Recommandations**

1. **Toujours travailler sur `dev`** pour le développement quotidien
2. **Tester sur l'environnement de développement** avant de mettre en production
3. **Fusionner `dev` → `main`** uniquement après validation complète
4. **Supprimer les branches de test** une fois les fonctionnalités intégrées

---

**🎉 Architecture simplifiée et claire pour un développement efficace !**