/**
 * Layout Masonry optimisé pour les fiches NSI
 * Répartit les sections dans des colonnes de largeur fixe
 * avec des hauteurs variables pour éviter les espaces blancs
 */

class MasonryLayout {
    constructor(container, options = {}) {
        this.container = container;
        this.columns = container.querySelectorAll('.column');
        this.sections = container.querySelectorAll('section');
        this.options = {
            gap: 16, // gap en pixels
            columns: 2,
            ...options
        };
        
        this.init();
    }
    
    init() {
        // Vérifier si on a des colonnes et des sections
        if (this.columns.length === 0 || this.sections.length === 0) {
            return;
        }
        
        // Répartir les sections
        this.distributeSections();
        
        // Observer les changements de taille
        this.observeResize();
    }
    
    distributeSections() {
        // Vider toutes les colonnes
        this.columns.forEach(column => {
            column.innerHTML = '';
        });
        
        // Calculer les hauteurs des sections
        const sectionHeights = [];
        this.sections.forEach(section => {
            // Créer un clone temporaire pour mesurer
            const clone = section.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.visibility = 'hidden';
            clone.style.top = '-9999px';
            document.body.appendChild(clone);
            
            const height = clone.offsetHeight;
            sectionHeights.push({
                element: section,
                height: height
            });
            
            document.body.removeChild(clone);
        });
        
        // Algorithme de répartition optimale
        const columnHeights = new Array(this.columns.length).fill(0);
        
        sectionHeights.forEach(({ element, height }) => {
            // Trouver la colonne avec la hauteur la plus petite
            const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
            
            // Ajouter la section à cette colonne
            this.columns[shortestColumnIndex].appendChild(element);
            
            // Mettre à jour la hauteur de la colonne
            columnHeights[shortestColumnIndex] += height + this.options.gap;
        });
    }
    
    observeResize() {
        // Debounce pour éviter trop de recalculs
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.distributeSections();
            }, 100);
        };
        
        window.addEventListener('resize', handleResize);
        
        // Observer les changements de contenu
        if (window.MutationObserver) {
            const observer = new MutationObserver(() => {
                handleResize();
            });
            
            observer.observe(this.container, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class']
            });
        }
    }
    
    // Méthode publique pour forcer une redistribution
    refresh() {
        this.distributeSections();
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.columns-wrapper');
    containers.forEach(container => {
        new MasonryLayout(container);
    });
});

// Export pour utilisation externe
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MasonryLayout;
}