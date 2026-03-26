"use client";

import useSWR from 'swr';
import Pagination from './Pagination';
import Link from 'next/link';
import Skeleton from './Skeleton';
import { GameResponse } from '@/types/game';

// ajax constants to fetch data
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok){
    const errorDetail = await response.text();
    console.error(`🚨 Error RAWG (${response.status}):`, errorDetail);
    throw new Error('Falló la conexión a RAWG');
  }
  return response.json();
};

interface GameCatalogProps {
  query: string;
  currentPage: number;
}

export default function GameCatalog({ query, currentPage }: GameCatalogProps) {

  if (!API_KEY) {
    return <div className="text-white text-center py-10">Falta configurar NEXT_PUBLIC_RAWG_API_KEY en .env.local</div>;
  }

  const apiUrl = `${BASE_URL}/games?key=${API_KEY}&page=${currentPage}&page_size=20${query ? `&search=${query}` : ''}`;
  
  const { data, error, isLoading } = useSWR<GameResponse>(apiUrl, fetcher, {
    dedupingInterval: 3600 * 1000, // swr cache
    keepPreviousData: true, // keep previos data while loading new data to prevent empty states
  });

  if (isLoading && !data) return <Skeleton />;

  if (error) {
    return (
      <div className="text-center py-20 text-red-400 bg-zinc-900 rounded-xl border border-red-500/50 p-6">
        <h3 className="text-xl font-bold mb-3">Error de conexión</h3>
        <p className="text-sm">No pudimos cargar los videojuegos. RAWG puede estar saturado. Intenta de nuevo más tarde.</p>
      </div>
    );
  }

  if (!data) return null; // avoid ts "data is possibly undefined"

  const games = data.results;

  if (games.length === 0) {
    return (
      <div className="text-center py-20 text-zinc-400 text-xl">
        No encontramos ningún juego llamado "{query}".
      </div>
    );
  }

  
  // if there are games, show them in a grid
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {games.map((game) => (
          <Link href={`/game/${game.id}`} key={game.id}>

          <div key={game.id} className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-zinc-800 hover:border-purple-500 transition-colors">
            
            <div className="h-48 w-full bg-zinc-800">
              {game.background_image ? (
                <img src={game.background_image} alt={`Portada de ${game.name}`} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600">Sin imagen</div>
              )}
            </div>
            
            <div className="p-5">
              <h2 className="text-xl font-bold text-zinc-100 truncate" title={game.name}>{game.name}</h2>
              <div className="flex justify-between items-center mt-3">
                <span className="text-zinc-400 text-sm">{game.released || 'TBA'}</span>
                <span className="flex items-center gap-1 text-amber-400 font-semibold bg-amber-400/10 px-2 py-1 rounded-md text-sm">
                  ⭐ {game.rating}
                </span>
              </div>
            </div>
          </div>

          </Link>
        ))}

      </div>
      
      <Pagination hasNext={!!data.next} hasPrev={!!data.previous} currentPage={currentPage} />
    </>
  );
}