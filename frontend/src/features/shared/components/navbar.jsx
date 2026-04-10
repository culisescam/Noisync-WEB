import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../../../assets/logo.png";

function Navbar() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm">
                <div className="container">

                    <Link to="/" className="navbar-brand d-flex align-items-center gap-2 fw-semibold">
                        <img
                            className='logoNav'
                            src={logo}
                            alt="Noisync Logo"
                            width="28"
                            height="28"
                        />
                        Noisync
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                        aria-controls="navbarContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarContent">
                        {/* ↓ Cambio clave aquí */}
                        <div className="d-flex flex-column flex-lg-row gap-2 ms-auto mt-3 mt-lg-0 pb-2 pb-lg-0">

                            <Link
                                to="/login"
                                className="btn btn-outline-secondary btn-sm px-3"
                                id='btnSesion'
                            >
                                Iniciar sesión
                            </Link>

                            <Link
                                to="/registro"
                                className="btn btn-dark btn-sm px-3"
                                id='btnRegistro'
                            >
                                Registrar banda
                            </Link>

                        </div>
                    </div>

                </div>
            </nav>
        </header>
    );
}

export default Navbar;
