"use client"; // Use nav features

import { useState, useEffect } from 'react';

interface SavedGame {
  id: number;
  name: string;
  background_image: string | null;
  rating: number;
}

export default function FavoriteButton({ game }: { game: SavedGame }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('catalogo_favoritos');
    if (savedFavorites) {
      const favorites: SavedGame[] = JSON.parse(savedFavorites);
      const exists = favorites.some((fav) => fav.id === game.id);
      setIsFavorite(exists);
    }
    setIsLoaded(true);
  }, [game.id]);

  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem('catalogo_favoritos');
    let favorites: SavedGame[] = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.id !== game.id);
    } else {
      favorites.push(game);
    }

    localStorage.setItem('catalogo_favoritos', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  if (!isLoaded) {
    return <div className="h-12 w-full bg-zinc-800 rounded-lg animate-pulse mt-6"></div>;
  }

  return (
    <button
      onClick={toggleFavorite}
      className={`w-full mt-6 py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
        isFavorite 
          ? 'bg-red-500/10 text-red-500 border border-red-500 hover:bg-red-500/20' 
          : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-transparent'
      }`}
    >
      {isFavorite ? '❤️ Quitar de Favoritos' : '🤍 Guardar en Favoritos'}
    </button>
  );
}