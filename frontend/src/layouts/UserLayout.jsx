import { Outlet } from "react-router-dom";
import NavbarLeader from "../features/admin/components/navbarLeade";
import SidebarUser from "../features/users/components/SideBarUser";

function UserLayout() {
    return (
        <div className="d-flex flex-column vh-100">

            {/* Navbar */}
            <NavbarLeader role="user" />
            {/* Contenedor principal */}
            <div className="d-flex flex-grow-1 overflow-hidden">

                {/* Sidebar */}
                <div
                    className="border-end bg-white d-none d-lg-block"
                    style={{ width: "240px" }}
                >
                    <SidebarUser />
                </div>

                {/* CONTENIDO SCROLLABLE */}
                <main className="flex-fill overflow-auto p-4 bg-light">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default UserLayout;