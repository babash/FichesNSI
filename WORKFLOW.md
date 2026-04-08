# 🚀 Guide de Workflow - Fiches NSI

## 🎯 **Méthode de travail établie**

### **Principe :**
- **Production** → Branche `main` → Site final sur `https://babash.github.io/FichesNSI/`

---

## 📝 **Workflow quotidien**

### **1. Commencer le développement**
```bash
git checkout -b feature/ma-fonctionnalite
# Faire vos modifications...
```

### **2. Ouvrir une Pull Request vers main**
```bash
git add .
git commit -m "feat: description de vos modifications"
git push origin feature/ma-fonctionnalite
```

### **3. Valider et mettre en production**
```bash
# Après revue et CI verte
git checkout main
git merge --no-ff feature/ma-fonctionnalite
git push origin main
```
→ **Déploiement automatique** sur `https://babash.github.io/FichesNSI/`

---

## 🔍 **Vérifications importantes**

### **Avant de mettre en production :**
- [ ] Build local OK (HTML/CSS/JS)
- [ ] PDFs générés et valides avec Playwright
- [ ] Layout masonry et responsive OK
- [ ] Site statique généré sans erreur

### **URL**
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

### **Test local complet**
```bash
# Installer les dépendances
npm install
npx playwright install

# Tester le serveur de développement
npm start

# Tester la génération statique
npm run build

# Tester le site généré
cd dist && python -m http.server 8000
```

---

## ⚠️ **Points d'attention**

1. **Vérifier que Playwright est installé** (`npx playwright install`)
2. **S'assurer que les PDFs se génèrent correctement**
3. **Vérifier que le CSS/JS se charge sans erreur**
4. **Tester la génération statique avant le push**

---

## 🆘 **En cas de problème**

### **Déploiement non visible :**
1. Vérifier les logs GitHub Actions
2. Attendre 5-10 minutes (cache GitHub Pages)
3. Forcer un hard refresh (Ctrl+F5)

### **Erreur de déploiement :**
1. Consulter les logs du workflow
2. Vérifier que `npm install` et `npx playwright install` fonctionnent localement
3. Tester la génération statique : `npm run build`

### **PDFs corrompus :**
1. Vérifier que Playwright fonctionne
2. Tester avec une fiche simple
3. Consulter les logs de génération PDF

### **Playwright ne fonctionne pas :**
1. Vérifier que `npx playwright install` a été exécuté
2. Tester localement avec `npm run build`
3. Consulter les logs d'installation de Playwright

---

## 📋 **Checklist de déploiement**

### **Avant chaque merge vers main :**
- [ ] Tests locaux OK
- [ ] Playwright installé et fonctionnel
- [ ] Tous les éléments visuels OK
- [ ] PDFs téléchargeables
- [ ] Pas d'erreurs console
- [ ] Site statique généré sans erreur

---

**🎉 Avec cette méthode, vous avez un environnement de développement stable et une production fiable !**