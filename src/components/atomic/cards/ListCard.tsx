import React from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils'; // Updated import path
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ListCardProps extends Product {
  onAdd?: (product: Product) => void; // Standardized prop name
  animationDelay?: number;
}

export const ListCard = (props: ListCardProps) => {
  const { onAdd, animationDelay = 0, ...product } = props;

  return (
    <div
      className="group flex gap-4 rounded-xl bg-white border border-gray-100 p-3 shadow-sm transition-all duration-300 hover:shadow-md"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Image */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <ImageWithFallback
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.featured && (
          <Badge className="absolute -top-1 -left-1 h-5 px-1.5 text-[10px] bg-yellow-400 text-yellow-950 border-0 shadow-sm">
            ★
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 leading-tight truncate">
              {product.title}
            </h3>
            <span className="text-base font-bold text-primary whitespace-nowrap">
              {formatPrice(product.pricePerUnit)}
              <span className="text-xs font-normal text-gray-400 ml-0.5">/{product.unitType}</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{product.weight}</p>
          <p className="mt-1 text-xs text-gray-400 line-clamp-1">
            {product.description}
          </p>
        </div>

        <Button
          onClick={() => onAdd && onAdd(product)}
          size="sm"
          className="mt-2 w-full gap-1.5 bg-primary hover:bg-red-700 text-white"
          disabled={!product.inStock}
        >
          {product.inStock ? (
            <>
              <Plus className="h-3.5 w-3.5" />
              Ajouter
            </>
          ) : (
            'Rupture'
          )}
        </Button>
      </div>
    </div>
  );
};