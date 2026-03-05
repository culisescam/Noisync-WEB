import { useState } from "react";
import BandProfileCard from "../components/BandProfileCard";
import EditBandForm from "../components/EditBandForm";

function BandProfile() {
    const [editing, setEditing] = useState(false);


    const bandData = {
        name: "Los Nocturnos",
        genre: "Rock Alternativo",
        description: "Banda de rock alternativo formada en 2018.",
        instagram: "@losnocturnos",
        facebook: "Los Nocturnos",
        twitter: "@losnocturnos",
        youtube: "Los Nocturnos Oficial",
        website: "www.losnocturnos.com"
    };

    if (editing) {
        return (
            <EditBandForm
                bandData={bandData}
                onBack={() => setEditing(false)}
            />
        );
    }

    return (
        <BandProfileCard
            {...bandData}
            onEdit={() => setEditing(true)}
        />
    );
}

export default BandProfile;