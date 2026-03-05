import { useEffect, useState } from "react";
import SearchBar from "../../shared/components/SearchBar";
import { Link } from "react-router-dom";
import SongCard from "../../songs/components/SongCard";
import Pagination from "../../shared/components/Pagination";

function HomeUser() {
    const [canciones, setCanciones] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const cancionesPorPagina = 8;

    useEffect(() => {
        const cancionesMock = [
            { id: 1, titulo: "Noche estrellada", artista: "Luna Gris", estado: "Pública" },
            { id: 2, titulo: "Ecos del silencio", artista: "Eco Sonoro", estado: "Pública" },
            { id: 3, titulo: "Melodía perdida", artista: "Viento Norte", estado: "Pública" },
            { id: 4, titulo: "Ritmo urbano", artista: "Ciudad Beats", estado: "Pública" },
            { id: 5, titulo: "Sueños de cristal", artista: "Luna Gris", estado: "Pública" },
            { id: 6, titulo: "Amanecer digital", artista: "Eco Sonoro", estado: "Pública" },
            { id: 7, titulo: "Viento del sur", artista: "Viento Norte", estado: "Pública" },
            { id: 8, titulo: "Lluvia nocturna", artista: "Ciudad Beats", estado: "Pública" },
            { id: 9, titulo: "Sombras del ayer", artista: "Nebula Sound", estado: "Pública" },
            { id: 10, titulo: "Horizonte infinito", artista: "Solar Echo", estado: "Pública" },
            { id: 11, titulo: "Frecuencia azul", artista: "Waveform", estado: "Pública" },
            { id: 12, titulo: "Latidos eléctricos", artista: "Pulse Factory", estado: "Pública" }
        ];

        setCanciones(cancionesMock);
    }, []);

    const totalPaginas = Math.ceil(canciones.length / cancionesPorPagina);
    const indiceUltimaCancion = paginaActual * cancionesPorPagina;
    const indicePrimeraCancion = indiceUltimaCancion - cancionesPorPagina;

    const cancionesActuales = canciones.slice(
        indicePrimeraCancion,
        indiceUltimaCancion
    );
    return (
        <>
            <h3 className="mb-0">Canciones</h3>
            <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 mb-4">

                {/* IZQUIERDA */}
                <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-3 w-100 w-lg-auto">

                    <div style={{ minWidth: "220px" }} className="flex-grow-1">
                        <SearchBar />
                    </div>

                    <div className="custom-segment">
                        <input type="radio" id="todas" name="filter" defaultChecked />
                        <label htmlFor="todas">Todas</label>

                        <input type="radio" id="publicas" name="filter" />
                        <label htmlFor="publicas">Públicas</label>

                        <input type="radio" id="privadas" name="filter" />
                        <label htmlFor="privadas">Privadas</label>
                    </div>

                </div>


            </div>

            <div className="row">
                {cancionesActuales.map((cancion) => (
                    <SongCard
                        key={cancion.id}
                        id={cancion.id}
                        titulo={cancion.titulo}
                        artista={cancion.artista}
                        estado={cancion.estado}
                    />
                ))}
            </div>

            <Pagination
                totalPaginas={totalPaginas}
                paginaActual={paginaActual}
                setPaginaActual={setPaginaActual}
            />
        </>
    );
}
export default HomeUser;