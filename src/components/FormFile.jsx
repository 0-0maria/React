import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";

function FormFile({
    label,
    name,
    required = false,
    error = "",
    accept = { "application/pdf": [".pdf"] },
    maxSizeMB = 2,
    maxSizeBytes,
    maxFiles = 3,
    onFilesChange,
    onFileRemoved,
}) {
    const limiteMB = maxSizeBytes ? maxSizeBytes / (1024 * 1024) : maxSizeMB;
    const [errorMsg, setErrorMsg] = useState("");
    const [archivos, setArchivos] = useState([]);
    const [mensajeEliminado, setMensajeEliminado] = useState("");

    const generarId = (file) => `${file.name}-${file.lastModified}-${file.size}`;
    const limiteAlcanzado = archivos.length >= maxFiles;

    useEffect(() => {
        return () => {
            archivos.forEach((a) => {
                if (a.preview) URL.revokeObjectURL(a.preview);
            });
        };
    }, []);

    useEffect(() => {
        if (mensajeEliminado) {
            const timer = setTimeout(() => {
                setMensajeEliminado("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [mensajeEliminado]);

    const onDrop = (acceptedFiles, rejectedFiles) => {
        setErrorMsg("");

        if (acceptedFiles.length > 0) {
            const espacioDisponible = maxFiles - archivos.length;

            if (espacioDisponible <= 0) {
                setErrorMsg(`Ya alcanzaste el máximo de ${maxFiles} archivos`);
            } else {
                const nuevosArchivos = acceptedFiles
                    .slice(0, espacioDisponible)
                    .map((file) => ({
                        id: generarId(file),
                        file,
                        preview: file.type.startsWith("image/")
                            ? URL.createObjectURL(file)
                            : null,
                    }));

                const listaActualizada = [...archivos, ...nuevosArchivos];
                setArchivos(listaActualizada);

                if (onFilesChange) {
                    onFilesChange(listaActualizada.map((item) => item.file));
                }

                if (acceptedFiles.length > espacioDisponible) {
                    setErrorMsg(
                        `Solo se agregaron ${espacioDisponible} archivo(s). Máximo ${maxFiles} en total.`
                    );
                }
            }
        }

        if (rejectedFiles.length > 0) {
            const primerError = rejectedFiles[0].errors[0];
            if (primerError.code === "file-too-large") {
                setErrorMsg(`El archivo supera el tamaño máximo de ${limiteMB}MB`);
            } else if (primerError.code === "file-invalid-type") {
                setErrorMsg("Tipo de archivo no permitido");
            } else if (primerError.code === "too-many-files") {
                setErrorMsg(`Ya alcanzaste el máximo de ${maxFiles} archivos`);
            } else {
                setErrorMsg(primerError.message);
            }
        }
    };

    const eliminarArchivo = (id) => {
        let nombreEliminado = "";

        setArchivos((anteriores) => {
            const archivoAEliminar = anteriores.find((arch) => arch.id === id);
            if (archivoAEliminar) {
                nombreEliminado = archivoAEliminar.file.name;
                if (archivoAEliminar.preview) {
                    URL.revokeObjectURL(archivoAEliminar.preview);
                }
            }
            const listaFiltrada = anteriores.filter((arch) => arch.id !== id);

            if (onFilesChange) {
                onFilesChange(listaFiltrada.map((item) => item.file));
            }

            return listaFiltrada;
        });

        if (onFileRemoved && nombreEliminado) {
            onFileRemoved(nombreEliminado);
        }

        setMensajeEliminado("Archivo eliminado correctamente");
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
        maxFiles: maxFiles,
        maxSize: limiteMB * 1024 * 1024,
        accept,
        disabled: limiteAlcanzado,
    });

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontFamily: "sans-serif" }}>
            <label
                htmlFor={name}
                style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "600", color: "#374151" }}
            >
                {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
            </label>

            <div
                {...getRootProps()}
                style={{
                    width: "100%",
                    borderRadius: "12px",
                    border: limiteAlcanzado
                        ? "2px dashed #e2e8f0"
                        : isDragActive
                        ? "2px dashed #3b82f6"
                        : "2px dashed #cbd5e1",
                    padding: "16px",
                    fontSize: "14px",
                    color: "#475569",
                    backgroundColor: limiteAlcanzado
                        ? "#f1f5f9"
                        : isDragActive
                        ? "#eff6ff"
                        : "#f8fafc",
                    opacity: limiteAlcanzado ? 0.6 : 1,
                    cursor: limiteAlcanzado ? "not-allowed" : "pointer",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                }}
            >
                <input
                    {...getInputProps({
                        id: name,
                        name: name,
                        required: required && archivos.length === 0,
                    })}
                />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
                    📁
                </div>
                {limiteAlcanzado ? (
                    <p style={{ marginTop: "8px", textAlign: "center", fontSize: "14px", fontWeight: "500", color: "#64748b", margin: "8px 0 0 0" }}>
                        Máximo de {maxFiles} archivos alcanzado
                    </p>
                ) : isDragActive ? (
                    <p style={{ marginTop: "8px", textAlign: "center", fontSize: "14px", fontWeight: "500", color: "#2563eb", margin: "8px 0 0 0" }}>
                        Suelta el archivo aquí...
                    </p>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <p style={{ fontWeight: "600", color: "#334155", margin: "4px 0" }}>
                            Arrastra tus archivos aquí
                        </p>
                        <p style={{ marginTop: "8px", textAlign: "center", fontSize: "14px", fontWeight: "bold", color: "#059669", margin: "8px 0 0 0" }}>
                            {archivos.length > 0
                                ? `${archivos.length} de ${maxFiles} archivo(s) listo(s)`
                                : "Ningún archivo seleccionado"}
                        </p>
                        <p style={{ fontSize: "14px", color: "#94a3b8", marginTop: "4px", margin: "4px 0 0 0" }}>
                            o haz clic para seleccionarlos
                        </p>
                    </div>
                )}
            </div>

            {mensajeEliminado && (
                <div style={{ textAlign: "center" }}>
                    <span style={{ fontSize: "14px", fontWeight: "500", color: "#059669" }}>
                        {mensajeEliminado}
                    </span>
                </div>
            )}

            {archivos.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {archivos.map(({ id, file, preview }) => (
                        <div
                            key={id}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "flex-start",
                                justifyContent: "space-between",
                                gap: "16px",
                                borderRadius: "8px",
                                border: "1px solid #e2e8f0",
                                backgroundColor: "#ffffff",
                                padding: "16px",
                                boxSizing: "border-box",
                            }}
                        >
                            <div style={{ minWidth: 0, textAlign: "left", fontSize: "14px", color: "#475569", lineHeight: "1.6" }}>
                                <p style={{ marginBottom: "8px", fontWeight: "600", color: "#1e293b", margin: "0 0 8px 0" }}>
                                    Archivo seleccionado
                                </p>
                                <p style={{ margin: 0 }}><strong>Nombre:</strong> {file.name}</p>
                                <p style={{ margin: 0 }}><strong>Tipo:</strong> {file.type || "Desconocido"}</p>
                                <p style={{ margin: 0 }}><strong>Tamaño:</strong> {(file.size / 1024).toFixed(2)} KB</p>
                                <p style={{ margin: 0 }}><strong>Última modificación:</strong> {new Date(file.lastModified).toLocaleString()}</p>
                            </div>

                            <div style={{ display: "flex", flexShrink: 0, flexDirection: "column", items: "center", gap: "8px" }}>
                                {preview && (
                                    <img
                                        src={preview}
                                        alt={`Vista previa de ${file.name}`}
                                        style={{
                                            height: "160px",
                                            width: "160px",
                                            borderRadius: "8px",
                                            border: "1px solid #e2e8f0",
                                            objectFit: "cover",
                                        }}
                                    />
                                )}
                                <button
                                    type="button"
                                    onClick={() => eliminarArchivo(id)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        borderRadius: "8px",
                                        border: "1px solid #fecaca",
                                        backgroundColor: "#fef2f2",
                                        padding: "6px 12px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        color: "#dc2626",
                                        cursor: "pointer",
                                    }}
                                >
                                    🗑️ Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {(errorMsg || error) && (
                <div style={{ textAlign: "center" }}>
                    <span style={{ fontSize: "14px", color: "#ef4444" }}>
                        {errorMsg || error}
                    </span>
                </div>
            )}
        </div>
    );
}

export default FormFile;