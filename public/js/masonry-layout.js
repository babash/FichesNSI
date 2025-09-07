document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour organiser les sections en colonnes équilibrées
    function organizeMasonryLayout() {
        const containers = document.querySelectorAll('.container, .index-container');
        
        containers.forEach(container => {
            // Récupérer toutes les sections (sauf footnote)
            const sections = Array.from(container.querySelectorAll('section:not(.footnote)'));
            const footnotes = Array.from(container.querySelectorAll('.footnote'));
            
            if (sections.length === 0) return;
            
            // Vider le container
            container.innerHTML = '';
            
            // Créer le wrapper pour les colonnes
            const columnsWrapper = document.createElement('div');
            columnsWrapper.className = 'columns-wrapper';
            
            // Créer deux colonnes
            const column1 = document.createElement('div');
            const column2 = document.createElement('div');
            column1.className = 'column';
            column2.className = 'column';
            
            // Variables pour suivre la hauteur de chaque colonne
            let height1 = 0;
            let height2 = 0;
            
            // Distribuer les sections dans la colonne la plus courte
            sections.forEach(section => {
                // Créer un élément temporaire pour mesurer la hauteur approximative
                const tempDiv = document.createElement('div');
                tempDiv.style.visibility = 'hidden';
                tempDiv.style.position = 'absolute';
                tempDiv.style.width = '400px'; // Largeur approximative d'une colonne
                tempDiv.innerHTML = section.outerHTML;
                document.body.appendChild(tempDiv);
                
                const sectionHeight = tempDiv.offsetHeight;
                document.body.removeChild(tempDiv);
                
                // Ajouter à la colonne la plus courte
                if (height1 <= height2) {
                    column1.appendChild(section);
                    height1 += sectionHeight;
                } else {
                    column2.appendChild(section);
                    height2 += sectionHeight;
                }
            });
            
            // Ajouter les colonnes au wrapper
            columnsWrapper.appendChild(column1);
            columnsWrapper.appendChild(column2);
            
            // Ajouter le wrapper au container
            container.appendChild(columnsWrapper);
            
            // Ajouter les footnotes après le wrapper
            footnotes.forEach(footnote => {
                container.appendChild(footnote);
            });
        });
    }
    
    // Exécuter au chargement
    organizeMasonryLayout();
    
    // Réorganiser lors du redimensionnement de la fenêtre
    window.addEventListener('resize', organizeMasonryLayout);
});