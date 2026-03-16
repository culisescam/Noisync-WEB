import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

function ProtectedRoute({ allowedRoles }) {

    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        const storedToken = localStorage.getItem("accessToken");

        setRole(storedRole);
        setToken(storedToken);
        setLoading(false);
    }, []);

    if (loading) {
        return null;
    }

    if (!token || !role || !allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
