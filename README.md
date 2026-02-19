# Inscription Entreprise — Sirene + TVA + OPQIBI

Formulaire d'inscription pro avec recherche automatique d'entreprise, calcul de TVA et vérification des certifications OPQIBI.

## Fonctionnalités

- **Recherche en temps réel** par nom, SIRET ou SIREN
- **Préremplissage automatique** : dénomination, SIRET, SIREN, NAF/APE, forme juridique, adresse
- **N° TVA intracommunautaire** calculé depuis le SIREN
- **Certifications OPQIBI** : détecte automatiquement si l'entreprise est certifiée et affiche ses qualifications
- 100% gratuit, aucune clé API requise

## Structure du projet

```
├── index.html                    ← Votre site (page d'inscription)
├── functions/
│   └── api/
│       └── opqibi.js             ← Proxy serverless pour interroger opqibi.com
└── README.md
```

## Déploiement (10 minutes, tout gratuit)

Cloudflare Pages héberge votre site ET exécute le proxy OPQIBI automatiquement — tout est intégré, pas de configuration séparée.

### Étape 1 — Créer le dépôt GitHub

1. Allez sur [github.com/new](https://github.com/new)
2. Nommez le dépôt (ex : `inscription-pro`)
3. Cochez **Public** puis **Create repository**
4. Cliquez **Add file → Upload files**
5. Uploadez les **3 éléments** :
   - `index.html`
   - Le **dossier** `functions/` (avec `api/opqibi.js` dedans)
   - `README.md`
6. Commit

> **Important** : la structure des dossiers doit être exacte. Le fichier `functions/api/opqibi.js` crée automatiquement la route `/api/opqibi` sur Cloudflare.

### Étape 2 — Connecter à Cloudflare Pages

1. Créez un compte gratuit sur [dash.cloudflare.com](https://dash.cloudflare.com) si besoin
2. Menu gauche → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Autorisez Cloudflare à accéder à votre GitHub
4. Sélectionnez votre dépôt `inscription-pro`
5. Configuration du build :
   - **Framework preset** : `None`
   - **Build command** : *(laisser vide)*
   - **Build output directory** : `/` (ou laisser vide)
6. Cliquez **Save and Deploy**

### Étape 3 — C'est en ligne !

Après 1-2 minutes, votre site est accessible à :

```
https://inscription-pro.pages.dev
```

(Vous pourrez ajouter votre propre nom de domaine dans les paramètres Cloudflare Pages.)

### Déploiement automatique

À chaque **push** sur GitHub, Cloudflare redéploie automatiquement votre site. Modifiez `index.html` sur GitHub → le site se met à jour en ~30 secondes.

## Comment ça marche

| Donnée | Source | Méthode |
|--------|--------|---------|
| Nom, SIRET, SIREN, NAF, adresse | API Sirene (INSEE) | Appel API direct (gratuit, sans clé) |
| N° TVA intracommunautaire | Calcul local | Formule officielle `FR + clé + SIREN` |
| Forme juridique | API Sirene | Code catégorie juridique → libellé |
| Certifications OPQIBI | opqibi.com | Proxy serverless → parsing HTML |

### Pourquoi un proxy pour OPQIBI ?

L'OPQIBI n'offre pas d'API publique. Leur site bloque les requêtes cross-origin (CORS). Le fichier `functions/api/opqibi.js` agit comme intermédiaire :

```
Navigateur → /api/opqibi?url=... → Cloudflare Function → opqibi.com → réponse HTML
```

C'est sécurisé : le proxy n'accepte que les requêtes vers `opqibi.com`.

## Personnalisation

**Logo et nom** : modifiez les éléments `<div class="lm">EP</div>` et `<div class="lt">Espace Pro</div>`

**Couleurs** : variables CSS dans `:root` — `--pri` (principal), `--acc` (accent), `--bg` (fond)

**Backend d'inscription** : le bouton "Créer mon compte" lance un `alert()` de démo. Connectez-le à Firebase, Supabase, ou votre propre API.

## Limites

- L'API Sirene est gratuite mais en fair-use (pas de limite stricte documentée)
- Cloudflare Pages Free = 100 000 requêtes Functions/jour
- Le parsing OPQIBI dépend de la structure HTML de leur site (peut casser si ils refont leur site)
- Le N° TVA est calculé mathématiquement — il est correct pour les entreprises françaises assujetties

## Licence

Libre d'utilisation et de modification.
