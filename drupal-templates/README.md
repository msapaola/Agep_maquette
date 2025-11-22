# Templates Drupal pour le projet AGEP

Ce dossier contient tous les templates Twig spécifiques pour l'intégration Drupal du projet AGEP.

## Structure des dossiers

```
drupal-templates/
├── block/
│   ├── block--agep-custom-main-menu.html.twig  # Template pour le bloc du menu principal
│   ├── theme-hook-example.php                  # Exemple de code PHP pour .theme
│   └── README.md                               # Documentation du template de bloc
├── menu/
│   └── menu--main.html.twig                    # Template pour le menu principal
├── region/
│   └── region--navigation.html.twig            # Template pour la région de navigation
└── README.md                                    # Ce fichier
```

## Installation dans Drupal

### 1. Copier les templates dans votre thème

Copiez les fichiers dans le dossier `templates` de votre thème Drupal :

```bash
# Pour le bloc du menu principal (IMPORTANT pour éviter la double balise <nav>)
cp drupal-templates/block/block--agep-custom-main-menu.html.twig /path/to/your/theme/templates/block/

# Pour le menu
cp drupal-templates/menu/menu--main.html.twig /path/to/your/theme/templates/menu/

# Pour la région
cp drupal-templates/region/region--navigation.html.twig /path/to/your/theme/templates/region/
```

### 2. Ajouter le code PHP dans votre fichier .theme

**IMPORTANT** : Pour supprimer complètement la balise `<nav>` générée par Drupal autour du bloc, vous devez ajouter le code du fichier `block/theme-hook-example.php` dans votre fichier `.theme`.

Voir la documentation dans `block/README.md` pour plus de détails.

### 3. Vider le cache Drupal

Après avoir copié les templates et ajouté le code PHP, videz le cache :

```bash
drush cr
```

Ou via l'interface : **Configuration > Développement > Vider tous les caches**

## Utilisation

### Bloc du Menu Principal

Le template `block--agep-custom-main-menu.html.twig` supprime les wrappers par défaut de Drupal pour éviter la double balise `<nav>`.

**Problème résolu** : Drupal génère automatiquement une balise `<nav>` autour des blocs de menu, ce qui crée une double balise `<nav>` (une dans la région de navigation et une autour du bloc). Ce template supprime cette double balise.

Voir `block/README.md` pour la documentation complète et les instructions d'installation.

### Menu Principal

Le template `menu--main.html.twig` génère automatiquement le menu principal avec :

- **Menu Desktop** : Visible sur les grands écrans (lg et plus) avec la classe `hidden lg:flex`
- **Menu Mobile** : Visible sur les petits écrans avec la classe `nav-menu hidden lg:hidden`
- **Classes conformes** : Toutes les classes du design original sont préservées
- **État actif** : La classe `active` est automatiquement ajoutée aux éléments actifs

#### Configuration dans Drupal

1. Allez dans **Structure > Menus**
2. Assurez-vous que le menu "Main navigation" existe
3. Ajoutez vos liens de menu
4. Dans **Structure > Block layout**, placez le bloc "Main navigation" dans la région "Navigation"

### Région de Navigation

Le template `region--navigation.html.twig` crée la structure complète de la navbar avec :

- Le logo (si configuré)
- Le contenu de la région (menu principal)
- Le bouton de toggle du thème
- Le bouton du menu mobile

#### Configuration dans Drupal

1. Dans votre fichier `.info.yml` du thème, assurez-vous d'avoir la région `navigation` :

```yaml
regions:
  header: Header
  navigation: Navigation
  content: Content
  footer: Footer
```

2. Dans votre template `page.html.twig`, ajoutez la région :

```twig
{% if page.navigation %}
  {{ page.navigation }}
{% endif %}
```

3. Dans **Structure > Block layout**, placez le bloc "Main navigation" dans la région "Navigation"

### Logo

Pour afficher le logo dans la région de navigation, vous avez plusieurs options :

#### Option 1 : Variable dans le template de région

Modifiez le fichier `.theme` de votre thème pour ajouter la variable `logo_url` :

```php
function agep_custom_preprocess_region(&$variables) {
  if ($variables['elements']['#region'] === 'navigation') {
    $theme_path = \Drupal::theme()->getActiveTheme()->getPath();
    $variables['logo_url'] = '/' . $theme_path . '/assets/logos/logo-couleur.webp';
  }
}
```

#### Option 2 : Block personnalisé pour le logo

Créez un block personnalisé pour le logo et placez-le dans la région "Navigation" avant le menu.

#### Option 3 : Modifier le template de région

Vous pouvez modifier directement `region--navigation.html.twig` pour utiliser le logo du site Drupal :

```twig
{% if logo %}
  <a href="{{ path('<front>') }}" class="flex items-center">
    <img src="{{ logo }}" alt="{{ site_name }}" class="nav-logo h-24 w-auto">
  </a>
{% endif %}
```

## Classes CSS utilisées

Le template utilise les mêmes classes que le design original :

### Menu Desktop
- `hidden lg:flex items-center space-x-8` : Container du menu desktop
- `nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium transition-colors` : Liens du menu
- `active` : Classe ajoutée automatiquement pour l'élément actif

### Menu Mobile
- `nav-menu hidden lg:hidden pb-4` : Container du menu mobile
- `flex flex-col space-y-4 mt-4` : Liste des liens mobile
- `py-2` : Padding vertical pour les liens mobile

### Navigation
- `navbar fixed top-0 left-0 right-0 z-[1000]` : Navbar principale
- `bg-[var(--bg-primary)] shadow-[var(--shadow-md)] transition-all duration-300` : Styles de la navbar

## Personnalisation

### Ajouter des sous-menus

Le template supporte déjà les sous-menus. Si vous créez des sous-menus dans Drupal, ils seront automatiquement affichés avec la structure appropriée.

### Modifier les classes

Vous pouvez modifier les classes dans les templates Twig selon vos besoins. Assurez-vous de maintenir la cohérence avec le design original.

## Dépannage

### Le menu ne s'affiche pas

1. Vérifiez que le template est bien dans le dossier `templates/menu/` de votre thème
2. Videz le cache Drupal
3. Vérifiez que le bloc "Main navigation" est bien placé dans la région "Navigation"

### Les classes ne s'appliquent pas

1. Vérifiez que Tailwind CSS est bien compilé avec toutes les classes utilisées
2. Vérifiez que les variables CSS sont bien définies dans `variables.css`
3. Inspectez le HTML généré pour voir si les classes sont présentes

### Le menu mobile ne fonctionne pas

Assurez-vous que le JavaScript pour le menu mobile est bien chargé. Le bouton `nav-toggle` doit avoir un gestionnaire d'événements qui toggle la classe `hidden` sur `.nav-menu`.

## Notes importantes

- Les templates utilisent la syntaxe Twig de Drupal
- Les classes Tailwind CSS doivent être compilées dans votre CSS
- Les variables CSS (`var(--text-primary)`, etc.) doivent être définies dans `variables.css`
- Le template est compatible avec le système de thème clair/sombre du projet

