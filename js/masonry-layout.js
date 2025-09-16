document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour créer un layout masonry dense
    function createMasonryLayout() {
        const containers = document.querySelectorAll('.container, .index-container');
        
        containers.forEach(container => {
            // Récupérer toutes les sections (sauf footnote)
            const sections = Array.from(container.querySelectorAll('section:not(.footnote)'));
            const footnotes = Array.from(container.querySelectorAll('.footnote'));
            
            // Si pas de sections, ne rien faire
            if (sections.length === 0) return;
            
            // Si déjà organisé en masonry, ne pas réorganiser
            if (container.querySelector('.masonry-wrapper')) return;
            
            // Vider le container
            container.innerHTML = '';
            
            // Créer le wrapper masonry
            const masonryWrapper = document.createElement('div');
            masonryWrapper.className = 'masonry-wrapper';
            
            // Calculer le nombre de colonnes optimal selon la largeur
            const containerWidth = container.offsetWidth;
            const minColumnWidth = 300; // Largeur minimale d'une colonne
            const gap = 20; // Espacement entre les colonnes
            const numColumns = Math.max(1, Math.floor((containerWidth + gap) / (minColumnWidth + gap)));
            
            // Créer les colonnes
            const columns = [];
            const columnHeights = [];
            
            for (let i = 0; i < numColumns; i++) {
                const column = document.createElement('div');
                column.className = 'masonry-column';
                columns.push(column);
                columnHeights.push(0);
                masonryWrapper.appendChild(column);
            }
            
            // Distribuer les sections dans les colonnes
            sections.forEach(section => {
                // Trouver la colonne la plus courte
                let shortestColumnIndex = 0;
                let shortestHeight = columnHeights[0];
                
                for (let i = 1; i < numColumns; i++) {
                    if (columnHeights[i] < shortestHeight) {
                        shortestHeight = columnHeights[i];
                        shortestColumnIndex = i;
                    }
                }
                
                // Ajouter la section à la colonne la plus courte
                columns[shortestColumnIndex].appendChild(section);
                
                // Mettre à jour la hauteur de la colonne immédiatement
                columnHeights[shortestColumnIndex] = columns[shortestColumnIndex].offsetHeight;
            });
            
            // Ajouter le wrapper au container
            container.appendChild(masonryWrapper);
            
            // Ajouter les footnotes après le wrapper
            footnotes.forEach(footnote => {
                container.appendChild(footnote);
            });
        });
    }
    
    // Fonction pour réorganiser le layout
    function reorganizeMasonryLayout() {
        // Délai pour éviter les appels trop fréquents
        clearTimeout(window.masonryTimeout);
        window.masonryTimeout = setTimeout(() => {
            // Supprimer les anciens layouts masonry
            const containers = document.querySelectorAll('.container, .index-container');
            containers.forEach(container => {
                const masonryWrapper = container.querySelector('.masonry-wrapper');
                if (masonryWrapper) {
                    // Restaurer le contenu original
                    const sections = Array.from(masonryWrapper.querySelectorAll('section'));
                    const footnotes = Array.from(container.querySelectorAll('.footnote'));
                    
                    // Vider le container
                    container.innerHTML = '';
                    
                    // Remettre les sections dans l'ordre original
                    sections.forEach(section => {
                        container.appendChild(section);
                    });
                    
                    // Remettre les footnotes
                    footnotes.forEach(footnote => {
                        container.appendChild(footnote);
                    });
                }
            });
            
            // Recréer le layout
            createMasonryLayout();
        }, 100);
    }
    
    // Exécuter au chargement
    createMasonryLayout();
    
    // Réorganiser lors du redimensionnement de la fenêtre
    window.addEventListener('resize', reorganizeMasonryLayout);
    
    // Réorganiser quand le contenu change (pour la recherche)
    const observer = new MutationObserver(reorganizeMasonryLayout);
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    });
});