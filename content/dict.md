---
title: "Fiche NSI – Les dictionnaires en Python"
niveau: 1re
theme: "Types construits"
programme: nsi-1re-2019.types-construits.dictionnaires
ordre: 23
resume: "Associer des clés à des valeurs : créer, lire, modifier, parcourir avec items(), compter des occurrences."
mots_cles: [dict, dictionnaire, clé, valeur, items, keys, values, get, KeyError, occurrences, compter]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Un <strong>dictionnaire</strong> (type <code>dict</code>) associe des <strong>clés</strong> à des <strong>valeurs</strong>. On lit une valeur grâce à sa clé, jamais grâce à une position (un indice).</p>
<ul>
<li>Les clés sont <strong>uniques</strong> et d'un type non modifiable : <code>str</code>, <code>int</code>, <code>tuple</code>.</li>
<li>Le dictionnaire est <strong>modifiable</strong> (on dit <em>mutable</em>) : on ajoute, change ou supprime des paires.</li>
<li>Il s'écrit entre accolades : <code>{clé: valeur, clé: valeur}</code>.</li>
</ul>
</section>

<section>
<h2>Les opérations</h2>
<table>
<thead><tr><th>Écriture</th><th>Effet</th></tr></thead>
<tbody>
<tr><td><code>d = {}</code></td><td>dictionnaire vide</td></tr>
<tr><td><code>d[cle]</code></td><td>la valeur associée à <code>cle</code> (erreur si la clé n'existe pas)</td></tr>
<tr><td><code>d[cle] = v</code></td><td>ajoute la paire, ou remplace la valeur</td></tr>
<tr><td><code>cle in d</code></td><td><code>True</code> si la clé existe</td></tr>
<tr><td><code>d.get(cle, defaut)</code></td><td>la valeur, ou <code>defaut</code> si la clé n'existe pas</td></tr>
<tr><td><code>del d[cle]</code>, <code>d.pop(cle)</code></td><td>supprime la paire (<code>pop</code> renvoie la valeur)</td></tr>
<tr><td><code>len(d)</code></td><td>le nombre de paires</td></tr>
<tr><td><code>d.keys()</code> · <code>d.values()</code> · <code>d.items()</code></td><td>les clés · les valeurs · les paires <code>(clé, valeur)</code></td></tr>
</tbody>
</table>
</section>

<section class="exemple">
<h2>Exemple : compter des occurrences</h2>
<p>Combien d'élèves viennent de chaque commune ?</p>
<pre><code class="language-python">communes = ["Sada", "Ouangani", "Sada",
            "Bandrélé", "Sada"]
effectifs = {}
for c in communes:
    if c in effectifs:
        effectifs[c] = effectifs[c] + 1
    else:
        effectifs[c] = 1
print(effectifs)
for commune, n in effectifs.items():
    print(commune, ":", n)
</code></pre>
<pre class="sortie"><code>{'Sada': 3, 'Ouangani': 1, 'Bandrélé': 1}
Sada : 3
Ouangani : 1
Bandrélé : 1
</code></pre>
</section>

<section class="trace">
<h2>Trace de la boucle</h2>
<table>
<thead><tr><th>Tour</th><th><code>c</code></th><th><code>effectifs</code> après le tour</th></tr></thead>
<tbody>
<tr><td>1</td><td>Sada</td><td><code>{'Sada': 1}</code></td></tr>
<tr><td>2</td><td>Ouangani</td><td><code>{'Sada': 1, 'Ouangani': 1}</code></td></tr>
<tr><td>3</td><td>Sada</td><td><code>{'Sada': 2, 'Ouangani': 1}</code></td></tr>
<tr><td>4</td><td>Bandrélé</td><td>… <code>'Bandrélé': 1</code> est ajouté</td></tr>
<tr><td>5</td><td>Sada</td><td>… <code>'Sada'</code> passe à 3</td></tr>
</tbody>
</table>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Lire une clé absente : <code>effectifs["Mtsamboro"]</code> provoque <code>KeyError: 'Mtsamboro'</code>. Tester <code>"Mtsamboro" in effectifs</code> avant, ou utiliser <code>get</code>.</li>
<li>Croire que <code>d[0]</code> donne la première paire : <code>0</code> est cherché comme une <strong>clé</strong> (<code>KeyError: 0</code>).</li>
<li>Prendre une liste comme clé : <code>TypeError: unhashable type: 'list'</code>. Utiliser un tuple.</li>
<li>Croire que <code>for x in d</code> parcourt les valeurs : il parcourt les <strong>clés</strong>.</li>
<li>Croire que <code>d2 = d</code> copie : les deux noms désignent le même dictionnaire. Copier avec <code>d.copy()</code>.</li>
</ul>
<pre data-erreur><code class="language-python">notes = {"Anli": 12}
print(notes.get("Zaïna", "absente"))
print(notes["Zaïna"])
</code></pre>
<pre class="sortie"><code>absente
KeyError: 'Zaïna'
</code></pre>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Une clé donne accès à sa valeur : <code>d[cle]</code>.</li>
<li>Écrire <code>d[cle] = v</code> ajoute <strong>ou</strong> modifie.</li>
<li><code>in</code> teste la présence d'une <strong>clé</strong>.</li>
<li>Parcourir les paires : <code>for cle, valeur in d.items():</code></li>
<li>Le motif « si la clé existe, ajouter 1 ; sinon, mettre 1 » sert à compter.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Qu'affiche ce programme ?</p>
<pre><code class="language-python">notes = {"Anli": 12, "Faïza": 15}
notes["Anli"] = notes["Anli"] + 3
notes["Zaïna"] = 9
print(len(notes), notes["Anli"])
</code></pre>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers"><code>3 15</code> : la clé <code>"Zaïna"</code> est ajoutée (3 paires) et la note d'Anli passe de 12 à 15.</div>
</details>
</section>
