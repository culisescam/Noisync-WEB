import { useState } from "react";

function EditMusicianCard({ musician, onBack, onSave }) {

    const [form, setForm] = useState(musician);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <div className="card shadow-sm">

            <div className="card-body">

                <button
                    className="btn btn-outline-secondary btn-sm mb-3"
                    onClick={onBack}
                >
                    ← Volver
                </button>

                <h5 className="fw-bold mb-3">
                    Editar músico
                </h5>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Correo</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Instrumento</label>
                        <select
                            className="form-select"
                            name="instrument"
                            value={form.instrument}
                            onChange={handleChange}
                        >
                            <option>Guitarra</option>
                            <option>Bajo</option>
                            <option>Batería</option>
                            <option>Teclado</option>
                        </select>
                    </div>


                    <button className="btn btn-dark">
                        Guardar cambios
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditMusicianCard;