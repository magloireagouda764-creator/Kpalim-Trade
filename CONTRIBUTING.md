# 🤝 Guide de Contribution

## Structure du code

- **Composants** : `src/components/` — Un fichier par composant, nommé en PascalCase
- **Pages** : `src/app/` — Structure Next.js App Router
- **Modèles** : `src/models/` — Un fichier par modèle Mongoose
- **Services** : `src/services/` — Logique métier côté serveur
- **Lib** : `src/lib/` — Utilitaires et configurations
- **Hooks** : `src/hooks/` — Hooks React personnalisés
- **Types** : `src/types/` — Types TypeScript partagés

## Conventions

### Nommage
- Fichiers composants : `PascalCase.tsx`
- Fichiers utilitaires : `camelCase.ts`
- Fichiers de test : `*.test.ts`
- Constantes : `UPPER_SNAKE_CASE`
- Variables/fonctions : `camelCase`
- Types/interfaces : `PascalCase` avec préfixe `I` pour les interfaces Mongoose

### Commits
Format : `<type>: <description>`

Types :
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage (pas de changement logique)
- `refactor`: Refactoring
- `test`: Ajout de tests
- `chore`: Maintenance

Exemples :
