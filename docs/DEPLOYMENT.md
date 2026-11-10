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
2. **Vérification** : en local, avant la fusion. Aucun workflow ne tourne sur une branche ou une Pull Request : génère le site avec `npm run build`, puis vérifie les pages et les PDF du dossier `dist/`.
3. **Production** : la fusion dans `main` lance la publication.

## 📋 Les étapes de la publication

Chaque publication suit ces étapes :

1. **Récupération** du code source (checkout).
2. **Installation** des dépendances Node.js.
3. **Génération** du site statique et des PDF, dans le dossier `dist/` (il n'est pas versionné).
4. **Vérification** des fichiers générés.
5. **Publication** du dossier `dist/` sur la branche `gh-pages`.

## ✅ Vérifications automatiques

Le seul workflow du dépôt est `deploy-production.yml` : il ne tourne qu'à la publication (un envoi sur `main`, ou un lancement à la main). Après la génération, il vérifie que ces fichiers existent :
- ✅ `dist/index.html` (la page d'accueil) ;
- ✅ `dist/css/fiche-nsi.css` (la feuille de style des fiches) ;
- ✅ `dist/fiches/liste/index.html` (la page d'une fiche) ;
- ✅ `dist/fiches/liste.pdf` (le PDF d'une fiche) ;
- ✅ `dist/fiches/all.pdf` (le PDF de toutes les fiches).

S'il en manque un, le workflow s'arrête et le site en ligne ne change pas. Les autres fiches ne sont pas vérifiées : si le PDF d'une autre fiche échoue, l'erreur est seulement écrite dans le journal (`[STATIC] Erreur génération PDF …`) et la publication continue sans ce PDF. Le message de fin du workflow (« Tests validés ») ne fait qu'afficher du texte : il ne lance aucun autre essai.

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
