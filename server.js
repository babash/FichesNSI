const express = require('express');
const path = require('path');
const fs = require('fs').promises; // On utilise la version 'promises' pour async/await
const marked = require('marked');
const fm = require('front-matter');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

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

// --- NOUVELLE ROUTE POUR LE PDF ---
app.get('/fiches/:slug/pdf', async (req, res, next) => {
  const { slug } = req.params;
  const fiche = fiches.get(slug);

  if (!fiche) {
    return next();
  }

  let browser;
  try {
    console.log(`[PDF] Lancement de la génération pour : ${slug}`);
    // On lance un navigateur headless. L'option --no-sandbox est souvent nécessaire
    // dans des environnements conteneurisés (Docker) ou sur certains serveurs.
    browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();

    // On navigue vers la page HTML de la fiche
    const url = `http://localhost:${port}/fiches/${slug}`;
    await page.goto(url, { waitUntil: 'networkidle0' });

    // On génère le PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true, // Crucial pour que le CSS soit appliqué
      margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
    });

    await browser.close();

    // On envoie le PDF au client pour qu'il le télécharge
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${slug}.pdf"`);
    res.send(pdfBuffer);
    console.log(`[PDF] Fichier envoyé pour : ${slug}`);
  } catch (error) {
    console.error(`[PDF] Erreur lors de la génération du PDF pour ${slug}:`, error);
    if (browser) await browser.close(); // S'assurer que le navigateur est fermé en cas d'erreur
    res.status(500).send('Erreur lors de la génération du PDF.');
  }
});

// --- NOUVELLE ROUTE POUR LE PDF COMBINÉ ---

// Route "cachée" pour afficher le HTML de toutes les fiches.
// Utile pour le débogage et pour que Puppeteer ait une page à visiter.
app.get('/fiches/all-html', (req, res) => {
  const allFiches = Array.from(fiches.values());
  // On trie les fiches par titre pour un ordre cohérent dans le PDF
  allFiches.sort((a, b) => a.title.localeCompare(b.title));
  res.render('all-fiches', { fiches: allFiches });
});

app.get('/fiches/all/pdf', async (req, res) => {
  let browser;
  try {
    console.log('[PDF] Lancement de la génération de toutes les fiches');
    browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();

    // On navigue vers notre nouvelle page qui combine tout
    const url = `http://localhost:${port}/fiches/all-html`;
    await page.goto(url, { waitUntil: 'networkidle0' });

    // On génère le PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
    });

    await browser.close();

    // On envoie le PDF au client
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="toutes-les-fiches-nsi.pdf"');
    res.send(pdfBuffer);
    console.log('[PDF] Fichier combiné envoyé.');
  } catch (error) {
    console.error('[PDF] Erreur lors de la génération du PDF combiné:', error);
    if (browser) {
      await browser.close();
    }
    res.status(500).send('Erreur lors de la génération du PDF combiné.');
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
async function loadFiches() {
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

// On charge les fiches PUIS on lance le serveur
loadFiches().then(() => {
  app.listen(port, () => {
    console.log(`\nServeur démarré et prêt sur http://localhost:${port}`);
  });
});