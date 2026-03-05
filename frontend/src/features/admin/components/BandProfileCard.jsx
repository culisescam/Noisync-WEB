import { useNavigate } from "react-router-dom";

function BandProfileCard({
    name,
    genre,
    description,
    instagram,
    facebook,
    twitter,
    youtube,
    website,
    onEdit
}) {

    const user = JSON.parse(localStorage.getItem("user"));
    const isLeader = user?.role === "LEADER";

    return (
        <div className="container-fluid">

            {/* CARD PERFIL BANDA */}
            <div className="card shadow-sm mb-4">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center">

                        <div>
                            <h5 className="fw-bold mb-0">{name}</h5>
                            <small className="text-muted">Perfil de la banda</small>
                        </div>

                        {isLeader && (
                            <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={onEdit}
                            >
                                Editar banda
                            </button>
                        )}

                    </div>

                    <hr />

                    <div className="row g-4">

                        <div className="col-md-6">

                            <small className="text-uppercase text-secondary">
                                Nombre de la banda
                            </small>

                            <p className="mb-0 fw-medium">
                                {name}
                            </p>

                        </div>

                        <div className="col-md-6">

                            <small className="text-uppercase text-secondary">
                                Género musical
                            </small>

                            <p className="mb-0 fw-medium">
                                {genre}
                            </p>

                        </div>

                        <div className="col-12">

                            <small className="text-uppercase text-secondary">
                                Descripción / Biografía
                            </small>

                            <p className="mb-0 fw-medium">
                                {description}
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* REDES SOCIALES */}
            <div className="card shadow-sm mb-4">

                <div className="card-body">

                    <h6 className="fw-bold">Redes sociales</h6>
                    <small className="text-muted">
                        Redes donde los fans pueden encontrar a la banda
                    </small>

                    <hr />

                    <div className="row g-4">

                        <div className="col-md-6">
                            <small className="text-uppercase text-secondary">
                                <i className="bi bi-instagram me-2 text-danger"></i>
                                Instagram
                            </small>
                            <p className="mb-0 fw-medium">{instagram}</p>
                        </div>

                        <div className="col-md-6">
                            <small className="text-uppercase text-secondary">
                                <i className="bi bi-facebook me-2 text-primary"></i>
                                Facebook
                            </small>
                            <p className="mb-0 fw-medium">{facebook}</p>
                        </div>

                        <div className="col-md-6">
                            <small className="text-uppercase text-secondary">
                                <i className="bi bi-twitter me-2 text-info"></i>
                                Twitter / X
                            </small>
                            <p className="mb-0 fw-medium">{twitter}</p>
                        </div>

                        <div className="col-md-6">
                            <small className="text-uppercase text-secondary">
                                <i className="bi bi-youtube me-2 text-danger"></i>
                                YouTube
                            </small>
                            <p className="mb-0 fw-medium">{youtube}</p>
                        </div>

                        <div className="col-12">
                            <small className="text-uppercase text-secondary">
                                <i className="bi bi-globe me-2 text-secondary"></i>
                                Sitio web
                            </small>
                            <p className="mb-0 fw-medium">{website}</p>
                        </div>

                    </div>

                </div>

            </div>




        </div>
    );
}

export default BandProfileCard;