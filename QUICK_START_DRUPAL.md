# 🚀 Quick Start - Migration vers Drupal

## Méthode Rapide (Script Automatique)

```bash
# 1. Rendre le script exécutable
chmod +x create_drupal_theme.sh

# 2. Exécuter le script
./create_drupal_theme.sh

# 3. Suivre les instructions à l'écran
```

## Méthode Manuelle

### Étape 1 : Créer la Structure

```bash
# Dans votre projet Drupal
cd web/themes/custom
mkdir agep_custom
cd agep_custom
mkdir -p templates assets
```

### Étape 2 : Copier les Fichiers

```bash
# Depuis le projet Maquette_AGEP
cp -r /chemin/vers/Maquette_AGEP/assets ./assets
cp /chemin/vers/Maquette_AGEP/package.json ./
cp /chemin/vers/Maquette_AGEP/tailwind.config.js ./
```

### Étape 3 : Créer les Fichiers de Base

Créez ces 3 fichiers essentiels :

1. **agep_custom.info.yml** (voir GUIDE_MIGRATION_DRUPAL.md)
2. **agep_custom.libraries.yml** (voir GUIDE_MIGRATION_DRUPAL.md)
3. **agep_custom.theme** (voir GUIDE_MIGRATION_DRUPAL.md)

### Étape 4 : Activer le Thème

```bash
drush theme:enable agep_custom
drush config:set system.theme default agep_custom
drush cache:rebuild
```

## 📋 Checklist de Migration

- [ ] Structure du thème créée
- [ ] Assets copiés (CSS, JS, logos)
- [ ] Fichiers .info.yml, .libraries.yml, .theme créés
- [ ] Thème activé dans Drupal
- [ ] Templates Twig créés (page.html.twig, etc.)
- [ ] Types de contenu créés (Projet, Article)
- [ ] Vues Drupal créées (Projets, Actualités)
- [ ] Menu configuré
- [ ] Chemins adaptés dans les assets

## 🔗 Fichiers de Référence

- **GUIDE_MIGRATION_DRUPAL.md** : Guide complet avec tous les détails
- **create_drupal_theme.sh** : Script automatique de migration

## ⚡ Commandes Drush Utiles

```bash
# Activer le thème
drush theme:enable agep_custom

# Définir comme thème par défaut
drush config:set system.theme default agep_custom

# Vider le cache
drush cache:rebuild

# Voir les thèmes disponibles
drush theme:list
```

## 📁 Structure Finale du Thème

```
web/themes/custom/agep_custom/
├── agep_custom.info.yml
├── agep_custom.libraries.yml
├── agep_custom.theme
├── assets/
│   ├── css/
│   ├── js/
│   └── logos/
├── templates/
│   ├── page.html.twig
│   └── node/
└── package.json (optionnel)
```

## 🎯 Points Clés

1. **Tous les assets sont déjà prêts** - Il suffit de les copier
2. **Les styles sont compilés** - Tailwind est déjà compilé
3. **JavaScript fonctionne** - Tous les scripts sont prêts
4. **Il reste à créer** : Templates Twig et configuration Drupal

## 📞 Besoin d'Aide ?

Consultez `GUIDE_MIGRATION_DRUPAL.md` pour :
- Détails complets sur chaque étape
- Exemples de templates Twig
- Configuration des types de contenu
- Création des vues Drupal

