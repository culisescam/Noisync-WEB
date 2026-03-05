import { useEffect, useState } from "react";
import SongStructure from "./SongStructure";

function SongForm({ initialData = {}, onSubmit, }) {


    const [formData, setFormData] = useState({
        title: initialData.title || "",
        artist: initialData.artist || "",
        bpm: initialData.bpm || "",
        key: initialData.key || "C",
        visibility: initialData.visibility ?? true
    });





    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <>
            <div className="card shadow-sm mt-4">

                <form onSubmit={handleSubmit}>


                    <div className="card-body p-4">

                        <h5 className="mb-4 fw-bold">
                            Información básica
                        </h5>

                        <div className="row g-4">

                            {/* TITULO */}
                            <div className="col-md-6">
                                <label className="form-label">
                                    Título de la canción
                                </label>

                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-music-note"></i>
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej: Noche estrellada"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* ARTISTA */}
                            <div className="col-md-6">
                                <label className="form-label">
                                    Artista / Autor
                                </label>

                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-person"></i>
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej: Luna Gris"
                                        name="artist"
                                        value={formData.artist}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* BPM */}
                            <div className="col-md-6">
                                <label className="form-label">
                                    BPM (Tempo)
                                </label>

                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-speedometer2"></i>
                                    </span>

                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Ej: 120"
                                        name="bpm"
                                        value={formData.bpm}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* TONO */}
                            <div className="col-md-6">
                                <label className="form-label">
                                    Tono original
                                </label>

                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-music-note-beamed"></i>
                                    </span>

                                    <select
                                        className="form-select"
                                        name="key"
                                        value={formData.key}
                                        onChange={handleChange}
                                    >
                                        <option value="C">C</option>
                                        <option value="C#">C#</option>
                                        <option value="D">D</option>
                                        <option value="D#">D#</option>
                                        <option value="E">E</option>
                                        <option value="F">F</option>
                                        <option value="F#">F#</option>
                                        <option value="G">G</option>
                                        <option value="G#">G#</option>
                                        <option value="A">A</option>
                                        <option value="A#">A#</option>
                                        <option value="B">B</option>
                                    </select>
                                </div>
                            </div>

                            {/* VISIBILIDAD */}
                            <div className="col-12">

                                <label className="form-label">
                                    Visibilidad
                                </label>

                                <div className="form-check form-switch d-flex align-items-center gap-2">

                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="visibility"
                                        checked={formData.visibility}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                visibility: e.target.checked
                                            })
                                        }
                                    />

                                    <label
                                        className={`form-check-label fw-semibold ${formData.visibility ? "text-success" : "text-danger"
                                            }`}
                                    >
                                        {formData.visibility ? "Pública" : "Privada"}
                                    </label>

                                </div>

                                <small className="text-muted">
                                    {formData.visibility
                                        ? "La canción será visible para todos los miembros de la banda"
                                        : "La canción solo será visible para ti o administradores"}
                                </small>

                            </div>

                        </div>



                    </div>


                </form>
            </div>
        </>
    );
}

export default SongForm;