// === SCRIPT PRINCIPAL DU SITE AGEP ===

/**
 * Initialise toutes les fonctionnalités principales du site
 */
function initMain() {
    // Initialisation de la navigation
    initNavigation();
    
    // Initialisation des formulaires
    initForms();
    
    // Initialisation des modals
    initModals();
    
    // Initialisation du smooth scroll
    initSmoothScroll();
    
    // Gestion du scroll de la navbar
    handleNavbarScroll();
}

/**
 * Initialise la navigation responsive
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Empêcher le scroll du body quand le menu est ouvert
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            } 
        });
        
        // Fermer le menu au clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Fermer le menu au clic en dehors
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Mise en surbrillance du lien actif
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const linkPage = href.split('/').pop();
        
        // Comparer les noms de fichiers
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPath === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Gère l'effet de scroll sur la navbar
 */
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Optionnel : masquer/afficher la navbar au scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Initialise les formulaires avec validation
 */
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
                return false;
            }
            
            // Afficher un état de chargement
            const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="spinner"></span> Envoi en cours...';
            }
        });
        
        // Validation en temps réel
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    });
}

/**
 * Valide un formulaire complet
 * @param {HTMLFormElement} form - Le formulaire à valider
 * @returns {boolean} - True si valide
 */
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Valide un champ de formulaire
 * @param {HTMLElement} field - Le champ à valider
 * @returns {boolean} - True si valide
 */
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Vérification du required
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Ce champ est obligatoire';
    }
    
    // Vérification du type email
    if (field.type === 'email' && value && !validateEmail(value)) {
        isValid = false;
        errorMessage = 'Veuillez entrer une adresse email valide';
    }
    
    // Vérification du type tel
    if (field.type === 'tel' && value && !validatePhone(value)) {
        isValid = false;
        errorMessage = 'Veuillez entrer un numéro de téléphone valide';
    }
    
    // Vérification de la longueur minimale
    const minLength = field.getAttribute('minlength');
    if (minLength && value.length < parseInt(minLength)) {
        isValid = false;
        errorMessage = `Ce champ doit contenir au moins ${minLength} caractères`;
    }
    
    // Affichage de l'erreur
    if (isValid) {
        field.classList.remove('error');
        removeFieldError(field);
    } else {
        field.classList.add('error');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

/**
 * Affiche un message d'erreur pour un champ
 * @param {HTMLElement} field - Le champ
 * @param {string} message - Le message d'erreur
 */
function showFieldError(field, message) {
    removeFieldError(field);
    
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

/**
 * Supprime le message d'erreur d'un champ
 * @param {HTMLElement} field - Le champ
 */
function removeFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Initialise les modals
 */
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close, .modal-overlay');
    
    // Ouvrir les modals
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Fermer les modals
    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        });
    });
    
    // Fermer avec la touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });
}

/**
 * Initialise le smooth scroll pour les ancres
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 80; // Hauteur de la navbar
                    smoothScrollTo(target, offset);
                }
            }
        });
    });
}


// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    // Attendre que le loader soit terminé
    setTimeout(() => {
        initMain();
    }, 3000);
});

// Compatibilité Drupal - Utiliser Drupal.behaviors si disponible
if (typeof Drupal !== 'undefined' && Drupal.behaviors) {
    Drupal.behaviors.agepCustom = {
        attach: function (context, settings) {
            // S'assurer que le code ne s'exécute qu'une fois
            if (context !== document) {
                return;
            }
            
            // Initialiser après un court délai pour s'assurer que le DOM est prêt
            setTimeout(() => {
                initMain();
            }, 100);
        }
    };
}

// Export pour utilisation dans d'autres scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initMain, initNavigation, initForms, validateForm, validateField };
}

