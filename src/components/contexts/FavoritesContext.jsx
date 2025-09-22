import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * 찜목록 컨텍스트 타입
 * @typedef {Object} FavoritesContextType
 * @property {import('../types/destination.js').SeoulDestination[]} favorites - 찜목록 배열
 * @property {Function} addToFavorites - 찜목록에 추가하는 함수
 * @property {Function} removeFromFavorites - 찜목록에서 제거하는 함수
 * @property {Function} isFavorite - 찜 여부 확인하는 함수
 * @property {Function} clearFavorites - 찜목록 전체 삭제하는 함수
 */

const FavoritesContext = createContext(undefined);

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = useCallback((destination) => {
    const exists = favorites.some(fav => fav.id === destination.id);
    if (exists) {
      return false; // 이미 찜목록에 있음
    }
    
    setFavorites(prev => [...prev, { ...destination, isLiked: true }]);
    return true;
  }, [favorites]);

  const removeFromFavorites = useCallback((id) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  }, []);

  const isFavorite = useCallback((id) => {
    return favorites.some(fav => fav.id === id);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      clearFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}