import { useEffect, useState } from "react";
import ProfileCard from "../components/profileCard";
import { api } from "../../../api/api.js";


function Profile() {

    const [profileData, setprofileData] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

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
    return (
        <>
            <ProfileCard
                /*user={profileData.username}
                name={profileData.nombreCompleto}
                email={profileData.correo}
                role={profileData.role}
                band={profileData.bandNombre} */
                {...profileData}
            />
        </>
    );

}
export default Profile;