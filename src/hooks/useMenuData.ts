import { useState, useEffect } from 'react';
import { Product, ProductCategory } from '@/types';
import { products, categories } from '@/data/mockMenu';

interface UseMenuDataReturn {
  products: Product[];
  categories: typeof categories;
  isLoading: boolean;
  error: Error | null;
  filterByCategory: (category: ProductCategory | 'all') => void;
  activeCategory: ProductCategory | 'all';
}

export const useMenuData = (): UseMenuDataReturn => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setFilteredProducts(products);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch menu'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterByCategory = (category: ProductCategory | 'all') => {
    setActiveCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  return {
    products: filteredProducts,
    categories,
    isLoading,
    error,
    filterByCategory,
    activeCategory,
  };
};