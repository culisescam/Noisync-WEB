import { useState } from "react";

function InviteMusicianCard({ onBack }) {

    const [form, setForm] = useState({
        name: "",
        email: "",
        instrument: "Guitarra",
        role: "Músico",
        message: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Invitación enviada:", form);

        alert("Invitación enviada (simulado)");

        onBack(); // vuelve a la tabla después de enviar
    };

    return (

        <div className="card shadow-sm">

            <div className="card-body p-4">

                {/* VOLVER */}
                <button
                    className="btn btn-sm btn-light mb-3"
                    onClick={onBack}
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver
                </button>

                {/* HEADER */}
                <div className="d-flex align-items-center mb-3">

                    <div
                        className="bg-light rounded d-flex align-items-center justify-content-center me-3"
                        style={{ width: "40px", height: "40px" }}
                    >
                        <i className="bi bi-person-plus"></i>
                    </div>

                    <div>
                        <h5 className="mb-0 fw-bold">
                            Invitar nuevo músico
                        </h5>

                        <small className="text-muted">
                            Agrega un nuevo integrante enviándole una invitación por correo electrónico
                        </small>
                    </div>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">
                            Nombre del músico
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Ej: Juan Pérez"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="mb-3">
                        <label className="form-label">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="ejemplo@correo.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="row mb-3">

                        <div className="col-md-6">

                            <label className="form-label">
                                Instrumento
                            </label>

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
                                <option>Voz</option>
                            </select>

                        </div>



                    </div>


                    <div className="mb-3">

                        <label className="form-label">
                            Mensaje de invitación
                            <span className="text-muted"> (opcional)</span>
                        </label>

                        <textarea
                            className="form-control"
                            rows="4"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="alert alert-light border small">

                        <i className="bi bi-info-circle me-2"></i>

                        Se enviará una invitación por correo electrónico al músico.
                        Podrá aceptar o rechazar la invitación desde su bandeja de entrada.

                    </div>


                    <div className="d-flex gap-2">

                        <button
                            type="submit"
                            className="btn btn-dark"
                        >
                            <i className="bi bi-envelope me-2"></i>
                            Enviar invitación
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

export default InviteMusicianCard;