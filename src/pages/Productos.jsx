import { useCharacters } from "../hooks/useCharacters";
import CharacterCard from "../components/Catalogo/CharacterCard";

function Productos() {
  const { personajes, cargando, error, pagina, totalPaginas, paginaSiguiente, paginaAnterior } = useCharacters(12);

  return (
    <section className="bg-slate-50 dark:bg-slate-900 min-h-screen px-6 py-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Catálogo</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Personajes de Rick and Morty disponibles en la tienda
        </p>

        {cargando && <p className="mt-10 text-center text-slate-400">Cargando personajes...</p>}
        {error && <p className="mt-10 text-center text-rose-500">{error}</p>}

        {!cargando && !error && (
          <>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {personajes.map((personaje) => (
                <CharacterCard key={personaje.id} personaje={personaje} />
              ))}
            </div>

            {totalPaginas > 1 && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <button
                  onClick={paginaAnterior}
                  disabled={pagina === 1}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  Anterior
                </button>
                <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                  Página {pagina} de {totalPaginas}
                </span>
                <button
                  onClick={paginaSiguiente}
                  disabled={pagina === totalPaginas}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Productos;