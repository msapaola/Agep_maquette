// === SCRIPT PRINCIPAL DU SITE AGEP - VERSION DRUPAL ===

/**
 * Initialise toutes les fonctionnalités principales du site
 * Version adaptée pour Drupal avec Drupal.behaviors
 * @param {HTMLElement} context - Le contexte DOM (document ou élément spécifique)
 */
function initMain(context = document) {
    // Initialisation de la navigation
    initNavigation(context);
    
    // Initialisation des formulaires
    initForms(context);
    
    // Initialisation des modals
    initModals(context);
    
    // Initialisation du smooth scroll
    initSmoothScroll(context);
    
    // Gestion du scroll de la navbar (seulement sur le document principal)
    if (context === document) {
        handleNavbarScroll();
        // Initialisation de Particles.js (seulement sur le document principal)
        initParticles();
    }
}

/**
 * Initialise la navigation responsive
 * @param {HTMLElement} context - Le contexte DOM (document ou élément spécifique)
 */
function initNavigation(context = document) {
    const navToggle = context.querySelector('.nav-toggle');
    const navMenu = context.querySelector('.nav-menu');
    const navLinks = context.querySelectorAll('.nav-link');
    
    // Vérifier si les éléments existent et n'ont pas déjà été initialisés
    if (navToggle && navMenu && !navToggle.hasAttribute('data-nav-initialized')) {
        // Marquer comme initialisé pour éviter les doublons
        navToggle.setAttribute('data-nav-initialized', 'true');
        
        // Event listener pour le bouton toggle
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle les classes active
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
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Fermer le menu au clic en dehors
        document.addEventListener('click', function(e) {
            if (navToggle && navMenu && 
                !navToggle.contains(e.target) && 
                !navMenu.contains(e.target) && 
                navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Mise en surbrillance du lien actif (géré par Drupal, mais on peut améliorer)
    if (navLinks.length > 0) {
        const currentPath = window.location.pathname;
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Drupal utilise des chemins internes, on doit comparer correctement
            if (href && (currentPath === href || currentPath.startsWith(href + '/'))) {
                link.classList.add('active');
            }
        });
    }
}

/**
 * Gère l'effet de scroll sur la navbar
 */
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    let lastScroll = 0;
    let ticking = false;
    
    function updateNavbar() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
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
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Initialise les formulaires avec validation
 * @param {HTMLElement} context - Le contexte DOM (document ou élément spécifique)
 */
function initForms(context = document) {
    const forms = context.querySelectorAll('form:not(.form-ajax-processed)');
    
    forms.forEach(form => {
        // Marquer le formulaire comme traité
        form.classList.add('form-ajax-processed');
        
        form.addEventListener('submit', (e) => {
            // Ne pas bloquer les formulaires Drupal qui ont déjà leur propre validation
            if (form.classList.contains('webform-submission-form') || 
                form.hasAttribute('data-drupal-form-submit')) {
                return;
            }
            
            if (!validateForm(form)) {
                e.preventDefault();
                return false;
            }
            
            // Afficher un état de chargement
            const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
            if (submitButton && !submitButton.disabled) {
                const originalText = submitButton.innerHTML || submitButton.value;
                submitButton.disabled = true;
                if (submitButton.tagName === 'BUTTON') {
                    submitButton.innerHTML = '<span class="spinner"></span> Envoi en cours...';
                } else {
                    submitButton.value = 'Envoi en cours...';
                }
                
                // Réinitialiser après 5 secondes au cas où
                setTimeout(() => {
                    submitButton.disabled = false;
                    if (submitButton.tagName === 'BUTTON') {
                        submitButton.innerHTML = originalText;
                    } else {
                        submitButton.value = originalText;
                    }
                }, 5000);
            }
        });
        
        // Validation en temps réel
        const inputs = form.querySelectorAll('input:not([type="hidden"]), textarea, select');
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
    const inputs = form.querySelectorAll('input[required]:not([type="hidden"]), textarea[required], select[required]');
    
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
    
    // Ignorer les champs Drupal cachés ou déjà validés
    if (field.type === 'hidden' || field.classList.contains('form-control')) {
        return true;
    }
    
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
 * Valide une adresse email
 * @param {string} email - L'email à valider
 * @returns {boolean} - True si valide
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Valide un numéro de téléphone
 * @param {string} phone - Le numéro à valider
 * @returns {boolean} - True si valide
 */
function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 8;
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
    errorElement.setAttribute('role', 'alert');
    
    // Insérer après le champ ou dans le parent
    if (field.parentNode) {
        field.parentNode.appendChild(errorElement);
    }
}

/**
 * Supprime le message d'erreur d'un champ
 * @param {HTMLElement} field - Le champ
 */
function removeFieldError(field) {
    const errorElement = field.parentNode ? field.parentNode.querySelector('.field-error') : null;
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Initialise les modals
 * @param {HTMLElement} context - Le contexte DOM (document ou élément spécifique)
 */
function initModals(context = document) {
    const modalTriggers = context.querySelectorAll('[data-modal]:not(.modal-processed)');
    const modals = context.querySelectorAll('.modal');
    const modalCloses = context.querySelectorAll('.modal-close, .modal-overlay');
    
    // Marquer les triggers comme traités
    modalTriggers.forEach(trigger => {
        trigger.classList.add('modal-processed');
    });
    
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
 * @param {HTMLElement} context - Le contexte DOM (document ou élément spécifique)
 */
function initSmoothScroll(context = document) {
    const links = context.querySelectorAll('a[href^="#"]:not(.smooth-scroll-processed)');
    
    links.forEach(link => {
        link.classList.add('smooth-scroll-processed');
        
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 100; // Hauteur de la navbar + marge
                    smoothScrollTo(target, offset);
                }
            }
        });
    });
}

/**
 * Fait défiler en douceur vers un élément
 * @param {HTMLElement} target - L'élément cible
 * @param {number} offset - Décalage en pixels
 */
function smoothScrollTo(target, offset = 0) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Initialise Particles.js de manière sécurisée
 * Vérifie que l'élément et la fonction existent avant d'initialiser
 */
function initParticles() {
    // Vérifier que l'élément particles-js existe
    const particlesContainer = document.getElementById('particles-js');
    
    if (!particlesContainer) {
        // L'élément n'existe pas, pas d'erreur, juste on ne fait rien
        return;
    }
    
    // Vérifier si particles.js est déjà initialisé
    if (particlesContainer.hasAttribute('data-particles-initialized')) {
        return;
    }
    
    // Vérifier que particlesJS est disponible
    if (typeof particlesJS === 'undefined') {
        console.warn('Particles.js n\'est pas chargé. Vérifiez que le script est inclus.');
        return;
    }
    
    // Initialiser particles.js
    try {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80 },
                color: { value: '#3D95C9' },
                shape: { type: 'circle' },
                opacity: { value: 0.5 },
                size: { value: 3 },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                }
            }
        });
        
        // Marquer comme initialisé
        particlesContainer.setAttribute('data-particles-initialized', 'true');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de Particles.js:', error);
    }
}

// === INTÉGRATION DRUPAL ===

/**
 * Comportement Drupal principal
 * Utilise Drupal.behaviors pour une intégration propre avec Drupal
 */
(function (Drupal, $) {
    'use strict';

    Drupal.behaviors.agepMain = {
        attach: function (context, settings) {
            // Utiliser le contexte fourni par Drupal (peut être document ou un élément spécifique)
            // Si c'est le document principal, initialiser toutes les fonctionnalités
            // Sinon, initialiser seulement la navigation pour les éléments chargés dynamiquement
            
            // Vérifier si c'est le document principal (plusieurs façons possibles dans Drupal)
            const isMainContext = context === document || 
                                 context === document.body || 
                                 context.nodeName === 'BODY' ||
                                 (context.querySelector && context.querySelector('body') === context);
            
            if (isMainContext) {
                // Attendre que le DOM soit complètement chargé pour le document principal
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', function() {
                        // Attendre un peu pour s'assurer que tous les scripts sont chargés
                        setTimeout(function() {
                            initMain(document);
                        }, 100);
                    });
                } else {
                    // DOM déjà chargé
                    setTimeout(function() {
                        initMain(document);
                    }, 100);
                }
            } else {
                // Contexte spécifique (ex: contenu chargé via AJAX)
                // Initialiser seulement la navigation pour ce contexte
                setTimeout(function() {
                    initNavigation(context);
                }, 50);
            }
        },
        
        detach: function (context, settings, trigger) {
            // Nettoyage si nécessaire lors du détachement
            if (trigger === 'unload') {
                // Supprimer les event listeners si nécessaire
            }
        }
    };

    // Exposer les fonctions pour utilisation externe si nécessaire
    window.agepMain = {
        init: initMain,
        initNavigation: initNavigation,
        initForms: initForms,
        initParticles: initParticles
    };

})(Drupal, jQuery);

// Fallback si Drupal n'est pas disponible (pour tests)
if (typeof Drupal === 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                initMain();
            }, 100);
        });
    } else {
        setTimeout(function() {
            initMain();
        }, 100);
    }
}

// Export pour utilisation dans d'autres scripts (si module system disponible)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        initMain, 
        initNavigation, 
        initForms, 
        validateForm, 
        validateField, 
        initParticles 
    };
}

