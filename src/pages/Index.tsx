import { useState } from 'react';
import { Filter } from 'lucide-react';
import { products, categories } from '@/data/mockMenu';
import { Product } from '@/types';
import { useUIStore } from '@/store/useUIStore';
import { SimpleHeader } from '@/components/headers/SimpleHeader';
import { StandardCard } from '@/components/atomic/cards/StandardCard';
import { AddToCartModal } from '@/components/modals/AddToCartModal';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Suppression de cardStyle, on ne garde que la catégorie
  const [activeCategory, setActiveCategory] = useState<string>('Tous');
  
  // Récupération de la recherche depuis le store
  const { searchQuery } = useUIStore();
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAddModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // --- FONCTION DE NORMALISATION (Votre logique de recherche intelligente) ---
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()       // Minuscules
      .replace(/\s+/g, '') // Enlève tous les espaces
      .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Enlève les accents
  };

  // --- LOGIQUE DE FILTRAGE ---
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'Tous' || p.category === activeCategory;
    
    if (!searchQuery) return matchesCategory;

    const queryNorm = normalizeText(searchQuery);
    const titleNorm = normalizeText(p.title);
    const descNorm = normalizeText(p.description);

    const matchesSearch = titleNorm.includes(queryNorm) || descNorm.includes(queryNorm);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <SimpleHeader />

      <main className="container mx-auto px-4 pt-6 pb-32">
        
        <section className="mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Boucherie <span className="text-primary">Artisanale</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            De l'élevage à votre assiette. Des viandes sélectionnées, maturées avec soin et préparées par nos artisans.
          </p>
        </section>

        {/* Navigation Catégories (Sticky) */}
        <div className="sticky top-16 z-40 py-4 mb-6 bg-gray-50/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-slate-800/50 -mx-4 px-4 lg:mx-0 lg:px-4 lg:rounded-xl lg:border lg:bg-white/80 lg:dark:bg-slate-900/80 shadow-sm transition-all">
          
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            <Button
              variant={activeCategory === 'Tous' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory('Tous')}
              className="gap-1.5 rounded-full"
            >
              <Filter className="h-3.5 w-3.5" />
              Tout
            </Button>
            
            {/* On trie pour afficher "Promotions" en premier */}
            {categories.sort((a,b) => (a.id === 'Promotions' ? -1 : 1)).map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800 ${category.id === 'Promotions' ? 'border-amber-500 text-amber-600 hover:bg-amber-50' : ''}`}
              >
                {category.name}
              </Button>
            ))}
          </div>
          
          {/* J'ai supprimé ici le bloc de boutons (Grille/Liste/Rustic) */}
        </div>

        {/* Grille de Produits (Vue Standard uniquement) */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
             <StandardCard 
               key={product.id} 
               {...product} 
               onAdd={handleOpenAddModal} 
               animationDelay={index * 50} 
             />
          ))}
        </div>

        {/* État Vide (Recherche infructueuse) */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-gray-300 dark:border-slate-700">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Aucun produit ne correspond à "{searchQuery}".
            </p>
            <Button
              variant="link"
              className="mt-2 text-primary"
              onClick={() => setActiveCategory('Tous')}
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