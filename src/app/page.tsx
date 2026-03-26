import Search from '@/components/Search';
import GameCatalog from '@/components/GameCatalog';
import Link from 'next/link';

export default async function Home( { searchParams, }: { searchParams: Promise<{ q?: string; page?: string }> }) {

  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  const currentPage = Number(resolvedParams.page) || 1;

  return (
    <main className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Catálogo de Videojuegos
        </h1>

        <div className="flex justify-between items-center mb-8">
          <Search />
          <Link 
            href="/favorites" 
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
          >
            Mis Favoritos
          </Link>
        </div>

        <GameCatalog query={query} currentPage={currentPage} />

      </div>
    </main>
  );
}
