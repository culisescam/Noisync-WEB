import { useRef } from "react";

function SongBlock({ block, updateBlock, deleteBlock }) {

    const textareaRef = useRef(null);

    if (!block) return null;

    const insertDegree = (degree) => {
        const textarea = textareaRef.current;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const text = block.content || "";

        const newText =
            text.substring(0, start) +
            `$${degree}` +
            text.substring(end);

        updateBlock(block.id, "content", newText);

        setTimeout(() => {
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = start + 2;
        }, 0);
    };

    const degrees = [
        { label: "I", value: 1 },
        { label: "ii", value: 2 },
        { label: "iii", value: 3 },
        { label: "IV", value: 4 },
        { label: "V", value: 5 },
        { label: "vi", value: 6 },
        { label: "vii°", value: 7 }
    ];

    return (
        <div className="card shadow-sm mt-3">

            <div className="card-body">

                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-3">

                    <select
                        className="form-select form-select-sm"
                        style={{ maxWidth: "200px" }}
                        value={block.name}
                        onChange={(e) =>
                            updateBlock(block.id, "name", e.target.value)
                        }
                    >
                        <option value="">Seleccionar bloque...</option>
                        <option value="Verso">Verso</option>
                        <option value="Coro">Coro</option>
                        <option value="Puente">Puente</option>
                        <option value="Intro">Intro</option>
                        <option value="Outro">Outro</option>
                    </select>

                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteBlock(block.id)}
                    >
                        <i className="bi bi-trash"></i>
                    </button>

                </div>

                <div className="mb-3">

                    <small className="text-muted d-block mb-1">
                        Insertar grado
                    </small>

                    <div className="d-flex flex-wrap gap-2">

                        {degrees.map((d) => (
                            <button
                                key={d.value}
                                className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                                onClick={() => insertDegree(d.value)}
                            >
                                {d.label}
                            </button>
                        ))}

                    </div>

                </div>

                <textarea
                    ref={textareaRef}
                    className="form-control"
                    rows="5"
                    placeholder="Escribe la letra y usa los grados..."
                    value={block.content}
                    onChange={(e) =>
                        updateBlock(block.id, "content", e.target.value)
                    }
                    style={{
                        whiteSpace: "pre",
                        overflowX: "auto",
                        overflowY: "auto",
                        resize: "vertical",
                        fontFamily: "monospace"
                    }}
                />

                <small className="text-muted d-block mt-2">
                    Tip: usa los botones para insertar grados ($1, $2, $3...)
                </small>

            </div>

        </div>
    );
}

export default SongBlock;