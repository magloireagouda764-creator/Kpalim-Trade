/**
 * Configuration des tests.
 * Installer les dépendances de test :
 * npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
 */

import { afterAll, afterEach, beforeAll } from 'vitest';

// Variables d'environnement de test
process.env.MONGODB_URI = 'mongodb://localhost:27017/kpalime-trad-test';
process.env.MONGODB_DB = 'kpalime-trad-test';
process.env.AUTH_SECRET = 'test-secret-key-for-testing-only-32chars';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';

beforeAll(() => {
  // Initialisation globale avant tous les tests
});

afterEach(() => {
  // Nettoyage après chaque test
});

afterAll(() => {
  // Nettoyage final
});
