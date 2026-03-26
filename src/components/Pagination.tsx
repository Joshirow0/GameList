"use client";

import Link from 'next/dist/client/link';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
  hasNext: boolean;
  hasPrev: boolean;
  currentPage: number;
}

export default function Pagination({ hasNext, hasPrev, currentPage }: PaginationProps) {
  
  const searchParams = useSearchParams();

  // page constructor
  const getPageUrl = (newPage: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('page', newPage.toString());
    return `?${current.toString()}`;
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-12 mb-8">

      {/* Anterior Button */}
      {hasPrev ? (
        <Link 
        href={getPageUrl(currentPage - 1)}
        className="px-6 py-2 w-32 text-center bg-zinc-800 text-zinc-200 rounded-md font-medium hover:bg-zinc-700 transition-colors"
        >
          Anterior
        </Link>
      ) : (
        <span className="px-6 py-2 w-32 text-center bg-zinc-800/50 text-zinc-500 rounded-md font-medium cursor-not-allowed">
          Anterior
        </span>
      )}
      
      <span className="text-zinc-400 font-medium">
        Página {currentPage}
      </span>

      {hasNext ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-6 py-2 w-32 text-center bg-purple-600 text-white rounded-md font-medium hover:bg-purple-500 transition-colors"
        >
          Siguiente
        </Link>
      ) : (
        <span className="px-6 py-2 w-32 text-center bg-purple-600/50 text-white/50 rounded-md font-medium cursor-not-allowed">
          Siguiente
        </span>
      )}

    </div>
  );
}