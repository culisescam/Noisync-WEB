function resolverAcorde(grado, tonica, escala, transposicion = 0) {
    const NOTAS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    // Mapeo de bemoles a sus equivalentes con sostenido
    const BEMOLES = { "Db": "C#", "Eb": "D#", "Fb": "E", "Gb": "F#", "Ab": "G#", "Bb": "A#", "Cb": "B" };

    const GRADOS_MAYOR = [0, 2, 4, 5, 7, 9, 11];
    const GRADOS_MENOR = [0, 2, 3, 5, 7, 8, 10];
    const TIPOS_MAYOR = ["", "m", "m", "", "", "m", "dim"];
    const TIPOS_MENOR = ["m", "dim", "", "m", "m", "", ""];

    // Normalizar la tónica (convertir bemol a sostenido equivalente)
    const tonicaNorm = BEMOLES[tonica] || tonica;
    const tonicaIdx = NOTAS.indexOf(tonicaNorm);
    if (tonicaIdx === -1 || grado < 1 || grado > 7) return `$${grado}`;

    const grados = escala === "Menor" ? GRADOS_MENOR : GRADOS_MAYOR;
    const tipos = escala === "Menor" ? TIPOS_MENOR : TIPOS_MAYOR;

    // El módulo con +120 asegura que siempre sea positivo antes de aplicar %12
    const idx = ((tonicaIdx + grados[grado - 1] + transposicion) % 12 + 12) % 12;
    return NOTAS[idx] + tipos[grado - 1];
}

function renderizarLinea(linea, tonica, escala, transposicion) {
    const tokens = linea.split(/(\$\d)/);
    const pares = [];
    let i = 0;

    while (i < tokens.length) {
        const token = tokens[i];
        if (/^\$\d$/.test(token)) {
            const acorde = resolverAcorde(parseInt(token[1]), tonica, escala, transposicion);
            const texto = tokens[i + 1] || "";
            pares.push({ acorde, texto });
            i += 2;
        } else {
            if (token.trim()) pares.push({ acorde: "", texto: token });
            i++;
        }
    }

    if (pares.length === 0) return null;

    return (
        <div style={{ fontFamily: "monospace", lineHeight: 1 }}>
            {pares.map((par, idx) => (
                <span
                    key={idx}
                    style={{
                        display: "inline-block",
                        verticalAlign: "top",
                        // Añade espacio a la derecha para que los acordes no queden pegados
                        paddingRight: par.acorde ? "0.5ch" : 0,
                    }}
                >
                    {/* Acorde (línea superior) — ocupa su espacio aunque esté vacío */}
                    <span
                        className="text-success fw-semibold"
                        style={{
                            display: "block",
                            // Reserva la altura de una línea incluso cuando no hay acorde,
                            // para mantener alineación vertical con otros pares
                            minHeight: "1.4em",
                            whiteSpace: "pre",
                        }}
                    >
                        {par.acorde}
                    </span>
                    {/* Letra (línea inferior) */}
                    <span style={{ display: "block", whiteSpace: "pre-wrap" }}>
                        {par.texto}
                    </span>
                </span>
            ))}
        </div>
    );
}

function SongStructureView({ blocks, tono = "C", escala = "Mayor", transposicion = 0 }) {
    return (
        <div className="mt-3">
            {blocks.map((block) => (
                <div key={block.sectionId || block.id} className="card shadow-sm mb-3">
                    <div className="card-body">
                        <span className="badge bg-success-subtle text-success mb-3">
                            {block.etiqueta || block.name}
                        </span>
                        <div>
                            {(block.contenido || block.content || "").split("\n").map((linea, i) => (
                                <div key={i} className="mb-2">
                                    {renderizarLinea(linea, tono, escala, transposicion)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SongStructureView;