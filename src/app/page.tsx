// Remplace le tableau CATEGORIES en haut du fichier par :
import { MARKETPLACE_CATEGORIES } from '@/lib/marketplace-categories';

// Puis dans le JSX, remplace la section "Que recherchez-vous ?" par :
<section className="relative py-16 md:py-20">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-3">
        <Search size={16} />
        Marketplace Kpalimé-Trade
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
        Que recherchez-vous ?
      </h2>
      <p className="text-muted max-w-2xl mx-auto">
        Explorez nos catégories de produits — du local à l'international
      </p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {MARKETPLACE_CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        return (
          <Link
            key={cat.id}
            href={`/marketplace/categories/${cat.slug}`}
            prefetch
            className={`group relative overflow-hidden rounded-md border border-white/10 bg-gradient-to-br ${cat.color} p-5 hover:border-emerald-brand/50 hover:-translate-y-1 transition-all duration-300 touch-target`}
          >
            <div className="relative z-10 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-md bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-emerald-brand group-hover:scale-110 transition-all duration-300">
                <Icon size={24} className="text-white" />
              </div>
              <span className="text-white font-semibold text-sm">
                {cat.name}
              </span>
            </div>
            <div className="absolute inset-0 bg-emerald-brand/0 group-hover:bg-emerald-brand/10 transition-all duration-300" />
          </Link>
        );
      })}
    </div>

    <div className="text-center mt-8">
      <Link
        href="/marketplace"
        prefetch
        className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-emerald-brand text-white font-semibold hover:bg-emerald-light transition-all"
      >
        Voir tout le marketplace
        <ArrowRight size={16} />
      </Link>
    </div>
  </div>
</section>