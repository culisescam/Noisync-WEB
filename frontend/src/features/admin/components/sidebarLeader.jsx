import { NavLink, useNavigate } from "react-router-dom";
import "./styles/sidebarLeader.css";
import { clearSession } from "../../../api/authService";

function SidebarLeader() {

    const navigate = useNavigate();

    const handleLogout = () => {

        const confirmLogout = window.confirm("¿Seguro que quieres cerrar sesión?");

        if (confirmLogout) {
            clearSession(); // elimina todo del localStorage
            navigate("/login");
        }
    };

    return (
        <aside className="d-flex flex-column h-100 p-3" style={{ width: "240px" }}>
            <ul className="nav nav-pills flex-column gap-2">

                <li className="nav-item">
                    <NavLink to="/record-song" className="nav-link d-flex align-items-center gap-3">
                        <i className="bi-music-note-list"></i>
                        <span>Registrar Cancion</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/musician-management" className="nav-link d-flex align-items-center gap-3">
                        <i className="bi bi-person fs-5"></i>
                        <span>Músicos</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/instruments-management" className="nav-link d-flex align-items-center gap-3">
                        <i className="bi bi-tag fs-5"></i>
                        <span>Instrumentos</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/profile" className="nav-link d-flex align-items-center gap-3">
                        <i className="bi bi-person-circle fs-5"></i>
                        <span>Perfil</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/band-profile" className="nav-link d-flex align-items-center gap-3">
                        <i className="bi bi-people fs-5"></i>
                        <span>Perfil Banda</span>
                    </NavLink>
                </li>
            </ul>

            <div className="mt-auto pt-3 border-top">
                <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                >
                    <i className="bi bi-box-arrow-right"></i>
                    Cerrar sesión
                </button>
            </div>
        </aside>
    );
}

export default SidebarLeader;