import IntrumentsTable from "../../admin/components/InstrumentsTable";

const instruments = [
    { id: 1, name: "Guitarra", cant: 5 },
    { id: 2, name: "Bajo", cant: 3 },
    { id: 3, name: "Batería", cant: 2 },
];

function InstrumentsUser() {

    const user = JSON.parse(localStorage.getItem("user"));
    const isLeader = user?.role === "LEADER";

    return (
        <>
            <div className="card shadow-sm mb-4">
                <div className="card-body">

                    <h5 className="mb-0">
                        Categorías de instrumentos
                    </h5>

                </div>
            </div>

            <div className="card">
                <div className="card-body">

                    <IntrumentsTable
                        instruments={instruments}
                        isLeader={isLeader}
                    />

                </div>
            </div>
        </>
    );
}

export default InstrumentsUser;