# ℹ️ Note importante

L'environnement de développement (`dev`) et les branches de test ont été retirés. Seule la branche de production est conservée.

# 🌿 Organisation des Branches - Fiches NSI

## 📋 **Branches principales**

### **`main`** 🏷️ **production**
- **Rôle** : Branche de production stable
- **URL** : `https://babash.github.io/FichesNSI/`
- **Usage** : Code validé et prêt pour la production
- **Tag** : `production`

### **`gh-pages`** 🏷️ **deployment**
- **Rôle** : Branche de déploiement GitHub Pages
- **Contenu** : Site statique de production uniquement
- **Usage** : Déploiement automatique via GitHub Actions
- **Tag** : `deployment`

## 🧪 **Branches de test**

Les branches de test ne sont plus utilisées.

## 🔄 **Workflow de développement**

### **1. Développement quotidien**
```bash
git checkout -b feature/ma-fonctionnalite
# Faire vos modifications
git add .
git commit -m "feat: description"
git push origin feature/ma-fonctionnalite
```
→ Ouvrir une Pull Request vers `main`

### **2. Mise en production**
```bash
git checkout main
git merge --no-ff feature/ma-fonctionnalite
git push origin main
```
→ **Production** sur `https://babash.github.io/FichesNSI/`

## 🏷️ **Tags de référence**

- **`production`** : Marque la branche de production stable
- **`development`** : Marque la branche de développement
- **`deployment`** : Marque la branche de déploiement GitHub Pages

## 🧹 **Branches supprimées**

### **Branches obsolètes supprimées :**
- ❌ Branches de travail temporaires
- ❌ Branches de déploiement de développement et de test

### **Raison de la suppression :**
- **Branches temporaires** : Fonctionnalités intégrées puis supprimées
- **Environnements secondaires** : Retirés pour simplifier l'architecture

## 📊 **État actuel**

### **Branches actives :**
- ✅ `main` (production)
- ✅ `gh-pages` (déploiement)

### **Environnements :**
- 🌐 **Production** : `https://babash.github.io/FichesNSI/`

## 🎯 **Recommandations**

1. Ouvrir des Pull Requests vers `main`
2. Utiliser le CI pour valider les builds et les PDFs
3. Merger vers `main` pour déclencher la production

---

**🎉 Architecture simplifiée et claire pour un développement efficace !**