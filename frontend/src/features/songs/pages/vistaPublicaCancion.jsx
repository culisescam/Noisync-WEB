import { useParams } from "react-router-dom";
import SongInfo from "../components/songInfo";
import SongStructureView from "../components/SongStructureView";
import AuthHeader from "../../auth/components/AuthHeader";

function VistaPublicaCancion() {

    const { id } = useParams();

    const cancionesMock = [

        {
            id: "1",
            titulo: "Noche estrellada",
            artista: "Luna Gris",
            tono: "C",
            bpm: 120,
            estado: "Pública",
            blocks: [
                {
                    id: 1,
                    name: "Verso 1",
                    content: "$1 En la noche estrellada\n$6m Busco tu mirada\n$1 Entre sombras y luces\n$4 $5 Mi corazón te llama"
                },
                {
                    id: 2,
                    name: "Coro",
                    content: "$4 Brilla el cielo\n$5 Sobre nosotros\n$1 La noche canta\n$6m Nuestro destino"
                }
            ]
        },

        {
            id: "2",
            titulo: "Ecos del silencio",
            artista: "Eco Sonoro",
            tono: "D",
            bpm: 98,
            estado: "Pública",
            blocks: [
                {
                    id: 1,
                    name: "Verso 1",
                    content: "$1 Caminando entre sombras\n$5 Escucho tu voz\n$6m Ecos del silencio\n$4 Llenan mi interior"
                },
                {
                    id: 2,
                    name: "Coro",
                    content: "$4 Y vuelvo a sentir\n$5 Tu respiración\n$1 En cada latido\n$6m De esta canción"
                }
            ]
        },

        {
            id: "3",
            titulo: "Melodía perdida",
            artista: "Viento Norte",
            tono: "Am",
            bpm: 105,
            estado: "Pública",
            blocks: [
                {
                    id: 1,
                    name: "Verso 1",
                    content: "$6m Buscando en la bruma\n$4 Una señal\n$1 Melodía perdida\n$5 Que no volverá"
                },
                {
                    id: 2,
                    name: "Puente",
                    content: "$4 Tal vez en el viento\n$1 Vuelva a sonar\n$6m Como un suspiro\n$5 Que no morirá"
                }
            ]
        },

        {
            id: "4",
            titulo: "Ritmo urbano",
            artista: "Ciudad Beats",
            tono: "F",
            bpm: 110,
            estado: "Pública",
            blocks: [
                {
                    id: 1,
                    name: "Verso 1",
                    content: "$1 Luces en la avenida\n$5 Bajo el neón\n$6m Late la ciudad\n$4 Con cada canción"
                },
                {
                    id: 2,
                    name: "Coro",
                    content: "$4 Ritmo urbano\n$5 Que no parará\n$1 Noche infinita\n$6m En la ciudad"
                }
            ]
        },

        {
            id: "5",
            titulo: "Sueños de cristal",
            artista: "Luna Gris",
            tono: "G",
            bpm: 95,
            estado: "Pública",
            blocks: [
                {
                    id: 1,
                    name: "Verso 1",
                    content: "$1 Sueños de cristal\n$5 Bajo la luna\n$6m Brillan tus ojos\n$4 Como fortuna"
                },
                {
                    id: 2,
                    name: "Coro",
                    content: "$4 Y en el silencio\n$5 Vuelvo a soñar\n$1 Que entre las estrellas\n$6m Te vuelvo a encontrar"
                }
            ]
        }

    ];

    const cancion = cancionesMock.find(c => c.id === id);

    if (!cancion) {

        return (
            <>
                <AuthHeader />

                <div className="container mt-4">
                    <h4>Canción no encontrada</h4>
                </div>
            </>
        );

    }

    return (

        <>
            <AuthHeader />

            <main className="container mt-4">

                <SongInfo
                    titulo={cancion.titulo}
                    artista={cancion.artista}
                    tono={cancion.tono}
                    bpm={cancion.bpm}
                    estado={cancion.estado}
                />

                <SongStructureView
                    blocks={cancion.blocks}
                />

            </main>
        </>

    );

}

export default VistaPublicaCancion;