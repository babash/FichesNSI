document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-fiches');
    const fichesList = document.getElementById('fiches-list');
    const searchBar = document.getElementById('search-bar');

    if (!toggleButton || !fichesList || !searchBar) {
        console.error("Un ou plusieurs éléments de l'interface sont manquants.");
        return;
    }

    // --- Accordion Logic ---
    // Set initial state (expanded)
    fichesList.style.maxHeight = fichesList.scrollHeight + 'px';

    toggleButton.addEventListener('click', () => {
        const isCollapsed = fichesList.classList.contains('collapsed');

        toggleButton.classList.toggle('collapsed');
        fichesList.classList.toggle('collapsed');

        if (isCollapsed) { // Si c'était fermé, on l'ouvre
            fichesList.style.maxHeight = fichesList.scrollHeight + 'px';
        } else { // Si c'était ouvert, on le ferme
            fichesList.style.maxHeight = '0px';
        }
    });

    // --- Search Logic ---
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const allFichesItems = fichesList.querySelectorAll('li');

        // We need to temporarily remove the max-height to measure the content correctly
        const isCollapsed = fichesList.classList.contains('collapsed');
        if (!isCollapsed) {
            fichesList.style.maxHeight = 'none';
        }

        allFichesItems.forEach(ficheLi => {
            const titleElement = ficheLi.querySelector('.fiche-name');
            const title = titleElement.textContent.toLowerCase();

            if (title.includes(searchTerm)) {
                ficheLi.style.display = 'flex';
            } else {
                ficheLi.style.display = 'none';
            }
        });

        // Re-apply the max-height for a smooth transition.
        // We use a setTimeout to give the browser a moment to reflow the content
        // and calculate the new correct scrollHeight.
        if (!isCollapsed) {
            setTimeout(() => {
                fichesList.style.maxHeight = fichesList.scrollHeight + 'px';
            }, 0);
        }
    });

    // --- Download links: prevent toggling accordion on click ---
    const downloadLinks = document.querySelectorAll('.download-link, .download-all-link');

    downloadLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // --- Last updated (UTC) ---
    const lastUpdatedEl = document.querySelector('.last-updated');
    if (lastUpdatedEl) {
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const formatted = `${pad(now.getUTCDate())}/${pad(now.getUTCMonth()+1)}/${now.getUTCFullYear()} ${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())} UTC`;
        lastUpdatedEl.textContent = `Dernière mise à jour: ${formatted}`;
    }
});