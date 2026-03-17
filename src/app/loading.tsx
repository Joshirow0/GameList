export default function Loading() {
  // placeholder to show while the games are being fetched
  const skeletonCards = Array.from({ length: 12 });

  return (
    <main className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* title div */}
        <div className="h-12 w-64 bg-zinc-800 rounded-md animate-pulse mb-8"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skeletonCards.map((_, index) => (
            <div 
              key={index} 
              className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-zinc-800 animate-pulse"
            >
                {/* image placeholder */}
                <div className="h-48 w-full bg-zinc-800/50"></div>
              
                {/* body placeholder */}
                <div className="p-5">
                <div className="h-6 bg-zinc-800 rounded w-3/4 mb-4"></div>
                
                {/* rating and release date placeholders */}
                <div className="flex justify-between items-center mt-3">
                  <div className="h-4 bg-zinc-800 rounded w-1/3"></div>
                  <div className="h-6 bg-zinc-800 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}