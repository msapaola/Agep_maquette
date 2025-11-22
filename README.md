# Site Web Institutionnel AGEP

Site web institutionnel moderne et professionnel pour l'Agence de Gestion et d'Embellissement des Espaces Publics (AGEP) de Kinshasa.

## 🎯 Description

Ce site web présente l'AGEP, son histoire, ses projets, ses réalisations et offre des opportunités de partenariat. Il est conçu pour être moderne, professionnel et convaincant pour les partenaires potentiels.

## ✨ Fonctionnalités

### Mode Sombre/Clair
- Détection automatique des préférences système
- Toggle manuel dans la navigation
- Persistance du choix dans localStorage
- Adaptation automatique des logos selon le thème

### Pages Disponibles
1. **Accueil** (`index.html`) - Page d'accueil avec hero section, statistiques, projets phares, actualités et appel à partenariat
2. **À Propos** (`about.html`) - Histoire, mission, vision, valeurs, organigramme, équipe et chronologie
3. **Projets** (`projects.html`) - Galerie masonry avec filtres et modals de détails
4. **Actualités** (`news.html`) - Blog avec recherche et filtres par catégorie/date
5. **Galerie** (`gallery.html`) - Galerie Pinterest-style avec lightbox
6. **Partenariats** (`partnerships.html`) - Présentation des avantages et formulaire de demande
7. **Contact** (`contact.html`) - Formulaire de contact et carte interactive

### Animations
- Loader avec logo animé au chargement
- Animations au scroll (AOS)
- Carrousels Swiper.js
- Effets 3D sur les cards (Tilt.js)
- Compteurs animés
- Particules en arrière-plan (Particles.js)

### Responsive Design
- Mobile First
- Breakpoints : Mobile (< 640px), Tablet (640px - 1024px), Desktop (> 1024px)
- Navigation hamburger sur mobile
- Grilles adaptatives

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles personnalisés avec variables CSS
- **JavaScript Vanilla** - Interactivité
- **Tailwind CSS** - Framework CSS (installé localement)
- **AOS** - Animations au scroll
- **Swiper.js** - Carrousels et sliders
- **Particles.js** - Effets de particules
- **GLightbox** - Galerie lightbox
- **Leaflet.js** - Cartes interactives

## 📁 Structure des Fichiers

```
Maquette_AGEP/
├── index.html
├── about.html
├── projects.html
├── news.html
├── gallery.html
├── partnerships.html
├── contact.html
├── assets/
│   ├── logos/
│   │   ├── logo-anime.gif
│   │   ├── logo-blanc.webp
│   │   ├── logo-couleur.webp
│   │   └── logo-noir.webp
│   ├── css/
│   │   ├── variables.css
│   │   └── main.css
│   ├── js/
│   │   ├── main.js
│   │   ├── theme.js
│   │   ├── loader.js
│   │   ├── animations.js
│   │   └── utils.js
│   └── images/
└── README.md
```

## 🚀 Installation et Utilisation

### Prérequis
- **Node.js** (version 14 ou supérieure) et **npm**
- Un serveur web local (Apache, Nginx, ou serveur de développement)
- Navigateur moderne (Chrome, Firefox, Safari, Edge)

### Installation

1. Clonez ou téléchargez le projet
2. Installez les dépendances :
```bash
npm install
```

3. Compilez Tailwind CSS :
```bash
npm run build-css
```

4. Placez les fichiers dans le répertoire de votre serveur web
5. Ouvrez `index.html` dans votre navigateur ou accédez via votre serveur local

### Développement

Pour compiler Tailwind CSS en mode watch (recompilation automatique lors des modifications) :
```bash
npm run watch-css
```

**Note importante :** Après chaque modification des fichiers HTML, vous devez recompiler Tailwind CSS pour que les changements soient pris en compte dans le fichier `assets/css/tailwind-compiled.css`.

### Serveur de Développement Simple

Si vous avez Python installé :
```bash
python -m http.server 8000
```
Puis accédez à `http://localhost:8000`

Si vous avez Node.js installé :
```bash
npx http-server
```

## 🎨 Charte Graphique

### Couleurs Principales
- **Bleu Dominant** : #1C3AB5
- **Cyan** : #3D95C9
- **Rouge** : #E73733
- **Jaune** : #FFCA41

### Typographie
- **Cooper Hewitt** : Titres et corps de texte
- **Poppins** : Éléments modernes et CTAs
- **Great Vibes** : Citations et éléments décoratifs

## 📱 Responsive

Le site est entièrement responsive avec des breakpoints optimisés pour :
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)
- Large Desktop (> 1440px)

## 🌙 Mode Sombre/Clair

Le système de thème :
- Détecte automatiquement les préférences système
- Permet un toggle manuel via le bouton dans la navigation
- Sauvegarde le choix de l'utilisateur
- Adapte automatiquement les logos

## 📝 Commentaires

Tous les commentaires dans le code sont en français pour faciliter la maintenance par l'équipe locale.

## 🔧 Personnalisation

### Modifier les Couleurs
Éditez `assets/css/variables.css` pour changer les couleurs du thème.

### Modifier le Contenu
Chaque page HTML contient le contenu directement dans le fichier. Modifiez les fichiers HTML pour changer le contenu.

### Ajouter des Images
Placez vos images dans `assets/images/` et mettez à jour les chemins dans les fichiers HTML.

## 📄 Licence

Ce projet est développé pour l'AGEP - Agence de Gestion et d'Embellissement des Espaces Publics de Kinshasa.

## 👥 Support

Pour toute question ou support, contactez l'équipe AGEP via le formulaire de contact sur le site.

## 🎯 Fonctionnalités Futures

- Intégration d'un CMS pour la gestion du contenu
- Système de newsletter fonctionnel
- Backend pour les formulaires
- Multilingue (Français, Anglais, Lingala)
- PWA (Progressive Web App)

---

**Développé avec ❤️ pour l'AGEP Kinshasa**

