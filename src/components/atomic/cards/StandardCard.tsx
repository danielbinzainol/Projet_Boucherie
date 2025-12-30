import React from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils'; // Updated import path
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface StandardCardProps extends Product {
  onAdd?: (product: Product) => void;
  animationDelay?: number;
}

export const StandardCard = (props: StandardCardProps) => {
  const { onAdd, animationDelay = 0, ...product } = props;

  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <ImageWithFallback
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.featured && (
          <Badge className="absolute top-3 left-3 bg-primary text-white border-0 shadow-md">
            Vedette
          </Badge>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{product.category}</p>
            <h3 className="font-bold text-gray-900 leading-tight text-lg">
              {product.title}
            </h3>
          </div>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>
        
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
           <div>
             <p className="text-xs text-gray-400 font-medium">Prix au {product.unitType === 'kg' ? 'kilo' : 'pièce'}</p>
             <p className="text-xl font-bold text-gray-900">{formatPrice(product.pricePerUnit)}</p>
           </div>

            <Button
              onClick={() => onAdd && onAdd(product)}
              className="rounded-full h-10 w-10 p-0 bg-primary hover:bg-red-700 shadow-md hover:shadow-lg transition-all active:scale-95"
              disabled={!product.inStock}
            >
              {product.inStock ? <Plus className="h-5 w-5" /> : <span className="text-xs">X</span>}
            </Button>
        </div>
      </div>
    </div>
  );
};