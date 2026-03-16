import { useEffect, useState } from "react";
import ProfileCard from "../components/profileCard";
import { api } from "../../../api/api.js";
import { toastError } from "../../../api/alerts.js";


function Profile() {

    const [profileData, setprofileData] = useState(null);

    const loadProfile = async () => {
        try {

            const ProfileRes = await api.get("/api/me");

            const profile = ProfileRes.data;

            setprofileData({
                user: profile.username,
                name: profile.nombreCompleto,
                role: profile.role,
                email: profile.correo,
                band: profile.bandNombre
            });

        } catch (err) {
            console.error("Error cargando perfil", err);
            toastError("No se pudo cargar el perfil ");
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            await loadProfile();
        };

        fetchProfile();
    }, []);


    return (
        <>
            <ProfileCard

                {...profileData}
            />
        </>
    );

}
export default Profile;