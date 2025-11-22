# Guide de Migration vers Drupal - Thème AGEP

Ce guide explique comment transférer ce projet HTML/CSS/JS vers un thème Drupal personnalisé.

## 📋 Structure du Projet Actuel

```
Maquette_AGEP/
├── assets/
│   ├── css/
│   │   ├── main.css (styles personnalisés)
│   │   ├── variables.css (variables CSS)
│   │   ├── tailwind-compiled.css (Tailwind compilé)
│   │   ├── aos.css (animations)
│   │   └── swiper-bundle.min.css (carousel)
│   ├── js/
│   │   ├── main.js (script principal)
│   │   ├── theme.js (gestion thème clair/sombre)
│   │   ├── loader.js (preloader)
│   │   ├── animations.js (animations)
│   │   ├── utils.js (utilitaires)
│   │   ├── aos.js (animations scroll)
│   │   ├── swiper-bundle.min.js (carousel)
│   │   └── particles.min.js (particules)
│   ├── logos/ (logos AGEP)
│   └── images/
├── *.html (pages HTML)
├── package.json (dépendances npm)
└── tailwind.config.js (config Tailwind)
```

## 🎯 Structure du Thème Drupal

Dans votre installation Drupal, créez un thème personnalisé :

```
web/themes/custom/agep_custom/
├── agep_custom.info.yml (fichier de définition du thème)
├── agep_custom.libraries.yml (définition des bibliothèques CSS/JS)
├── agep_custom.theme (hooks PHP)
├── templates/ (templates Twig)
│   ├── html.html.twig
│   ├── page.html.twig
│   ├── node/
│   ├── block/
│   └── views/
├── assets/ (copier depuis le projet actuel)
│   ├── css/
│   ├── js/
│   └── logos/
└── config/ (configuration du thème)
```

## 📝 Étapes de Migration

### 1. Créer le Thème Drupal

```bash
# Dans votre projet Drupal
cd web/themes/custom
mkdir agep_custom
cd agep_custom
```

### 2. Créer le fichier `agep_custom.info.yml`

```yaml
name: 'AGEP Custom'
type: theme
description: 'Thème personnalisé pour l\'AGEP Kinshasa'
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
```

### 3. Créer le fichier `agep_custom.libraries.yml`

```yaml
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
```

### 4. Copier les Assets

```bash
# Depuis le projet Maquette_AGEP
cp -r assets/ /chemin/vers/drupal/web/themes/custom/agep_custom/
```

### 5. Créer les Templates Twig

#### `templates/page.html.twig`

```twig
{#
/**
 * @file
 * Template de page principal
 */
#}
<div id="loader" class="fixed inset-0 z-[9999] flex flex-col items-center justify-center">
  <img src="{{ base_path }}{{ directory }}/assets/logos/logo-anime.gif" alt="Logo AGEP animé" class="loader-logo">
  <div class="loader-progress">
    <div class="loader-progress-bar"></div>
  </div>
</div>

<nav class="navbar fixed top-0 left-0 right-0 z-[1000] bg-[var(--bg-primary)] shadow-[var(--shadow-md)] transition-all duration-300">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-24">
      <a href="{{ path('<front>') }}" class="flex items-center">
        <img src="{{ base_path }}{{ directory }}/assets/logos/logo-couleur.webp" alt="Logo AGEP" class="nav-logo h-24 w-auto">
      </a>
      
      {{ page.navigation }}
      
      <div class="flex items-center space-x-4">
        <button class="theme-toggle" aria-label="Basculer entre mode clair et sombre">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</nav>

<main role="main">
  {% if page.hero %}
    <div class="hero-region">
      {{ page.hero }}
    </div>
  {% endif %}
  
  {{ page.highlighted }}
  {{ page.help }}
  
  {% if page.featured_projects %}
    <div class="featured-projects-region">
      {{ page.featured_projects }}
    </div>
  {% endif %}
  
  {{ page.content }}
</main>

{% if page.footer %}
  <footer class="bg-[var(--bg-secondary)] border-t border-[var(--bg-tertiary)] py-12">
    {{ page.footer }}
  </footer>
{% endif %}
```

### 6. Créer le fichier `agep_custom.theme`

```php
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
```

### 7. Adapter les Chemins dans les Assets

Dans vos fichiers CSS/JS, remplacez les chemins relatifs par des chemins Drupal :

**Dans `main.css` et autres fichiers CSS :**
```css
/* Au lieu de : */
background-image: url('../logos/logo.png');

/* Utiliser : */
background-image: url('/themes/custom/agep_custom/assets/logos/logo.png');
```

**Ou utiliser des variables Twig dans les templates.**

### 8. Placer les Blocs Hero Section et Projets Phares

#### 📍 Régions à Utiliser

Dans le fichier `agep_custom.info.yml`, nous avons ajouté deux régions personnalisées :
- **`hero`** : Pour la Hero Section (section principale avec le titre et les boutons)
- **`featured_projects`** : Pour la section "Projets Phares"

#### 🎯 Méthode 1 : Créer des Blocs Personnalisés (Recommandé)

**Étape 1 : Créer un Bloc Personnalisé pour la Hero Section**

1. Allez dans **Structure > Block layout** (`/admin/structure/block`)
2. Cliquez sur **"Place block"** dans la région **"Hero Section"**
3. Sélectionnez **"Custom block"** > **"Create custom block"**
4. Créez un bloc avec :
   - **Block description** : "Hero Section - Page d'accueil"
   - **Block body** : Utilisez le format "Full HTML" et collez le HTML de la Hero Section

**Ou créez un template de bloc personnalisé :**

Créez `templates/block/block--hero.html.twig` :

```twig
{#
/**
 * @file
 * Template pour le bloc Hero Section
 */
#}
<section class="hero relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
  <!-- Animation de particules en arrière-plan -->
  <div id="particles-js" class="absolute inset-0 z-0"></div>
  
  <!-- Contenu Hero -->
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
    <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 fade-in" data-aos="fade-up">
      <span class="text-gradient">Transformer Kinshasa</span><br>
      <span class="text-[var(--text-primary)]">Embellir Notre Avenir</span>
    </h1>
    <p class="text-xl md:text-2xl text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto fade-in" data-aos="fade-up" data-aos-delay="200">
      L'Agence de Gestion et d'Embellissement des Espaces Publics œuvre pour une capitale moderne, durable et accueillante.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center fade-in" data-aos="fade-up" data-aos-delay="400">
      <a href="/partnerships" class="btn btn-primary text-lg px-8 py-4">Devenez Notre Partenaire</a>
      <a href="/projects" class="btn btn-secondary text-lg px-8 py-4">Découvrir Nos Projets</a>
    </div>
  </div>
</section>
```

**Étape 2 : Créer un Bloc Personnalisé pour Projets Phares**

Créez `templates/block/block--featured-projects.html.twig` :

```twig
{#
/**
 * @file
 * Template pour le bloc Projets Phares
 */
#}
<section class="section">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="section-title text-4xl md:text-5xl font-bold mb-12 fade-in" data-aos="fade-up">Projets Phares</h2>
    <div class="swiper projects-swiper fade-in" data-aos="fade-up">
      <div class="swiper-wrapper">
        {% for project in projects %}
          <div class="swiper-slide">
            <div class="card overflow-hidden" data-tilt>
              {% if project.image %}
                <img src="{{ project.image }}" alt="{{ project.title }}" class="w-full h-64 object-cover mb-4">
              {% endif %}
              <h3 class="text-2xl font-bold mb-2">{{ project.title }}</h3>
              <p class="text-[var(--text-secondary)] mb-4">{{ project.summary }}</p>
              <a href="{{ project.url }}" class="btn btn-secondary">En savoir plus</a>
            </div>
          </div>
        {% endfor %}
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </div>
</section>
```

**Étape 3 : Créer un Module Personnalisé pour Charger les Projets**

Créez un module personnalisé (ex: `agep_blocks`) avec un hook pour précharger les projets :

```php
/**
 * Implements hook_preprocess_block().
 */
function agep_blocks_preprocess_block(&$variables) {
  if ($variables['plugin_id'] == 'featured_projects_block') {
    // Charger les projets depuis Drupal
    $projects = \Drupal::entityTypeManager()
      ->getStorage('node')
      ->loadByProperties([
        'type' => 'project',
        'status' => 1,
        'field_featured' => TRUE, // Si vous avez un champ "featured"
      ]);
    
    $variables['projects'] = [];
    foreach ($projects as $project) {
      $variables['projects'][] = [
        'title' => $project->getTitle(),
        'summary' => $project->get('field_summary')->value,
        'image' => $project->get('field_image')->entity->createFileUrl(),
        'url' => $project->toUrl()->toString(),
      ];
    }
  }
}
```

#### 🎯 Méthode 2 : Utiliser Views (Plus Flexible)

**Pour la Hero Section :**
- Créez un bloc personnalisé simple avec le HTML statique
- Placez-le dans la région `hero`
- Limitez-le à la page d'accueil uniquement

**Pour Projets Phares :**
1. Créez une **View** (`/admin/structure/views/add`)
   - **View name** : "Projets Phares"
   - **Show** : Content
   - **Type** : Block
2. Configurez la View :
   - **Filter** : Content type = "Project" (ou votre type de contenu projet)
   - **Filter** : Featured = Yes (si vous avez ce champ)
   - **Format** : Swiper/Carousel (installez le module `views_slideshow` ou utilisez un format personnalisé)
3. Créez le template `templates/views/views-view--featured-projects.html.twig`
4. Placez le bloc de la View dans la région `featured_projects`

#### 📋 Configuration dans l'Interface Drupal

1. **Aller dans Structure > Block layout** (`/admin/structure/block`)
2. **Pour la Hero Section** :
   - Trouvez la région **"Hero Section"**
   - Cliquez sur **"Place block"**
   - Sélectionnez votre bloc personnalisé ou créez-en un nouveau
   - **Configurez la visibilité** : Limitez à la page d'accueil uniquement
     - Dans "Pages", sélectionnez "Show on the listed pages"
     - Entrez : `<front>`
3. **Pour Projets Phares** :
   - Trouvez la région **"Projets Phares"**
   - Cliquez sur **"Place block"**
   - Sélectionnez votre bloc ou votre View
   - **Configurez la visibilité** : Limitez à la page d'accueil uniquement

#### 🎨 Mise à Jour du Template page.html.twig

Assurez-vous que votre `templates/page.html.twig` inclut ces régions :

```twig
<main role="main">
  {% if page.hero %}
    <div class="hero-region">
      {{ page.hero }}
    </div>
  {% endif %}
  
  {{ page.highlighted }}
  {{ page.help }}
  
  {% if page.featured_projects %}
    <div class="featured-projects-region">
      {{ page.featured_projects }}
    </div>
  {% endif %}
  
  {{ page.content }}
</main>
```

#### ✅ Résumé des Étapes

1. ✅ Ajouter les régions `hero` et `featured_projects` dans `agep_custom.info.yml`
2. ✅ Créer les templates de blocs (`templates/block/block--hero.html.twig` et `templates/block/block--featured-projects.html.twig`)
3. ✅ Créer les blocs dans l'interface Drupal ou via un module personnalisé
4. ✅ Placer les blocs dans les bonnes régions via Block layout
5. ✅ Configurer la visibilité (page d'accueil uniquement)
6. ✅ Vider le cache : `drush cache:rebuild`

### 9. Créer des Templates pour les Types de Contenu

#### `templates/node/node--article.html.twig` (pour les actualités)

```twig
{#
/**
 * @file
 * Template pour les articles/actualités
 */
#}
<article{{ attributes.addClass('card') }}>
  {% if content.field_image %}
    <div class="relative mb-4">
      {{ content.field_image }}
    </div>
  {% endif %}
  
  <time class="text-sm text-[var(--text-tertiary)]">{{ node.created.value|date('d F Y') }}</time>
  <h3{{ title_attributes.addClass('text-xl font-bold mt-2 mb-2') }}>
    {{ label }}
  </h3>
  
  <div{{ content_attributes.addClass('text-[var(--text-secondary)] mb-4') }}>
    {{ content.body }}
  </div>
  
  <a href="{{ url }}" class="text-[var(--accent-primary)] font-medium hover:underline">
    Lire plus →
  </a>
</article>
```

### 9. Créer des Blocks pour les Sections

Créez des blocks Drupal pour :
- **Hero Section** : Block personnalisé avec formulaire de configuration
- **Projets Phares** : Vue Drupal avec style Swiper
- **Actualités** : Vue Drupal des articles
- **Partenaires** : Block avec logos des partenaires
- **Footer** : Block de footer

### 10. Configuration du Menu

Dans Drupal, configurez le menu principal pour correspondre à la navigation :

```
Accueil → <front>
À Propos → /about
Projets → /projects
Actualités → /news
Galerie → /gallery
Partenariats → /partnerships
Contact → /contact
```

### 11. Créer des Types de Contenu

- **Projet** : avec champs (image, description, localisation, date, statut)
- **Article/Actualité** : avec champs (image, corps, catégorie, date)
- **Partenariat** : avec champs (logo, description, lien)

### 12. Créer des Vues Drupal

- **Vue "Projets"** : Liste des projets avec pagination
- **Vue "Actualités"** : Liste des articles avec pagination
- **Vue "Projets Phares"** : Carousel Swiper des projets en vedette

### 13. Scripts de Build (Optionnel)

Si vous utilisez Tailwind, créez un script de build dans le thème :

```json
// package.json dans le thème
{
  "scripts": {
    "build-css": "tailwindcss -i assets/css/tailwind.css -o assets/css/tailwind-compiled.css --minify",
    "watch-css": "tailwindcss -i assets/css/tailwind.css -o assets/css/tailwind-compiled.css --watch"
  }
}
```

## 🔧 Commandes Utiles

```bash
# Activer le thème
drush theme:enable agep_custom
drush config:set system.theme default agep_custom

# Vider le cache
drush cache:rebuild

# Compiler Tailwind (si nécessaire)
cd web/themes/custom/agep_custom
npm install
npm run build-css
```

## 📦 Fichiers à Copier

1. **Tous les fichiers dans `assets/`** → `web/themes/custom/agep_custom/assets/`
2. **`package.json` et `tailwind.config.js`** → `web/themes/custom/agep_custom/` (si vous utilisez Tailwind)
3. **Les logos** → `web/themes/custom/agep_custom/assets/logos/`

## ⚠️ Points d'Attention

1. **Chemins** : Tous les chemins doivent être adaptés pour Drupal
2. **Twig** : Convertir le HTML statique en templates Twig
3. **Variables** : Utiliser les variables Drupal au lieu de données statiques
4. **Formulaires** : Les formulaires doivent utiliser l'API Forms de Drupal
5. **Menu** : Utiliser le système de menu de Drupal
6. **Traduction** : Prévoir la traduction avec Drupal i18n si nécessaire
7. **JavaScript** : Les scripts utilisent `Drupal.behaviors` pour une compatibilité optimale avec Drupal
8. **Particles.js** : L'initialisation vérifie automatiquement que l'élément `#particles-js` existe avant de s'exécuter (évite les erreurs sur les pages sans Hero Section)

## 🎨 Personnalisation

- **Couleurs** : Modifier `assets/css/variables.css`
- **Styles** : Modifier `assets/css/main.css`
- **JavaScript** : Adapter `assets/js/main.js` pour Drupal.behaviors

## 📚 Ressources

- [Documentation Thèmes Drupal](https://www.drupal.org/docs/theming-drupal)
- [Twig pour Drupal](https://www.drupal.org/docs/theming-drupal/twig-in-drupal)
- [Drupal Behaviors](https://www.drupal.org/docs/drupal-apis/javascript-api/javascript-api-overview)

