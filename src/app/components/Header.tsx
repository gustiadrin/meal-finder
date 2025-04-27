import { Search } from "lucide-react"; // Importa el ícono de búsqueda

const Header = () => {
  return (
    <header className="w-full h-16 shrink-0 sticky top-0 z-40 bg-blue-50 shadow-lg flex items-center justify-between px-4">
      {/* Logo o título (30% del espacio) */}
      <div>
        <h1 className="hidden md:block text-xl font-bold text-blue-400">
          TuLogo
        </h1>
      </div>

      {/* Buscador (70% del espacio) */}
      <div className="w-[80%] md:w-[70%] flex items-center">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Buscar recetas..."
            className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-white p-1 rounded-full hover:bg-blue-600 transition-colors">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
