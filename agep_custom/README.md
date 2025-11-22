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
