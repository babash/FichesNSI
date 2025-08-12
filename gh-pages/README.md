# 🚀 Générateur de Fiches de Révision NSI

Un générateur moderne de fiches de révision pour la spécialité NSI (Numérique et Sciences Informatiques) avec support pour la génération de PDFs et le déploiement automatique sur GitHub Pages.

## ✨ Fonctionnalités

- 📚 **Fiches de révision structurées** : Organisation claire par thèmes avec icônes et mise en forme
- 🎨 **Design moderne** : Interface utilisateur élégante avec thème Python
- 📄 **Génération de PDFs** : Export automatique des fiches en PDF avec mise en forme optimisée
- 🌐 **Site web responsive** : Interface adaptée à tous les appareils
- 🔍 **Recherche intégrée** : Trouvez rapidement les fiches dont vous avez besoin
- 🚀 **Déploiement automatique** : GitHub Actions pour une mise à jour continue
- 💻 **Coloration syntaxique** : Code Python mis en évidence avec highlight.js

## 🛠️ Installation

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Installation locale

```bash
# Cloner le repository
git clone https://github.com/votre-username/fiches-nsi-generator.git
cd fiches-nsi-generator

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

Le site sera accessible sur `http://localhost:3000`

## 📖 Utilisation

### Navigation

- **Page d'accueil** : Vue d'ensemble de toutes les fiches disponibles
- **Fiches individuelles** : `/fiches/[nom-de-la-fiche]`
- **Recherche** : Utilisez la barre de recherche pour filtrer les fiches

### Génération de PDFs

#### Option 1 : Génération automatique (si Puppeteer disponible)
- **Fiche individuelle** : `/fiches/[nom]/pdf`
- **Toutes les fiches** : `/fiches/all/pdf`

#### Option 2 : Version HTML optimisée pour impression (recommandée)
- **Fiche individuelle** : `/fiches/[nom]/print`
- **Toutes les fiches** : `/fiches/all-print`

**💡 Astuce** : Ouvrez les versions d'impression dans votre navigateur et utilisez `Ctrl+P` (ou `Cmd+P` sur Mac) pour générer un PDF de qualité optimale.

## 🏗️ Structure du projet

```
fiches-nsi-generator/
├── content/           # Fiches au format Markdown
├── css/              # Styles CSS
├── js/               # JavaScript client
├── views/            # Templates EJS
├── src/              # Code source Node.js
├── public/           # Fichiers statiques
├── gh-pages/         # Site généré pour GitHub Pages
└── .github/          # Configuration GitHub Actions
```

### Format des fiches

Les fiches utilisent le format Markdown avec front-matter YAML :

```markdown
---
title: "Fiche NSI – Titre de la fiche"
footer: "Fiche NSI – Titre – Niveau"
---

<section>
  <h2 data-icon="📘">Titre de section</h2>
  <p>Contenu de la section...</p>
  <pre><code class="language-python">print("Hello World")</code></pre>
</section>
```

## 🚀 Déploiement

### Déploiement automatique (recommandé)

Le projet utilise GitHub Actions pour un déploiement automatique :

1. **Push sur main/master** : Déclenche automatiquement le build et le déploiement
2. **Déploiement manuel** : Utilisez l'onglet "Actions" dans GitHub

### Déploiement manuel

```bash
# Construire le site
npm run build

# Déployer sur GitHub Pages
./deploy.sh "Message de commit"
```

## 🔧 Configuration

### Variables d'environnement

- `PORT` : Port du serveur (défaut: 3000)
- `NODE_ENV` : Environnement (development/production)

### Personnalisation

#### Styles CSS
Modifiez `css/fiche-nsi.css` pour personnaliser l'apparence des fiches.

#### Thème
Les couleurs et polices sont définies dans les variables CSS :
- `--python-blue` : Couleur principale Python
- `--python-yellow` : Couleur d'accent Python
- `--accent-bg` : Arrière-plan des sections

## 📝 Ajouter une nouvelle fiche

1. Créez un fichier `.md` dans le dossier `content/`
2. Utilisez le format avec front-matter YAML
3. Structurez le contenu avec des `<section>` et `<h2 data-icon="...">`
4. Ajoutez du code Python avec `<pre><code class="language-python">`
5. Committez et poussez - le déploiement sera automatique !

### Exemple de nouvelle fiche

```markdown
---
title: "Fiche NSI – Les listes en Python"
footer: "Fiche NSI – Listes – Terminale"
---

<section>
  <h2 data-icon="📋">Définition</h2>
  <p>Une liste est une structure de données mutable...</p>
  <pre><code class="language-python">ma_liste = [1, 2, 3, 4, 5]
print(ma_liste[0])  # Premier élément</code></pre>
</section>
```

## 🐛 Dépannage

### Problèmes courants

#### PDFs non générés
- Vérifiez que Puppeteer est installé : `npm install puppeteer`
- Utilisez les versions HTML d'impression comme alternative
- Vérifiez les logs du serveur pour plus de détails

#### Styles non appliqués
- Vérifiez que les fichiers CSS sont bien copiés
- Vérifiez la console du navigateur pour les erreurs
- Assurez-vous que les chemins d'images sont corrects

#### Serveur ne démarre pas
- Vérifiez que le port 3000 est libre
- Vérifiez les logs d'erreur
- Assurez-vous que toutes les dépendances sont installées

## 🤝 Contribution

Les contributions sont les bienvenues ! 

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **Highlight.js** pour la coloration syntaxique
- **Google Fonts** pour les polices
- **GitHub Pages** pour l'hébergement
- **GitHub Actions** pour l'automatisation

---

**💡 Note** : Ce projet est optimisé pour l'enseignement de la NSI en Terminale. Les fiches couvrent les concepts fondamentaux de la programmation Python et de l'informatique.