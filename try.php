{#
/**
 * @file
 * Template pour la région de navigation
 * Cette région contient le menu principal, le logo, et les boutons de contrôle
 *
 * Variables disponibles:
 * - content: Le contenu de la région (blocs)
 * - attributes: Attributs HTML pour la région
 */
#}

<nav class="navbar fixed top-0 left-0 right-0 z-[1000] bg-[var(--bg-primary)] shadow-[var(--shadow-md)] transition-all duration-300">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-24">
      <a href="{{ path('<front>') }}" class="flex items-center">
        <img src="{{ base_path }}{{ directory }}/assets/logos/logo-couleur.webp" alt="Logo AGEP" class="nav-logo h-24 w-auto">
      </a>
      
      {# Contenu de la région (menu principal) #}
      {{ content }}
      
      {# Toggle Thème et Menu Mobile #}
      <div class="flex items-center space-x-4">
        {# Bouton Toggle Thème #}
        <button class="theme-toggle" aria-label="{{ 'Basculer entre mode clair et sombre'|t }}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd"/>
          </svg>
        </button>
        
        {# Bouton Menu Mobile #}
        <button class="nav-toggle lg:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5" aria-label="{{ 'Menu'|t }}">
          <span class="block w-6 h-0.5 bg-[var(--text-primary)] transition-all"></span>
          <span class="block w-6 h-0.5 bg-[var(--text-primary)] transition-all"></span>
          <span class="block w-6 h-0.5 bg-[var(--text-primary)] transition-all"></span>
        </button>
      </div>
    </div>

    <!-- Menu Mobile -->
    <div class="nav-menu hidden lg:hidden pb-4">
                <div class="flex flex-col space-y-4 mt-4">
                    <a href="index.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium py-2 active">Accueil</a>
                    <a href="about.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium py-2">À Propos</a>
                    <a href="projects.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium py-2">Projets</a>
                    <a href="news.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium py-2">Actualités</a>
                    <a href="gallery.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium py-2">Galerie</a>
                    <a href="partnerships.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium py-2">Partenariats</a>
                    <a href="contact.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium py-2">Contact</a>
                </div>
            </div>
  </div>
</nav>


<!-- === NAVIGATION === -->
<nav class="navbar fixed top-0 left-0 right-0 z-[1000] bg-[var(--bg-primary)] shadow-[var(--shadow-md)] transition-all duration-300">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-24">
                <!-- Logo -->
                <a href="index.html" class="flex items-center">
                    <img src="assets/logos/logo-couleur.webp" alt="Logo AGEP" class="nav-logo h-24 w-auto">
                </a>
                
                <!-- Menu Desktop -->
                <div class="hidden lg:flex items-center space-x-8">
                    <a href="index.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium transition-colors active">Accueil</a>
                    <a href="about.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium transition-colors">À Propos</a>
                    <a href="projects.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium transition-colors">Projets</a>
                    <a href="news.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium transition-colors">Actualités</a>
                    <a href="gallery.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium transition-colors">Galerie</a>
                    <a href="partnerships.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium transition-colors">Partenariats</a>
                    <a href="contact.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium transition-colors">Contact</a>
                </div>
                
                <!-- Toggle Thème et Menu Mobile -->
                <div class="flex items-center space-x-4">
                    <!-- Bouton Toggle Thème -->
                    <button class="theme-toggle" aria-label="Basculer entre mode clair et sombre">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                    
                    <!-- Bouton Menu Mobile -->
                    <button class="nav-toggle lg:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5" aria-label="Menu">
                        <span class="block w-6 h-0.5 bg-[var(--text-primary)] transition-all"></span>
                        <span class="block w-6 h-0.5 bg-[var(--text-primary)] transition-all"></span>
                        <span class="block w-6 h-0.5 bg-[var(--text-primary)] transition-all"></span>
                    </button>
                </div>
            </div>
            
            <!-- Menu Mobile -->
            <div class="nav-menu hidden lg:hidden pb-4">
                <div class="flex flex-col space-y-4 mt-4">
                    <a href="index.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium py-2 active">Accueil</a>
                    <a href="about.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium py-2">À Propos</a>
                    <a href="projects.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium py-2">Projets</a>
                    <a href="news.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium py-2">Actualités</a>
                    <a href="gallery.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium py-2">Galerie</a>
                    <a href="partnerships.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium py-2">Partenariats</a>
                    <a href="contact.html" class="nav-link text-[var(--text-primary)] hover:text-[var(--accent-primary)] font-medium py-2">Contact</a>
                </div>
            </div>
        </div>
    </nav>

