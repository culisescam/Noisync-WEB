import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SongInfo from "../components/songInfo";
import SongStructureView from "../components/SongStructureView";
import AuthHeader from "../../auth/components/AuthHeader";
import { getSong, getSections, getPublicSong, getPublicSections } from "../../../api/songService";

function VistaPublicaCancion() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [cancion, setCancion] = useState(null);
    const [secciones, setSecciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [transposicion, setTransposicion] = useState(0);


    const role = localStorage.getItem("role");
    const isLeader = role === "LEADER";
    const isMusician = role === "MUSICIAN";

    useEffect(() => {
        const role = localStorage.getItem("role");
        const token = localStorage.getItem("accessToken");

        const load = async () => {
            try {
                let songData, sectionsData;

                if (token && (role === "LEADER" || role === "MUSICIAN")) {
                    try {
                        // Intentar con endpoints privados (canciones de tu banda)
                        [songData, sectionsData] = await Promise.all([
                            getSong(id),
                            getSections(id)
                        ]);
                    } catch (err) {
                        // Si falla (canción de otra banda), usar endpoints públicos
                        [songData, sectionsData] = await Promise.all([
                            getPublicSong(id),
                            getPublicSections(id)
                        ]);
                    }
                } else {
                    [songData, sectionsData] = await Promise.all([
                        getPublicSong(id),
                        getPublicSections(id)
                    ]);
                }

                setCancion(songData);
                setSecciones(sectionsData);

            } catch (err) {
                console.error("Error cargando canción:", err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [id]);

    if (loading) {
        return (
            <>
                <div className="container mt-4 text-center text-muted py-5">
                    <div className="spinner-border spinner-border-sm me-2"></div>
                    Cargando canción...
                </div>
            </>
        );
    }

    if (!cancion) {
        return (
            <>
                <AuthHeader />
                <div className="container mt-4">
                    <h4>Canción no encontrada</h4>
                </div>
            </>
        );
    }

    const renderHeader = () => {
        if (isLeader || isMusician) return null;
        return <AuthHeader />;
    };

    return (
        <>
            {renderHeader()}

            <main className="container mt-4">

                {/* BOTÓN VOLVER */}
                <button
                    className="btn btn-outline-secondary mb-3"
                    onClick={() => navigate(-1)}
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver
                </button>

                <SongInfo
                    titulo={cancion.titulo}
                    artista={cancion.artistaAutor}
                    tono={cancion.tonoOriginal}
                    bpm={cancion.bpm}
                    estado={cancion.visibilidad === "PUBLIC" ? "Pública" : "Privada"}
                    cover={cancion.coverUrl}
                    setTransposicion={setTransposicion}
                    transposicion={transposicion}
                />

                <SongStructureView
                    blocks={secciones}
                    tono={cancion.tonoOriginal}
                    escala={cancion.escalaBase || "Mayor"}
                    transposicion={transposicion} />
            </main>
        </>
    );
}

export default VistaPublicaCancion;
