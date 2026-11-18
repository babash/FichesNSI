---
title: "Fiche NSI – Le routage : RIP et OSPF"
niveau: Tle
theme: "Architectures, systèmes et réseaux"
programme: nsi-tle-2019.architecture-os-reseaux.routage
ordre: 40
resume: "Routeurs et tables de routage ; RIP compte les sauts, OSPF additionne des coûts calculés à partir du débit."
mots_cles: [routage, routeur, table de routage, RIP, OSPF, protocole, métrique, saut, coût, débit, passerelle, prochain saut, vecteur de distances, état de liens]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Un <strong>routeur</strong> relie plusieurs réseaux. Pour chaque paquet, il choisit le <strong>prochain saut</strong> (le routeur voisin à qui le transmettre) grâce à sa <strong>table de routage</strong> : destination, passerelle (prochain saut), interface, <strong>métrique</strong> (la « distance » de la route).</p>
<p>Un <strong>protocole de routage</strong> remplit ces tables automatiquement :</p>
<ul>
<li><strong>RIP</strong> (à vecteur de distances) : chaque routeur envoie régulièrement sa table à ses voisins. Métrique : le <strong>nombre de sauts</strong> (de routeurs traversés). 16 sauts veut dire « inaccessible ».</li>
<li><strong>OSPF</strong> (à état de liens) : chaque routeur connaît toute la carte du réseau et calcule le chemin de plus petit <strong>coût</strong>. Coût d'un lien : 10<sup>8</sup> / débit (en bit/s) ; un lien rapide coûte peu.</li>
</ul>
</section>

<section class="exemple">
<h2>Un réseau d'exemple</h2>
<svg class="schema" viewBox="0 0 280 130" width="280" height="130" role="img" aria-label="Cinq routeurs. A relié à B à 10 Mbit/s et à C à 100 Mbit/s. B relié à E à 10 Mbit/s. C relié à D à 100 Mbit/s. D relié à E à 100 Mbit/s.">
<g stroke="#1f2328" stroke-width="1.5"><line x1="30" y1="65" x2="140" y2="20" stroke-dasharray="5 3"/><line x1="140" y1="20" x2="250" y2="65" stroke-dasharray="5 3"/><line x1="30" y1="65" x2="100" y2="110" stroke-width="3"/><line x1="100" y1="110" x2="190" y2="110" stroke-width="3"/><line x1="190" y1="110" x2="250" y2="65" stroke-width="3"/></g>
<g fill="#fff" stroke="#306998" stroke-width="2"><rect x="15" y="52" width="30" height="26" rx="5"/><rect x="125" y="7" width="30" height="26" rx="5"/><rect x="85" y="97" width="30" height="26" rx="5"/><rect x="175" y="97" width="30" height="26" rx="5"/><rect x="235" y="52" width="30" height="26" rx="5"/></g>
<g font-family="Lato, Arial, sans-serif" font-weight="700" font-size="13" text-anchor="middle" fill="#1f2328"><text x="30" y="70">A</text><text x="140" y="25">B</text><text x="100" y="115">C</text><text x="190" y="115">D</text><text x="250" y="70">E</text></g>
<g font-family="Lato, Arial, sans-serif" font-size="10" fill="#1f2328"><text x="40" y="34">10 Mbit/s</text><text x="196" y="34">10 Mbit/s</text><text x="8" y="100">100 Mbit/s</text><text x="118" y="94">100 Mbit/s</text><text x="209" y="119">100 Mbit/s</text></g>
</svg>
<p>Traits fins pointillés : 10 Mbit/s ; traits épais : 100 Mbit/s. Coûts OSPF des routes A-B-E et A-C-D-E :</p>
<pre><code class="language-python">def cout(debit):          # débit en bit/s
    return 10**8 / debit

print(cout(10 * 10**6), cout(100 * 10**6))
print(2 * cout(10**7), 3 * cout(10**8))
</code></pre>
<pre class="sortie"><code>10.0 1.0
20.0 3.0
</code></pre>
</section>

<section class="trace">
<h2>Les tables de routage de A</h2>
<table>
<thead><tr><th rowspan="2">Destination</th><th colspan="2">RIP</th><th colspan="2">OSPF</th></tr>
<tr><th>Passerelle</th><th>Sauts</th><th>Passerelle</th><th>Coût</th></tr></thead>
<tbody>
<tr><td>B</td><td>B</td><td>1</td><td>B</td><td>10</td></tr>
<tr><td>C</td><td>C</td><td>1</td><td>C</td><td>1</td></tr>
<tr><td>D</td><td>C</td><td>2</td><td>C</td><td>2</td></tr>
<tr><td>E</td><td><strong>B</strong></td><td>2</td><td><strong>C</strong></td><td>3</td></tr>
</tbody>
</table>
<p>Vers E, RIP préfère A-B-E (2 sauts au lieu de 3) ; OSPF préfère A-C-D-E (coût 3 au lieu de 20), plus long mais plus rapide.</p>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Inverser le coût OSPF : plus le débit est <strong>grand</strong>, plus le coût est <strong>petit</strong>.</li>
<li>Ne pas lire la convention du sujet : selon les sujets, un réseau directement relié compte pour 0 ou pour 1 saut.</li>
<li>Croire qu'un routeur connaît tout le chemin : avec RIP, il ne connaît que le prochain saut et la distance.</li>
<li>Oublier les unités du débit : 1 Gbit/s = 10<sup>9</sup> bit/s, coût 0,1.</li>
</ul>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Une table de routage donne, pour chaque destination, la passerelle et la métrique.</li>
<li>RIP : nombre de sauts minimal, tables échangées entre voisins.</li>
<li>OSPF : coût total minimal, coût d'un lien = 10<sup>8</sup> / débit.</li>
<li>Les deux protocoles peuvent choisir des routes différentes.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Le lien C–D tombe en panne. Quelle route OSPF A prend-il vers E, et pour quel coût ?</p>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers">A-B-E, coût 10 + 10 = 20 : c'est la seule route qui reste.</div>
</details>
</section>
