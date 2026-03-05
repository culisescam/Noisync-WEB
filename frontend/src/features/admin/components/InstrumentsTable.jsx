import InstrumentsRow from "./InstrumentsRow";

function IntrumentsTable({ instruments, isLeader }) {
    return (
        <>
            <div className="table-responsive">

                <table className="table">

                    <thead>
                        <tr>

                            <th className="text-secondary">
                                NOMBRE DE LA CATEGORIA
                            </th>

                            {isLeader && (
                                <th className="text-secondary">
                                    ACCIONES
                                </th>
                            )}

                        </tr>
                    </thead>

                    <tbody>

                        {instruments.map((instrument) => (
                            <InstrumentsRow
                                key={instrument.id}
                                instrument={instrument}
                                isLeader={isLeader}
                            />
                        ))}

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default IntrumentsTable;