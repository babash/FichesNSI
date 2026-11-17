---
title: "Fiche NSI – Les processus et l'ordonnancement"
niveau: Tle
theme: "Architectures, systèmes et réseaux"
programme: nsi-tle-2019.architecture-os-reseaux.processus
ordre: 41
resume: "Programme et processus, états d'un processus, ordonnancement (tourniquet), interblocage, commandes ps et kill."
mots_cles: [processus, programme, PID, état, prêt, élu, bloqué, ordonnanceur, ordonnancement, tourniquet, round robin, quantum, interblocage, deadlock, ps, top, kill, système d'exploitation]
---

<section class="essentiel">
<h2>L'essentiel</h2>
<p>Un <strong>processus</strong> est un programme <strong>en cours d'exécution</strong>, avec sa mémoire et son numéro, le <strong>PID</strong>. Un même programme lancé deux fois donne deux processus.</p>
<p>Sur un cœur de processeur, un seul processus s'exécute à la fois. L'<strong>ordonnanceur</strong> du système d'exploitation les fait alterner très vite : ils semblent tourner en même temps (on parle de <strong>concurrence</strong>).</p>
<svg class="schema" viewBox="0 0 300 92" width="300" height="92" role="img" aria-label="États : Prêt vers Élu (choisi par l'ordonnanceur), Élu vers Prêt (fin du quantum), Élu vers Bloqué (attente d'une ressource), Bloqué vers Prêt (ressource obtenue).">
<g fill="#fff" stroke="#306998" stroke-width="2"><rect x="10" y="12" width="70" height="26" rx="13"/><rect x="215" y="12" width="70" height="26" rx="13"/><rect x="112" y="58" width="76" height="26" rx="13"/></g>
<g font-family="Lato, Arial, sans-serif" font-size="12" font-weight="700" text-anchor="middle" fill="#1f2328"><text x="45" y="30">Prêt</text><text x="250" y="30">Élu</text><text x="150" y="76">Bloqué</text></g>
<g stroke="#1f2328" stroke-width="1.4" fill="none"><path d="M82 20 H210"/><path d="M204 16 L211 20 L204 24"/><path d="M213 32 H85"/><path d="M91 28 L84 32 L91 36"/><path d="M250 40 L192 66"/><path d="M193 59 L190 67 L198 66"/><path d="M110 70 L48 41"/><path d="M50 49 L47 41 L55 41"/></g>
<g font-family="Lato, Arial, sans-serif" font-size="9.5" fill="#1f2328"><text x="146" y="16" text-anchor="middle">choisi par l'ordonnanceur</text><text x="146" y="46" text-anchor="middle">fin de son temps</text><text x="232" y="66">attend une</text><text x="232" y="77">ressource</text><text x="6" y="66">ressource</text><text x="6" y="77">obtenue</text></g>
</svg>
<p>Un processus <strong>bloqué</strong> attend une ressource (une lecture de fichier, une saisie, l'imprimante) : il ne peut pas être élu avant de redevenir prêt.</p>
</section>

<section class="exemple">
<h2>Exemple : le tourniquet</h2>
<p>Le <strong>tourniquet</strong> (<em>round robin</em>) donne à chaque processus prêt, à tour de rôle, un temps fixe : le <strong>quantum</strong>. Un processus pas fini retourne au bout de la file.</p>
<pre><code class="language-python">from collections import deque
def tourniquet(processus, quantum):
    file = deque(processus)   # (nom, durée)
    frise = []
    while len(file) > 0:
        nom, reste = file.popleft()
        for t in range(min(quantum, reste)):
            frise.append(nom) # 1 unité
        reste = reste - quantum
        if reste > 0:
            file.append((nom, reste))
    return frise

liste = [("P1", 3), ("P2", 5), ("P3", 1)]
print(" ".join(tourniquet(liste, 2)))
</code></pre>
<pre class="sortie"><code>P1 P1 P2 P2 P3 P1 P2 P2 P2
</code></pre>
<p>P3 se termine au temps 5, P1 au temps 6, P2 au temps 9. D'autres ordonnancements existent : premier arrivé, premier servi ; plus court d'abord ; priorités.</p>
</section>

<section>
<h2>L'interblocage</h2>
<p>P1 détient la ressource R1 et attend R2 ; P2 détient R2 et attend R1. Chacun attend l'autre : aucun n'avance. C'est un <strong>interblocage</strong> (<em>deadlock</em>). Pour l'éviter, par exemple : demander les ressources toujours dans le même ordre.</p>
<h3>Sous Linux</h3>
<p><code>ps</code> liste les processus et leur PID ; <code>top</code> les montre en temps réel ; <code>kill 1234</code> arrête le processus de PID 1234.</p>
</section>

<section class="erreurs">
<h2>Erreurs fréquentes</h2>
<ul>
<li>Confondre programme (un fichier) et processus (une exécution de ce fichier).</li>
<li>Croire que, sur un seul cœur, les processus s'exécutent vraiment en même temps : ils alternent.</li>
<li>Faire passer un processus de bloqué à élu directement : il redevient d'abord prêt.</li>
<li>Dans un exercice de tourniquet, oublier qu'un processus qui n'a pas fini va <strong>au bout</strong> de la file, derrière ceux qui attendent déjà.</li>
</ul>
</section>

<section class="retenir">
<h2>À retenir</h2>
<ul>
<li>Processus = programme en exécution, avec un PID.</li>
<li>États : prêt, élu, bloqué (plus créé et terminé).</li>
<li>L'ordonnanceur choisit qui est élu ; tourniquet : chacun son quantum.</li>
<li>Interblocage : attente circulaire de ressources.</li>
</ul>
</section>

<section class="eclair">
<h2>Exercice éclair</h2>
<p>Mêmes processus (P1 : 3, P2 : 5, P3 : 1), tourniquet avec un quantum de 3. Dans quel ordre se terminent-ils ?</p>
<details class="reponse"><summary>Réponse</summary>
<div class="a-l-envers">P1 (temps 3), P3 (temps 7), P2 (temps 9). Frise : P1 P1 P1 P2 P2 P2 P3 P2 P2.</div>
</details>
</section>
