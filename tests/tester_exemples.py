"""Exécute les exemples de code des fiches et compare leur affichage à celui
qui est écrit dans la fiche.

Dans une fiche (content/*.md) :
- un bloc `<pre><code class="language-python">` est exécuté par Python 3 ;
  s'il est suivi (sans rien entre les deux) d'un bloc `<pre class="sortie">`,
  ce qu'il affiche doit être exactement le contenu de ce bloc ;
- `data-suite` sur le `<pre>` du code : le bloc est exécuté à la suite des
  blocs Python précédents de la même fiche (mêmes variables) ;
- `data-erreur` : le bloc doit lever une erreur ; l'affichage attendu se termine
  par la dernière ligne du message d'erreur (par exemple
  « KeyError: 'Sada' ») ;
- `data-entree="…"` : ce que l'élève tape au clavier (input), une ligne par « | » ;
- `data-pas-execute` : le bloc n'est pas exécuté (un morceau de code seul) ;
- un bloc `<pre data-base="nom"><code class="language-sql">` est exécuté par
  SQLite sur la base `tests/bases/nom.sql`, recréée à chaque requête ; son
  affichage est la ligne des noms de colonnes puis une ligne par résultat, les
  valeurs séparées par « | ».

Usage : python3 tests/tester_exemples.py [fiche.md ...]
"""

import contextlib
import html
import io
import pathlib
import re
import sqlite3
import sys
import traceback

RACINE = pathlib.Path(__file__).resolve().parent.parent
BLOC = re.compile(
    r'<pre(?P<attrs>[^>]*)><code(?: class="language-(?P<langage>\w+)")?>(?P<code>.*?)</code></pre>',
    re.S,
)


def blocs(texte):
    """Les blocs de code d'une fiche, avec l'affichage attendu s'il suit."""
    trouves = list(BLOC.finditer(texte))
    resultat = []
    for i, m in enumerate(trouves):
        if not m.group('langage'):
            continue
        attendu = None
        if i + 1 < len(trouves):
            suivant = trouves[i + 1]
            entre = texte[m.end():suivant.start()]
            if not entre.strip() and 'sortie' in suivant.group('attrs'):
                attendu = html.unescape(suivant.group('code'))
        ligne = texte.count('\n', 0, m.start()) + 1
        resultat.append((ligne, m.group('attrs'), m.group('langage'), html.unescape(m.group('code')), attendu))
    return resultat


def attribut(attrs, nom):
    m = re.search(r'%s(?:="([^"]*)")?' % re.escape(nom), attrs)
    if not m:
        return None
    return m.group(1) if m.group(1) is not None else ''


def executer_python(code, contexte, entree):
    sortie = io.StringIO()
    lignes = iter(entree.split('|')) if entree is not None else iter(())

    def faux_input(invite=''):
        valeur = next(lignes)
        print(invite + valeur)
        return valeur

    contexte['input'] = faux_input
    erreur = None
    with contextlib.redirect_stdout(sortie):
        try:
            exec(compile(code, '<fiche>', 'exec'), contexte)
        except Exception as e:  # l'erreur fait partie de l'exemple
            erreur = traceback.format_exception_only(type(e), e)[-1].strip()
    return sortie.getvalue(), erreur


def executer_sql(code, base):
    connexion = sqlite3.connect(':memory:')
    connexion.executescript((RACINE / 'tests' / 'bases' / f'{base}.sql').read_text(encoding='utf-8'))
    lignes = []
    for requete in [r for r in code.split(';') if r.strip() and not all(
            l.strip().startswith('--') or not l.strip() for l in r.splitlines())]:
        curseur = connexion.execute(requete)
        if curseur.description:
            lignes.append(' | '.join(d[0] for d in curseur.description))
            for rang in curseur.fetchall():
                lignes.append(' | '.join('NULL' if v is None else str(v) for v in rang))
    return '\n'.join(lignes) + '\n'


def tester(chemin):
    texte = chemin.read_text(encoding='utf-8')
    echecs = 0
    nombre = 0
    contexte = {'__name__': '__main__'}
    for ligne, attrs, langage, code, attendu in blocs(texte):
        if attribut(attrs, 'data-pas-execute') is not None:
            continue
        nombre += 1
        lieu = f'{chemin.name}:{ligne}'
        if langage == 'python':
            if attribut(attrs, 'data-suite') is None:
                contexte = {'__name__': '__main__'}
            obtenu, erreur = executer_python(code, contexte, attribut(attrs, 'data-entree'))
            doit_echouer = attribut(attrs, 'data-erreur') is not None
            if erreur and not doit_echouer:
                print(f'ÉCHEC {lieu} : erreur inattendue : {erreur}')
                echecs += 1
                continue
            if doit_echouer and not erreur:
                print(f'ÉCHEC {lieu} : une erreur était attendue')
                echecs += 1
                continue
            if erreur:
                obtenu += erreur + '\n'
        elif langage == 'sql':
            base = attribut(attrs, 'data-base')
            if not base:
                continue
            try:
                obtenu = executer_sql(code, base)
            except sqlite3.Error as e:
                obtenu = f'Erreur : {e}\n'
                if attribut(attrs, 'data-erreur') is None:
                    print(f'ÉCHEC {lieu} : {obtenu.strip()}')
                    echecs += 1
                    continue
        else:
            continue
        if attendu is not None and obtenu.rstrip('\n') != attendu.rstrip('\n'):
            print(f'ÉCHEC {lieu} : affichage différent\n--- attendu ---\n{attendu.rstrip()}\n--- obtenu ---\n{obtenu.rstrip()}')
            echecs += 1
    return nombre, echecs


def main(arguments):
    fichiers = [pathlib.Path(a) for a in arguments] or sorted((RACINE / 'content').glob('*.md'))
    total = total_echecs = 0
    for f in fichiers:
        n, e = tester(f)
        total += n
        total_echecs += e
        print(f'{"ok   " if not e else "ÉCHEC"} {f.name} : {n} bloc(s) exécuté(s), {e} échec(s)')
    print(f'{total} blocs exécutés, {total_echecs} échec(s)')
    return 1 if total_echecs else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
