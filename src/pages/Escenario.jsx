import Peach from "../components/Peach";
import BotonIzquierda from "../components/BotonIzquierda";
import BotonDerecha from "../components/BotonDerecha";
import imagenFondo from "../assets/Fondo.png";

function Escenario({ posicion, setPosicion }) {

  function moverDerecha() {
    if (posicion < 600) {
      setPosicion(posicion + 15);
    }
  }

  function moverIzquierda() {
    if (posicion > -600) {
      setPosicion(posicion - 15);
    }
  }

  return (
    <div style={{ width: "100%", minHeight: "calc(100vh - 120px)", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: "80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px"
      }}>
        <BotonIzquierda mover={moverIzquierda} />
        <BotonDerecha mover={moverDerecha} />
      </div>

      <div style={{
        position: "absolute",
        bottom: "80px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2
      }}>
        <Peach posicion={posicion} />
      </div>

      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "80px",
        borderTop: "2px solid #000000",
        zIndex: 1
      }}>
        <img
          src={imagenFondo}
          alt="Fondo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block"
          }}
        />
      </div>
    </div>
  );
}

export default Escenario;