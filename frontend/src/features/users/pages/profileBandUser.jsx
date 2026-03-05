import BandProfileCard from "../../admin/components/BandProfileCard";

function ProfileBandUser() {
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

    return (
        <>
            <BandProfileCard
                name={bandData.name}
                genre={bandData.genre}
                description={bandData.description}
                instagram={bandData.instagram}
                facebook={bandData.facebook}
                twitter={bandData.twitter}
                youtube={bandData.youtube}
                website={bandData.website}
            />
        </>
    );
}
export default ProfileBandUser;