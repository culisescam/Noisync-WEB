import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "../api/authService";

function ProtectedRoute({ allowedRoles }) {

    const { accessToken, role } = getSession();

    if (!accessToken || !role || !allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;

}

export default ProtectedRoute;
