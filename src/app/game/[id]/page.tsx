import { getGameDetails } from '@/services/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FavoriteButton, { SavedGame } from '@/components/FavoriteButton';

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const gameId = resolvedParams.id;

  let game;
  try {
    game = await getGameDetails(gameId);
  } catch (error) {
    // If there's an error (like 404), we show the not found page
    notFound(); 
  }

  // compact info for fav button
  const compactGameData: SavedGame = {
    id: game.id,
    name: game.name,
    background_image: game.background_image,
    rating: game.rating,
  };

  return (
    <main className="min-h-screen bg-zinc-950 pb-12">
      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[60vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10" />
        <img 
          src={game.background_image || '/placeholder.jpg'} 
          alt={game.name}
          className="w-full h-full object-cover"
        />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-8 max-w-7xl mx-auto pb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            ← Volver al catálogo
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {game.name}
          </h1>
          <div className="flex flex-wrap gap-3">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              ⭐ {game.rating}
            </span>
            <span className="bg-zinc-800 text-zinc-200 px-3 py-1 rounded-full text-sm">
              Lanzamiento: {game.released || 'TBA'}
            </span>
            <span className="bg-zinc-800 text-zinc-200 px-3 py-1 rounded-full text-sm">
              {game.playtime} horas de juego promedio
            </span>
          </div>
        </div>
      </div>

      {/* Body info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-white mb-4">Acerca de este juego</h2>
          <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
            {game.description_raw || "No hay descripción disponible para este título."}
          </p>
        </div>

        {/* side bar */}
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 h-fit">
          <h3 className="text-xl font-bold text-white mb-4">Detalles</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-zinc-500 text-sm mb-1">Plataformas</p>
              <div className="flex flex-wrap gap-2">
                {game.platforms?.map((p) => (
                  <span key={p.platform.name} className="text-zinc-300 text-sm bg-zinc-800 px-2 py-1 rounded">
                    {p.platform.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-zinc-500 text-sm mb-1">Distribuidores</p>
              <p className="text-zinc-300">
                {game.publishers?.map(p => p.name).join(', ') || 'Desconocido'}
              </p>
            </div>

            {game.website && (
              <div className="pt-4 mt-4 border-t border-zinc-800">
                <a 
                  href={game.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Visitar sitio web oficial ↗
                </a>
              </div>
            )}
            
            {/* Fav button */}
            <div className="pt-4 mt-4 border-t border-zinc-800">
              <FavoriteButton game={compactGameData} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}