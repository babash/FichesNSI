const express = require('express');
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fm = require('front-matter');

const app = express();
const port = 3000;

// Définir EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir les fichiers statiques (CSS, images) depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route principale pour afficher une fiche
app.get('/fiches/:slug', (req, res) => {
  const slug = req.params.slug;
  const filePath = path.join(__dirname, 'content', `${slug}.md`);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send("Désolé, cette fiche n'existe pas.");
      return;
    }

    // 1. Extraire les métadonnées (front-matter) et le contenu markdown
    const page = fm(data);

    // 2. Convertir le contenu markdown en HTML
    const contentHtml = marked.parse(page.body);

    // 3. Rendre le template EJS avec les données
    res.render('fiche', {
      title: page.attributes.title || 'Fiche NSI',
      footer: page.attributes.footer || '',
      content: contentHtml
    });
  });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
  console.log('Exemple de fiche: http://localhost:3000/fiches/chaines-de-caracteres');
});