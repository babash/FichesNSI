const express = require('express');
const path = require('path');
const fs = require('fs').promises; // On utilise la version 'promises' pour async/await
const marked = require('marked');
const fm = require('front-matter');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;
let browser; // Instance de navigateur partagée

// Notre "base de données" en mémoire qui contiendra les fiches
const fiches = new Map();

// Définir EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir les fichiers statiques (CSS, images) depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));
 
// --- ROUTES ---

// Route pour la page d'accueil : lister toutes les fiches
app.get('/', (req, res) => {
  // On passe la liste des fiches (convertie depuis la Map) au template
  res.render('index', { fiches: Array.from(fiches.values()) });
});

// Route pour afficher une fiche spécifique
app.get('/fiches/:slug', (req, res, next) => {
  const fiche = fiches.get(req.params.slug);

  if (!fiche) {
    // Si la fiche n'est pas dans notre Map, on passe au middleware 404
    return next(); 
  }

  res.render('fiche', { fiche });
});

// Route "cachée" pour générer un HTML propre pour le PDF d'une seule fiche.
// Cela évite les boucles récursives si la page de la fiche contient un lien de téléchargement PDF.
app.get('/fiches/:slug/html-for-pdf', (req, res, next) => {
  const fiche = fiches.get(req.params.slug);

  if (!fiche) {
    return next();
  }

  const fullHtml = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>${fiche.title}</title>
      <link rel="stylesheet" href="/css/fiche-nsi.css">
      <link rel="stylesheet" href="/css/prism.css">
    </head>
    <body><article class="fiche">${fiche.content}</article></body>
    </html>`;
  res.send(fullHtml);
});

// --- NOUVELLE ROUTE POUR LE PDF ---
app.get('/fiches/:slug/pdf', async (req, res, next) => {
  const { slug } = req.params;
  const fiche = fiches.get(slug);

  if (!fiche) {
    return next();
  }

  let page;
  try {
    console.log(`[PDF] Lancement de la génération pour : ${slug}`);
    page = await browser.newPage();

    // On navigue vers la page HTML propre, sans éléments interactifs
    const url = `http://localhost:${port}/fiches/${slug}/html-for-pdf`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Attendre explicitement que toutes les polices de caractères soient chargées et prêtes
    await page.evaluateHandle('document.fonts.ready');

    // On génère le PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true, // Crucial pour que le CSS soit appliqué
      tagged: false, // Désactive la génération de PDF balisé, source potentielle de crashs
      timeout: 0, // Désactive la limite de temps pour la génération
    });

    // On envoie le PDF au client pour qu'il le télécharge
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${slug}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
    console.log(`[PDF] Fichier envoyé pour : ${slug}`);
  } catch (error) {
    console.error(`[PDF] Erreur lors de la génération du PDF pour ${slug}:`, error);
    res.status(500).send('Erreur lors de la génération du PDF.');
  } finally {
    if (page) await page.close(); // On ferme la page, pas le navigateur
  }
});

// --- NOUVELLE ROUTE POUR LE PDF COMBINÉ ---

// Route "cachée" pour générer un HTML propre pour le PDF de toutes les fiches.
// On génère le HTML manuellement pour s'assurer qu'il ne contient aucun script
// ou lien qui pourrait interférer avec la génération du PDF (ex: lien "Tout télécharger").
app.get('/fiches/all-html', (req, res) => {
  const allFiches = Array.from(fiches.values());
  // On trie les fiches par titre pour un ordre cohérent dans le PDF
  allFiches.sort((a, b) => a.title.localeCompare(b.title));

  const fichesHtml = allFiches.map(fiche => `
    <article class="fiche">
      ${fiche.content}
    </article>
    <div style="page-break-after: always;"></div>
  `).join('');

  const fullHtml = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Toutes les fiches NSI</title>
      <link rel="stylesheet" href="/css/fiche-nsi.css">
      <link rel="stylesheet" href="/css/prism.css">
    </head>
    <body><main class="container">${fichesHtml}</main></body>
    </html>`;
  res.send(fullHtml);
});

app.get('/fiches/all/pdf', async (req, res) => {
  let page;
  try {
    console.log('[PDF] Lancement de la génération de toutes les fiches');
    page = await browser.newPage();

    // On navigue vers notre nouvelle page qui combine tout
    const url = `http://localhost:${port}/fiches/all-html`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Attendre explicitement que toutes les polices de caractères soient chargées et prêtes
    await page.evaluateHandle('document.fonts.ready');

    // On génère le PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      tagged: false, // Désactive la génération de PDF balisé, source potentielle de crashs
      timeout: 0, // Désactive la limite de temps pour la génération
    });

    // On envoie le PDF au client
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="toutes-les-fiches-nsi.pdf"');
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
    console.log('[PDF] Fichier combiné envoyé.');
  } catch (error) {
    console.error('[PDF] Erreur lors de la génération du PDF combiné:', error);
    res.status(500).send('Erreur lors de la génération du PDF combiné.');
  } finally {
    if (page) await page.close();
  }
});


// --- GESTION DES ERREURS ---

// Middleware pour les erreurs 404 (doit être à la fin)
app.use((req, res) => {
  res.status(404).send("Désolé, la page que vous cherchez n'existe pas.");
});

// --- DÉMARRAGE DU SERVEUR ---

/**
 * Scanne le dossier 'content', parse les fichiers Markdown
 * et les charge en mémoire dans la Map 'fiches'.
 */
async function loadContent() {
  try {
    const contentDir = path.join(__dirname, 'content');
    const files = await fs.readdir(contentDir);

    for (const file of files) {
      if (path.extname(file) === '.md') {
        const filePath = path.join(contentDir, file);
        const data = await fs.readFile(filePath, 'utf8');
        const page = fm(data);
        const slug = path.basename(file, '.md');

        fiches.set(slug, {
          slug: slug,
          title: page.attributes.title || 'Titre manquant',
          footer: page.attributes.footer || '',
          content: marked.parse(page.body)
        });
        console.log(`[OK] Fiche chargée : ${slug}`);
      }
    }
  } catch (error) {
    console.error("Erreur lors du chargement des fiches :", error);
    process.exit(1); // On arrête le serveur si on ne peut pas charger les fiches
  }
}

/**
 * Charge le contenu, lance le navigateur partagé puis démarre le serveur Express.
 */
async function startServer() {
  await loadContent();

  console.log('[Puppeteer] Lancement du navigateur partagé...');
  browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  console.log('[Puppeteer] Navigateur prêt.');

  app.listen(port, () => {
    console.log(`\nServeur démarré et prêt sur http://localhost:${port}`);
  });
}

startServer();

// --- GESTION DE L'ARRÊT (GRACEFUL SHUTDOWN) ---
process.on('SIGINT', async () => {
  console.log('\n[Serveur] Arrêt en cours...');
  if (browser) {
    console.log('[Puppeteer] Fermeture du navigateur...');
    await browser.close();
  }
  console.log('[Serveur] Arrêt terminé.');
  process.exit(0);
});