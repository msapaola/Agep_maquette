#!/bin/bash

# Script pour créer la structure de base d'un thème Drupal à partir de ce projet

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Création du Thème Drupal AGEP Custom ===${NC}\n"

# Demander le chemin du projet Drupal
read -p "Entrez le chemin vers votre installation Drupal (absolu ou relatif, ex: /Users/user/drupal ou ~/drupal): " DRUPAL_PATH_INPUT

# Convertir le chemin en chemin absolu
# Si le chemin commence par ~, le remplacer par $HOME
if [[ "$DRUPAL_PATH_INPUT" == ~* ]]; then
    DRUPAL_PATH="${DRUPAL_PATH_INPUT/#\~/$HOME}"
# Si le chemin ne commence pas par /, le convertir en absolu
elif [[ ! "$DRUPAL_PATH_INPUT" =~ ^/ ]]; then
    # Essayer avec realpath si disponible
    if command -v realpath &> /dev/null; then
        DRUPAL_PATH=$(realpath "$DRUPAL_PATH_INPUT" 2>/dev/null)
    # Sinon, essayer avec readlink -f
    elif command -v readlink &> /dev/null; then
        DRUPAL_PATH=$(readlink -f "$DRUPAL_PATH_INPUT" 2>/dev/null)
    # Sinon, construire le chemin absolu manuellement
    else
        if [[ "$DRUPAL_PATH_INPUT" =~ ^\./ ]]; then
            DRUPAL_PATH="$(pwd)/${DRUPAL_PATH_INPUT#./}"
        else
            DRUPAL_PATH="$(pwd)/$DRUPAL_PATH_INPUT"
        fi
    fi
    # Si la conversion a échoué, utiliser le chemin d'origine
    if [ -z "$DRUPAL_PATH" ] || [ ! -d "$DRUPAL_PATH" ]; then
        DRUPAL_PATH="$DRUPAL_PATH_INPUT"
    fi
else
    DRUPAL_PATH="$DRUPAL_PATH_INPUT"
fi

# Si le chemin commence par "Users" sans /, essayer d'ajouter / au début (macOS)
if [[ "$DRUPAL_PATH" =~ ^Users/ ]]; then
    DRUPAL_PATH="/$DRUPAL_PATH"
fi

# Vérifier que le chemin existe
if [ ! -d "$DRUPAL_PATH" ]; then
    echo -e "${RED}Erreur: Le chemin spécifié n'existe pas!${NC}"
    echo -e "${YELLOW}Chemin essayé: $DRUPAL_PATH${NC}"
    echo -e "${YELLOW}Chemin d'origine: $DRUPAL_PATH_INPUT${NC}"
    echo -e "${YELLOW}Astuce: Utilisez un chemin absolu (commençant par /) ou un chemin relatif depuis le répertoire actuel.${NC}"
    exit 1
fi

# Afficher le chemin résolu pour confirmation
echo -e "${GREEN}Chemin Drupal résolu: $DRUPAL_PATH${NC}\n"

# Vérifier que c'est bien une installation Drupal (chercher le dossier web/)
if [ ! -d "$DRUPAL_PATH/web" ] && [ ! -d "$DRUPAL_PATH/core" ]; then
    echo -e "${YELLOW}Attention: Le répertoire 'web' ou 'core' n'a pas été trouvé dans le chemin spécifié.${NC}"
    echo -e "${YELLOW}Assurez-vous que c'est bien le répertoire racine de votre installation Drupal.${NC}"
    read -p "Continuer quand même? (o/N): " CONTINUE
    if [[ ! "$CONTINUE" =~ ^[Oo]$ ]]; then
        exit 1
    fi
fi

THEME_PATH="$DRUPAL_PATH/web/themes/custom/agep_custom"
CURRENT_DIR=$(pwd)

echo -e "${YELLOW}Chemin du thème: $THEME_PATH${NC}\n"

# Créer le répertoire du thème
mkdir -p "$THEME_PATH/templates"
mkdir -p "$THEME_PATH/config"

echo -e "${GREEN}✓ Répertoires créés${NC}"

# Copier les assets
echo -e "${YELLOW}Copie des assets...${NC}"
cp -r "$CURRENT_DIR/assets" "$THEME_PATH/"
echo -e "${GREEN}✓ Assets copiés${NC}"

# Créer le fichier .info.yml
cat > "$THEME_PATH/agep_custom.info.yml" << 'EOF'
name: 'AGEP Custom'
type: theme
description: 'Thème personnalisé pour l'\''AGEP Kinshasa'
core_version_requirement: ^9 || ^10 || ^11
base theme: false

libraries:
  - agep_custom/global

regions:
  header: 'Header'
  navigation: 'Navigation'
  hero: 'Hero Section'
  highlighted: 'Highlighted'
  help: 'Help'
  content: 'Content'
  featured_projects: 'Projets Phares'
  sidebar_first: 'Sidebar First'
  sidebar_second: 'Sidebar Second'
  footer: 'Footer'
EOF

echo -e "${GREEN}✓ Fichier .info.yml créé${NC}"

# Créer le fichier .libraries.yml
cat > "$THEME_PATH/agep_custom.libraries.yml" << 'EOF'
global:
  version: 1.0
  css:
    theme:
      assets/css/variables.css: {}
      assets/css/tailwind-compiled.css: {}
      assets/css/main.css: {}
      assets/css/aos.css: {}
      assets/css/swiper-bundle.min.css: {}
  js:
    assets/js/utils.js: {}
    assets/js/theme.js: {}
    assets/js/loader.js: {}
    assets/js/animations.js: {}
    assets/js/main.js: {}
    assets/js/aos.js: {}
    assets/js/swiper-bundle.min.js: {}
    assets/js/particles.min.js: {}
  dependencies:
    - core/drupal
    - core/jquery
EOF

echo -e "${GREEN}✓ Fichier .libraries.yml créé${NC}"

# Créer le fichier .theme
cat > "$THEME_PATH/agep_custom.theme" << 'EOF'
<?php

/**
 * @file
 * Fonctions et hooks du thème AGEP Custom
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_preprocess_html().
 */
function agep_custom_preprocess_html(&$variables) {
  // Ajouter l'attribut data-theme pour le mode clair/sombre
  $variables['attributes']['data-theme'] = 'light';
}

/**
 * Implements hook_preprocess_page().
 */
function agep_custom_preprocess_page(&$variables) {
  // Ajouter des variables personnalisées
  $variables['base_path'] = base_path();
  $variables['theme_path'] = drupal_get_path('theme', 'agep_custom');
}
EOF

echo -e "${GREEN}✓ Fichier .theme créé${NC}"

# Copier package.json et tailwind.config.js si ils existent
if [ -f "$CURRENT_DIR/package.json" ]; then
    cp "$CURRENT_DIR/package.json" "$THEME_PATH/"
    echo -e "${GREEN}✓ package.json copié${NC}"
fi

if [ -f "$CURRENT_DIR/tailwind.config.js" ]; then
    cp "$CURRENT_DIR/tailwind.config.js" "$THEME_PATH/"
    echo -e "${GREEN}✓ tailwind.config.js copié${NC}"
fi

if [ -f "$CURRENT_DIR/postcss.config.js" ]; then
    cp "$CURRENT_DIR/postcss.config.js" "$THEME_PATH/"
    echo -e "${GREEN}✓ postcss.config.js copié${NC}"
fi

# Créer un README pour le thème
cat > "$THEME_PATH/README.md" << 'EOF'
# Thème Drupal AGEP Custom

Thème personnalisé pour l'AGEP Kinshasa, migré depuis le projet Maquette_AGEP.

## Installation

1. Le thème est déjà installé dans `web/themes/custom/agep_custom`
2. Activer le thème via l'interface d'administration ou avec Drush :
   ```bash
   drush theme:enable agep_custom
   drush config:set system.theme default agep_custom
   drush cache:rebuild
   ```

## Développement

Si vous utilisez Tailwind CSS :

```bash
cd web/themes/custom/agep_custom
npm install
npm run build-css
```

## Structure

- `assets/` : Tous les fichiers CSS, JS et images
- `templates/` : Templates Twig (à créer selon vos besoins)
- `agep_custom.info.yml` : Définition du thème
- `agep_custom.libraries.yml` : Définition des bibliothèques CSS/JS
- `agep_custom.theme` : Hooks PHP du thème

## Documentation

Voir `GUIDE_MIGRATION_DRUPAL.md` dans le projet source pour plus de détails.
EOF

echo -e "${GREEN}✓ README.md créé${NC}"

echo -e "\n${GREEN}=== Migration terminée avec succès! ===${NC}\n"
echo -e "${YELLOW}Prochaines étapes:${NC}"
echo -e "1. Vérifiez les fichiers créés dans: $THEME_PATH"
echo -e "2. Activez le thème dans Drupal"
echo -e "3. Créez les templates Twig selon vos besoins"
echo -e "4. Consultez GUIDE_MIGRATION_DRUPAL.md pour plus de détails\n"

