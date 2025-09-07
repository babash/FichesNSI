# 🚀 Guide de Workflow - Développement Fiches NSI

## 🎯 **Méthode de travail établie**

### **Principe :**
- **Développement** → Branche `dev` → Tests sur `https://babash.github.io/FichesNSI/dev/`
- **Production** → Branche `main` → Site final sur `https://babash.github.io/FichesNSI/`

---

## 📝 **Workflow quotidien**

### **1. Commencer le développement**
```bash
git checkout dev
# Faire vos modifications...
```

### **2. Tester vos modifications**
```bash
git add .
git commit -m "feat: description de vos modifications"
git push origin dev
```
→ **Attendre 2-3 minutes** pour le déploiement automatique
→ **Tester** sur `https://babash.github.io/FichesNSI/dev/`

### **3. Valider et mettre en production**
```bash
# Une fois satisfait des tests sur dev
git checkout main
git merge dev
git push origin main
```
→ **Attendre 2-3 minutes** pour le déploiement automatique
→ **Vérifier** sur `https://babash.github.io/FichesNSI/`

---

## 🔍 **Vérifications importantes**

### **Avant de mettre en production :**
- [ ] Site de dev fonctionne correctement
- [ ] CSS et JS se chargent sans erreur
- [ ] PDFs se téléchargent correctement
- [ ] Toutes les fiches s'affichent bien
- [ ] Layout masonry fonctionne
- [ ] Responsive design OK

### **URLs de test :**
- **Développement** : `https://babash.github.io/FichesNSI/dev/`
- **Production** : `https://babash.github.io/FichesNSI/`

---

## 🛠️ **Commandes utiles**

### **Vérifier le statut**
```bash
git status
git branch -a
```

### **Voir les derniers commits**
```bash
git log --oneline -5
```

### **Annuler un commit (si pas encore pushé)**
```bash
git reset --soft HEAD~1
```

### **Voir les workflows GitHub Actions**
```bash
gh workflow list
gh run list
```

---

## ⚠️ **Points d'attention**

1. **Toujours tester sur dev avant de mettre en production**
2. **Attendre que le déploiement se termine** (2-3 minutes)
3. **Vérifier que les PDFs se génèrent correctement**
4. **S'assurer que le CSS/JS se charge sans erreur**

---

## 🆘 **En cas de problème**

### **Site de dev ne se met pas à jour :**
1. Vérifier les logs GitHub Actions
2. Attendre 5-10 minutes (cache GitHub Pages)
3. Vérifier que le push sur `dev` a bien fonctionné

### **Erreur de déploiement :**
1. Consulter les logs du workflow
2. Vérifier que `npm install` fonctionne localement
3. Tester la génération statique : `node scripts/generate-static.js`

### **PDFs corrompus :**
1. Vérifier que `html-pdf-node` fonctionne
2. Tester avec une fiche simple
3. Consulter les logs de génération PDF

---

## 📋 **Checklist de déploiement**

### **Avant chaque push sur dev :**
- [ ] Code testé localement
- [ ] Pas d'erreurs de syntaxe
- [ ] Fichiers ajoutés avec `git add .`

### **Avant chaque merge vers main :**
- [ ] Tests effectués sur dev
- [ ] Site de dev fonctionne parfaitement
- [ ] Tous les éléments visuels OK
- [ ] PDFs téléchargeables
- [ ] Pas d'erreurs console

---

**🎉 Avec cette méthode, vous avez un environnement de développement stable et une production fiable !**