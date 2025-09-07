# Déploiement Automatique - Fiches NSI

## 🚀 Déploiement Automatique

Ce projet utilise GitHub Actions pour un déploiement automatique sur GitHub Pages.

### 📋 Workflows Configurés

#### 1. **Production** (`main` branch)
- **Déclencheur** : Push sur `main`
- **URL** : https://babash.github.io/FichesNSI/
- **Tests** : Tests complets incluant validation PDF
- **Workflow** : `.github/workflows/deploy-production.yml`

#### 2. **Branches de Test** (`test/*` branches)
- **Déclencheur** : Push sur `test/*`
- **URL** : https://babash.github.io/FichesNSI/{branch-name}/
- **Tests** : Tests de base + validation PDF
- **Workflow** : `.github/workflows/deploy-test.yml`

### 🔧 Configuration

#### GitHub Pages
- **Source** : GitHub Actions
- **Branche de déploiement** : `gh-pages` (production) / `gh-pages-test` (tests)

#### Tests Automatiques
- ✅ Démarrage du serveur
- ✅ Accessibilité des pages principales
- ✅ Génération PDF individuelle
- ✅ Génération PDF complète
- ✅ Validation des PDFs (format et taille)

### 📝 Utilisation

#### Déploiement en Production
```bash
# Merger vers main
git checkout main
git merge test/pdf-optimization-and-print-fixes
git push origin main
```

#### Test d'une Branche
```bash
# Créer une branche de test
git checkout -b test/ma-nouvelle-fonctionnalite
# Faire des modifications
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push origin test/ma-nouvelle-fonctionnalite
```

### 🔍 Monitoring

- **Actions** : Voir les déploiements dans l'onglet "Actions" du repo
- **Logs** : Chaque déploiement génère des logs détaillés
- **Notifications** : Les PR reçoivent automatiquement un lien de preview

### 🛠️ Dépannage

#### Si le déploiement échoue
1. Vérifier les logs dans GitHub Actions
2. Tester localement avec `npm start`
3. Vérifier que tous les tests passent

#### Si les PDFs ne se génèrent pas
1. Vérifier que `html-pdf-node` est installé
2. Tester l'endpoint `/fiches/liste/pdf` localement
3. Vérifier les logs du serveur

### 📊 Status des Déploiements

- 🟢 **Production** : https://babash.github.io/FichesNSI/
- 🟡 **Tests** : https://babash.github.io/FichesNSI/{branch-name}/