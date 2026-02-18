import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import SongCard from "../components/SongCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";

function Home() {

    const [canciones, setCanciones] = useState([]);

    useEffect(() => {


        const cancionesMock = [
            { id: 1, titulo: "Noche estrellada", artista: "Luna Gris", estado: "Pública" },
            { id: 2, titulo: "Ecos del silencio", artista: "Eco Sonoro", estado: "Pública" },
            { id: 3, titulo: "Melodía perdida", artista: "Viento Norte", estado: "Pública" },
            { id: 4, titulo: "Ritmo urbano", artista: "Ciudad Beats", estado: "Pública" },
            { id: 5, titulo: "Sueños de cristal", artista: "Luna Gris", estado: "Pública" },
            { id: 6, titulo: "Amanecer digital", artista: "Eco Sonoro", estado: "Pública" },
            { id: 7, titulo: "Viento del sur", artista: "Viento Norte", estado: "Pública" },
            { id: 8, titulo: "Lluvia nocturna", artista: "Ciudad Beats", estado: "Pública" }
        ];

        setCanciones(cancionesMock);

    }, []);
    const [paginaActual, setPaginaActual] = useState(1);
    const cancionesPorPagina = 8;

    const totalPaginas = Math.ceil(canciones.length / cancionesPorPagina);


    const indiceUltimaCancion = paginaActual * cancionesPorPagina;
    const indicePrimeraCancion = indiceUltimaCancion - cancionesPorPagina;

    const cancionesActuales = canciones.slice(
        indicePrimeraCancion,
        indiceUltimaCancion
    );

    return (
        <main>
            <header>
                <Navbar />
            </header>
            <div className="container mt-4">

                <h4 className="fw-bold">Explorar canciones públicas</h4>

                <SearchBar />

                <Filters />

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
            </div>
        </main>
    );
}

export default Home;
