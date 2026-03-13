function MusicianRow({ musician, isLeader, onEdit, onDelete, onResetPassword }) {

    const statusColor = musician.estatus === "PENDIENTE"
        ? "bg-warning-subtle text-warning-emphasis"
        : musician.estatus === "ACTIVO"
            ? "bg-success-subtle text-success"
            : "bg-secondary-subtle text-secondary";

    return (
        <tr className="align-middle">
            <td className="py-3 ps-4">
                <div className="fw-bold">{musician.nombreCompleto}</div>
                <div className="text-muted small">{musician.correo}</div>
            </td>
            <td>
                {musician.instrumentos && musician.instrumentos.length > 0
                    ? musician.instrumentos.map(inst => (
                        <span key={inst} className="badge border text-dark fw-normal me-1 mb-1">
                            {inst}
                        </span>
                    ))
                    : <span className="text-muted small">—</span>
                }
            </td>
            <td>
                <span className={`badge ${statusColor} border`}>
                    {musician.estatus}
                </span>
            </td>
            {isLeader && (
                <td className="text-end pe-4">
                    <div className="btn-group">
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            title="Restablecer contraseña"
                            onClick={() => onResetPassword(musician)}
                        >
                            <i className="bi bi-key"></i>
                        </button>
                        <button
                            className="btn btn-sm btn-outline-dark"
                            title="Editar"
                            onClick={() => onEdit(musician)}
                        >
                            <i className="bi bi-pencil"></i>
                        </button>
                        <button
                            className="btn btn-sm btn-outline-danger"
                            title="Eliminar"
                            onClick={() => onDelete(musician.userId)}
                        >
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            )}
        </tr>
    );
}

export default MusicianRow;