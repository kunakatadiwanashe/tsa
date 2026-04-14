import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface FavoritesContextType {
  favoriteIds: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const value = useMemo(
    () => ({
      favoriteIds,
      isFavorite: (id: number) => favoriteIds.includes(id),
      toggleFavorite: (id: number) => {
        setFavoriteIds((current) =>
          current.includes(id)
            ? current.filter((favoriteId) => favoriteId !== id)
            : [...current, id]
        );
      },
    }),
    [favoriteIds]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return context;
}
