"use client";

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  hasNext: boolean;
  hasPrev: boolean;
  currentPage: number;
}

export default function Pagination({ hasNext, hasPrev, currentPage }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePage = (newPage: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('page', newPage.toString());
    router.push(`/?${current.toString()}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-12 mb-8">
      <button
        onClick={() => handlePage(currentPage - 1)}
        disabled={!hasPrev}
        className="px-6 py-2 bg-zinc-800 text-zinc-200 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
      >
        Anterior
      </button>
      
      <span className="text-zinc-400 font-medium">
        Página {currentPage}
      </span>

      <button
        onClick={() => handlePage(currentPage + 1)}
        disabled={!hasNext}
        className="px-6 py-2 bg-purple-600 text-white rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-500 transition-colors"
      >
        Siguiente
      </button>
    </div>
  );
}