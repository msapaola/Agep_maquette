# Assets JavaScript pour Drupal

Ce dossier contient les fichiers JavaScript adaptés spécifiquement pour Drupal.

## Fichiers

- **`main.js`** : Script principal adapté pour Drupal avec intégration `Drupal.behaviors`

## Différences avec la version standard

### Intégration Drupal.behaviors

Le fichier utilise `Drupal.behaviors` pour une intégration propre avec Drupal :

```javascript
Drupal.behaviors.agepMain = {
    attach: function (context, settings) {
        // Initialisation
    },
    detach: function (context, settings, trigger) {
        // Nettoyage si nécessaire
    }
};
```

### Améliorations pour Drupal

1. **Gestion des formulaires Drupal** : 
   - Détection et respect des formulaires Drupal (Webform, etc.)
   - Évite les conflits avec la validation native de Drupal
   - Marque les formulaires traités pour éviter les doublons

2. **Navigation adaptée** :
   - Gestion correcte des chemins Drupal
   - Détection améliorée des liens actifs avec les chemins Drupal

3. **Particles.js sécurisé** :
   - Vérification que l'initialisation n'est faite qu'une seule fois
   - Gestion des erreurs améliorée

4. **Performance** :
   - Utilisation de `requestAnimationFrame` pour le scroll
   - Marquage des éléments traités pour éviter les doublons
   - Event listeners optimisés

## Installation dans Drupal

### Option 1 : Via le fichier .libraries.yml du thème

Ajoutez dans `agep_custom.libraries.yml` :

```yaml
agep-main:
  js:
    asset_drupal/main.js: {}
  dependencies:
    - core/drupal
    - core/jquery
    - core/drupalSettings
```

Puis attachez la bibliothèque dans votre `.theme` :

```php
function agep_custom_page_attachments(array &$page) {
  $page['#attached']['library'][] = 'agep_custom/agep-main';
}
```

Ou dans un template Twig :

```twig
{{ attach_library('agep_custom/agep-main') }}
```

### Option 2 : Via Asset Injector

1. Installez le module **Asset Injector** si ce n'est pas déjà fait
2. Allez dans **Configuration > Développement > Asset Injector**
3. Créez un nouveau **JS Injector** :
   - **Label** : `AGEP Main JS`
   - **Code** : Copiez le contenu de `main.js`
   - **Scope** : Footer
   - **Pages** : Toutes les pages ou pages spécifiques selon vos besoins

## Fonctionnalités

### Navigation
- Menu mobile responsive avec toggle
- Fermeture automatique au clic sur un lien
- Détection des liens actifs

### Formulaires
- Validation en temps réel
- Messages d'erreur personnalisés
- Compatible avec les formulaires Drupal

### Smooth Scroll
- Défilement fluide vers les ancres
- Prise en compte de la hauteur de la navbar

### Particles.js
- Initialisation sécurisée
- Vérification de l'existence des éléments
- Gestion des erreurs

### Navbar Scroll
- Effet de scroll sur la navbar
- Masquage/affichage au scroll (optionnel)

## Utilisation programmatique

Les fonctions sont exposées globalement via `window.agepMain` :

```javascript
// Réinitialiser la navigation
window.agepMain.initNavigation();

// Réinitialiser les formulaires
window.agepMain.initForms();

// Initialiser Particles.js
window.agepMain.initParticles();

// Tout réinitialiser
window.agepMain.init();
```

## Compatibilité

- Drupal 8, 9, 10, 11
- Compatible avec AJAX (Drupal.behaviors)
- Compatible avec les modules de formulaire (Webform, etc.)
- Compatible avec les thèmes clair/sombre

## Notes importantes

- Le script vérifie automatiquement si Drupal est disponible
- Si Drupal n'est pas disponible, le script fonctionne quand même (fallback)
- Les éléments sont marqués comme traités pour éviter les doublons lors des mises à jour AJAX
- Le script respecte les formulaires Drupal et ne les interfère pas

## Dépannage

### Le script ne s'exécute pas

1. Vérifiez que la bibliothèque est bien attachée
2. Videz le cache Drupal : `drush cr`
3. Vérifiez la console du navigateur pour les erreurs

### Les formulaires ne se valident pas

1. Vérifiez que les formulaires Drupal ne sont pas bloqués
2. Le script détecte automatiquement les formulaires Drupal et les laisse gérer leur propre validation

### Le menu mobile ne fonctionne pas

1. Vérifiez que les classes CSS sont présentes
2. Vérifiez que le template du menu génère bien les classes `nav-toggle` et `nav-menu`

