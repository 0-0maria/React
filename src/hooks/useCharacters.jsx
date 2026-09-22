import { useState, useEffect } from "react";

const RANGO_PRECIO = { min: 7000, max: 50000 };

function precioDeterminista(id) {
    const rango = RANGO_PRECIO.max - RANGO_PRECIO.min + 1;
    return RANGO_PRECIO.min + ((id * 2654435761) % rango);
}

export function useCharacters(limit = 12) {
    const [personajes, setPersonajes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let activo = true;
        async function cargarPersonajes() {
            try {
                setCargando(true);
                const resPersonajes = await fetch("https://rickandmortyapi.com/api/character/?page=1");
                if (!resPersonajes.ok) throw new Error("No se pudo cargar el catálogo");
                const dataPersonajes = await resPersonajes.json();
                const lista = dataPersonajes.results.slice(0, limit);

                const listaConDetalles = await Promise.all(
                    lista.map(async (personaje) => {
                        const resEpisodio = await fetch(personaje.episode[0]);
                        const episodio = await resEpisodio.json();
                        return {
                            ...personaje,
                            primeraAparicion: episodio.air_date,
                            precio: precioDeterminista(personaje.id),
                        };
                    })
                );
                if (activo) setPersonajes(listaConDetalles);
            } catch (err) {
                if (activo) setError(err.message);
            } finally {
                if (activo) setCargando(false);
            }
        }
        cargarPersonajes();
        return () => { activo = false; };
    }, [limit]);

    return { personajes, cargando, error };
}