# Template de bloc pour le menu principal

Ce dossier contient le template pour le bloc du menu principal (`agep_custom_main_menu`).

## Problème résolu

Drupal génère automatiquement une balise `<nav>` autour des blocs de menu, ce qui crée une double balise `<nav>` (une dans la région de navigation et une autour du bloc). Ce template supprime cette double balise.

## Fichier

- **`block--agep-custom-main-menu.html.twig`** : Template qui supprime les wrappers par défaut de Drupal

## Installation

1. Copiez le fichier dans votre thème :
   ```bash
   cp drupal-templates/block/block--agep-custom-main-menu.html.twig /path/to/your/theme/templates/block/
   ```

2. Videz le cache Drupal :
   ```bash
   drush cr
   ```

## Suppression complète de la balise <nav> du bloc

Le template supprime les classes et attributs, mais pour supprimer complètement la balise `<nav>` générée par Drupal, vous devez ajouter ce code dans votre fichier `.theme` :

```php
/**
 * Implements hook_preprocess_block().
 */
function agep_custom_preprocess_block(&$variables) {
  // Supprimer la balise <nav> pour le bloc du menu principal
  if ($variables['plugin_id'] === 'system_menu_block:main' || 
      $variables['base_plugin_id'] === 'system_menu_block') {
    // Supprimer les wrappers par défaut
    $variables['attributes']['removeClass']('block-menu');
    $variables['attributes']['removeAttribute']('role');
    $variables['attributes']['removeAttribute']('id');
    
    // Supprimer la balise <nav> en changeant le type d'élément
    // On utilise un div au lieu de nav
    $variables['html_tag'] = 'div';
  }
}
```

**OU** une solution plus simple, ajoutez ce code dans votre fichier `.theme` :

```php
/**
 * Implements hook_theme_suggestions_block_alter().
 */
function agep_custom_theme_suggestions_block_alter(array &$suggestions, array $variables) {
  // Ajouter une suggestion spécifique pour le bloc du menu principal
  if (isset($variables['elements']['#id'])) {
    $block_id = $variables['elements']['#id'];
    if ($block_id === 'agep_custom_main_menu') {
      $suggestions[] = 'block__agep_custom_main_menu';
    }
  }
}

/**
 * Implements hook_preprocess_block().
 */
function agep_custom_preprocess_block(&$variables) {
  // Pour le bloc du menu principal, supprimer les wrappers
  if (isset($variables['elements']['#id']) && 
      $variables['elements']['#id'] === 'agep_custom_main_menu') {
    // Supprimer les classes et attributs par défaut
    $variables['attributes']['removeClass']('block');
    $variables['attributes']['removeClass']('block-menu');
    $variables['attributes']['removeAttribute']('role');
    
    // Changer le tag HTML de <nav> à <div>
    // Note: Drupal utilise 'nav' par défaut pour les menus
    // On peut le changer en modifiant le render array
    if (isset($variables['content']['#theme'])) {
      // Le contenu sera rendu sans wrapper <nav>
    }
  }
}
```

## Solution recommandée : Modifier le render array

La meilleure solution est de modifier le render array du bloc dans un hook :

```php
/**
 * Implements hook_block_build_alter().
 */
function agep_custom_block_build_alter(array &$build, \Drupal\Core\Block\BlockPluginInterface $block) {
  // Pour le bloc du menu principal
  if ($block->getPluginId() === 'system_menu_block:main' || 
      (isset($build['#id']) && $build['#id'] === 'agep_custom_main_menu')) {
    // Supprimer les wrappers par défaut
    unset($build['#attributes']['role']);
    unset($build['#attributes']['id']);
    
    // Changer le tag HTML de <nav> à <div> ou supprimer complètement
    // En modifiant le thème du bloc
    $build['#theme'] = 'block__agep_custom_main_menu';
  }
}
```

## Vérification

Après avoir appliqué ces modifications :

1. Videz le cache : `drush cr`
2. Inspectez le HTML généré
3. Vous devriez voir une seule balise `<nav>` (celle de la région de navigation)
4. Le contenu du menu devrait être directement dans la structure sans balise `<nav>` supplémentaire

## Structure HTML attendue

```html
<nav class="navbar ...">
  <div class="container ...">
    <div class="flex items-center justify-between h-24">
      <!-- Logo -->
      <a href="/">...</a>
      
      <!-- Menu (sans balise <nav> supplémentaire) -->
      <div class="hidden lg:flex items-center space-x-8">
        <!-- Liens du menu -->
      </div>
      <div class="nav-menu hidden lg:hidden pb-4">
        <!-- Menu mobile -->
      </div>
      
      <!-- Boutons -->
      <div class="flex items-center space-x-4">
        <!-- Boutons -->
      </div>
    </div>
  </div>
</nav>
```

