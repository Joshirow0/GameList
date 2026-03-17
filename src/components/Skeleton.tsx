export default function Skeleton() {
  const skeletonCards = Array.from({ length: 12 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {skeletonCards.map((_, index) => (
        <div 
          key={index} 
          className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-zinc-800 animate-pulse"
        >
          <div className="h-48 w-full bg-zinc-800/50"></div>
          <div className="p-5">
            <div className="h-6 bg-zinc-800 rounded w-3/4 mb-4"></div>
            <div className="flex justify-between items-center mt-3">
              <div className="h-4 bg-zinc-800 rounded w-1/3"></div>
              <div className="h-6 bg-zinc-800 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}