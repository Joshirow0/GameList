"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Game } from "@/types/game";

export default function FavoritesPage() {

    const [favorites, setFavorites] = useState<Game[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('catalogo_favoritos');
        if (saved) {
        setFavorites(JSON.parse(saved));
        }
        setIsLoaded(true);
    }, []);

    if (!isLoaded) {
        return (
            <main className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto animate-pulse">
                <div className="h-12 w-64 bg-zinc-800 rounded mb-8"></div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
        
            {/* Cabecera con botón de regreso */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                    Mis Favoritos
                </h1>
                <Link 
                    href="/" 
                    className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                >
                    ← Volver al catálogo
                </Link>
            </div>

            {favorites.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg">
                    <span className="text-6xl mb-4 block">🎮</span>
                    <h2 className="text-2xl font-bold text-white mb-2">Tu colección está vacía</h2>
                    <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                        Aún no has guardado ningún juego. Explora el catálogo y usa el botón de favoritos para armar tu lista.
                    </p>
                    <Link 
                    href="/" 
                    className="inline-block px-6 py-3 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-500 transition-colors"
                    >
                        Explorar juegos
                    </Link>
                </div>
        ) : (
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites.map((game) => (
                    <Link href={`/game/${game.id}`} key={game.id}>
                        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-zinc-800 hover:border-red-500 transition-colors h-full cursor-pointer">
                        <div className="h-48 w-full bg-zinc-800 relative">
                            
                            {game.background_image ? (
                            <img src={game.background_image} alt={`Portada de ${game.name}`} className="w-full h-full object-cover" />
                            ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600">Sin imagen</div>
                            )}
                        </div>
                        <div className="p-5">
                            <h2 className="text-xl font-bold text-zinc-100 truncate" title={game.name}>{game.name}</h2>
                            <div className="flex justify-between items-center mt-3">
                            <span className="flex items-center gap-1 text-amber-400 font-semibold bg-amber-400/10 px-2 py-1 rounded-md text-sm">
                                ⭐ {game.rating}
                            </span>
                            </div>
                        </div>
                        </div>
                    </Link>
                    ))}
                </div>
            </>
        )}
        </div>
        </main>
    );

}



