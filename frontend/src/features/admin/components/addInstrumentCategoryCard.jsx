import { useState } from "react";

function AddInstrumentCategoryCard({ onBack }) {

    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Nueva categoría:", name);

        alert("Categoría creada (simulado)");

        onBack();
    };

    return (

        <div className="card shadow-sm">

            <div className="card-body p-4">

                <button
                    className="btn btn-sm btn-light mb-3"
                    onClick={onBack}
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver
                </button>

                <h5 className="fw-bold mb-3">
                    Nueva categoría
                </h5>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Nombre de la categoría
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ej: Guitarra"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                    </div>

                    <div className="d-flex gap-2">

                        <button
                            type="submit"
                            className="btn btn-dark"
                        >
                            Guardar
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={onBack}
                        >
                            Cancelar
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default AddInstrumentCategoryCard;