# 🚀 Méthode de travail - Fiches NSI (production seulement)

## 🎯 **Le principe**

- **Production** → branche `main` → site publié sur `https://babash.github.io/FichesNSI/`
- **Un seul workflow**, `.github/workflows/deploy-production.yml`, lancé à chaque envoi sur `main` : il publie le site. Aucun workflow ne tourne sur une branche de fonctionnalité ou une Pull Request : les vérifications se font en local, avant la fusion.

---

## 📝 **Au quotidien**

### **1. Commence le développement**
```bash
git checkout -b feature/ma-fonctionnalite
# Fais tes modifications…
```

### **2. Ouvre une Pull Request vers main**
```bash
git add .
git commit -m "feat: description de tes modifications"
git push origin feature/ma-fonctionnalite
```

### **3. Valide et mets en production**
```bash
# Après la relecture et les vérifications locales (npm run build, voir « À vérifier »)
git checkout main
git merge --no-ff feature/ma-fonctionnalite
git push origin main
```
→ **Publication automatique** sur `https://babash.github.io/FichesNSI/`

---

## 🔍 **À vérifier**

### **Avant la mise en production :**
- [ ] La génération locale fonctionne (HTML, CSS, JS).
- [ ] Les PDF sont générés et s'ouvrent.
- [ ] La mise en page en colonnes et l'affichage sur téléphone sont corrects.

### **Adresse**
- **Production** : `https://babash.github.io/FichesNSI/`

---

## 🛠️ **Commandes utiles**

### **Voir l'état du dépôt**
```bash
git status
git branch -a
```

### **Voir les derniers commits**
```bash
git log --oneline -5
```

### **Annuler un commit (s'il n'est pas encore envoyé)**
```bash
git reset --soft HEAD~1
```

### **Voir les workflows de GitHub Actions**
```bash
gh workflow list
gh run list
```

---

## ⚠️ **Points d'attention**

1. **Vérifie que les PDF se génèrent correctement.**
2. **Vérifie que le CSS et le JS se chargent sans erreur.**

---

## 🆘 **En cas de problème**

### **La publication n'est pas visible :**
1. Lis le journal de GitHub Actions.
2. Attends 5 à 10 minutes (cache de GitHub Pages).
3. Recharge la page sans le cache (Ctrl+F5).

### **La publication échoue :**
1. Lis le journal du workflow.
2. Vérifie que `npm install` fonctionne sur ton ordinateur.
3. Essaie la génération statique : `node scripts/generate-static.js`.

### **Les PDF sont abîmés :**
1. Vérifie que `html-pdf-node` fonctionne.
2. Essaie avec une fiche simple.
3. Lis le journal de la génération des PDF.

---

## 📋 **Liste de contrôle de la publication**

### **Avant chaque fusion dans main :**
- [ ] Les essais locaux sont bons.
- [ ] Tous les éléments visuels sont corrects.
- [ ] Les PDF se téléchargent.
- [ ] La console n'affiche aucune erreur.

---

**🎉 Avec cette méthode, tu as un environnement de développement stable et une production fiable.**
