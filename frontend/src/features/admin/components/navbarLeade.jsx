
import { useEffect, useState } from "react";
import "../../shared/styles/navbar.css";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { api } from "../../../api/api";


function NavbarLeader({ role }) {

    const [bandName, setBandName] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: ""
    });

    const homeRoute = role === "leader" ? "/home-leader" : "/home-user";

    useEffect(() => {
        const loadData = async () => {
            try {
                const bandRes = await api.get("/api/band");
                const userRes = await api.get("/api/me");

                setBandName(bandRes.data.nombre);
                setUser({
                    name: userRes.data.username,
                    email: userRes.data.correo
                });

                localStorage.setItem("user", JSON.stringify({
                    name: userRes.data.nombreUsuario,
                    email: userRes.data.email
                }));

            } catch (error) {
                console.error("Error cargando navbar:", error);

                const storedUser = JSON.parse(localStorage.getItem("user"));
                if (storedUser) setUser(storedUser);
            }
        };

        loadData();
    }, []);

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm">
                <div className="container">

                    <Link
                        to={homeRoute}
                        className="navbar-brand d-flex align-items-center gap-2 fw-semibold"
                    >
                        <img
                            className="logoNav"
                            src={logo}
                            alt="Noisync Logo"
                            width="28"
                            height="28"
                        />
                        {bandName || "MiBanda"}
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarLeaderContent"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarLeaderContent"
                    >
                        {/* ↓ Columna en móvil, fila en desktop */}
                        <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2 gap-lg-3 ms-auto mt-3 mt-lg-0 pb-2 pb-lg-0 w-100 w-lg-auto">

                            {/* Dropdown nombre */}
                            <div className="dropdown w-100 w-lg-auto">
                                <button
                                    className="btn btn-light btn-sm dropdown-toggle w-100 w-lg-auto text-start"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {user.name || "Usuario"}
                                </button>

                                <ul className="dropdown-menu dropdown-menu-lg-end">
                                    <li>
                                        <span className="dropdown-item-text text-muted" style={{ fontSize: "0.85rem" }}>
                                            {user.email}
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* Avatar */}
                            <div className="dropdown">
                                <button
                                    className="btn p-0 border-0 bg-transparent"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <div
                                        className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                                        style={{ width: "34px", height: "34px" }}
                                    >
                                        <i className="bi bi-person"></i>
                                    </div>
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </nav>
        </header>
    );
}

export default NavbarLeader;
