function InstrumentsRow({ instrument, isLeader }) {
    return (
        <>
            <tr>

                <td>{instrument.name}
                    <p className="text-secondary mb-0">{instrument.cant} instrumentos</p>
                </td>

                {isLeader && (
                    <td>
                        <button className="btn btn-sm btn-outline-danger">
                            ELIMINAR                    </button>

                    </td>
                )}

            </tr>
        </>
    );
}
export default InstrumentsRow;