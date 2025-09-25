const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function simulateBrowserEditor() {
  try {
    console.log('🌐 Simulation navigateur - Éditeur PDF');
    
    // 1. Charger la page éditeur
    console.log('📄 Chargement page éditeur...');
    const editorResponse = await fetch('http://localhost:3000/editor/variable');
    if (!editorResponse.ok) {
      throw new Error(`Erreur chargement éditeur: ${editorResponse.status}`);
    }
    const editorHtml = await editorResponse.text();
    console.log('✅ Page éditeur chargée:', editorHtml.length, 'caractères');
    
    // 2. Simuler le contenu markdown de l'éditeur
    const markdown = `---
title: "Fiche NSI – Les Variables et Opérateurs en Python"
footer: "Fiche d'aide-mémoire - NSI Tani Mallandi"
---

<section>
<h2 data-icon="💡">Définition et Création</h2>
<p>Une <strong>variable</strong> est un espace de stockage nommé qui contient une valeur. En Python, vous n'avez pas besoin de déclarer le type de la variable ; l'interpréteur le détermine automatiquement en fonction de la valeur que vous lui attribuez.</p>
</section>

<section>
<h2 data-icon="📝">Règles pour nommer les variables</h2>
<p>Les noms de variables doivent suivre des règles précises pour être valides en Python. S'ils ne les respectent pas, cela entraînera une erreur de syntaxe.</p>
<ul>
<li>Un nom de variable doit commencer par une lettre (<code>a-z</code>, <code>A-Z</code>) ou un trait de soulignement (<code>_</code>). Il ne peut pas commencer par un chiffre.</li>
<li>Un nom de variable ne peut contenir que des caractères alphanumériques (<code>a-z</code>, <code>A-Z</code>, <code>0-9</code>) et des traits de soulignement (<code>_</code>).</li>
<li>Les noms de variables sont sensibles à la casse (<code>age</code>, <code>Age</code> et <code>AGE</code> sont des variables différentes).</li>
<li>Un nom de variable ne peut pas être un mot-clé Python réservé (comme <code>if</code>, <code>for</code>, <code>class</code>, etc.).</li>
</ul>
</section>`;

    // 3. Tester la génération PDF (comme le fait l'éditeur)
    console.log('🔄 Génération PDF (simulation navigateur)...');
    const pdfResponse = await fetch('http://localhost:3000/editor/preview-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ markdown })
    });

    console.log('📊 Réponse PDF:', pdfResponse.status, pdfResponse.statusText);
    console.log('📊 Headers PDF:', Object.fromEntries(pdfResponse.headers.entries()));

    if (!pdfResponse.ok) {
      const errorText = await pdfResponse.text();
      console.error('❌ Erreur génération PDF:', errorText);
      return;
    }

    const pdfBuffer = await pdfResponse.buffer();
    console.log('📄 PDF généré:', pdfBuffer.length, 'bytes');
    console.log('📄 En-tête PDF:', pdfBuffer.slice(0, 10).toString());
    
    if (pdfBuffer.slice(0, 4).toString() === '%PDF') {
      console.log('✅ PDF valide généré avec succès !');
      console.log('🎯 L\'éditeur devrait fonctionner correctement dans le navigateur');
    } else {
      console.log('❌ PDF invalide');
    }

  } catch (error) {
    console.error('❌ Erreur simulation:', error.message);
  }
}

simulateBrowserEditor();