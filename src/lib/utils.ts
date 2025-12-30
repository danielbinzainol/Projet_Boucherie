import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formater en Euros avec sécurité anti-bug
export const formatPrice = (price: number | undefined | null) => {
  // Sécurité : Si le prix n'est pas un nombre valide, on affiche 0,00 €
  if (price === undefined || price === null || isNaN(price)) {
    return '0,00 €'; 
  }

  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
};

// Formater le poids (ex: 0.5 -> "500g", 1.5 -> "1.5 kg")
export const formatWeight = (quantity: number, unit: 'kg' | 'piece') => {
  if (unit === 'piece') return `${quantity} pièce${quantity > 1 ? 's' : ''}`;
  
  if (quantity < 1) {
    return `${Math.round(quantity * 1000)}g`;
  }
  return `${quantity} kg`;
};