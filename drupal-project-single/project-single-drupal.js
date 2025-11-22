/**
 * JavaScript spécifique pour la page Project Single dans Drupal
 * Adapte les sélecteurs pour fonctionner avec la structure HTML générée par Drupal
 */

(function (Drupal, $) {
    'use strict';

    /**
     * Initialise AOS (Animate On Scroll)
     */
    function initAOS() {
        // Vérifier que AOS est disponible
        if (typeof AOS === 'undefined') {
            console.warn('AOS n\'est pas chargé. Vérifiez que le script est inclus.');
            return;
        }
        
        try {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });
            console.log('AOS initialisé avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'initialisation de AOS:', error);
        }
    }

    /**
     * Initialise le slider avant/après pour Drupal
     */
    function initBeforeAfterSlider() {
        const container = document.getElementById('before-after-container');
        if (!container) {
            return;
        }

        // Trouver les images dans la structure Drupal
        const comparisonParagraph = container.querySelector('.paragraph--type--comparaison-photos');
        if (!comparisonParagraph) {
            return;
        }

        // Récupérer les conteneurs Avant et Après
        // La structure Drupal a plusieurs niveaux de divs
        // Utiliser children pour obtenir les enfants directs (plus compatible)
        const allDivs = Array.from(comparisonParagraph.children).filter(child => child.tagName === 'DIV');
        if (allDivs.length < 2) {
            console.warn('Structure Avant/Après invalide : moins de 2 conteneurs trouvés');
            return;
        }
        
        const beforeContainer = allDivs[0];
        const afterContainer = allDivs[1];
        
        if (!beforeContainer || !afterContainer) {
            return;
        }

        // Récupérer les images (peuvent être imbriquées dans plusieurs divs)
        const beforeImage = beforeContainer.querySelector('img');
        const afterImage = afterContainer.querySelector('img');
        
        if (!beforeImage || !afterImage) {
            console.warn('Images Avant/Après non trouvées dans la structure Drupal');
            return;
        }

        // Créer ou récupérer le slider
        let slider = document.getElementById('slider');
        if (!slider) {
            slider = document.createElement('div');
            slider.id = 'slider';
            slider.className = 'before-after-slider';
            container.appendChild(slider);
        }

        // S'assurer que les conteneurs ont les bonnes classes et styles
        beforeContainer.style.position = 'absolute';
        beforeContainer.style.top = '0';
        beforeContainer.style.left = '0';
        beforeContainer.style.width = '100%';
        beforeContainer.style.height = '100%';
        beforeContainer.style.zIndex = '1';

        afterContainer.style.position = 'absolute';
        afterContainer.style.top = '0';
        afterContainer.style.left = '0';
        afterContainer.style.width = '100%';
        afterContainer.style.height = '100%';
        afterContainer.style.zIndex = '2';
        afterContainer.style.clipPath = 'inset(0 50% 0 0)';

        // S'assurer que les images remplissent leurs conteneurs
        beforeImage.style.width = '100%';
        beforeImage.style.height = '100%';
        beforeImage.style.objectFit = 'cover';
        beforeImage.style.display = 'block';

        afterImage.style.width = '100%';
        afterImage.style.height = '100%';
        afterImage.style.objectFit = 'cover';
        afterImage.style.display = 'block';

        // Variables pour le drag
        let isDragging = false;
        let startX = 0;
        let startLeft = 50;

        /**
         * Met à jour la position du slider
         */
        function updateSliderPosition(percentage) {
            const clampedPercentage = Math.max(0, Math.min(100, percentage));
            slider.style.left = clampedPercentage + '%';
            afterContainer.style.clipPath = `inset(0 ${100 - clampedPercentage}% 0 0)`;
        }

        /**
         * Gère le mouvement de la souris/touch
         */
        function handleMove(clientX) {
            if (!isDragging) return;
            
            const rect = container.getBoundingClientRect();
            const x = clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            updateSliderPosition(percentage);
        }

        // Événements souris
        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startLeft = parseFloat(slider.style.left) || 50;
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            handleMove(e.clientX);
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Événements tactiles
        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            startLeft = parseFloat(slider.style.left) || 50;
            e.preventDefault();
        });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                handleMove(e.touches[0].clientX);
                e.preventDefault();
            }
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Permettre aussi de cliquer sur le container pour déplacer le slider
        container.addEventListener('click', (e) => {
            if (e.target === slider || slider.contains(e.target)) {
                return;
            }
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            updateSliderPosition(percentage);
        });

        // Initialiser à 50%
        updateSliderPosition(50);
    }

    /**
     * Initialise la galerie pour Drupal
     */
    function initProjectGallery() {
        const gallery = document.getElementById('project-gallery');
        if (!gallery) {
            return;
        }

        // Trouver le paragraph de type galerie
        const galleryParagraph = gallery.querySelector('.paragraph--type--gallerie');
        if (!galleryParagraph) {
            return;
        }

        // Trouver le conteneur des images
        // La structure Drupal a : paragraph > div > div (premier = titre, dernier = images)
        // Utiliser children pour obtenir les enfants directs (plus compatible)
        const mainContainer = Array.from(galleryParagraph.children).find(child => child.tagName === 'DIV');
        if (!mainContainer) {
            console.warn('Conteneur principal de la galerie non trouvé');
            return;
        }
        
        const allChildDivs = Array.from(mainContainer.children).filter(child => child.tagName === 'DIV');
        if (allChildDivs.length < 2) {
            console.warn('Structure de galerie invalide');
            return;
        }
        
        // Le dernier div enfant contient les images
        const imagesContainer = allChildDivs[allChildDivs.length - 1];
        if (!imagesContainer) {
            return;
        }

        // Trouver toutes les divs qui contiennent des images (structure imbriquée)
        // Chaque image est dans une div, qui peut être imbriquée dans d'autres divs
        const imageDivs = Array.from(imagesContainer.querySelectorAll('div')).filter(div => {
            return div.querySelector('img') !== null;
        });
        
        if (imageDivs.length === 0) {
            console.warn('Aucune image trouvée dans la galerie');
            return;
        }
        
        console.log(`Galerie initialisée : ${imageDivs.length} images trouvées`);

        // S'assurer que chaque div d'image a les bons styles
        imageDivs.forEach((div, index) => {
            const img = div.querySelector('img');
            if (!img) return;

            // S'assurer que l'image remplit son conteneur
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.display = 'block';

            // Trouver le conteneur parent le plus proche qui doit être stylé
            // (celui qui est directement enfant du conteneur d'images)
            let containerToStyle = div;
            let parent = div.parentElement;
            
            // Remonter jusqu'au conteneur d'images pour trouver le bon niveau
            while (parent && parent !== imagesContainer) {
                containerToStyle = parent;
                parent = parent.parentElement;
            }
            
            // S'assurer que le conteneur a les bons styles
            containerToStyle.style.position = 'relative';
            containerToStyle.style.overflow = 'hidden';
            containerToStyle.style.borderRadius = '12px';
            containerToStyle.style.aspectRatio = '4/3';
            containerToStyle.style.cursor = 'pointer';
            containerToStyle.style.width = '100%';
            containerToStyle.style.height = 'auto';

            // Ajouter un effet de lightbox au clic (optionnel)
            containerToStyle.addEventListener('click', function() {
                // Vous pouvez ajouter ici une logique de lightbox si nécessaire
                // Par exemple, ouvrir l'image en plein écran
                const imgSrc = img.src;
                // console.log('Image cliquée:', imgSrc);
            });
        });

        // S'assurer que le conteneur a un grid layout
        if (window.getComputedStyle(imagesContainer).display !== 'grid') {
            imagesContainer.style.display = 'grid';
            imagesContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
            imagesContainer.style.gap = '1.5rem';
        }
    }

    /**
     * Comportement Drupal pour initialiser les fonctionnalités
     */
    Drupal.behaviors.agepProjectSingle = {
        attach: function (context, settings) {
            // Ne s'exécuter qu'une seule fois sur le document principal
            if (context !== document) {
                return;
            }

            // Attendre que le DOM soit complètement chargé
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    // Initialiser AOS en premier pour que les animations fonctionnent
                    initAOS();
                    setTimeout(function() {
                        initBeforeAfterSlider();
                        initProjectGallery();
                    }, 100);
                });
            } else {
                // DOM déjà chargé
                // Initialiser AOS en premier pour que les animations fonctionnent
                initAOS();
                setTimeout(function() {
                    initBeforeAfterSlider();
                    initProjectGallery();
                }, 100);
            }
        }
    };

    // Initialisation immédiate si Drupal n'est pas disponible (pour tests)
    if (typeof Drupal === 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                // Initialiser AOS en premier pour que les animations fonctionnent
                initAOS();
                setTimeout(function() {
                    initBeforeAfterSlider();
                    initProjectGallery();
                }, 100);
            });
        } else {
            // Initialiser AOS en premier pour que les animations fonctionnent
            initAOS();
            setTimeout(function() {
                initBeforeAfterSlider();
                initProjectGallery();
            }, 100);
        }
    }

})(Drupal, jQuery);

