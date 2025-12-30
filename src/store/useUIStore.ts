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

// --- FONCTION INTELLIGENTE ---
// Cette fonction regarde l'heure actuelle pour décider du thème
const getInitialTheme = (): 'light' | 'dark' => {
  const hour = new Date().getHours();
  // On définit la NUIT entre 19h (19) et 7h du matin (7)
  const isNight = hour >= 19 || hour < 7;
  
  return isNight ? 'dark' : 'light';
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // État initial Recherche
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      // État initial Thème : On utilise notre fonction intelligente
      theme: getInitialTheme(),

      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          
          // Applique la classe CSS immédiatement pour un changement fluide
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          
          return { theme: newTheme };
        }),
    }),
    {
      name: 'ui-preferences',
      
      // --- MODIFICATION CRUCIALE ---
      // On retourne un objet vide {} ou on sauvegarde juste la recherche.
      // On EXCLUT 'theme' pour forcer la vérification de l'heure à chaque rechargement de page.
      partialize: (state) => ({ 
        // searchQuery: state.searchQuery // Décommentez si vous voulez garder la recherche
      }), 
    }
  )
);