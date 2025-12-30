// Définition des unités de vente
export type UnitType = 'kg' | 'piece';

// Définition des catégories (Doit correspondre exactement au mockMenu.ts)
export type ProductCategory = 'Bœuf' | 'Agneau' | 'Volaille' | 'Spécialité';

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  description: string;
  image: string;
  
  // Nouveaux champs pour la logique bouchère
  pricePerUnit: number;  // Prix au kg ou à la pièce
  unitType: UnitType;    // 'kg' ou 'piece'
  step: number;          // Incrément (ex: 0.100 pour 100g)
  minQuantity: number;   // Minimum commandable
  
  weight: string;        // Texte d'affichage (ex: "Au poids")
  inStock?: boolean;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;      // Quantité choisie (ex: 0.5)
  totalPrice: number;    // Prix total calculé pour cette ligne
}

export interface Category {
  id: ProductCategory;
  name: string;
  description: string;
}

export type CardStyle = 'standard' | 'list' | 'rustic';