import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { X } from "lucide-react";

export default function LoginModal({ isOpen, onClose }) {
  const { iniciarSesion } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  if (!isOpen) return null;

  const onSubmit = (data) => {
    iniciarSesion({ email: data.email, nombre: data.email.split("@")[0] });
    reset();
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        padding: "16px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          padding: "24px",
          border: "1px solid #ddd",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#666",
          }}
        >
          <X size={20} />
        </button>

        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "8px" }}>
          Iniciar Sesión
        </h2>
        <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "20px" }}>
          Ingresa tus datos para acceder
        </p>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "bold", textTransform: "uppercase", marginBottom: "4px" }}>
              Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Correo inválido",
                },
              })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
            {errors.email && (
              <span style={{ fontSize: "0.75rem", color: "red", marginTop: "4px", display: "block" }}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "bold", textTransform: "uppercase", marginBottom: "4px" }}>
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
            {errors.password && (
              <span style={{ fontSize: "0.75rem", color: "red", marginTop: "4px", display: "block" }}>
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            style={{
              marginTop: "12px",
              padding: "12px",
              backgroundColor: "#d86997",
              color: "white",
              fontWeight: "bold",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}