# ✅ Checklist de Mise en Production

## 🔐 Sécurité
- [ ] AUTH_SECRET changé (32+ caractères aléatoires)
- [ ] Mot de passe admin initial changé
- [ ] Endpoint /api/seed supprimé ou protégé
- [ ] Variables d'environnement non commitées dans Git
- [ ] HTTPS actif (automatique sur Vercel)
- [ ] Headers de sécurité configurés (vercel.json)
- [ ] Rate limiting actif sur les endpoints sensibles
- [ ] Validation des entrées sur tous les formulaires

## 🗄️ Base de données
- [ ] MongoDB Atlas en mode production (pas free tier si trafic attendu)
- [ ] Index créés sur les champs de recherche
- [ ] Backups automatiques activés
- [ ] IP whitelist configurée (0.0.0.0/0 pour Vercel)
- [ ] Devises initialisées (XOF, USD, EUR)
- [ ] Catégories par défaut créées

## 🖼️ Médias
- [ ] Cloudinary configuré avec les bonnes clés
- [ ] Dossiers Cloudinary organisés (kpalime-trad/...)
- [ ] Limite de taille d'upload testée (5MB)
- [ ] Images optimisées (format auto, qualité auto)

## 💱 Devises
- [ ] Taux USD/XOF configuré
- [ ] Taux EUR/XOF configuré
- [ ] Sélecteur de devise visible dans le header
- [ ] Conversion correcte sur les produits
- [ ] Panier affiche les bons montants

## 🛍️ Marketplace
- [ ] Inscription vendeur fonctionne
- [ ] Création boutique fonctionne
- [ ] Ajout produit avec images fonctionne
- [ ] Panier fonctionne (ajout, modification, suppression)
- [ ] Checkout fonctionne
- [ ] Commande enregistrée en base
- [ ] Notification créée après commande

## 👤 Utilisateurs
- [ ] Inscription client fonctionne
- [ ] Connexion/déconnexion fonctionne
- [ ] Espace client accessible
- [ ] Historique commandes visible
- [ ] Profil modifiable

## 🛡️ Administration
- [ ] Admin peut se connecter à /admin
- [ ] Dashboard admin affiche les stats
- [ ] Gestion utilisateurs fonctionne
- [ ] Gestion boutiques fonctionne
- [ ] Gestion produits fonctionne
- [ ] Gestion commandes fonctionne
- [ ] Gestion devises fonctionne

## 🌴 Modules secondaires
- [ ] Pages tourisme accessibles
- [ ] Pages hôtels accessibles
- [ ] Pages restaurants accessibles
- [ ] Pages culture accessibles
- [ ] Pages événements accessibles
- [ ] Pages services accessibles

## 📱 PWA
- [ ] manifest.json accessible
- [ ] Service worker enregistré
- [ ] Icônes PWA présentes (192px, 512px)
- [ ] Prompt d'installation fonctionne
- [ ] Page hors ligne fonctionne

## 🔍 SEO
- [ ] sitemap.xml accessible
- [ ] robots.txt accessible
- [ ] Meta tags présents sur toutes les pages
- [ ] Open Graph configuré
- [ ] Images avec alt text
- [ ] URLs canoniques définies

## ⚡ Performance
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 90
- [ ] Lighthouse Best Practices > 90
- [ ] Lighthouse SEO > 90
- [ ] Images en WebP/AVIF
- [ ] Code splitting actif
- [ ] Pas d'erreur en console

## 📊 Monitoring
- [ ] Analytics configuré (optionnel)
- [ ] Logs d'erreur surveillés
- [ ] Alertes MongoDB Atlas configurées

## 🌐 Domaine
- [ ] Domaine personnalisé configuré (optionnel)
- [ ] DNS propagé
- [ ] SSL actif sur le domaine personnalisé
