import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  // Recherche
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Thème
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // État initial Recherche
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      // État initial Thème (défaut: light)
      theme: 'light',
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          // Applique la classe CSS au document HTML immédiatement
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { theme: newTheme };
        }),
    }),
    {
      name: 'ui-preferences', // Pour sauvegarder le thème dans le navigateur
      partialize: (state) => ({ theme: state.theme }), // On ne sauvegarde que le thème, pas la recherche
    }
  )
);