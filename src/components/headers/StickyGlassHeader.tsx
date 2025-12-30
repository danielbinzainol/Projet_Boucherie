import React from 'react';
import { ShoppingCart, Menu, Beef } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { clientConfig } from '@/config/clientConfig';
import { Button } from '@/components/ui/button';

interface StickyGlassHeaderProps {
  onCartClick?: () => void;
  onMenuClick?: () => void;
}

export const StickyGlassHeader: React.FC<StickyGlassHeaderProps> = ({
  onCartClick,
  onMenuClick,
}) => {
  const { cartCount } = useCartStore();
  const count = cartCount();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Beef className="h-6 w-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground leading-tight">
                {clientConfig.shopName}
              </h1>
              <p className="text-xs text-muted-foreground">
                {clientConfig.tagline}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-scale-in">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};