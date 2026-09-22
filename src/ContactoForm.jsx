import React, { useState } from "react";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import FormTextArea from "./components/FormTextArea";
import FormFile from "./components/FormFile";
import paises from "./paises";
import ciudades from "./ciudades";
import Swal from "sweetalert2";

function ContactoForm() {
  const [formData, setFormData] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    genero: "",
    pais: "",
    ciudad: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });

  const [archivos, setArchivos] = useState([]);
  const [alerta, setAlerta] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileRemoved = (filename) => {
    setAlerta(`El archivo "${filename}" fue eliminado.`);
    setTimeout(() => setAlerta(""), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    const data = new FormData();

    data.append("primerNombre", formData.primerNombre);
    data.append("segundoNombre", formData.segundoNombre);
    data.append("primerApellido", formData.primerApellido);
    data.append("segundoApellido", formData.segundoApellido);
    data.append("genero", formData.genero);
    data.append("pais", formData.pais);
    data.append("ciudad", formData.ciudad);
    data.append("correo", formData.correo);
    data.append("telefono", formData.telefono);
    data.append("mensaje", formData.mensaje);

    if (archivos && archivos.length > 0) {
      archivos.forEach((file) => {
        data.append("archivo", file);
      });
    }

    try {
      const response = await fetch("https://formspree.io/f/xgaedere", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Mensaje enviado!",
          text: "Tu mensaje fue enviado correctamente",
          confirmButtonColor: "#0ea5e9",
        });
        setFormData({
          primerNombre: "",
          segundoNombre: "",
          primerApellido: "",
          segundoApellido: "",
          genero: "",
          pais: "",
          ciudad: "",
          correo: "",
          telefono: "",
          mensaje: "",
        });
        setArchivos([]);
      } else {
        const resultado = await response.json();
        const mensajeError = resultado.errors
          ? resultado.errors.map((e) => e.message).join(", ")
          : "Ocurrió un error al enviar el formulario";

        Swal.fire({
          icon: "error",
          title: "No se pudo enviar",
          text: mensajeError,
          confirmButtonColor: "#0ea5e9",
        });
      }
    } catch (error) {
      console.error("Error de red al enviar el formulario:", error);
      Swal.fire({
        icon: "error",
        title: "No se pudo enviar",
        text: "Revisa tu conexión a internet e intenta de nuevo.",
        confirmButtonColor: "#0ea5e9",
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "56rem",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        padding: "2rem",
        borderRadius: "0.75rem",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
        border: "1px solid #f1f5f9",
        fontFamily: "sans-serif",
      }}
    >
      {alerta && (
        <div
          style={{
            marginBottom: "1.5rem",
            padding: "0.75rem",
            backgroundColor: "#fffbeb",
            border: "1px solid #fde68a",
            color: "#b45309",
            fontSize: "0.875rem",
            borderRadius: "0.5rem",
          }}
        >
          {alerta}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        <FormInput
          label="Primer Nombre"
          name="primerNombre"
          value={formData.primerNombre}
          onChange={handleChange}
          placeholder="Escribe tu primer nombre"
          required
        />
        <FormInput
          label="Segundo Nombre"
          name="segundoNombre"
          value={formData.segundoNombre}
          onChange={handleChange}
          placeholder="Escribe tu segundo nombre"
        />
        <FormInput
          label="Primer Apellido"
          name="primerApellido"
          value={formData.primerApellido}
          onChange={handleChange}
          placeholder="Escribe tu primer apellido"
          required
        />
        <FormInput
          label="Segundo Apellido"
          name="segundoApellido"
          value={formData.segundoApellido}
          onChange={handleChange}
          placeholder="Escribe tu segundo apellido"
        />
        <FormSelect
          label="Género"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          required
          options={["Femenino", "Masculino", "Otro"]}
        />
        <FormSelect
          label="País"
          name="pais"
          value={formData.pais}
          onChange={handleChange}
          options={paises}
          required
        />
        <FormSelect
          label="Ciudad"
          name="ciudad"
          value={formData.ciudad}
          onChange={handleChange}
          options={ciudades}
          required
        />
        <FormInput
          label="Correo"
          name="correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          placeholder="ejemplo@correo.com"
          required
        />
        <FormInput
          label="Teléfono"
          name="telefono"
          type="tel"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="300 000 0000"
          required
        />
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <FormTextArea
          label="Mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Escribe tu mensaje..."
          required
        />
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <FormFile
          label="Adjuntar archivo"
          name="archivo"
          maxFiles={3}
          maxSizeBytes={2 * 1024 * 1024}
          onFilesChange={(files) => setArchivos(files)}
          onFileRemoved={handleFileRemoved}
          accept={{
            "application/pdf": [".pdf"],
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
          }}
        />
      </div>

      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
        <button
          type="submit"
          disabled={enviando}
          style={{
            backgroundColor: enviando ? "#9ca3af" : "#d86997",
            color: "#ffffff",
            fontWeight: "600",
            padding: "0.75rem 2rem",
            borderRadius: "0.5rem",
            border: "none",
            cursor: enviando ? "not-allowed" : "pointer",
            fontSize: "1rem",
            transition: "background-color 0.2s ease",
          }}
        >
          {enviando ? "Enviando..." : "Enviar mensaje"}
        </button>
      </div>
    </form>
  );
}

export default ContactoForm;