import { useState } from 'react';

function Aprendizaje() {
  const [calificacion, setCalificacion] = useState(0);
  const [mensaje, setMensaje] = useState("");

  const manejarCalificacion = (puntos) => {
    setCalificacion(puntos);
    setMensaje("¡Muchas gracias por calificar esta sección! Tu apoyo es muy valioso.");
  };

  return (
    <section style={{ padding: "30px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#333" }}>Mi Proceso de Aprendizaje</h2>
      
      {/* 5 puntos de aprendizaje */}
      <ol style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#444", marginBottom: "30px" }}>
        <li>He comprendido cómo estructurar aplicaciones web escalables utilizando React y su sistema de componentes.</li>
        <li>Aprendí a gestionar estados locales eficientemente aplicando Hooks avanzados como <code>useState</code>.</li>
        <li>Logré integrar navegación dinámica entre múltiples vistas utilizando React Router.</li>
        <li>Implementé la interactividad en la interfaz mediante la gestión de eventos de usuario personalizados.</li>
        <li>Consolidé buenas prácticas combinando estilos en línea y componentes modulares estructurados.</li>
      </ol>

      {/* Sección del Video */}
      <div style={{ marginBottom: "40px" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "15px", color: "#333" }}>Video del Proyecto</h3>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <iframe 
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            src="https://www.youtube.com/embed/sJyAgs1y2ao" 
            title="Proyecto final - Video" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        </div>
      </div>

      {/* Sistema de Calificación de 5 Estrellas */}
      <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px", textAlign: "center", border: "1px solid #ddd" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "15px", color: "#333" }}>Califica esta sección (1 al 5 estrellas)</h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "15px" }}>
          {[1, 2, 3, 4, 5].map((estrella) => (
            <button
              key={estrella}
              onClick={() => manejarCalificacion(estrella)}
              style={{
                background: "none",
                border: "none",
                fontSize: "2rem",
                cursor: "pointer",
                color: calificacion >= estrella ? "#facc15" : "#cbd5e1",
                transition: "transform 0.2s",
              }}
            >
              ★
            </button>
          ))}
        </div>
        {mensaje && <p style={{ color: "#16a34a", fontWeight: "bold", fontSize: "1rem" }}>{mensaje}</p>}
      </div>
    </section>
  );
}

export default Aprendizaje;