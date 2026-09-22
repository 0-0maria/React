import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CharacterCard({ personaje }) {
  const { agregarAlCarrito } = useCart();

  const precioFijo = personaje.precio || (Number(personaje.id) * 3500 + 15000);

  const precioFormateado = precioFijo.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

  const personajeConPrecioFijo = {
    ...personaje,
    precio: precioFijo,
  };

  return (
    <article className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 flex flex-col justify-between p-4 transition-colors duration-300">
      <div>
        <img
          src={personaje.image || personaje.imagen}
          alt={personaje.name || personaje.nombre}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
          {personaje.name || personaje.nombre}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Especie: {personaje.species || "Desconocida"}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
        <span className="font-extrabold text-slate-900 dark:text-pink-400">
          {precioFormateado}
        </span>
        <button
          type="button"
          onClick={() => agregarAlCarrito(personajeConPrecioFijo)}
          className="p-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white transition-all active:scale-95 flex items-center justify-center cursor-pointer"
          title="Agregar al carrito"
        >
          <ShoppingCart size={18} />
        </button>
      </div>
    </article>
  );
}