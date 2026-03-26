
export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col items-center justify-center text-center">
        
        <p className="text-zinc-400 text-sm flex items-center gap-1">
          Datos e imágenes proporcionados por la API de{' '}
          <a 
            href="https://rawg.io/" 
            target="_blank" // Open in new tab
            rel="noopener noreferrer" // Security best practice for external links
            className="text-purple-500 hover:text-purple-400 font-semibold transition-colors"
          >
            RAWG Video Games Database
          </a>
        </p>
      </div>
    </footer>
  );
}