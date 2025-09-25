const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testPdfGeneration() {
  try {
    console.log('🧪 Test de génération PDF...');
    
    const markdown = `---
title: Test PDF
footer: Test Footer
---

# Test de génération PDF

Ceci est un test de génération PDF.

## Section 1
Contenu de test.

## Section 2
Autre contenu.`;

    const response = await fetch('http://localhost:3000/editor/preview-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ markdown })
    });

    console.log('📊 Status:', response.status);
    console.log('📊 Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erreur serveur:', errorText);
      return;
    }

    const buffer = await response.buffer();
    console.log('📄 PDF généré:', buffer.length, 'bytes');
    console.log('📄 En-tête PDF:', buffer.slice(0, 10).toString());
    
    if (buffer.slice(0, 4).toString() === '%PDF') {
      console.log('✅ PDF valide généré avec succès !');
    } else {
      console.log('❌ PDF invalide');
    }

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testPdfGeneration();