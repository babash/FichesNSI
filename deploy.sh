#!/bin/bash

# Script de déploiement automatique pour GitHub Pages
# Usage: ./deploy.sh [message de commit]

set -e

echo "🚀 Déploiement automatique sur GitHub Pages..."

# Vérifier que nous sommes dans un repo git
if [ ! -d ".git" ]; then
    echo "❌ Erreur: Ce répertoire n'est pas un repository Git"
    exit 1
fi

# Vérifier que nous sommes sur la branche main/master
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
    echo "⚠️  Attention: Vous n'êtes pas sur la branche main/master (actuellement sur $CURRENT_BRANCH)"
    read -p "Continuer quand même ? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Message de commit par défaut
COMMIT_MESSAGE=${1:-"Update GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"}

echo "📝 Message de commit: $COMMIT_MESSAGE"

# Construire le site
echo "🔨 Construction du site..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la construction du site"
    exit 1
fi

# Vérifier que le répertoire gh-pages a été créé
if [ ! -d "gh-pages" ]; then
    echo "❌ Erreur: Le répertoire gh-pages n'a pas été créé"
    exit 1
fi

# Vérifier que les PDFs ont été générés
PDF_COUNT=$(find gh-pages/pdfs -name "*.pdf" 2>/dev/null | wc -l)
if [ $PDF_COUNT -eq 0 ]; then
    echo "⚠️  Attention: Aucun PDF n'a été généré"
    read -p "Continuer quand même ? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ $PDF_COUNT PDF(s) généré(s)"
fi

# Ajouter les fichiers au staging
echo "📁 Ajout des fichiers au staging..."
git add gh-pages/

# Vérifier s'il y a des changements
if git diff --cached --quiet; then
    echo "ℹ️  Aucun changement détecté, déploiement annulé"
    exit 0
fi

# Commiter les changements
echo "💾 Commit des changements..."
git commit -m "$COMMIT_MESSAGE"

# Pousser sur la branche gh-pages
echo "🚀 Déploiement sur GitHub Pages..."
git subtree push --prefix gh-pages origin gh-pages

if [ $? -eq 0 ]; then
    echo "✅ Déploiement réussi !"
    echo "🌐 Le site sera disponible dans quelques minutes sur :"
    echo "   https://[votre-username].github.io/[votre-repo]"
else
    echo "❌ Erreur lors du déploiement"
    echo "💡 Essayez de créer la branche gh-pages manuellement :"
    echo "   git subtree push --prefix gh-pages origin gh-pages"
    exit 1
fi

echo "🎉 Déploiement terminé !"