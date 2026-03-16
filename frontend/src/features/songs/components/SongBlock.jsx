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
    return (

        <div className="card shadow-sm mt-3">

            <div className="card-body">

                {/* HEADER */}

                <div className="d-flex justify-content-between align-items-center mb-2">

                    <select
                        className="form-select form-select-sm w-auto"
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

                {/* TOOLBAR DE GRADOS */}

                <div className="mb-2">

                    <small className="text-muted">
                        Insertar grado
                    </small>

                    <div className="d-flex gap-2 ms-2">

                        <button className="btn btn-outline-dark" onClick={() => insertDegree(1)}>I</button>
                        <button className="btn btn-outline-dark" onClick={() => insertDegree(2)}>ii</button>
                        <button className="btn btn-outline-dark" onClick={() => insertDegree(3)}>iii</button>
                        <button className="btn btn-outline-dark" onClick={() => insertDegree(4)}>IV</button>
                        <button className="btn btn-outline-dark" onClick={() => insertDegree(5)}>V</button>
                        <button className="btn btn-outline-dark" onClick={() => insertDegree(6)}>vi</button>
                        <button className="btn btn-outline-dark" onClick={() => insertDegree(7)}>vii°</button>

                    </div>

                </div>

                {/* TEXTAREA */}

                <textarea
                    ref={textareaRef}
                    className="form-control"
                    rows="5"
                    placeholder="Escribe la letra y usa los grados..."
                    value={block.content}
                    onChange={(e) =>
                        updateBlock(block.id, "content", e.target.value)
                    }
                />

                <small className="text-muted">
                    Tip: usa los botones para insertar grados ($1, $2, $3...)
                </small>

            </div>

        </div>
    );
}

export default SongBlock;