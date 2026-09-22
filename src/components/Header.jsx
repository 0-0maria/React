import { useState } from "react";
import { Link } from "react-router-dom";
import { User, ShoppingCart, Sun, Moon } from "lucide-react";
import Navbar from "./Navbar";
import BotonReiniciar from "./BotonReiniciar";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import LoginModal from "./Auth/LoginModal";

function Header({ reiniciar }) {
  const { sesionActiva, usuario } = useAuth();
  const { totalItems } = useCart();
  const { tema, cambiarTema } = useTheme();
  const [mostrarModalLogin, setMostrarModalLogin] = useState(false);

  return (
    <>
      <header style={{ width: "100%" }}>
        <div
          style={{
            backgroundColor: "#d86997",
            color: "white",
            textAlign: "center",
            padding: "10px",
            fontWeight: "bold",
            fontSize: "1.2rem",
            fontStyle: "italic",
          }}
        >
          Carrera con Summer Smith
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "80px 180px 1fr",
            borderTop: "2px solid black",
            borderBottom: "2px solid black",
            alignItems: "stretch",
            backgroundColor: "white",
            minHeight: "65px",
          }}
        >
          <div
            style={{
              borderRight: "2px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <BotonReiniciar mover={reiniciar} />
          </div>

          <div
            style={{
              borderRight: "2px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px",
              gap: "12px",
            }}
          >
            <button
              type="button"
              onClick={cambiarTema}
              title={tema === "claro" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                color: "#333",
              }}
            >
              {tema === "claro" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <Link
              to="/carrito"
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#333",
                textDecoration: "none",
              }}
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: "#d86997",
                    color: "white",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {sesionActiva ? (
              <Link
                to="/perfil"
                title={`Perfil de ${usuario?.nombre || ""}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#d86997",
                  color: "white",
                  padding: "6px",
                  borderRadius: "50%",
                  border: "1px solid black",
                  textDecoration: "none",
                }}
              >
                <User size={18} />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setMostrarModalLogin(true)}
                style={{
                  backgroundColor: "#d86997",
                  color: "white",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                  border: "1px solid black",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                Log in
              </button>
            )}
          </div>

          <Navbar />
        </div>
      </header>

      <LoginModal
        isOpen={mostrarModalLogin}
        onClose={() => setMostrarModalLogin(false)}
      />
    </>
  );
}

export default Header;