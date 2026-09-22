import { useCharacters } from "../hooks/useCharacters";
import CharacterCard from "../components/Catalogo/CharacterCard";

export default function Catalogo() {
  const { personajes, cargando, error } = useCharacters(12);

  return (
    <section className="bg-slate-50 min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900">Catálogo</h2>
        <p className="text-slate-500 mt-2">
          Personajes de Rick and Morty disponibles en la tienda
        </p>

        {cargando && (
          <p className="mt-10 text-center text-slate-400">
            Cargando personajes...
          </p>
        )}

        {error && (
          <p className="mt-10 text-center text-rose-500">{error}</p>
        )}

        {!cargando && !error && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {personajes.map((personaje) => (
              <CharacterCard key={personaje.id} personaje={personaje} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}