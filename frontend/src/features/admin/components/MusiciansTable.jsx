import MusicianRow from "./MusicianRow";

function MusiciansTable({ musicians, isLeader, onEdit, onDelete, onResetPassword }) {
    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                    <tr>
                        <th className="text-secondary ps-4">MÚSICO</th>
                        <th className="text-secondary">INSTRUMENTO(S)</th>
                        <th className="text-secondary">ESTATUS</th>
                        {isLeader && (
                            <th className="text-secondary text-end pe-4">ACCIONES</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {musicians.length > 0 ? (
                        musicians.map((musician) => (
                            <MusicianRow
                                key={musician.userId}
                                musician={musician}
                                isLeader={isLeader}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onResetPassword={onResetPassword}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={isLeader ? 4 : 3} className="text-center py-5 text-muted">
                                No hay músicos registrados en esta banda.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default MusiciansTable;