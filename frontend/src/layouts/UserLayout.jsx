import { Outlet } from "react-router-dom";
import NavbarLeader from "../features/admin/components/navbarLeade";
import SidebarUser from "../features/users/components/SideBarUser";
import Footer from "../features/shared/components/Footer";

function UserLayout() {
    return (
        <>
            <div className="d-flex flex-column vh-100">
                <NavbarLeader role="user" />
                <div className="d-flex flex-grow-1 overflow-hidden">

                    {/* Sidebar desktop */}
                    <div className="border-end bg-white d-none d-lg-flex" style={{ width: "240px" }}>
                        <SidebarUser />
                    </div>

                    {/* Offcanvas mobile */}
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="sidebarUserOffcanvas">
                        <div className="offcanvas-header border-bottom">
                            <h6 className="offcanvas-title fw-bold">Menú</h6>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                        </div>
                        <div className="offcanvas-body p-0">
                            <SidebarUser />
                        </div>
                    </div>

                    <main className="flex-fill overflow-auto p-4 bg-light">
                        {/* Botón hamburguesa móvil */}
                        <button
                            className="btn btn-outline-secondary btn-sm d-lg-none mb-3"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#sidebarUserOffcanvas"
                        >
                            <i className="bi bi-list"></i> Menú
                        </button>
                        <Outlet />
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserLayout;