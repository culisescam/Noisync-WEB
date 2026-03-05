import ProfileCard from "../../admin/components/profileCard";

function ProfileUser() {
    const profileData = {
        name: "Carlos Méndez",
        email: "20243ds023@utez.edu.mx",
        role: "Lider",
        band: "Caifanes"
    }
    return (
        <>
            <ProfileCard
                name={profileData.name}
                email={profileData.email}
                role={profileData.role}
                band={profileData.band}
            />
        </>
    );
}
export default ProfileUser; 