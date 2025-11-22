// === GESTION DES ANIMATIONS AU SCROLL ===

/**
 * Initialise les animations au scroll pour les éléments avec la classe fade-in
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, [data-aos]');
    
    if (animatedElements.length === 0) {
        return;
    }
    
    // Création d'un Intersection Observer pour détecter la visibilité
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionnel : arrêter d'observer après l'animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments animables
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initialise les animations de compteurs (CountUp)
 * @param {string} selector - Sélecteur CSS pour les éléments compteurs
 */
function initCounters(selector = '.counter') {
    const counters = document.querySelectorAll(selector);
    
    if (counters.length === 0) {
        return;
    }
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Anime un compteur de 0 à sa valeur cible
 * @param {HTMLElement} element - L'élément contenant le compteur
 */
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target') || element.textContent.replace(/\D/g, ''));
    const duration = parseInt(element.getAttribute('data-duration') || 2000);
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            // Formater le nombre selon le type
            const suffix = element.getAttribute('data-suffix') || '';
            const prefix = element.getAttribute('data-prefix') || '';
            
            if (suffix === 'M' || suffix === 'K') {
                // Pour les millions/milliers, arrondir
                const rounded = Math.floor(current);
                element.textContent = prefix + formatCounterValue(rounded, suffix) + suffix;
            } else {
                element.textContent = prefix + Math.floor(current) + suffix;
            }
            
            requestAnimationFrame(updateCounter);
        } else {
            // Assurer la valeur finale exacte
            const suffix = element.getAttribute('data-suffix') || '';
            const prefix = element.getAttribute('data-prefix') || '';
            element.textContent = prefix + formatCounterValue(target, suffix) + suffix;
        }
    };
    
    updateCounter();
}

/**
 * Formate la valeur du compteur selon le suffixe
 * @param {number} value - La valeur à formater
 * @param {string} suffix - Le suffixe (M, K, etc.)
 * @returns {string} - La valeur formatée
 */
function formatCounterValue(value, suffix) {
    if (suffix === 'M') {
        return (value / 1000000).toFixed(1);
    } else if (suffix === 'K') {
        return (value / 1000).toFixed(0);
    }
    return value.toString();
}

/**
 * Initialise les effets parallax sur les éléments avec data-parallax
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) {
        return;
    }
    
    const handleScroll = () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    };
    
    // Utiliser debounce pour optimiser les performances
    const debouncedHandleScroll = debounce(handleScroll, 10);
    window.addEventListener('scroll', debouncedHandleScroll);
}

/**
 * Initialise les effets 3D sur les cards (Tilt.js alternative) - Version simplifiée
 */
function initTiltCards() {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
        // Désactiver l'effet sur mobile pour éviter les problèmes
        if (window.innerWidth < 768) {
            return;
        }
        
        let isHovering = false;
        
        card.addEventListener('mouseenter', () => {
            isHovering = true;
        });
        
        card.addEventListener('mousemove', (e) => {
            if (!isHovering) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Effet 3D plus subtil (divisé par 25 pour un effet très léger)
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            // Combiner avec translateY pour l'effet hover
            card.style.transform = `perspective(1000px) translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            card.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', () => {
            isHovering = false;
            card.style.transition = 'transform 0.3s ease';
            card.style.transform = 'perspective(1000px) translateY(0) rotateX(0) rotateY(0)';
        });
    });
}

/**
 * Initialise les animations de texte qui se tape (Typed.js alternative)
 * @param {HTMLElement} element - L'élément contenant le texte
 * @param {Array<string>} strings - Les chaînes à afficher
 * @param {number} speed - Vitesse de frappe en ms
 */
function initTypedText(element, strings, speed = 100) {
    if (!element || !strings || strings.length === 0) return;
    
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const type = () => {
        const currentString = strings[stringIndex];
        
        if (isDeleting) {
            element.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? speed / 2 : speed;
        
        if (!isDeleting && charIndex === currentString.length) {
            typeSpeed = 2000; // Pause à la fin
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % strings.length;
        }
        
        setTimeout(type, typeSpeed);
    };
    
    type();
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    // Attendre un peu pour que le loader se termine
    setTimeout(() => {
        initScrollAnimations();
        initCounters();
        initParallax();
        initTiltCards();
    }, 3000);
});

// Réinitialiser les animations au resize de la fenêtre
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        initScrollAnimations();
    }, 250);
});

// Export pour utilisation dans d'autres scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initScrollAnimations,
        initCounters,
        initParallax,
        initTiltCards,
        initTypedText
    };
}

