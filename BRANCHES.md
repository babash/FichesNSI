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

## 🔄 **Workflow de contribution**

### **1. Développement sur branche de fonctionnalité**
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
- **`deployment`** : Marque la branche de déploiement GitHub Pages

## 🧹 **Branches supprimées**

### **Branches obsolètes supprimées :**
- ❌ Branches de développement et de test
- ❌ Branches temporaires de travail

### **Raison de la suppression :**
- **Simplification** : Architecture production only

## 📊 **État actuel**

### **Branches actives :**
- ✅ `main` (production)
- ✅ `gh-pages` (déploiement)

### **Environnements :**
- 🌐 **Production** : `https://babash.github.io/FichesNSI/`

## 🎯 **Recommandations**

1. Créer des PRs vers `main`
2. Utiliser le CI pour valider les builds et les PDFs avec Playwright
3. Merger vers `main` pour déclencher la production
4. Tester localement avec `npm run build` avant le push

## 🛠️ **Commandes utiles**

### **Vérifier les branches**
```bash
git branch -a
```

### **Créer une nouvelle branche**
```bash
git checkout -b feature/nom-de-la-fonctionnalite
```

### **Voir les branches distantes**
```bash
git branch -r
```

### **Supprimer une branche locale**
```bash
git branch -d nom-de-la-branche
```

### **Supprimer une branche distante**
```bash
git push origin --delete nom-de-la-branche
```

---

**🎉 Architecture simplifiée et claire pour un dépôt production-only !**