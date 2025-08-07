# Générateur de Fiches de Révision NSI

Ce projet est un petit serveur web Node.js conçu pour générer dynamiquement des fiches de révision pour la spécialité NSI (Numérique et Sciences Informatiques). Il transforme des fichiers Markdown simples en pages web propres, stylisées et prêtes à être imprimées au format A4.

## ✨ Fonctionnalités

*   **Génération Dynamique** : Les fiches sont créées à la volée à partir de fichiers `.md`.
*   **Séparation du Contenu et de la Forme** : Le contenu est écrit en Markdown, la mise en page est gérée par des templates EJS et du CSS.
*   **Page d'Accueil Automatique** : Une page d'accueil liste toutes les fiches disponibles dans le dossier `content/`.
*   **Mise en Page A4** : Le style est optimisé pour une impression directe sur des feuilles A4.
*   **Coloration Syntaxique** : Les blocs de code Python sont automatiquement mis en couleur grâce à `highlight.js`.

---

## 🚀 Installation et Lancement

Pour faire fonctionner ce projet en local, vous aurez besoin de Node.js (version 14 ou supérieure) et de npm.

1.  **Cloner le dépôt** (si vous l'avez mis sur GitHub/GitLab) :
    ```bash
    git clone <URL_DU_DEPOT>
    cd fiches-nsi-generator
    ```
    *Sinon, assurez-vous d'être dans le dossier du projet.*

2.  **Installer les dépendances** :
    Cette commande télécharge toutes les librairies nécessaires (Express, EJS, etc.).
    ```bash
    npm install
    ```

3.  **Lancer le serveur** :
    ```bash
    npm start
    ```

4.  **Consulter les fiches** :
    Ouvrez votre navigateur et rendez-vous sur http://localhost:3000.

---

## ✍️ Comment créer une nouvelle fiche ?

C'est très simple !

1.  Créez un nouveau fichier avec l'extension `.md` dans le dossier `/content`. Le nom du fichier déterminera l'URL de la fiche (ex: `ma-nouvelle-fiche.md` sera accessible à `/fiches/ma-nouvelle-fiche`).

2.  Structurez votre fichier en commençant par le "Front Matter" pour les métadonnées :
    ```markdown
    ---
    title: "Fiche NSI – Titre de ma fiche"
    footer: "Texte du pied de page"
    ---
    ```

3.  Écrivez le contenu en utilisant du Markdown et des balises HTML. Pour respecter la mise en page en deux colonnes, entourez chaque bloc d'une balise `<section>` :
    ```html
    <section>
      <h2 data-icon="💡">Titre de la section</h2>
      <p>Contenu de la section...</p>
      <ul>
        <li>Point 1</li>
        <li>Point 2</li>
      </ul>
    </section>
    ```

4.  Redémarrez le serveur (`Ctrl+C` puis `npm start`) pour que votre nouvelle fiche soit prise en compte. Elle apparaîtra automatiquement sur la page d'accueil.

---

## 🛠️ Technologies utilisées

*   **Node.js** : Environnement d'exécution JavaScript côté serveur.
*   **Express.js** : Framework web pour Node.js.
*   **EJS** : Moteur de templates pour générer du HTML.
*   **Marked** : Parseur pour convertir le Markdown en HTML.
*   **Front-matter** : Pour extraire les métadonnées des fichiers Markdown.