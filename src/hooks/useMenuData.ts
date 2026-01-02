// src/hooks/useMenuData.ts
import { useState, useEffect } from 'react';
import { Product, Category } from '@/types';
import { products as mockProducts, categories as mockCategories } from '@/data/mockMenu';
import { client } from '@/lib/sanity'; // Import du client configuré

// --- INTERRUPTEUR ---
// Mettez à 'true' pour charger depuis Sanity
// Mettez à 'false' pour revenir au fichier mockMenu.ts
const USE_REAL_DATA = true; 

const PRODUCTS_QUERY = `*[_type == "product"] {
  _id,
  title,
  price,
  unitType,
  category,
  "imageUrl": image.asset->url, 
  inStock,
  featured,
  description
}`;

export const useMenuData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories] = useState<Category[]>(mockCategories); // Les catégories restent statiques pour l'instant

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      // 1. MODE DÉMO (Mock)
      if (!USE_REAL_DATA) {
        console.log('🚧 Mode Démo : Chargement des données locales');
        // Simulation d'un petit délai réseau pour le réalisme
        await new Promise(resolve => setTimeout(resolve, 500));
        setProducts(mockProducts);
        setLoading(false);
        return;
      }

      // 2. MODE RÉEL (Sanity)
      try {
        console.log('🌍 Mode Réel : Connexion à Sanity...');
        const sanityProducts = await client.fetch(PRODUCTS_QUERY);

        // Transformation des données Sanity vers votre format TypeScript Product
        const formattedProducts: Product[] = sanityProducts.map((p: any) => ({
          id: p._id,
          title: p.title,
          category: p.category,
          pricePerUnit: p.price,
          unitType: p.unitType || 'kg',
          // Recalcul des propriétés logiques
          step: p.unitType === 'piece' ? 1 : 0.1,
          minQuantity: p.unitType === 'piece' ? 1 : 0.1,
          weight: p.unitType === 'piece' ? 'La pièce' : 'Au poids',
          description: p.description,
          image: p.imageUrl || '/placeholder.svg', // Fallback si pas d'image
          inStock: p.inStock,
          featured: p.featured || false,
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("❌ Erreur Sanity (Retour au mode démo):", error);
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { products, categories, loading };
};