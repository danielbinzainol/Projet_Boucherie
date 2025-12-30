import { useState, useRef } from 'react';
import { Filter } from 'lucide-react';
import { products, categories } from '@/data/mockMenu';
import { Product } from '@/types';
import { useUIStore } from '@/store/useUIStore';
import { SimpleHeader } from '@/components/headers/SimpleHeader';
import { StandardCard } from '@/components/atomic/cards/StandardCard';
import { AddToCartModal } from '@/components/modals/AddToCartModal';
import { Button } from '@/components/ui/button';
import { useShopStatus } from '@/hooks/useShopStatus';
// On garde motion juste pour l'apparition douce des cartes
import { motion } from 'framer-motion';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Tous');
  const { searchQuery } = useUIStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOpen, message } = useShopStatus();

  // On cible maintenant spécifiquement la GRILLE des produits
  const productsGridRef = useRef<HTMLDivElement>(null);

  // --- LOGIQUE DE SCROLL "GLIDE" ---
  const handleCategoryClick = (categoryId: string) => {
    // 1. Changement de catégorie
    setActiveCategory(categoryId);

    // 2. Le Scroll "Glide" vers le début des cartes
    if (productsGridRef.current) {
      // Calcul précis :
      // On veut que le haut de la grille arrive sous le Header et les Filtres (qui sont sticky)
      // Header (64px) + Filtres (~60px) + Marge (~20px) = ~140-150px
      const stickyOffset = 150; 
      
      const elementPosition = productsGridRef.current.offsetTop;
      const offsetPosition = elementPosition - stickyOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth' // C'est ici que se fait le "glide"
      });
    }
  };

  const handleOpenAddModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const normalizeText = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'Tous' || p.category === activeCategory;
    if (!searchQuery) return matchesCategory;

    const queryNorm = normalizeText(searchQuery);
    const titleNorm = normalizeText(p.title);
    const descNorm = normalizeText(p.description);
    return matchesCategory && (titleNorm.includes(queryNorm) || descNorm.includes(queryNorm));
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <SimpleHeader />

      <main className="container mx-auto px-4 pt-6 pb-32">
        
        {/* Section Héro */}
        <section className="mb-6 text-center animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Boucherie <span className="text-primary">Artisanale</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            De l'élevage à votre assiette. Des viandes sélectionnées, maturées avec soin et préparées par nos artisans.
          </p>

          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm ${
            isOpen 
              ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400' 
              : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
          }`}>
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </span>
            <span className="text-sm font-semibold">{message}</span>
          </div>
        </section>

        {/* Navigation Catégories Sticky */}
        <div 
          className="sticky top-16 z-40 py-4 mb-6 bg-gray-50/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-slate-800/50 -mx-4 px-4 lg:mx-0 lg:px-4 lg:rounded-xl lg:border lg:bg-white/80 lg:dark:bg-slate-900/80 shadow-sm transition-all"
        >
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            <button
              onClick={() => handleCategoryClick('Tous')}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                activeCategory === 'Tous' 
                  ? 'bg-primary text-white shadow-md transform scale-105' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="relative flex items-center gap-1.5 z-10">
                <Filter className="h-3.5 w-3.5" /> Tout
              </span>
            </button>
            
            {categories.sort((a,b) => (a.id === 'Promotions' ? -1 : 1)).map((category) => {
              const isActive = activeCategory === category.id;
              const isPromo = category.id === 'Promotions';
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive 
                      ? (isPromo ? 'bg-amber-500 text-white shadow-md transform scale-105' : 'bg-primary text-white shadow-md transform scale-105') 
                      : (isPromo ? 'text-amber-600 border border-amber-200 bg-amber-50 hover:bg-amber-100' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800')
                  }`}
                >
                  <span className="relative z-10">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- GRILLE DE PRODUITS CIBLÉE --- */}
        {/* On attache la référence ici pour savoir où scroller */}
        <div 
          ref={productsGridRef} 
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-[50vh]"
        >
          {filteredProducts.map((product, index) => (
             <motion.div
               key={product.id}
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.3, delay: index * 0.03 }}
             >
               <StandardCard 
                 {...product} 
                 onAdd={handleOpenAddModal} 
                 animationDelay={0} 
               />
             </motion.div>
          ))}
        </div>

        {/* État Vide */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-gray-300 dark:border-slate-700 animate-in fade-in zoom-in duration-300">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Aucun produit ne correspond à "{searchQuery}".
            </p>
            <Button
              variant="link"
              className="mt-2 text-primary"
              onClick={() => handleCategoryClick('Tous')}
            >
              Voir tous les produits
            </Button>
          </div>
        )}
      </main>

      <AddToCartModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;