# Index des fichiers Drupal

Ce dossier contient tous les fichiers et templates nécessaires pour l'intégration Drupal du projet AGEP.

## Structure complète

```
drupal-templates/
├── menu/
│   └── menu--main.html.twig          # Template pour le menu principal
├── region/
│   └── region--navigation.html.twig  # Template pour la région de navigation
├── README.md                          # Documentation des templates
└── INDEX.md                           # Ce fichier (index général)

drupal-project-single/
├── project-single-drupal.css         # Styles CSS pour la page projet single
├── project-single-drupal.js          # JavaScript pour la page projet single
└── README.md                          # Documentation pour project-single
```

## Fichiers disponibles

### Templates Twig

1. **`menu/menu--main.html.twig`**
   - Template pour le menu principal
   - Génère le menu desktop et mobile avec toutes les classes du design
   - Support des sous-menus

2. **`region/region--navigation.html.twig`**
   - Template pour la région de navigation complète
   - Inclut le logo, le menu, et les boutons de contrôle

### Fichiers CSS/JS pour Project Single

3. **`../drupal-project-single/project-single-drupal.css`**
   - Styles CSS adaptés pour la page projet single dans Drupal
   - Corrige l'affichage des photos avant/après et de la galerie

4. **`../drupal-project-single/project-single-drupal.js`**
   - JavaScript pour initialiser le slider avant/après et la galerie
   - Initialise AOS (Animate On Scroll)
   - Compatible avec Drupal.behaviors

## Guide rapide d'installation

### 1. Templates de menu et région

```bash
# Copier dans votre thème Drupal
cp drupal-templates/menu/* /path/to/theme/templates/menu/
cp drupal-templates/region/* /path/to/theme/templates/region/
```

Voir `README.md` pour les détails complets.

### 2. Fichiers Project Single

Voir `../drupal-project-single/README.md` pour l'installation via Asset Injector ou via le thème.

## Documentation

- **Templates** : Voir `README.md` dans ce dossier
- **Project Single** : Voir `../drupal-project-single/README.md`

## Support

Pour toute question ou problème, consultez la documentation dans chaque dossier ou les fichiers README correspondants.

