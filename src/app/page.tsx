import { Suspense } from 'react';
import Search from '@/components/Search';
import Skeleton from '@/components/Skeleton';
import GameCatalog from '@/components/GameCatalog';

export default async function Home( { searchParams, }: { searchParams: Promise<{ q?: string; page?: string }> }) {

  /* await prop needed fue to next15 or further */
  const resolvedParams = await searchParams;

  const query = resolvedParams.q || '';
  const currentPage = Number(resolvedParams.page) || 1;  
  
  const suspenseKey = `${query}-${currentPage}`;

  return (
    <main className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Catálogo de Videojuegos
        </h1>

        <Search />

        <Suspense key={suspenseKey} fallback={<Skeleton/>}>
          <GameCatalog query={query} currentPage={currentPage}></GameCatalog>
        </Suspense>

      </div>
    </main>
  );
}
