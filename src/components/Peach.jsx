import imagenPeach from '../assets/Peach.png';

function Peach({ posicion }) {
  return (
    <img
      src={imagenPeach}
      alt="Peach"
      style={{
        width: "160px",
        height: "auto",
        position: "relative",
        left: `${posicion}px`,
        transition: "left 0.2s"
      }}
    />
  );
}

export default Peach;