// === GESTION DU SYSTÈME DE THÈME DARK/LIGHT MODE ===

/**
 * Initialise le système de thème avec détection automatique
 * et gestion de la persistance dans localStorage
 */
function initTheme() {
    // Détection des préférences système
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Vérification si un choix utilisateur existe déjà dans localStorage
    const savedTheme = localStorage.getItem('agep-theme');
    
    // Détermination du thème à appliquer
    // Priorité : choix sauvegardé > préférence système > mode clair par défaut
    const currentTheme = savedTheme || (prefersDarkMode ? 'dark' : 'light');
    
    // Application du thème
    applyTheme(currentTheme);
    
    // Mise à jour des logos selon le thème
    updateLogos(currentTheme);
    
    // Mise à jour de l'icône du toggle
    updateThemeToggleIcon(currentTheme);
    
    // Écoute des changements de préférences système (si aucun choix utilisateur)
    if (!savedTheme) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
            updateLogos(newTheme);
            updateThemeToggleIcon(newTheme);
        });
    }
}

/**
 * Applique le thème spécifié au document
 * @param {string} theme - 'dark' ou 'light'
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('agep-theme', theme);
}

/**
 * Bascule entre le mode sombre et clair
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    updateLogos(newTheme);
    updateThemeToggleIcon(newTheme);
}

/**
 * Met à jour les logos selon le thème actif
 * @param {string} theme - 'dark' ou 'light'
 */
function updateLogos(theme) {
    // Récupérer le chemin du thème depuis la variable globale
    const themePath = window.agepThemePath || '';
    
    // Logo de navigation
    const navLogos = document.querySelectorAll('.nav-logo, .navbar-logo');
    navLogos.forEach(logo => {
        if (theme === 'dark') {
            logo.src = themePath + '/assets/logos/logo-blanc.webp';
            logo.alt = 'Logo AGEP - Mode sombre';
        } else {
            logo.src = themePath + '/assets/logos/logo-couleur.webp';
            logo.alt = 'Logo AGEP - Mode clair';
        }
    });
    
    // Logo du footer
    const footerLogos = document.querySelectorAll('.footer-logo');
    footerLogos.forEach(logo => {
        if (theme === 'dark') {
            logo.src = themePath + '/assets/logos/logo-blanc.webp';
            logo.alt = 'Logo AGEP - Mode sombre';
        } else {
            logo.src = themePath + '/assets/logos/logo-noir.webp';
            logo.alt = 'Logo AGEP - Mode clair';
        }
    });
}

/**
 * Met à jour l'icône du bouton toggle selon le thème
 * @param {string} theme - 'dark' ou 'light'
 */
function updateThemeToggleIcon(theme) {
    const toggleButtons = document.querySelectorAll('.theme-toggle');
    toggleButtons.forEach(button => {
        const icon = button.querySelector('svg');
        if (icon) {
            // Remplacer le contenu SVG selon le thème
            if (theme === 'dark') {
                // Afficher l'icône soleil (mode clair disponible)
                icon.innerHTML = `
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" fill="currentColor"/>
                `;
            } else {
                // Afficher l'icône lune (mode sombre disponible)
                icon.innerHTML = `
                    <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd" fill="currentColor"/>
                `;
            }
        }
    });
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    // Ajout des event listeners sur les boutons toggle
    const toggleButtons = document.querySelectorAll('.theme-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', toggleTheme);
    });
});

// Export pour utilisation dans d'autres scripts si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initTheme, toggleTheme, applyTheme, updateLogos };
}


