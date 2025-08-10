# Plan d'Amélioration du Projet "Fiches NSI"

Ce document synthétise les prochaines étapes pour améliorer et enrichir le générateur de fiches, en se basant sur les retours utilisateurs.

## Phase 1 : Corrections et Améliorations Immédiates (Haute Priorité)

Ces points visent à stabiliser l'existant et à améliorer l'expérience utilisateur de base.

- [x] **Correction du bug de génération PDF**
    - **Problème :** Les fichiers PDF générés sont corrompus ou illisibles, notamment sur Firefox.
    - **Action :** Investiguer le processus de génération PDF avec Puppeteer dans `server.js`. Vérifier les en-têtes HTTP (`Content-Type`, `Content-Length`) et la manière dont le buffer PDF est envoyé au client. Assurer la compatibilité entre les navigateurs. **Fait : Ajout de l'en-tête `Content-Length` pour stabiliser le téléchargement.**

- [ ] **Correction du bug de l'accordéon**
    - **Problème :** Un clic sur le titre "Liste des fiches disponibles" provoque un comportement inattendu (la liste disparaît au lieu de se déplier/replier correctement).
    - **Action :** Réviser le script JavaScript dans `views/index.ejs` qui gère le `click` sur `#toggle-fiches`. S'assurer que le calcul de `scrollHeight` et l'application des classes CSS sont corrects à chaque clic.

- [ ] **Améliorations visuelles et ergonomiques (UI/UX)**
    - [ ] **Centrage de la page :** Modifier le CSS pour que le conteneur principal (`.index-container`) soit toujours centré verticalement et horizontalement dans la fenêtre du navigateur.
    - [ ] **Fond du conteneur :** Remplacer le `background-color: transparent` du `.index-container` par une couleur très légèrement distincte du fond (ex: `#ffffff` ou `#fdfdfd`) avec une ombre subtile.
    - [ ] **Effet de survol continu :** Modifier le CSS pour que l'effet de survol (`:hover`) s'applique à toute la ligne du `.list-header`, englobant à la fois le titre et le lien "Tout télécharger".

## Phase 2 : Ajouts de Contenu et d'Information

Ces points enrichissent le site avec des informations contextuelles et légales importantes.

- [ ] **Ajout de la licence et des crédits**
    - [ ] **Page d'accueil :** Ajouter un pied de page (`footer`) sur `index.ejs` contenant :
        - La mention "Site réalisé par babash" avec un lien vers un profil GitHub/GitLab.
        - La mention "Contenu sous licence CC0 (Domaine Public)".
    - [ ] **Fiches individuelles :** Modifier le template `views/fiche.ejs` pour que le pied de page de chaque fiche inclue également la mention de la licence CC0.

## Phase 3 : Évolutions Majeures et Feuille de Route (Roadmap)

Ces points représentent des fonctionnalités plus complexes qui structureront l'avenir du projet.

- [ ] **Mise en place d'un système de catégories**
    - **Objectif :** Organiser les fiches par thèmes (ex: "Algorithmique", "Réseaux", "Bases de données").
    - **Étapes techniques :**
        1. Ajouter un champ `category: "Thème"` dans le front-matter des fichiers Markdown.
        2. Mettre à jour la fonction `loadContent` dans `server.js` pour lire cette nouvelle métadonnée.
        3. Adapter le template `views/index.ejs` pour regrouper les fiches par catégorie.

- [ ] **Définition du périmètre de contenu**
    - **Objectif :** Établir une liste exhaustive d'environ 50 fiches couvrant l'intégralité du programme officiel de NSI.
    - **Action :** Créer un document de planification (ex: un `PLAN.md` ou dans ce `TODO.md`) qui liste les titres des fiches à créer.

- [ ] **Déploiement en ligne**
    - **Objectif :** Rendre le site accessible publiquement.
    - **Solution proposée :** Utiliser GitHub Pages ou un service similaire (Vercel, Netlify) avec un workflow de déploiement continu (CI/CD).