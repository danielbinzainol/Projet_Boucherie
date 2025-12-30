import React from 'react';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/config/clientConfig';
import { Button } from '@/components/ui/button';

interface SimulatorFooterProps {
  onCheckout?: () => void;
}

export const SimulatorFooter: React.FC<SimulatorFooterProps> = ({ onCheckout }) => {
  const { items, cartTotal, cartCount } = useCartStore();
  const total = cartTotal();
  const count = cartCount();

  if (count === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="mx-auto max-w-4xl px-4 pb-4">
        <div className="glass rounded-2xl border border-border shadow-elevated p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-primary" />
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {count}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {count} {count === 1 ? 'item' : 'items'}
                </p>
                <p className="text-lg font-bold text-foreground">
                  {formatPrice(total)}
                </p>
              </div>
            </div>

            <Button
              onClick={onCheckout}
              size="lg"
              className="group gap-2 px-6 font-semibold"
            >
              Checkout
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Item previews */}
          {items.length > 0 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {items.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 rounded-lg bg-muted/50 px-3 py-1.5 text-xs"
                >
                  <span className="font-medium">{item.title}</span>
                  <span className="ml-1 text-muted-foreground">×{item.quantity}</span>
                </div>
              ))}
              {items.length > 4 && (
                <div className="flex-shrink-0 rounded-lg bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground">
                  +{items.length - 4} more
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};