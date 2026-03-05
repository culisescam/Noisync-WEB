import { useState } from "react";
import SongForm from "../../songs/components/songForm";
import SongStructure from "../../songs/components/SongStructure";

function RecordSong() {




    const handleCreate = (blocks) => {
        console.log("estructura de canción", blocks);
    };

    const handleCancel = () => {
        console.log("cancelar");
    };

    return (
        <>

            <SongForm />

            <SongStructure
                onSave={handleCreate}
                onCancel={handleCancel}
            />

        </>
    );
}

export default RecordSong;