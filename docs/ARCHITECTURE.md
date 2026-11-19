# Architecture des Fiches de révision NSI

Ce que fait le générateur, comment écrire une fiche, comment sont fabriqués les PDF, et l'organisation du code. Pour installer et publier, voir [INSTALLER.md](INSTALLER.md).

Le générateur transforme des fichiers Markdown (`content/*.md`) en un site statique, publié sur GitHub Pages : une page d'accueil, une page web par fiche et un PDF A4 par fiche, plus un PDF de toutes les fiches.

## Ce que voit l'élève

- **L'accueil** range les fiches par niveau (SNT et début de 1re, 1re, terminale), puis par thème du programme. Chaque fiche a son résumé et un bouton PDF. La recherche porte sur le titre, le résumé, le thème et les mots-clés, sans tenir compte des accents ; sans JavaScript, toutes les fiches restent affichées.
- **Une fiche** en ligne : deux colonnes sur grand écran, une sur téléphone ; en haut, le retour à l'accueil et le PDF ; en bas, la fiche précédente et la suivante. La réponse de l'exercice éclair s'ouvre d'un clic.
- **Le PDF** : une page A4 par fiche, sans réduction de la police, la réponse de l'exercice imprimée à l'envers, l'auteur et la licence en bas à droite, à 10 mm du bord.

Aucune ressource n'est chargée d'un autre site : les polices sont dans `public/fonts/`, et le code est coloré pendant la génération (highlight.js, côté Node.js).

## Écrire une nouvelle fiche

1. Copier [exemple-affichage.md](exemple-affichage.md) dans `content/`, sous un nom court sans accent : ce nom devient l'adresse (`fiches/<nom>/` et `fiches/<nom>.pdf`). **Ne jamais renommer une fiche publiée** : des liens et des QR codes y mènent.
2. Remplir l'en-tête et les encadrés en suivant le [guide de rédaction](GUIDE_MARKDOWN.md).
3. `npm test` : vérifie le gabarit et exécute les exemples de code.
4. `npm start`, puis http://localhost:3000 pour voir la fiche ; `/fiches/<nom>.pdf` fabrique son PDF.
5. `npm run build` vérifie que chaque fiche tient sur une page, puis fabrique le site dans `dist/`.

## La fabrication des PDF

- Les pages `/pdf/<fiche>` et `/pdf/toutes` (construites par `src/pages.js`) mettent chaque fiche dans une boîte A4 : 7 mm de marge en haut, 8 mm sur les côtés, 17 mm en bas (6, 7 et 15 mm pour une fiche « remplie »), où la mention de l'auteur et de la licence est écrite à 10 mm du bord (`position: fixed`, répétée sur chaque page). La règle `@page { margin: 0 }` de ces pages laisse la mise en page à la boîte.
- Fiche ordinaire : les encadrés remplissent la colonne de gauche, puis celle de droite (`column-fill: auto`). Fiche « remplie » (`remplie: true`) : un script mesure chaque encadré, puis coupe la suite des encadrés (sans changer leur ordre) là où les deux colonnes sont le plus équilibrées. Une fiche trop longue est réduite (jusqu'à 85 %) et signalée.
- **Taux de remplissage** : la hauteur naturelle de chaque colonne divisée par la hauteur disponible ; la génération l'affiche pour chaque fiche (`[REMPLISSAGE]`). Visé : 98 à 100 %, les deux colonnes à 2 % près. Pour une fiche « remplie », si les deux colonnes le sont à 95 % au moins, les encadrés s'étirent pour finir exactement au bas de la page.
- Avant de fabriquer les PDF, `scripts/generate-static.js` ouvre chaque page avec Puppeteer et affiche la hauteur occupée (sur 1031 px, ou 1043 px pour une fiche « remplie ») et le taux de remplissage. Une fiche réduite est signalée ; une fiche qui déborde encore, une ligne de code qui passerait à la ligne sur papier, une erreur JavaScript ou une ressource introuvable arrêtent la génération.
- Le texte est en 9,75 pt (interligne 1,3) et le code en 8,25 pt ; dans une fiche « remplie », texte en 9,5 pt tableaux compris (interligne 1,25), code interligne 1,2 ; les ligatures (« fi », « fl ») sont désactivées, car Chromium les extrait mal des PDF.
- Les PDF publiés sont fabriqués par le Chromium de Puppeteer 5.5 (Chromium 88). Un Chromium plus récent donne des hauteurs un peu différentes.

## L'organisation du projet

```
FichesNSI/
├── content/                 # Les fiches, en Markdown (une par fichier)
├── src/
│   ├── fiches.js            # Lecture des fiches, coloration du code, ordre et regroupement
│   ├── pages.js             # Le HTML de l'accueil, des fiches et des pages des PDF
│   ├── pdf.js               # Fabrication et vérification des PDF (html-pdf-node, Puppeteer)
│   └── routes.js            # Les adresses du serveur local
├── scripts/
│   ├── generate-static.js   # Le site statique, dans dist/
│   └── verifier-fiches.js   # Le gabarit de chaque fiche (npm test)
├── tests/
│   ├── tester_exemples.py   # Exécute les exemples de code des fiches (npm test)
│   └── bases/lycee.sql      # La base d'exemple de la fiche SQL
├── public/                  # CSS, JS de l'accueil, polices, image de fond, icône
├── docs/                    # Les guides
├── .github/workflows/       # La publication
└── server.js                # Le serveur local (npm start)
```

## Les technologies

- **Node.js** et **Express** : le serveur local et le serveur temporaire de la génération.
- **Marked** et **front-matter** : le Markdown et l'en-tête des fiches.
- **highlight.js** : la coloration du code Python et SQL, pendant la génération.
- **html-pdf-node** (Puppeteer 5.5, Chromium 88) : les PDF.
- **Python 3** et **SQLite** : l'exécution des exemples dans `npm test`.
- Côté navigateur : CSS (colonnes, grille), un court script sans bibliothèque pour la recherche ; polices Lato, Orbitron et Fira Code hébergées dans le dépôt.

## Contribuer

Les contributions sont les bienvenues : un bug ou une idée dans les [issues](https://github.com/babash/FichesNSI/issues), une Pull Request, une nouvelle fiche.
