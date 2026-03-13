function InstrumentsRow({ instrument, isLeader, onDelete }) {
    return (
        <tr>
            <td>{instrument.nombre}</td>
            {isLeader && (
                <td>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(instrument.instrumentId)}
                    >
                        Eliminar
                    </button>
                </td>
            )}
        </tr>
    );
}

export default InstrumentsRow;