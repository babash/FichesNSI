const express = require('express');
const path = require('path');

const FichesManager = require('./src/fiches');
const PDFGenerator = require('./src/pdf');
const RoutesManager = require('./src/routes');

const app = express();
const port = 3000;

// Configuration Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Instances des gestionnaires
const fichesManager = new FichesManager();
const pdfGenerator = new PDFGenerator();
const routesManager = new RoutesManager(fichesManager, pdfGenerator, port);

// Configuration des routes
app.use('/', routesManager.getRouter());

/**
 * Démarre le serveur avec toutes les initialisations nécessaires
 */
async function startServer() {
  try {
    console.log('[INIT] Chargement des fiches...');
    await fichesManager.loadContent();

    console.log('[INIT] Initialisation du générateur PDF...');
    await pdfGenerator.init();

    app.listen(port, () => {
      console.log(`\n✅ Serveur prêt sur http://localhost:${port}`);
    });
  } catch (error) {
    console.error('[ERREUR] Impossible de démarrer le serveur:', error);
    process.exit(1);
  }
}

/**
 * Gestion de l'arrêt propre du serveur
 */
async function gracefulShutdown() {
  console.log('\n[SERVEUR] Arrêt en cours...');
  try {
    await pdfGenerator.close();
    console.log('[SERVEUR] Arrêt terminé proprement.');
    process.exit(0);
  } catch (error) {
    console.error('[ERREUR] Erreur lors de l\'arrêt:', error);
    process.exit(1);
  }
}

// Gestionnaires de signaux
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Démarrage
startServer();