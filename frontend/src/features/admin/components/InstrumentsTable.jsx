import { useState } from "react";
import InstrumentsRow from "./InstrumentsRow";
import MusiciansModal from "./MusiciansModal";

function IntrumentsTable({ instruments, isLeader, onDelete, onUpdated }) {
    const [selectedInstrument, setSelectedInstrument] = useState(null);
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th className="text-secondary">NOMBRE DE LA CATEGORÍA</th>
                        {isLeader && <th className="text-secondary">ACCIONES</th>}
                    </tr>
                </thead>
                <tbody>
                    {instruments.length === 0 ? (
                        <tr><td colSpan={2} className="text-center text-muted py-4">No hay categorías registradas</td></tr>
                    ) : (
                        instruments.map(instrument => (
                            <InstrumentsRow
                                key={instrument.instrumentId}
                                instrument={instrument}
                                isLeader={isLeader}
                                onDelete={onDelete}
                                onUpdated={onUpdated}
                                onOpenModal={setSelectedInstrument}


                            />
                        ))
                    )}
                </tbody>
            </table>
            {selectedInstrument && (
                <MusiciansModal
                    instrument={selectedInstrument}
                    onClose={() => setSelectedInstrument(null)}
                />
            )}
        </div>
    );
}

export default IntrumentsTable;