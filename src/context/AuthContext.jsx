import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

const AuthContext = createContext();

export function AuthProvider({ children }) {


  const [usuario, setUsuario] = useState(() => {
    try {
      const guardado = localStorage.getItem("react705_usuario");
      return guardado ? JSON.parse(guardado) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (usuario) {
      localStorage.setItem("react705_usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("react705_usuario");
    }
  }, [usuario]);

 
  const iniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario);
    Swal.fire({
      icon: "success",
      title: "¡Bienvenido!",
      text: `Sesión iniciada como ${datosUsuario.nombre || datosUsuario.email}`,
      timer: 1500,
      showConfirmButton: false,
      customClass: { popup: "rounded-2xl" },
    });
  };


  const cerrarSesion = async () => {
    const confirmacion = await Swal.fire({
      icon: "question",
      title: "¿Deseas cerrar sesión?",
      text: "Tendrás que volver a ingresar tus credenciales para acceder a tu perfil.",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "bg-red-500 hover:bg-red-600 text-white rounded-xl px-5 py-2 mx-2",
        cancelButton: "bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl px-5 py-2 mx-2",
      },
      buttonsStyling: false,
    });

    if (confirmacion.isConfirmed) {
      setUsuario(null);
      Swal.fire({
        icon: "info",
        title: "Sesión cerrada",
        timer: 1300,
        showConfirmButton: false,
        customClass: { popup: "rounded-2xl" },
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        sesionActiva: !!usuario,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}