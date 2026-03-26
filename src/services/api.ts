import { GameResponse, GameDetails } from '@/types/game';

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

// Fetch games with pagination and optional search query in main page
export const getGames = async (page = 1, search = ''): Promise<GameResponse> => {
  
  // URL object to build the request
  const url = new URL(`${BASE_URL}/games`);
  url.searchParams.append('key', API_KEY as string);
  url.searchParams.append('page', page.toString());
  
  // request optimization: just 20 games per page
  url.searchParams.append('page_size', '20'); 

  if (search) {
    url.searchParams.append('search', search);
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 3000));                       
                                   // optimization: next cache (3600s = 1h)
    const response = await fetch(url.toString(), {next: { revalidate: 3600 } });

    // Validate response status
    if (!response.ok) {
      throw new Error(`Error de RAWG: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error("Hubo un problema al contactar a la API:", error);
    throw error; 
  }
};

// Fetch detailed game info for the details page
export const getGameDetails = async (id: string): Promise<GameDetails> => {
  const url = new URL(`${BASE_URL}/games/${id}`);
  url.searchParams.append('key', API_KEY as string);

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 } // next cache
    });

    if (!response.ok) {
      if (response.status === 404) throw new Error("Juego no encontrado");
      throw new Error(`Error de RAWG: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error al obtener detalles del juego ${id}:`, error);
    throw error;
  }
};