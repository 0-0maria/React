import { useState, useEffect } from "react";

export function useCharacters(limit = 12) {
    const [personajes, setPersonajes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let activo = true;
        async function cargarDatos() {
            try {
                setCargando(true);
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
                if (!res.ok) throw new Error("No se pudo cargar el catálogo de Pokémon");
                const data = await res.json();
                
                const listaConDetalles = await Promise.all(
                    data.results.map(async (poke, index) => {
                        const resDetalle = await fetch(poke.url);
                        const detalle = resDetalle.ok ? await resDetalle.json() : null;
                        
                        return {
                            id: index + 1,
                            name: poke.name.toUpperCase(),
                            image: detalle ? detalle.sprites.other["official-artwork"].front_default : "https://via.placeholder.com/150",
                            status: "Disponible",
                            gender: "Pokémon",
                            species: "Criatura",
                            primeraAparicion: "Generación I",
                            precio: (index + 1) * 2500 + 10000,
                            description: `Pokémon oficial número ${index + 1} listo para la batalla.`
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
        cargarDatos();
        return () => { activo = false; };
    }, [limit]);

    return { personajes, cargando, error };
}