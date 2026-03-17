import { GameResponse } from '@/types/game';

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

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