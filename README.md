# 🏢 Inscription Entreprise — Recherche automatique Sirene

Formulaire d'inscription professionnel qui recherche automatiquement les informations d'une entreprise française (SIRET, NAF/APE, adresse, forme juridique) via l'API officielle Sirene du gouvernement.

## ✨ Fonctionnalités

- **Recherche en temps réel** par nom d'entreprise, SIRET ou SIREN
- **Préremplissage automatique** : dénomination, SIRET, SIREN, code NAF/APE, forme juridique, adresse complète
- **Source officielle** : API Recherche d'entreprises (data.gouv.fr / INSEE)
- **Aucune clé API nécessaire** — l'API est publique et gratuite
- **100% statique** — un seul fichier HTML, aucun serveur requis
- **Responsive** — fonctionne sur mobile, tablette et desktop

## 🚀 Mettre en ligne sur GitHub Pages

### Étape 1 : Créer un dépôt GitHub

1. Connectez-vous sur [github.com](https://github.com)
2. Cliquez sur **"New repository"** (bouton vert "+" en haut à droite)
3. Nommez-le par exemple `inscription-entreprise`
4. Cochez **"Public"**
5. Cochez **"Add a README file"**
6. Cliquez sur **"Create repository"**

### Étape 2 : Ajouter le fichier

1. Dans votre dépôt, cliquez sur **"Add file"** → **"Upload files"**
2. Glissez-déposez le fichier `index.html`
3. Cliquez sur **"Commit changes"**

### Étape 3 : Activer GitHub Pages

1. Allez dans **Settings** (onglet en haut du dépôt)
2. Dans le menu de gauche, cliquez sur **Pages**
3. Sous **"Source"**, sélectionnez **"Deploy from a branch"**
4. Choisissez la branche **main** et le dossier **/ (root)**
5. Cliquez sur **Save**

### Étape 4 : Accéder à votre site

Après 1-2 minutes, votre site sera accessible à :

```
https://VOTRE-NOM-GITHUB.github.io/inscription-entreprise/
```

Remplacez `VOTRE-NOM-GITHUB` par votre nom d'utilisateur GitHub.

## 🔧 Personnalisation

### Changer le nom et le logo

Dans le fichier `index.html`, recherchez :
```html
<div class="logo-mark">EP</div>
<div class="logo-text">Espace Pro</div>
```
Remplacez par le nom de votre service.

### Changer les couleurs

Modifiez les variables CSS en haut du fichier :
```css
:root {
    --primary: #1a3a5c;     /* Couleur principale */
    --accent: #c7552e;      /* Couleur d'accent */
    --bg: #f5f2ed;          /* Fond de page */
}
```

### Ajouter un vrai backend

Le formulaire actuel est une démo frontend. Pour un vrai système d'inscription, vous pouvez connecter le bouton "Créer mon compte" à :
- **Firebase** (gratuit) — pour stocker les inscriptions
- **Supabase** (gratuit) — alternative open source
- **Formspree / Netlify Forms** — pour recevoir les données par email
- Votre propre API backend

## 📡 À propos de l'API utilisée

Ce projet utilise l'API **Recherche d'entreprises** du gouvernement français :

- **URL** : `https://recherche-entreprises.api.gouv.fr/search`
- **Documentation** : [api.gouv.fr/les-api/api-recherche-entreprises](https://api.gouv.fr/les-api/api-recherche-entreprises)
- **Gratuite**, sans inscription, sans clé API
- **Données source** : base Sirene de l'INSEE
- **Pas de limite stricte** mais un fair-use est attendu

> ⚠️ Ce n'est **pas** une IA qui "cherche sur internet". C'est un appel direct à la base de données officielle du gouvernement — c'est plus fiable, plus rapide et totalement gratuit.

## 📄 Licence

Libre d'utilisation. Adaptez-le à vos besoins.
