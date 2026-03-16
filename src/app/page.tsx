import { getGames} from '@/services/api';

export default async function Home() {

    const data = await getGames();
    const games = data.results;

  return (
    <main className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Catálogo de Videojuegos
        </h1>

        {/* 3. La Cuadrícula (Grid) Responsiva */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <div 
              key={game.id} 
              className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-zinc-800 hover:border-purple-500 transition-colors"
            >
              {/* Contenedor de la Imagen */}
              <div className="h-48 w-full bg-zinc-800">
                <img 
                  src={game.background_image} 
                  alt={`Portada de ${game.name}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Contenedor de la Información */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-zinc-100 truncate">
                  {game.name}
                </h2>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-zinc-400 text-sm">
                    Lanzamiento: {game.released || 'TBA'}
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 font-semibold bg-amber-400/10 px-2 py-1 rounded-md text-sm">
                    ⭐ {game.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
