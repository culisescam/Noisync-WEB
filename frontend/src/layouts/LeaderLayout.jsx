import { Outlet } from "react-router-dom";
import NavbarLeader from "../features/admin/components/navbarLeade";
import SidebarLeader from "../features/admin/components/sidebarLeader";

function LeaderLayout() {
    return (
        <div className="d-flex flex-column vh-100">
            <NavbarLeader role="leader" />
            <div className="d-flex flex-grow-1 overflow-hidden">

                {/* Sidebar desktop */}
                <div className="border-end bg-white d-none d-lg-flex" style={{ width: "240px" }}>
                    <SidebarLeader />
                </div>

                {/* Offcanvas mobile */}
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="sidebarLeaderOffcanvas">
                    <div className="offcanvas-header border-bottom">
                        <h6 className="offcanvas-title fw-bold">Menú</h6>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                    </div>
                    <div className="offcanvas-body p-0">
                        <SidebarLeader />
                    </div>
                </div>

                <main className="flex-fill overflow-auto p-4 bg-light">
                    {/* Botón hamburguesa móvil */}
                    <button
                        className="btn btn-outline-secondary btn-sm d-lg-none mb-3"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#sidebarLeaderOffcanvas"
                    >
                        <i className="bi bi-list"></i> Menú
                    </button>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default LeaderLayout;