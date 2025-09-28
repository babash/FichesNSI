#!/usr/bin/env node

/**
 * Script d'installation automatique de Playwright
 * Vérifie et installe Playwright avec ses dépendances système
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎭 Installation de Playwright...');

try {
  // Vérifier si Playwright est déjà installé
  console.log('📦 Installation des navigateurs Playwright...');
  execSync('npx playwright install', { stdio: 'inherit' });
  
  console.log('🔧 Installation des dépendances système...');
  try {
    execSync('npx playwright install-deps', { stdio: 'inherit' });
    console.log('✅ Dépendances système installées avec succès');
  } catch (error) {
    console.log('⚠️  Installation des dépendances système échouée (peut nécessiter sudo)');
    console.log('💡 Exécutez manuellement: sudo npm run install:playwright-deps');
  }
  
  // Vérifier l'installation
  console.log('🔍 Vérification de l\'installation...');
  try {
    execSync('npx playwright --version', { stdio: 'pipe' });
    console.log('✅ Playwright installé avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la vérification de Playwright');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Erreur lors de l\'installation de Playwright:', error.message);
  console.log('\n💡 Solutions possibles:');
  console.log('   1. Vérifiez votre connexion internet');
  console.log('   2. Exécutez: npm run install:playwright');
  console.log('   3. Exécutez: sudo npm run install:playwright-deps');
  process.exit(1);
}