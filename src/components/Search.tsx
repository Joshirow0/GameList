"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // iniciate the searchTerm state with the 'q' parameter from the URL, or empty string if it doesn't exist
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  useEffect(() => {

    // If the search term is the same as the current URL query, do nothing (to avoid unnecessary pushes to the router that makes request to the API (usually cached, but still a request))
    const currentUrlQuery = searchParams.get('q') || '';
    if (searchTerm === currentUrlQuery) {
      return;
    }

    // delay the search action until the user stops typing
    const delayDebounceFn = setTimeout(() => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      
      if (searchTerm) {
        current.set('q', searchTerm);
      } else {
        current.delete('q');
      }
      
      current.set('page', '1'); // return to page 1 on new search

      // add the query to the URL
      const query = current.toString();

      window.dispatchEvent(new Event('start-loading'));
      router.push(query ? `/?${query}` : '/');
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, router, searchParams]);

  return (
    <div className="mb-8 max-w-md mx-auto sm:mx-0">
      <input
        type="text"
        placeholder="Buscar juegos ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
      />
    </div>
  );
}