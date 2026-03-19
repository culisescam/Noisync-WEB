import { useEffect, useState } from "react";
import { getMusiciansByInstrument } from "../../../api/instrumentService";
import { toastError } from "../../../api/alerts";

function MusiciansModal({ instrument, onClose }) {

    const [musicians, setMusicians] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMusiciansByInstrument(instrument.instrumentId);
                setMusicians(data);
            } catch (e) {
                toastError("No se pudo cargar los músicos");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [instrument]);

    return (
        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
            onClick={onClose}
        >
            <div
                className="modal-dialog modal-dialog-centered"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content">

                    <div className="modal-header py-2 px-3">
                        <h6 className="modal-title mb-0">
                            <i className="bi bi-people me-2"></i>
                            Músicos — {instrument.nombre}
                        </h6>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body p-0">
                        {loading ? (
                            <div className="text-center py-3 text-muted">
                                <div className="spinner-border spinner-border-sm me-2"></div>
                                Cargando...
                            </div>
                        ) : musicians.length === 0 ? (
                            <p className="text-muted text-center py-3 mb-0">
                                Ningún músico tiene este instrumento asignado.
                            </p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="small ps-3">MÚSICO</th>
                                            <th className="small">CORREO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {musicians.map(m => (
                                            <tr key={m.userId}>
                                                <td className="ps-3">{m.nombreCompleto}</td>
                                                <td className="text-muted small">{m.correo}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    <div className="modal-footer py-2 px-3">
                        <button className="btn btn-sm btn-secondary" onClick={onClose}>
                            Cerrar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MusiciansModal;