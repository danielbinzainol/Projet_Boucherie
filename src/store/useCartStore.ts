import { create } from 'zustand';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  // Actions
  addToCart: (product: Product, quantity: number, totalPrice: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number, totalPrice: number) => void;
  clearCart: () => void;
  // Getters
  cartCount: () => number;
  cartTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  // Ajouter au panier (fusionne si l'article existe déjà)
  addToCart: (product, quantity, totalPrice) => set((state) => {
    const existingItem = state.items.find((item) => item.id === product.id);

    if (existingItem) {
      return {
        items: state.items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                // On additionne le nouveau prix au prix existant
                totalPrice: (item.totalPrice || 0) + totalPrice, 
              }
            : item
        ),
      };
    }
    // Nouvel article : on stocke le totalPrice passé par le modal
    return { items: [...state.items, { ...product, quantity, totalPrice }] };
  }),

  // Supprimer un article
  removeFromCart: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),

  // Mise à jour depuis le Ticket de Caisse (+/-)
  updateQuantity: (id, quantity, totalPrice) => set((state) => ({
    items: state.items.map((item) =>
      item.id === id ? { ...item, quantity, totalPrice } : item
    ),
  })),

  // Vider le panier
  clearCart: () => set({ items: [] }),

  // Compteur d'articles (nombre de lignes)
  cartCount: () => get().items.length,

  // Calcul du Total Général
  cartTotal: () => {
    const items = get().items;
    return items.reduce((total, item) => {
      // Priorité 1 : Utiliser le totalPrice stocké (calculé précisément)
      if (item.totalPrice !== undefined) {
        return total + item.totalPrice;
      }
      // Priorité 2 : Calcul de secours (Prix Unitaire x Quantité)
      // Note: on utilise bien pricePerUnit et non plus 'price'
      return total + (item.pricePerUnit * item.quantity);
    }, 0);
  },
}));