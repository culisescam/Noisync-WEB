import "../styles/songInfo.css";
import SongAvatar from "./songAvatar";

function SongInfo({ titulo, artista, tono, bpm, estado, cover, setTransposicion, transposicion = 0 }) {

    // 1 tono = 2 semitonos en la escala cromática
    const subirTono = () => setTransposicion(t => t + 2);
    const bajarTono = () => setTransposicion(t => t - 2);
    const subirSemitono = () => setTransposicion(t => t + 1);
    const bajarSemitono = () => setTransposicion(t => t - 1);
    const restablecer = () => setTransposicion(0);

    const mostrarTransposicion = () => {
        if (transposicion === 0) return "Original";
        return transposicion > 0 ? `+${transposicion} st` : `${transposicion} st`;
    };

    return (
        <div className="song-info-card">

            <div className="d-flex align-items-start gap-3">

                <div className="cover-container">
                    <SongAvatar nombre={titulo} imagen={cover} />
                </div>

                <div className="flex-grow-1 min-width-0">
                    <div className="d-flex justify-content-between align-items-start gap-2">
                        <div className="min-width-0">
                            <h4 className="fw-bold mb-1">{titulo}</h4>
                            <p className="text-muted mb-2">{artista}</p>
                            <div className="song-meta">
                                <span>Tono original:</span>
                                <strong className="mx-2">{tono}</strong>
                                <span>BPM:</span>
                                <strong className="ms-2">{bpm}</strong>
                            </div>
                            <span className="estado-badge d-inline-block mt-2">{estado}</span>
                        </div>
                    </div>
                </div>

            </div>

            <hr />

            <div>
                <div className="d-flex align-items-center gap-3 mb-2">
                    <p className="fw-semibold mb-0">Controles de transposición</p>
                    <span className={`badge  text-muted ${transposicion === 0 ? "bg-secondary" : "bg-success"}`}>
                        {mostrarTransposicion()}
                    </span>
                </div>

                <div className="d-flex gap-2 align-items-center flex-wrap">
                    <button className="btn btn-outline-secondary" onClick={subirTono}>
                        +1 tono
                    </button>
                    <button className="btn btn-outline-secondary" onClick={bajarTono}>
                        -1 tono
                    </button>
                    <button className="btn btn-outline-secondary" onClick={subirSemitono}>
                        +½ tono
                    </button>
                    <button className="btn btn-outline-secondary" onClick={bajarSemitono}>
                        -½ tono
                    </button>
                    <button className="btn btn-outline-danger" onClick={restablecer}>
                        <i className="bi bi-arrow-counterclockwise me-1"></i>
                        Restablecer
                    </button>
                </div>
            </div>

        </div>
    );
}

export default SongInfo;
