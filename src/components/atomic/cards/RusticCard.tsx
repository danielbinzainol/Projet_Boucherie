import React from 'react';
import { Plus, Award } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils'; // Updated import path
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Button } from '@/components/ui/button';

interface RusticCardProps extends Product {
  onAdd?: (product: Product) => void;
  animationDelay?: number;
}

export const RusticCard = (props: RusticCardProps) => {
  const { onAdd, animationDelay = 0, ...product } = props;

  return (
    <div
      className="group relative overflow-hidden rounded-sm bg-[#1c1917] border-2 border-[#44403c] shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 h-16 w-16 overflow-hidden z-10 pointer-events-none">
        <div className="absolute -right-8 -top-8 h-16 w-16 rotate-45 bg-primary/20" />
      </div>

      {/* Featured badge */}
      {product.featured && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1 rounded-sm bg-primary px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
          <Award className="h-3 w-3" />
          Premium
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity">
        <ImageWithFallback
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Price tag overlay */}
        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/10">
          <span className="text-lg font-bold text-white font-mono">
            {formatPrice(product.pricePerUnit)}
          </span>
          <span className="ml-1 text-xs text-gray-400">
            / {product.unitType}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-[#e7e5e4] mb-1 font-serif tracking-wide">
          {product.title}
        </h3>
        <p className="text-sm text-[#a8a29e] leading-relaxed mb-4 italic line-clamp-2">
          {product.description}
        </p>

        <Button
          onClick={() => onAdd && onAdd(product)}
          className="w-full gap-2 h-12 text-base font-semibold group/btn bg-white text-black hover:bg-gray-200 border-none rounded-sm"
          disabled={!product.inStock}
        >
          <Plus className="h-5 w-5 transition-transform group-hover/btn:rotate-90" />
          {product.inStock ? 'Choisir' : 'Épuisé'}
        </Button>
      </div>
    </div>
  );
};