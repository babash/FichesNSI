# Déploiement Automatique - Fiches NSI

## 🚀 Déploiement Automatique

Ce projet utilise GitHub Actions pour un déploiement automatique sur GitHub Pages avec génération de site statique et PDFs pré-générés.

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
- ✅ Installation des dépendances Node.js
- ✅ Génération du site statique complet
- ✅ Validation des fichiers HTML générés
- ✅ Validation des fichiers CSS générés
- ✅ Génération de tous les PDFs individuels
- ✅ Génération du PDF combiné
- ✅ Validation des PDFs (format et taille)
- ✅ Déploiement sur GitHub Pages

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
2. Tester la génération locale avec `npm run build`
3. Vérifier que le serveur temporaire démarre correctement
4. Vérifier les logs de génération dans GitHub Actions

### 🔄 Processus de Génération

#### Étapes du Build
1. **Installation** des dépendances (`npm ci`)
2. **Chargement** des fiches Markdown
3. **Copie** des assets statiques (CSS, JS, images)
4. **Génération** des pages HTML individuelles
5. **Démarrage** du serveur temporaire (port 3001)
6. **Génération** de tous les PDFs avec html-pdf-node
7. **Arrêt** du serveur temporaire
8. **Validation** des fichiers générés
9. **Déploiement** sur GitHub Pages

#### Structure Générée
```
dist/
├── index.html                    # Page d'accueil
├── css/                         # Styles CSS
├── js/                          # Scripts JavaScript
├── images/                      # Images
├── fiches/                      # Pages des fiches
│   ├── all.pdf                  # PDF combiné
│   ├── {slug}.pdf              # PDFs individuels
│   └── {slug}/index.html       # Pages HTML
└── .nojekyll                   # Désactive Jekyll
```

### 📊 Status des Déploiements

- 🟢 **Production** : https://babash.github.io/FichesNSI/
- 🟡 **Tests** : https://babash.github.io/FichesNSI/{branch-name}/