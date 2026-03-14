import { Link } from "react-router-dom";


function ProfileCard({ user, name, email, role, band }) {

    const show = (value) => value && value.trim() !== "" ? value : "No configurado";


    return (
        <>
            <div className="container-fluid">

                {/* CARD PERFIL */}
                <div className="card shadow-sm mb-4">

                    <div className="card-body">

                        <div className="d-flex align-items-center gap-3 mb-3">

                            <div
                                className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                                style={{ width: "60px", height: "60px" }}
                            >
                                <i className="bi bi-person fs-4 text-secondary"></i>
                            </div>

                            <div>
                                <h5 className="mb-0 fw-bold">
                                    {show(user)}
                                </h5>

                                <small className="text-muted">
                                    {show(email)}
                                </small>
                            </div>

                        </div>

                        <hr />

                        <div className="row g-4">

                            <div className="col-md-6">

                                <small className="text-uppercase text-secondary">
                                    Nombre completo
                                </small>

                                <p className="mb-0 fw-medium">
                                    {show(name)}
                                </p>

                            </div>

                            <div className="col-md-6">

                                <small className="text-uppercase text-secondary">
                                    Correo electrónico
                                </small>

                                <p className="mb-0 fw-medium">
                                    {show(email)}
                                </p>

                            </div>

                            <div className="col-md-6">

                                <small className="text-uppercase text-secondary">
                                    Rol
                                </small>

                                <p className="mb-0 fw-medium">
                                    {show(role)}
                                </p>

                            </div>

                            <div className="col-md-6">

                                <small className="text-uppercase text-secondary">
                                    Banda
                                </small>

                                <p className="mb-0 fw-medium">
                                    {show(band)}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* CARD SEGURIDAD */}
                <div className="card shadow-sm">

                    <div className="card-body">

                        <h6 className="fw-bold">
                            Seguridad
                        </h6>

                        <small className="text-muted">
                            Gestiona la seguridad de tu cuenta
                        </small>

                        <hr />

                        <div className="d-flex justify-content-between align-items-center">

                            <div>

                                <div className="fw-medium">
                                    Contraseña
                                </div>

                                {/*<small className="text-muted">
                                    Última actualización hace 3 meses
                                </small>*/}

                            </div>

                            <Link
                                to="/forgot-password"
                                className="btn btn-outline-secondary btn-sm"
                                id='btnContra'
                            >
                                Cambiar contraseña
                            </Link>


                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}
export default ProfileCard;