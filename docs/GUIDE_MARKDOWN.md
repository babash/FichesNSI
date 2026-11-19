# Guide de rédaction d'une fiche (gabarit commun)

Toutes les fiches suivent le même gabarit : une page A4, deux colonnes, les mêmes encadrés dans le même ordre. Un modèle à copier est dans [exemple-affichage.md](exemple-affichage.md) ; `npm test` vérifie le gabarit et exécute les exemples de code.

## L'en-tête (front matter)

| Champ | Obligatoire | Rôle |
|---|---|---|
| `title` | oui | « Fiche NSI – Le titre » ; « Fiche NSI – » n'est pas affiché sur la fiche |
| `niveau` | oui | `SNT`, `1re` ou `Tle`, ou une liste (`[SNT, 1re]`) : la fiche est rangée sous le premier |
| `theme` | oui | le thème du programme, affiché sur l'accueil et en haut de la fiche ; reprendre exactement celui des autres fiches du même thème |
| `ordre` | oui | la place dans le niveau (progression du programme), unique dans un niveau |
| `resume` | oui | une phrase, affichée sur l'accueil et utilisée par la recherche |
| `mots_cles` | non | des mots pour la recherche (synonymes, mots du code, termes anglais) |
| `programme` | non | les identifiants des contenus du programme (référentiel du site Ressources NSI et SNT) |

## Les encadrés, dans cet ordre

Chaque encadré est un `<section>` avec un titre `<h2>`. Les quatre encadrés obligatoires ont une classe ; leur titre écrit et leur style de trait les distinguent aussi en noir et blanc.

1. `<section class="essentiel">` **L'essentiel** : la définition courte et le vocabulaire du programme.
2. `<section>` les opérations ou la syntaxe (un tableau court), si utile.
3. `<section class="exemple">` **Exemple** : un code, puis son affichage (voir plus bas).
4. `<section class="trace">` **Trace**, quand elle aide : un tableau tour par tour.
5. `<section class="erreurs">` **Erreurs fréquentes** : les vrais messages de Python, les conceptions erronées connues des élèves.
6. `<section class="retenir">` **À retenir** : 4 à 6 phrases courtes.
7. `<section class="eclair">` **Exercice éclair** : une question, et sa réponse repliée :

```html
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers">La réponse, avec une phrase d'explication.</div>
</details>
```

À l'écran, la réponse s'ouvre d'un clic ; sur papier, elle est imprimée à l'envers.

## Le code et son affichage

```html
<pre><code class="language-python">print(7 // 2)
</code></pre>
<pre class="sortie"><code>3
</code></pre>
```

- Le bloc `sortie` qui suit un code est **l'affichage réel** du programme : `npm test` exécute le code et compare.
- Attributs du `<pre>` du code : `data-suite` (reprend les variables des blocs précédents de la fiche), `data-erreur` (le code doit lever une erreur : finir l'affichage par la dernière ligne du message), `data-entree="15"` (ce que l'élève tape), `data-pas-execute`.
- SQL : `<pre data-base="lycee"><code class="language-sql">`, exécuté sur `tests/bases/lycee.sql` ; affichage : les noms de colonnes, puis une ligne par résultat, séparés par « | ». `data-titre="Résultat"` sur le bloc `sortie` change son étiquette.
- Pas d'émoji (invisibles dans les PDF), 4 espaces d'indentation.
- Une ligne de code ne dépasse pas **46 caractères environ**, indentation comprise : plus longue, elle passerait à la ligne sur papier, et la fin d'un commentaire ressemblerait à du code. La génération mesure chaque ligne et s'arrête sur une ligne trop longue. Mettre un commentaire long sur la ligne d'avant ; couper une liste ou un appel après une virgule. (Les blocs d'affichage peuvent passer à la ligne : ce sont les vrais messages de Python.)
- Écrire `&lt;` pour `<` dans le code.

## Tenir sur une page

- Le texte du PDF (tableaux compris) est en 9,5 pt et le code des blocs en 8,25 pt (11 px) : on ne réduit pas la police, on raccourcit le texte. La génération affiche la hauteur de chaque fiche (sur 1043 px) ; une fiche trop haute est signalée, et une fiche qui déborde arrête la publication.
- **Remplir exactement la page** : la génération coupe la suite des encadrés en deux colonnes équilibrées et affiche leur taux de remplissage (`[REMPLISSAGE] fiche : gauche …, droite …`). Viser 98 à 100 % dans chaque colonne, à 2 % près : ajouter ou retirer une ligne de texte dans la colonne trop courte ou trop longue, découper un grand encadré en deux (comme « Recherche » et « Insertion » dans la fiche des ABR). À partir de 95 % dans les deux colonnes, les encadrés s'étirent jusqu'au bas de la page. Modèle : la fiche des piles et des files.
- 400 à 550 mots de texte environ, et 2 ou 3 blocs de code.

## Écriture

- Phrases courtes, vocabulaire du programme expliqué, termes anglais traduits (*string*, *stack*).
- Consignes impersonnelles (« Qu'affiche ce programme ? ») ; langage inclusif (« élèves », « Admis·e »).
- Contextes de Mayotte quand ils viennent naturellement (communes, barge, pluie), sans cliché ; données fictives signalées.
- Schémas : SVG écrits à la main, dans la fiche, avec `class="schema"`, `role="img"` et un `aria-label` qui les décrit. Aucune image d'origine inconnue.
