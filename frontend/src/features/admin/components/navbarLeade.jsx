
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
                        className="collapse navbar-collapse justify-content-end"
                        id="navbarLeaderContent"
                    >
                        <div className="d-flex align-items-center gap-3">

                            <div className="dropdown">
                                <button
                                    className="btn btn-light btn-sm dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                >
                                    {user.name || "Usuario"}
                                </button>

                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <span className="dropdown-item-text">
                                            {user.email}
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="dropdown">
                                <button
                                    className="btn p-0 border-0 bg-transparent"
                                    data-bs-toggle="dropdown"
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
