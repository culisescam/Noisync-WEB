import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <>

            <main style={{ minHeight: "80vh" }}>
                <Outlet />
            </main>

            <Footer />
        </>
    );
}

export default MainLayout;
