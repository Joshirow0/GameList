export default function GameDetailsLoading() {
  return (
    <main className="min-h-screen bg-zinc-950 pb-12 animate-pulse">
      {/* Placeholder HeroImage */}
      <div className="relative h-[40vh] md:h-[60vh] w-full bg-zinc-900 border-b border-zinc-800">
        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-8 max-w-7xl mx-auto pb-8">
          {/* Placeholder for title */}
          <div className="h-6 w-32 bg-zinc-800 rounded mb-6"></div>
          <div className="h-14 md:h-20 w-3/4 md:w-1/2 bg-zinc-800 rounded mb-4"></div>
          {/* Placeholder for tags */}
          <div className="flex flex-wrap gap-3">
            <div className="h-8 w-20 bg-zinc-800 rounded-full"></div>
            <div className="h-8 w-40 bg-zinc-800 rounded-full"></div>
            <div className="h-8 w-32 bg-zinc-800 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Placeholder for the main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* Placeholder for section title */}
          <div className="h-8 w-64 bg-zinc-800 rounded mb-6"></div>
          
          {/* Placeholder for description paragraphs */}
          <div className="space-y-3">
            <div className="h-4 w-full bg-zinc-800 rounded"></div>
            <div className="h-4 w-full bg-zinc-800 rounded"></div>
            <div className="h-4 w-11/12 bg-zinc-800 rounded"></div>
            <div className="h-4 w-full bg-zinc-800 rounded"></div>
            <div className="h-4 w-4/5 bg-zinc-800 rounded"></div>
          </div>
        </div>

        {/* Placeholder for the sidebar */}
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 h-fit">
          <div className="h-7 w-32 bg-zinc-800 rounded mb-6"></div>
          
          <div className="space-y-6">
            <div>
              <div className="h-4 w-24 bg-zinc-800 rounded mb-3"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-20 bg-zinc-800 rounded"></div>
                <div className="h-6 w-24 bg-zinc-800 rounded"></div>
                <div className="h-6 w-16 bg-zinc-800 rounded"></div>
              </div>
            </div>

            <div>
              <div className="h-4 w-24 bg-zinc-800 rounded mb-2"></div>
              <div className="h-5 w-40 bg-zinc-800 rounded"></div>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-800">
              <div className="h-5 w-48 bg-zinc-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}