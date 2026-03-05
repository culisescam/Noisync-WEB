function SongStructureView({ blocks }) {

    const escala = ["C", "D", "E", "F", "G", "A", "B"];

    const convertirGrados = (texto) => {
        return texto.replace(/\$(\d)(m?)/g, (_, num, menor) => {
            const nota = escala[num - 1] || "";
            return menor ? nota + "m" : nota;
        });
    };

    return (

        <div className="card shadow-sm mt-3">

            <div className="card-body">

                {blocks.map((block) => (

                    <div key={block.id} className="mb-4">

                        <span className="badge bg-success-subtle text-success mb-2">
                            {block.name}
                        </span>

                        {block.content.split("\n").map((linea, i) => {

                            const lineaConvertida = convertirGrados(linea);

                            const partes = lineaConvertida.split(/(C#m|Cm|C#|C|Dm|D#|D|Em|E|Fm|F#|F|Gm|G#|G|Am|A#|A|Bm|B)/g);

                            let acordes = [];
                            let letra = [];

                            partes.forEach(p => {

                                if (/^[A-G]/.test(p)) {
                                    acordes.push(p);
                                    letra.push("");
                                } else {
                                    letra.push(p);
                                    acordes.push("");
                                }

                            });

                            return (
                                <div key={i} className="mb-2">

                                    <div className="text-success fw-semibold">
                                        {acordes.join("    ")}
                                    </div>

                                    <div>
                                        {letra.join("")}
                                    </div>

                                </div>
                            );

                        })}

                    </div>

                ))}

            </div>

        </div>
    );
}

export default SongStructureView;