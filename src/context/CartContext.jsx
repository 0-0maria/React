import { createContext, useContext, useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";

const CartContext = createContext(null);
const CLAVE_STORAGE = "react705_carrito";
const IVA = 0.19;

const RANGO_PRECIO = { min: 7000, max: 50000 };

function precioDeterminista(id) {
  const rango = RANGO_PRECIO.max - RANGO_PRECIO.min + 1;
  return RANGO_PRECIO.min + ((Number(id) * 2654435761) % rango);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_STORAGE);
      if (!guardado) return [];
      const cargados = JSON.parse(guardado);
      return cargados.map((item) => ({
        ...item,
        precio: item.precio || item.price || precioDeterminista(item.id),
      }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items));
  }, [items]);

  const agregarAlCarrito = useCallback((producto, cantidad = 1) => {
    const precioBase = producto.precio || producto.price || precioDeterminista(producto.id);
    const productoConPrecio = { ...producto, precio: precioBase };

    setItems((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, precio: precioBase, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { ...productoConPrecio, cantidad }];
    });

    Swal.fire({
      icon: "success",
      title: "¡Agregado!",
      text: `${producto.name || producto.nombre || "Producto"} se agregó al carrito`,
      timer: 1400,
      showConfirmButton: false,
      customClass: { popup: "rounded-2xl" },
    });
  }, []);

  const quitarDelCarrito = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const cambiarCantidad = useCallback((id, cantidad) => {
    if (cantidad < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad } : item))
    );
  }, []);

  const vaciarCarrito = useCallback(() => {
    setItems([]);
  }, []);

  const enviarPedido = useCallback(async () => {
    if (items.length === 0) return;

    const confirmacion = await Swal.fire({
      icon: "question",
      title: "¿Deseas enviar el pedido?",
      text: "Se procesará tu solicitud con los personajes seleccionados.",
      showCancelButton: true,
      confirmButtonText: "Sí, enviar",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "bg-pink-500 hover:bg-pink-600 text-white rounded-xl px-5 py-2 mx-2",
        cancelButton: "bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl px-5 py-2 mx-2",
      },
      buttonsStyling: false,
    });

    if (!confirmacion.isConfirmed) return;

    await Swal.fire({
      icon: "success",
      title: "¡Pedido Enviado!",
      text: "El carrito ha sido enviado y limpiado con éxito.",
      confirmButtonText: "Aceptar",
      customClass: { popup: "rounded-2xl" },
    });

    vaciarCarrito();
  }, [items, vaciarCarrito]);

  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
  const subtotal = items.reduce(
    (acc, item) => acc + item.cantidad * (item.precio || item.price || precioDeterminista(item.id)),
    0
  );
  const valorIva = subtotal * IVA;
  const totalPagar = subtotal + valorIva;

  return (
    <CartContext.Provider
      value={{
        items,
        carrito: items,
        agregarAlCarrito,
        quitarDelCarrito,
        eliminarDelCarrito: quitarDelCarrito,
        cambiarCantidad,
        vaciarCarrito,
        enviarPedido,
        totalItems,
        subtotal,
        valorIva,
        totalPagar,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}