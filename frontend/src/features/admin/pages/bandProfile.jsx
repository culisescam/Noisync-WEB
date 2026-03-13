import { useEffect, useState } from "react";
import BandProfileCard from "../components/BandProfileCard";
import EditBandForm from "../components/EditBandForm";
import { api } from "../../../api/api.js";
import { toastError } from "../../../api/alerts.js";

function BandProfile() {

    const [editing, setEditing] = useState(false);
    const [bandData, setBandData] = useState(null);

    useEffect(() => {
        loadBand();
    }, []);

    const loadBand = async () => {
        try {
            const bandRes = await api.get("/api/band");
            const socialsRes = await api.get("/api/band/socials");

            const band = bandRes.data;
            const socials = socialsRes.data;

            const socialMap = {
                instagram: "",
                facebook: "",
                twitter: "",
                youtube: "",
                website: ""
            };

            socials.forEach(s => {
                const platform = s.plataforma.toLowerCase();
                if (socialMap.hasOwnProperty(platform)) {
                    socialMap[platform] = s.url;
                }
            });

            setBandData({
                name: band.nombre,
                description: band.descripcion,
                ...socialMap
            });

        } catch (err) {
            console.error("Error cargando banda", err);
            toastError("No se pudo cargar el perfil de la banda");
        }
    };

    if (!bandData) return <div className="p-4">Cargando perfil de banda...</div>;

    if (editing) {
        return (
            <EditBandForm
                bandData={bandData}
                onBack={() => {
                    setEditing(false);
                    loadBand();
                }}
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