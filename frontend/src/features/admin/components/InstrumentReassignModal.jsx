import { useState, useEffect } from "react";
import { getInstruments, getMusiciansByInstrument } from "../../../api/instrumentService";
import { api } from "../../../api/api";
import { toastError } from "../../../api/alerts";

function InstrumentReassignModal({ instrument, onConfirm, onCancel }) {
    const [musicians, setMusicians] = useState([]);
    const [otherInstruments, setOtherInstruments] = useState([]);
    const [selectedInstrumentId, setSelectedInstrumentId] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const load = async () => {
            const [musicianList, allInstruments] = await Promise.all([
                getMusiciansByInstrument(instrument.id),
                getInstruments()
            ]);
            setMusicians(musicianList);
            // Excluir el instrumento que se va a eliminar usando instrumentId
            setOtherInstruments(allInstruments.filter(i => i.instrumentId !== instrument.id));
            setLoading(false);
        };
        load();
    }, [instrument.id]);

    const handleConfirm = async () => {
        setSaving(true);
        try {
            // 1. Para cada músico: quitar el instrumento que se va a eliminar
            for (const musician of musicians) {
                await api.delete(
                    `/api/musicians/${musician.userId}/instruments/${instrument.id}`
                );
            }

            // 2. Si se eligió reasignar, asignar el nuevo instrumento
            if (selectedInstrumentId) {
                for (const musician of musicians) {
                    try {
                        await api.post(
                            `/api/musicians/${musician.userId}/instruments/${selectedInstrumentId}`
                        );
                    } catch {
                        // Puede fallar si ya tenía ese instrumento asignado — ignorar duplicado
                    }
                }
            }

            // 3. Ejecutar el delete del instrumento en el padre
            onConfirm();
        } catch (err) {
            console.error("Error reasignando músicos:", err);
            toastError("No se pudo reasignar. Verifica la conexión e intenta de nuevo.");
            setSaving(false);
        }
    };

    return (
        <div
            className="modal d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
            tabIndex="-1"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header border-0 pb-0">
                        <div>
                            <h5 className="modal-title fw-bold">
                                <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
                                Instrumento en uso
                            </h5>
                            <small className="text-muted">
                                Categoría: <strong>{instrument.nombre}</strong>
                            </small>
                        </div>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onCancel}
                            disabled={saving}
                        />
                    </div>

                    <div className="modal-body">
                        {loading ? (
                            <div className="text-center py-3">
                                <div className="spinner-border spinner-border-sm text-secondary" role="status" />
                                <span className="ms-2 text-muted">Cargando músicos...</span>
                            </div>
                        ) : (
                            <>
                                <p className="text-muted small mb-3">
                                    Los siguientes músicos tienen asignada esta categoría.
                                    Elige a qué categoría reasignarlos antes de eliminarla, o déjalos sin categoría.
                                </p>

                                {/* Lista de músicos afectados */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold small text-uppercase text-secondary">
                                        Músicos afectados ({musicians.length})
                                    </label>
                                    <ul className="list-group list-group-flush border rounded">
                                        {musicians.map(m => (
                                            <li
                                                key={m.userId}
                                                className="list-group-item d-flex align-items-center gap-2 py-2"
                                            >
                                                <i className="bi bi-person-circle text-muted"></i>
                                                <span className="small">{m.nombreCompleto}</span>
                                                <small className="text-muted ms-auto">{m.correo}</small>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Selector de nuevo instrumento */}
                                <div>
                                    <label className="form-label fw-semibold small text-uppercase text-secondary">
                                        Reasignar a
                                    </label>
                                    <select
                                        className="form-select"
                                        value={selectedInstrumentId}
                                        onChange={e => setSelectedInstrumentId(e.target.value)}
                                    >
                                        <option value="">— Sin categoría (solo quitar) —</option>
                                        {otherInstruments.map(i => (
                                            <option key={i.instrumentId} value={i.instrumentId}>
                                                {i.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {!selectedInstrumentId && (
                                        <small className="text-muted">
                                            Los músicos quedarán sin categoría de instrumento asignada.
                                        </small>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="modal-footer border-0 pt-0">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={onCancel}
                            disabled={saving || loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleConfirm}
                            disabled={saving || loading}
                        >
                            {saving ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                                    Aplicando...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-trash me-1"></i>
                                    {selectedInstrumentId
                                        ? "Reasignar y eliminar"
                                        : "Quitar asignaciones y eliminar"}
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default InstrumentReassignModal;
