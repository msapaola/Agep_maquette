<?php

/**
 * @file
 * Exemple de code à ajouter dans votre fichier .theme
 * pour supprimer la balise <nav> générée par Drupal pour le bloc du menu principal
 */

/**
 * Implements hook_preprocess_block().
 * 
 * Cette fonction supprime les wrappers par défaut de Drupal pour le bloc du menu principal
 * et change le tag HTML de <nav> à <div> pour éviter la double balise <nav>.
 */
function agep_custom_preprocess_block(&$variables) {
  // Identifier le bloc du menu principal
  $block_id = $variables['elements']['#id'] ?? NULL;
  $plugin_id = $variables['elements']['#base_plugin_id'] ?? NULL;
  
  // Vérifier si c'est le bloc du menu principal
  if ($block_id === 'agep_custom_main_menu' || 
      ($plugin_id === 'system_menu_block' && isset($variables['elements']['#configuration']['menu_name']) && 
       $variables['elements']['#configuration']['menu_name'] === 'main')) {
    
    // Supprimer les classes par défaut de Drupal
    if (isset($variables['attributes']['class'])) {
      $classes = $variables['attributes']['class'];
      $classes = array_filter($classes, function($class) {
        return !in_array($class, ['block', 'block-menu', 'block-system', 'block-system-menu-block']);
      });
      $variables['attributes']['class'] = array_values($classes);
    }
    
    // Supprimer les attributs par défaut
    unset($variables['attributes']['role']);
    unset($variables['attributes']['id']);
    
    // Supprimer l'aria-labelledby si présent
    unset($variables['attributes']['aria-labelledby']);
    
    // Changer le tag HTML de <nav> à <div>
    // Drupal utilise 'nav' par défaut pour les menus, on le change en 'div'
    $variables['html_tag'] = 'div';
    
    // Alternative : Si vous voulez supprimer complètement le wrapper,
    // vous pouvez utiliser cette approche (mais cela nécessite plus de modifications)
    // $variables['wrapper_attributes'] = new \Drupal\Core\Template\Attribute();
  }
}

/**
 * Implements hook_block_build_alter().
 * 
 * Alternative : Modifier le render array du bloc avant le rendu
 */
function agep_custom_block_build_alter(array &$build, \Drupal\Core\Block\BlockPluginInterface $block) {
  // Pour le bloc du menu principal
  if ($block->getPluginId() === 'system_menu_block:main' || 
      (isset($build['#id']) && $build['#id'] === 'agep_custom_main_menu')) {
    
    // Supprimer les attributs par défaut
    if (isset($build['#attributes'])) {
      unset($build['#attributes']['role']);
      unset($build['#attributes']['id']);
      unset($build['#attributes']['aria-labelledby']);
      
      // Supprimer les classes par défaut
      if (isset($build['#attributes']['class'])) {
        $build['#attributes']['class'] = array_filter(
          $build['#attributes']['class'],
          function($class) {
            return !in_array($class, ['block', 'block-menu', 'block-system', 'block-system-menu-block']);
          }
        );
      }
    }
    
    // Changer le thème du bloc pour utiliser notre template personnalisé
    $build['#theme'] = 'block__agep_custom_main_menu';
  }
}

/**
 * Implements hook_theme_suggestions_block_alter().
 * 
 * Ajouter une suggestion de thème spécifique pour le bloc du menu principal
 */
function agep_custom_theme_suggestions_block_alter(array &$suggestions, array $variables) {
  // Ajouter une suggestion spécifique pour le bloc du menu principal
  if (isset($variables['elements']['#id'])) {
    $block_id = $variables['elements']['#id'];
    if ($block_id === 'agep_custom_main_menu') {
      $suggestions[] = 'block__agep_custom_main_menu';
    }
  }
  
  // Ou pour tous les blocs de menu principal
  if (isset($variables['elements']['#base_plugin_id']) && 
      $variables['elements']['#base_plugin_id'] === 'system_menu_block') {
    if (isset($variables['elements']['#configuration']['menu_name']) && 
        $variables['elements']['#configuration']['menu_name'] === 'main') {
      $suggestions[] = 'block__agep_custom_main_menu';
    }
  }
}

