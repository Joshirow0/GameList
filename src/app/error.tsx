"use client";

import { useEffect } from "react";

export default function Error({ error, reset, }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  
  useEffect(() => {
    console.error("Error atrapado por Next.js:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="bg-zinc-900 p-8 rounded-xl border border-red-500/50 text-center max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-red-400 mb-4">¡Fallo de Conexión!</h2>
        
        <p className="text-zinc-400 mb-6">
          No pudimos establecer comunicación con los servidores de RAWG.
        </p>

        {/* show the error message */}
        <div className="bg-zinc-950 text-red-300 p-3 rounded-md text-sm mb-8 font-mono break-words">
          {error.message}
        </div>

        {/* reset() function to retry loading */}
        <button
          onClick={() => reset()}
          className="bg-zinc-900 hover:bg-zinc-700 border border-white-500 text-white font-bold py-2 px-6 rounded-lg transition-colors w-full"
        >
          Intentar de nuevo
        </button>
      </div>
    </main>
  );
}
