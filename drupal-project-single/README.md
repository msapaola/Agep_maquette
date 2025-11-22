# Fichiers CSS et JavaScript pour Project Single dans Drupal

Ce dossier contient les fichiers CSS et JavaScript spécifiquement adaptés pour la page "Project Single" dans Drupal. Ces fichiers corrigent les problèmes d'affichage des photos avant/après et de la galerie en adaptant les sélecteurs à la structure HTML générée par Drupal.

## Fichiers

- **`project-single-drupal.css`** : Styles CSS adaptés pour la structure Drupal
- **`project-single-drupal.js`** : JavaScript adapté pour initialiser le slider avant/après et la galerie dans Drupal

## Problèmes résolus

1. **Photos Avant/Après** : Les images ne s'affichaient pas correctement car la structure HTML de Drupal est différente (images imbriquées dans plusieurs divs avec des classes Drupal)
2. **Galerie** : Seule la première photo s'affichait car toutes les images sont dans un seul conteneur avec une structure imbriquée

## Installation dans Drupal

### Option 1 : Via Asset Injector (Recommandé)

1. Installez le module **Asset Injector** si ce n'est pas déjà fait :
   ```
   drush en asset_injector -y
   ```

2. Allez dans **Configuration > Développement > Asset Injector**

3. Créez un nouveau **CSS Injector** :
   - **Label** : `Project Single Drupal CSS`
   - **Code** : Copiez le contenu de `project-single-drupal.css`
   - **Pages** : Sélectionnez "Only on listed pages" et ajoutez : `node/*/projet` (ou le chemin de vos pages de projet)
   - **Conditions** : Vous pouvez ajouter une condition pour n'injecter que sur les nœuds de type "Projet"

4. Créez un nouveau **JS Injector** :
   - **Label** : `Project Single Drupal JS`
   - **Code** : Copiez le contenu de `project-single-drupal.js`
   - **Pages** : Même configuration que le CSS
   - **Scope** : Footer

### Option 2 : Via le thème (Méthode recommandée pour la production)

1. Copiez les fichiers dans votre thème :
   ```bash
   cp project-single-drupal.css /path/to/your/theme/assets/css/
   cp project-single-drupal.js /path/to/your/theme/assets/js/
   ```

2. Ajoutez les fichiers dans le fichier `.libraries.yml` de votre thème :
   ```yaml
   project-single-drupal:
     css:
       theme:
         assets/css/project-single-drupal.css: {}
     js:
       assets/js/project-single-drupal.js: {}
     dependencies:
       - core/drupal
       - core/jquery
   ```

3. Attachez la bibliothèque dans votre template Twig (par exemple `node--projet--full.html.twig`) :
   ```twig
   {{ attach_library('agep_custom/project-single-drupal') }}
   ```

   Ou dans le fichier `.theme` de votre thème :
   ```php
   function agep_custom_preprocess_node(&$variables) {
     if ($variables['node']->getType() === 'projet' && $variables['view_mode'] === 'full') {
       $variables['#attached']['library'][] = 'agep_custom/project-single-drupal';
     }
   }
   ```

## Structure HTML attendue par Drupal

### Avant/Après
```html
<div id="before-after-container" class="before-after-container">
  <div class="paragraph paragraph--type--comparaison-photos">
    <div>
      <div>Avant</div>
      <div>
        <div>
          <img src="..." />
        </div>
      </div>
    </div>
    <div>
      <div>Après</div>
      <div>
        <div>
          <img src="..." />
        </div>
      </div>
    </div>
  </div>
  <div id="slider" class="before-after-slider"></div>
</div>
```

### Galerie
```html
<div id="project-gallery" class="project-gallery">
  <div class="gallery-item">
    <div class="paragraph paragraph--type--gallerie">
      <div>
        <div>Galleries</div>
        <div>
          <div>
            <div>
              <img src="..." />
            </div>
          </div>
          <div>
            <div>
              <img src="..." />
            </div>
          </div>
          <!-- Plus d'images -->
        </div>
      </div>
    </div>
  </div>
</div>
```

## Fonctionnalités

### Slider Avant/Après
- Slider interactif avec drag & drop
- Support tactile pour mobile
- Clic sur le container pour déplacer le slider
- Position initiale à 50%

### Galerie
- Affichage en grille responsive
- Effet hover sur les images
- Toutes les images de la galerie sont affichées
- Support du clic pour ouvrir en lightbox (à implémenter si nécessaire)

## Notes importantes

- Les fichiers sont conçus pour fonctionner avec la structure HTML générée par Drupal sans modifier le code Drupal
- Les sélecteurs CSS et JavaScript sont spécifiquement adaptés pour la structure imbriquée de Drupal
- Le JavaScript utilise `Drupal.behaviors` pour une intégration propre avec Drupal
- Compatible avec les thèmes clair/sombre grâce à l'utilisation des variables CSS

## Dépannage

Si les images ne s'affichent toujours pas :

1. Vérifiez que les IDs `before-after-container` et `project-gallery` sont présents dans votre HTML
2. Vérifiez que les classes `paragraph--type--comparaison-photos` et `paragraph--type--gallerie` sont présentes
3. Ouvrez la console du navigateur pour vérifier les erreurs JavaScript
4. Vérifiez que les fichiers CSS et JS sont bien chargés dans la page

