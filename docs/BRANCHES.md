# 🌿 Organisation des branches - Fiches NSI

## 📋 **Branches principales**

### **`main`** 🏷️ **production**
- **Rôle** : la branche de production, stable
- **Adresse** : `https://babash.github.io/FichesNSI/`
- **Usage** : le code validé, prêt pour la production
- **Étiquette (tag)** : `production`

### **`gh-pages`** 🏷️ **deployment**
- **Rôle** : la branche publiée par GitHub Pages
- **Contenu** : le site statique de production, rien d'autre
- **Usage** : elle est remplie automatiquement par GitHub Actions ; tu n'y écris jamais toi-même
- **Étiquette (tag)** : `deployment`

## 🔄 **Contribuer**

### **1. Travaille sur une branche de fonctionnalité**
```bash
git checkout -b feature/ma-fonctionnalite
# Fais tes modifications
git add .
git commit -m "feat: description"
git push origin feature/ma-fonctionnalite
```
→ Ouvre une Pull Request (une demande de fusion) vers `main`.

### **2. Mets en production**
```bash
git checkout main
git merge --no-ff feature/ma-fonctionnalite
git push origin main
```
→ **Production** sur `https://babash.github.io/FichesNSI/`

## 🏷️ **Étiquettes de référence**

- **`production`** : marque la branche de production stable.
- **`deployment`** : marque la branche publiée par GitHub Pages.

## 🧹 **Branches supprimées**

### **Branches obsolètes supprimées :**
- ❌ les branches de développement et de test ;
- ❌ les branches de travail temporaires.

### **Pourquoi :**
- **Simplicité** : une seule branche de production.

## 📊 **État actuel**

### **Branches actives :**
- ✅ `main` (production)
- ✅ `gh-pages` (publication)

### **Environnement :**
- 🌐 **Production** : `https://babash.github.io/FichesNSI/`

## 🎯 **Recommandations**

1. Ouvre tes Pull Requests vers `main`.
2. Laisse la CI (les vérifications automatiques) valider la génération du site et des PDF.
3. Fusionne dans `main` pour lancer la mise en production.

---

**🎉 Une organisation simple et claire, avec une seule branche de production.**
