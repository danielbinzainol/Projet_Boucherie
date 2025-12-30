import React, { useState, useEffect } from 'react';
import { Minus, Plus, ShoppingCart, X } from 'lucide-react';
import { Product } from '@/types';
// Assurez-vous que ces utilitaires existent dans src/lib/utils.ts comme vu précédemment
import { formatPrice, formatWeight } from '@/lib/utils'; 
import { useCartStore } from '@/store/useCartStore';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface AddToCartModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AddToCartModal: React.FC<AddToCartModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  // On initialise à 0, la vraie valeur sera définie dans le useEffect
  const [quantity, setQuantity] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  
  const addToCart = useCartStore((state) => state.addToCart);
  const { toast } = useToast();

  // Reset de la quantité quand le produit change ou que le modal s'ouvre
  useEffect(() => {
    if (product) {
      setQuantity(product.minQuantity);
    }
  }, [product, isOpen]);

  // Fermeture propre
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  if (!product) return null;

  // Calcul du prix total dynamique
  const totalPrice = quantity * product.pricePerUnit;

  // Gestion de l'incrémentation (ex: +100g)
  const handleIncrement = () => {
    // Math.round pour éviter les erreurs de virgule flottante (0.1 + 0.2 = 0.30000004)
    setQuantity(prev => Math.round((prev + product.step) * 1000) / 1000);
  };

  // Gestion de la décrémentation
  const handleDecrement = () => {
    if (quantity > product.minQuantity) {
      setQuantity(prev => Math.round((prev - product.step) * 1000) / 1000);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);

    // Simulation d'un petit délai réseau pour l'effet UX
    setTimeout(() => {
      addToCart(product, quantity, totalPrice);
      
      // Feedback utilisateur
      toast({
        title: "Ajouté au panier",
        description: `${product.title} - ${formatWeight(quantity, product.unitType)}`,
        duration: 3000,
      });

      setIsAdding(false);
      onClose();
    }, 400);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white border-none shadow-xl">
        
        {/* Header avec Image en plein écran */}
        <div className="relative h-56 bg-gray-100">
          <ImageWithFallback
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
          {/* Dégradé pour rendre le texte lisible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="absolute bottom-0 left-0 p-6 w-full">
             <span className="px-2 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded mb-2 inline-block">
                {product.category}
             </span>
             <DialogTitle className="text-2xl font-bold text-white leading-tight">
               {product.title}
             </DialogTitle>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <DialogHeader className="sr-only">
             {/* Pour l'accessibilité, même si visuellement caché car géré au-dessus */}
             <DialogTitle>{product.title}</DialogTitle>
          </DialogHeader>

          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Sélecteur de Quantité */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center justify-between">
            <div>
               <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Prix unitaire</p>
               <p className="text-sm font-semibold text-gray-900">
                 {formatPrice(product.pricePerUnit)} <span className="text-gray-400 font-normal">/ {product.unitType === 'kg' ? 'kg' : 'pièce'}</span>
               </p>
            </div>

            <div className="flex items-center gap-3 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md hover:bg-gray-100 hover:text-primary"
                onClick={handleDecrement}
                disabled={quantity <= product.minQuantity}
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="min-w-[4rem] text-center font-bold text-lg text-gray-900 tabular-nums">
                {formatWeight(quantity, product.unitType)}
              </span>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md hover:bg-gray-100 hover:text-primary"
                onClick={handleIncrement}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Total & Action */}
          <DialogFooter className="flex-row gap-4 sm:justify-between items-center pt-2">
            <div className="flex flex-col">
               <span className="text-xs text-gray-400 font-medium uppercase">Total estimé</span>
               <span className="text-2xl font-bold text-primary animate-in fade-in slide-in-from-bottom-2">
                 {formatPrice(totalPrice)}
               </span>
            </div>

            <Button
              onClick={handleAddToCart}
              size="lg"
              className={`flex-1 h-12 text-base font-bold shadow-lg hover:shadow-xl transition-all ${
                isAdding ? 'scale-95 opacity-90' : 'hover:-translate-y-0.5'
              }`}
              disabled={isAdding}
            >
              {isAdding ? (
                  <span className="flex items-center gap-2">Ajout...</span>
              ) : (
                  <span className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Ajouter
                  </span>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};