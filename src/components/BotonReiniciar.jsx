export default function Reiniciar({ mover }) {
  return (
    <button
      onClick={mover}
      title="Reiniciar posición"
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        backgroundColor: "#d86997",
        border: "2px solid #000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: "14px",
        cursor: "pointer",
        padding: 0
      }}
    >
      ⇆
    </button>
  );
}