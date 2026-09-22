import React from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";

export default function Inicio() {
  const tecnologias = [
    {
      nombre: "React",
      descripcion: "Biblioteca para construir interfaces de usuario.",
      imagen: reactLogo,
    },
    {
      nombre: "Vite",
      descripcion: "Herramienta moderna para desarrollar aplicaciones frontend.",
      imagen: viteLogo,
    },
    {
      nombre: "Tailwind CSS",
      descripcion: "Framework CSS basado en clases de utilidad.",
      imagen: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
    },
    {
      nombre: "React Router",
      descripcion: "Librería para gestionar la navegación de la aplicación.",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6ArWQyb5tw8JpmHcwvJ7ZqfoWP8eK5gmuNZsqeJIGQ&s=10",
    },
  ];

  const aprendizajes = [
    {
      titulo: "Componentes",
      descripcion: "Aprenderemos a dividir nuestra aplicación en componentes reutilizables.",
    },
    {
      titulo: "Navegación",
      descripcion: "Utilizaremos React Router para crear diferentes páginas dentro de nuestra aplicación.",
    },
    {
      titulo: "APIs",
      descripcion: "Aprenderemos a consumir información desde servicios externos mediante APIs.",
    },
    {
      titulo: "Tailwind CSS",
      descripcion: "Construiremos interfaces modernas utilizando clases de utilidad.",
    },
  ];

  return (
    <main className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      <section className="text-center py-16 px-5 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
          ¡Bienvenidos a React705!
        </h1>
        <p className="max-w-2xl mx-auto mb-2 text-lg text-slate-600 dark:text-slate-200">
          Un espacio creado para aprender a desarrollar aplicaciones web modernas utilizando React y Vite.
        </p>
        <p className="max-w-2xl mx-auto mb-6 text-sm text-slate-500 dark:text-slate-300">
          Durante este proyecto exploraremos componentes, navegación, consumo de APIs, estilos y diferentes herramientas del ecosistema de React.
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg text-base shadow-md transition-all active:scale-95 cursor-pointer">
          Comenzar a aprender
        </button>
      </section>

      <section className="bg-pink-500 py-12 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-white">
            Tecnologías utilizadas
          </h2>
          <p className="text-center text-pink-100 mb-10">
            Este proyecto integra diferentes tecnologías y librerías utilizadas actualmente en el desarrollo frontend.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tecnologias.map((tecnologia) => (
              <div
                key={tecnologia.nombre}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center shadow-lg border border-slate-100 dark:border-slate-700 transition-colors duration-300"
              >
                <div className="h-16 flex items-center justify-center mb-4">
                  <img
                    src={tecnologia.imagen}
                    alt={tecnologia.nombre}
                    className="max-h-12 max-w-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  {tecnologia.nombre}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {tecnologia.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 dark:bg-slate-900 py-12 px-5 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-slate-900 dark:text-white">
            ¿Qué aprenderemos?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {aprendizajes.map((item) => (
              <div
                key={item.titulo}
                className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-md border border-slate-200 dark:border-slate-700 transition-colors duration-300"
              >
                <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                  {item.titulo}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {item.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="text-center p-5 text-white text-xs bg-pink-500 font-medium">
        React705 · Aprendiendo desarrollo web moderno
      </footer>
    </main>
  );
}