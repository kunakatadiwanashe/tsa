import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface FavoritesContextType {
  favoriteIds: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
const FAVORITES_STORAGE_KEY = '@tsa/favorite-ids';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);
  const pendingToggleIds = useRef(new Set<number>());

  useEffect(() => {
    let isMounted = true;

    AsyncStorage.getItem(FAVORITES_STORAGE_KEY)
      .then((storedFavorites) => {
        let storedIds: number[] = [];

        if (storedFavorites) {
          try {
            const parsedFavorites: unknown = JSON.parse(storedFavorites);
            if (Array.isArray(parsedFavorites)) {
              storedIds = parsedFavorites.filter(
                (id): id is number => typeof id === 'number' && Number.isInteger(id)
              );
            }
          } catch (error) {
            console.error('Unable to read saved favorites.', error);
          }
        }

        if (isMounted) {
          const hydratedIds = new Set(storedIds);
          pendingToggleIds.current.forEach((id) => {
            if (hydratedIds.has(id)) {
              hydratedIds.delete(id);
            } else {
              hydratedIds.add(id);
            }
          });
          pendingToggleIds.current.clear();
          setFavoriteIds([...hydratedIds]);
          setHasHydrated(true);
        }
      })
      .catch((error) => {
        console.error('Unable to load saved favorites.', error);
        if (isMounted) {
          setHasHydrated(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds)).catch((error) => {
      console.error('Unable to save favorites.', error);
    });
  }, [favoriteIds, hasHydrated]);

  const value = useMemo(
    () => ({
      favoriteIds,
      isFavorite: (id: number) => favoriteIds.includes(id),
      toggleFavorite: (id: number) => {
        if (!hasHydrated) {
          if (pendingToggleIds.current.has(id)) {
            pendingToggleIds.current.delete(id);
          } else {
            pendingToggleIds.current.add(id);
          }
        }
        setFavoriteIds((current) =>
          current.includes(id)
            ? current.filter((favoriteId) => favoriteId !== id)
            : [...current, id]
        );
      },
    }),
    [favoriteIds, hasHydrated]
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
