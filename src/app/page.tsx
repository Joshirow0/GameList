import { getGames} from '@/services/api';
import Search from '@/components/Search';
import Pagination from '@/components/Pagination';

export default async function Home( { searchParams, }: { searchParams: { q?: string; page?: string }; } ) {

  /* await prop needed fue to next15 or further */
  const resolvedParams = await searchParams;

  const query = resolvedParams.q || '';
  const currentPage = Number(resolvedParams.page) || 1;  
  
  const data = await getGames(currentPage, query);
  const games = data.results;

  return (
    <main className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Catálogo de Videojuegos
        </h1>

        <Search />

        {games.length === 0 ? (
          <div className="text-center py-20 text-zinc-400 text-xl">
            No encontramos ningún juego llamado "{query}".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <div 
                key={game.id} 
                className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-zinc-800 hover:border-purple-500 transition-colors"
              >
                <div className="h-48 w-full bg-zinc-800">
                  {game.background_image ? (
                     <img 
                       src={game.background_image} 
                       alt={`Portada de ${game.name}`} 
                       className="w-full h-full object-cover"
                     />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600">Sin imagen</div>
                  )}
                </div>
                
                <div className="p-5">
                  <h2 className="text-xl font-bold text-zinc-100 truncate" title={game.name}>
                    {game.name}
                  </h2>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-zinc-400 text-sm">
                      {game.released || 'TBA'}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400 font-semibold bg-amber-400/10 px-2 py-1 rounded-md text-sm">
                      ⭐ {game.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {games.length > 0 && (
           <Pagination 
             hasNext={!!data.next} 
             hasPrev={!!data.previous} 
             currentPage={currentPage} 
           />
        )}
      </div>
    </main>
  );
}
