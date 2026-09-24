import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import Escenario from "./pages/Escenario";
import Productos from "./pages/Productos";
import Contacto from "./Contacto";
import Carrito from "./pages/Carrito/Carrito";
import Perfil from "./pages/Perfil/Perfil";
import Aprendizaje from "./pages/Aprendizaje";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

export default function App() {
  const [posicion, setPosicion] = useState(0);

  const reiniciar = () => {
    setPosicion(0);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Layout reiniciar={reiniciar}>
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route 
                  path="/juega" 
                  element={
                    <Escenario 
                      posicion={posicion} 
                      setPosicion={setPosicion} 
                      reiniciar={reiniciar} 
                    />
                  } 
                />
                <Route path="/productos" element={<Productos />} />
                <Route path="/catalogo" element={<Productos />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/contactame" element={<Contacto />} />
                <Route path="/aprendizaje" element={<Aprendizaje />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/perfil" element={<Perfil />} />
              </Routes>
            </Layout>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}