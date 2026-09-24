import { Link } from "react-router-dom";

function Navbar() {
  const linkStyle = {
    backgroundColor: "#d86997",
    color: "white",
    padding: "6px 15px",
    borderRadius: "20px",
    textDecoration: "none",
    fontWeight: "bold",
    border: "1px solid black",
    fontSize: "0.85rem",
  };

  const cellStyle = {
    borderRight: "2px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
  };

  return (
    <nav
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        width: "100%",
        height: "100%",
      }}
    >
      <div style={cellStyle}>
        <Link to="/" style={linkStyle}>
          Inicio
        </Link>
      </div>
      <div style={cellStyle}>
        <Link to="/juega" style={linkStyle}>
          Juega
        </Link>
      </div>
      <div style={cellStyle}>
        <Link to="/catalogo" style={linkStyle}>
          Catálogo
        </Link>
      </div>
      <div style={cellStyle}>
        <Link to="/aprendizaje" style={linkStyle}>
          Aprendizaje
        </Link>
      </div>
      <div style={{ ...cellStyle, borderRight: "none" }}>
        <Link to="/contactame" style={linkStyle}>
          Contáctame
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;