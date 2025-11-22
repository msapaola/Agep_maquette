// === GESTION DU LOADER AVEC LOGO ANIMÉ ===

/**
 * Initialise et affiche le loader au chargement de la page
 * Le loader s'adapte automatiquement au thème détecté
 */
function initLoader() {
    const loader = document.getElementById('loader');
    
    if (!loader) {
        console.warn('Élément loader non trouvé dans le DOM');
        return;
    }
    
    // Récupération du thème actuel pour adapter le fond du loader
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    // Configuration du logo animé dans le loader
    const loaderLogo = loader.querySelector('.loader-logo');
    if (loaderLogo) {
        loaderLogo.src = 'assets/logos/logo-anime.gif';
        loaderLogo.alt = 'Logo AGEP animé';
    }
    
    // Simulation du chargement avec barre de progression
    const progressBar = loader.querySelector('.loader-progress-bar');
    if (progressBar) {
        // Animation de la barre de progression
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            progressBar.style.width = progress + '%';
        }, 100);
    }
    
    // Masquage du loader après 2.5 secondes
    setTimeout(() => {
        hideLoader();
    }, 2500);
}

/**
 * Masque le loader avec une animation de fondu
 */
function hideLoader() {
    const loader = document.getElementById('loader');
    
    if (loader) {
        // Ajout de la classe fade-out pour l'animation
        loader.classList.add('fade-out');
        
        // Suppression complète du loader du DOM après l'animation
        setTimeout(() => {
            loader.style.display = 'none';
            // Déclencher les animations au scroll après le chargement
            if (typeof initScrollAnimations === 'function') {
                initScrollAnimations();
            }
        }, 500); // Durée de l'animation fade-out
    }
}

/**
 * Affiche le loader (utile pour les transitions de page)
 */
function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'flex';
        loader.classList.remove('fade-out');
    }
}

// Initialisation automatique au chargement de la page
// Attendre que le DOM soit prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoader);
} else {
    // Le DOM est déjà chargé
    initLoader();
}

// Export pour utilisation dans d'autres scripts si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initLoader, hideLoader, showLoader };
}


