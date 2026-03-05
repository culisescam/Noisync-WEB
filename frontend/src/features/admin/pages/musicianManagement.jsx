import { useState } from "react";
import InviteMusicianCard from "../components/inviteMusicianCard";
import MusiciansTable from "../components/MusiciansTable";
import EditMusicianCard from "../components/editMusicianCard";

function MusicianManagement() {

    const [editingMusician, setEditingMusician] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));
    const isLeader = user?.role === "LEADER";
    const [showInvite, setShowInvite] = useState(false);

    const musicians = [
        {
            id: 1,
            name: "Carlos Mendoza",
            email: "carlos@example.com",
            instrument: "Guitarra",
            role: "Líder",
            status: "Activo"
        }
    ];
    const handleDelete = (id) => {

        if (window.confirm("¿Seguro que deseas eliminar este músico?")) {

            setMusicians(
                musicians.filter(m => m.id !== id)
            );

        }
    };
    const handleEdit = (musician) => {
        setEditingMusician(musician);
    };

    const handleSave = (updated) => {

        setMusicians(
            musicians.map(m =>
                m.id === updated.id ? updated : m
            )
        );

        setEditingMusician(null);
    };

    if (editingMusician) {
        return (
            <EditMusicianCard
                musician={editingMusician}
                onBack={() => setEditingMusician(null)}
                onSave={handleSave}
            />
        );
    }



    if (showInvite) {
        return (
            <InviteMusicianCard
                onBack={() => setShowInvite(false)}
            />
        );
    }

    return (
        <>
            {isLeader && (

                <div className="mb-3">
                    <button className="btn btn-dark" onClick={() => setShowInvite(true)}>
                        + Invitar músico
                    </button>
                </div>
            )}


            <div className="card">

                <div className="card-body">

                    <MusiciansTable musicians={musicians}
                        isLeader={isLeader}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                </div>

            </div>
        </>
    );
}

export default MusicianManagement;