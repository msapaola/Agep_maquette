// === FONCTIONS UTILITAIRES POUR LE SITE AGEP ===

/**
 * Formate un nombre avec des séparateurs de milliers
 * @param {number} number - Le nombre à formater
 * @returns {string} - Le nombre formaté
 */
function formatNumber(number) {
    return new Intl.NumberFormat('fr-FR').format(number);
}

/**
 * Vérifie si un élément est visible dans le viewport
 * @param {HTMLElement} element - L'élément à vérifier
 * @returns {boolean} - True si l'élément est visible
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Détecte si l'utilisateur est sur mobile
 * @returns {boolean} - True si mobile
 */
function isMobile() {
    return window.innerWidth < 640;
}

/**
 * Détecte si l'utilisateur est sur tablette
 * @returns {boolean} - True si tablette
 */
function isTablet() {
    return window.innerWidth >= 640 && window.innerWidth < 1024;
}

/**
 * Détecte si l'utilisateur est sur desktop
 * @returns {boolean} - True si desktop
 */
function isDesktop() {
    return window.innerWidth >= 1024;
}

/**
 * Valide une adresse email
 * @param {string} email - L'email à valider
 * @returns {boolean} - True si l'email est valide
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Valide un numéro de téléphone (format international)
 * @param {string} phone - Le numéro à valider
 * @returns {boolean} - True si le numéro est valide
 */
function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
}

/**
 * Débounce une fonction pour limiter les appels
 * @param {Function} func - La fonction à débouncer
 * @param {number} wait - Le temps d'attente en ms
 * @returns {Function} - La fonction débouncée
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Smooth scroll vers un élément
 * @param {string|HTMLElement} target - L'élément ou le sélecteur
 * @param {number} offset - Offset en pixels (optionnel)
 */
function smoothScrollTo(target, offset = 0) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Copie du texte dans le presse-papiers
 * @param {string} text - Le texte à copier
 * @returns {Promise<boolean>} - True si la copie a réussi
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Erreur lors de la copie:', err);
        return false;
    }
}

/**
 * Génère un code QR (nécessite une bibliothèque externe)
 * @param {string} text - Le texte à encoder
 * @param {HTMLElement} container - Le conteneur pour le QR code
 */
function generateQRCode(text, container) {
    // Cette fonction nécessitera une bibliothèque comme qrcode.js
    // Implémentation basique avec placeholder
    if (container) {
        container.innerHTML = `
            <div style="width: 200px; height: 200px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
                <p style="text-align: center; color: #666;">QR Code<br/>${text.substring(0, 20)}...</p>
            </div>
        `;
    }
}

/**
 * Obtient les paramètres de l'URL
 * @param {string} name - Le nom du paramètre
 * @returns {string|null} - La valeur du paramètre
 */
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * Formate une date en français
 * @param {Date|string} date - La date à formater
 * @returns {string} - La date formatée
 */
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Export pour utilisation dans d'autres scripts si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatNumber,
        isInViewport,
        isMobile,
        isTablet,
        isDesktop,
        validateEmail,
        validatePhone,
        debounce,
        smoothScrollTo,
        copyToClipboard,
        generateQRCode,
        getURLParameter,
        formatDate
    };
}


