import React from "react";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";

const formatoMoneda = (valor) =>
  Number(valor).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

export default function Carrito() {
  const {
    items,
    cambiarCantidad,
    quitarDelCarrito,
    vaciarCarrito,
    enviarPedido,
    subtotal,
    valorIva,
    totalPagar,
  } = useCart();

  if (!items || items.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 px-6 py-10 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <ShoppingBag className="mx-auto text-pink-500 mb-4" size={48} />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Tu carrito está vacío
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Agrega personajes desde el catálogo para comenzar tu pedido.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 px-6 py-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Carrito de Compras
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm">
                <th className="py-3 px-2">Producto</th>
                <th className="py-3 px-2">Nombre</th>
                <th className="py-3 px-2">Precio</th>
                <th className="py-3 px-2 text-center">Cantidad</th>
                <th className="py-3 px-2">Subtotal</th>
                <th className="py-3 px-2 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {items.map((item) => {
                const precioUnitario = item.precio || item.price || 0;
                return (
                  <tr key={item.id} className="text-sm">
                    <td className="py-3 px-2">
                      <img
                        src={item.image || item.imagen}
                        alt={item.name || item.nombre}
                        className="w-12 h-12 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                      />
                    </td>
                    <td className="py-3 px-2 font-medium">
                      {item.name || item.nombre}
                    </td>
                    <td className="py-3 px-2">
                      {formatoMoneda(precioUnitario)}
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                          className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                        >
                          -
                        </button>
                        <span className="font-semibold w-6 text-center">
                          {item.cantidad}
                        </span>
                        <button
                          type="button"
                          onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                          className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-semibold">
                      {formatoMoneda(precioUnitario * item.cantidad)}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <button
                        type="button"
                        onClick={() => quitarDelCarrito(item.id)}
                        className="bg-rose-500 hover:bg-rose-600 text-white text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Resumen del pedido en contenedor responsivo de modo oscuro */}
        <div className="mt-8 bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors duration-300">
          <div className="flex flex-col items-end space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <p>
              <span className="font-semibold">Subtotal:</span>{" "}
              {formatoMoneda(subtotal)}
            </p>
            <p>
              <span className="font-semibold">IVA (19%):</span>{" "}
              {formatoMoneda(valorIva)}
            </p>
            <p className="text-xl font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-300 dark:border-slate-700">
              Total a Pagar: {formatoMoneda(totalPagar)}
            </p>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={vaciarCarrito}
              className="bg-slate-500 hover:bg-slate-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors cursor-pointer"
            >
              Vaciar Carrito
            </button>
            <button
              type="button"
              onClick={enviarPedido}
              className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors cursor-pointer"
            >
              Enviar Pedido
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}