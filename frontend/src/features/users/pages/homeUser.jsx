import SongCard from "../../songs/components/SongCard";
import Pagination from "../../shared/components/Pagination";
import { getPublicSongs } from "../../../api/songService";
import { useState, useEffect } from "react";


function HomeUser() {
    const [canciones, setCanciones] = useState([]);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [paginaActual, setPaginaActual] = useState(0);
    const [busqueda, setBusqueda] = useState("");
    const [loading, setLoading] = useState(true);

    const load = async (page = 0, q = "") => {
        try {
            setLoading(true);
            const data = await getPublicSongs(page, 8, q);
            setCanciones(data.content);
            setTotalPaginas(data.totalPages);
        } catch (e) {
            console.error("Error cargando canciones:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load(paginaActual, busqueda);
    }, [paginaActual, busqueda]);


    return (
        <>
            <h3 className="mb-0">Canciones</h3>
            <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 mb-4">
                <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-3 w-100 w-lg-auto">
                    <div style={{ minWidth: "220px" }} className="flex-grow-1">
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0">
                                <i className="bi bi-search text-muted"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0"
                                placeholder="Buscar canción..."
                                value={busqueda}
                                onChange={e => { setBusqueda(e.target.value); setPaginaActual(0); }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5 text-muted">
                    <div className="spinner-border spinner-border-sm me-2"></div>
                    Cargando canciones...
                </div>
            ) : canciones.length === 0 ? (
                <div className="text-center py-5 text-muted">No hay canciones registradas.</div>
            ) : (
                <div className="row">
                    {canciones.map(c => (
                        <SongCard
                            key={c.songId}
                            id={c.songId}
                            cover={c.coverUrl}
                            titulo={c.titulo}
                            artista={c.artistaAutor}
                            estado={c.visibilidad === "PUBLIC" ? "Pública" : "Privada"}
                            nombreBanda={c.nombreBanda}
                            fechaCreacion={c.fechaCreacion}
                        />
                    ))}
                </div>
            )}

            <Pagination
                totalPaginas={totalPaginas}
                paginaActual={paginaActual + 1}
                setPaginaActual={(p) => setPaginaActual(p - 1)}
            />
        </>
    );
}

export default HomeUser;