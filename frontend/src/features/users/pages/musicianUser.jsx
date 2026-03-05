import MusiciansTable from "../../admin/components/MusiciansTable";

function MusicianUser() {

    const musicians = [
        {
            id: 1,
            name: "Carlos Mendoza",
            email: "carlos@example.com",
            instrument: "Guitarra",
            role: "Líder",
            status: "Activo"
        },
        {
            id: 2,
            name: "Ana López",
            email: "ana@example.com",
            instrument: "Bajo",
            role: "Músico",
            status: "Activo"
        }
    ];

    const isLeader = false;

    return (
        <>
            <div className="card">

                <div className="card-body">

                    <h5 className="mb-3">
                        Miembros de la banda
                    </h5>

                    <MusiciansTable
                        musicians={musicians}
                        isLeader={isLeader}
                    />

                </div>

            </div>
        </>
    );
}

export default MusicianUser;