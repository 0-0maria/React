import { useAuth } from "../../context/AuthContext";
import { LogOut, User } from "lucide-react";

export default function Perfil() {
  const { usuario, cerrarSesion } = useAuth();

  if (!usuario) {
    return (
      <div className="p-8 text-center text-slate-500">
        No has iniciado sesión.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-20 h-20 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center">
          <User size={40} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {usuario.nombre}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {usuario.email}
          </p>
        </div>

        <button
          onClick={cerrarSesion}
          className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-all"
        >
          <LogOut size={18} />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}