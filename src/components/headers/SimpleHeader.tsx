import React, { useEffect } from 'react';
import { ShoppingCart, Menu, Search, Beef, Sun, Moon, X, Info, Home } from 'lucide-react'; // Ajout de Home
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';
import { clientConfig } from '@/config/clientConfig';
import { CartSummaryModal } from '@/components/modals/CartSummaryModal';

export const SimpleHeader: React.FC = () => {
  const { items } = useCartStore();
  const { searchQuery, setSearchQuery, theme, toggleTheme } = useUIStore();
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const cartCount = items.length;

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            
            {/* --- LOGO --- */}
            <div className="flex items-center gap-3 shrink-0">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5 dark:text-gray-100" />
              </Button>
              
              <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Beef className="h-6 w-6" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-foreground leading-tight dark:text-white">
                    {clientConfig.shopName || "Ma Boucherie"}
                  </h1>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">
                    {clientConfig.tagline || "Qualité Artisanale"}
                  </p>
                </div>
              </Link>
            </div>

            {/* --- SEARCH --- */}
            <div className={`flex-1 max-w-md mx-auto transition-all duration-300 ${isSearchOpen ? 'absolute inset-x-4 top-2 z-50 bg-white dark:bg-slate-900 p-2 shadow-lg rounded-lg border' : 'hidden md:block'}`}>
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    type="text" 
                    placeholder="Rechercher (ex: paprika, 5kg...)" 
                    className="pl-9 h-10 bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 dark:text-white w-full rounded-full focus-visible:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {isSearchOpen && (
                    <button onClick={() => setIsSearchOpen(false)} className="absolute right-3 top-1/2 -translate-y-1/2">
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  )}
               </div>
            </div>

            {/* --- ACTIONS --- */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              
              <Button variant="ghost" size="icon" className="md:hidden text-gray-500 dark:text-gray-300" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search className="h-5 w-5" />
              </Button>

              {/* BOUTON ACCUEIL (MAISON) - Ajouté ici */}
              <Link to="/">
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800" title="Accueil">
                   <Home className="h-5 w-5" />
                </Button>
              </Link>

              {/* BOUTON À PROPOS */}
              <Link to="/about">
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800" title="Informations">
                   <Info className="h-5 w-5" />
                </Button>
              </Link>

              <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-gray-600 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-slate-800">
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              
              <Button variant="outline" size="icon" className="relative border-border dark:border-slate-700 dark:bg-slate-800 dark:text-white hover:bg-accent hover:text-accent-foreground" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm border-2 border-background animate-in zoom-in">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
      <CartSummaryModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};