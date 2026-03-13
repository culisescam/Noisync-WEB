import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { api } from "../../api/api.js";
import { toastSuccess, toastError, toastInfo, confirmDelete, confirmAction } from "../../api/alerts.js";


function VerifyEmail() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const [message, setMessage] = useState("Verificando tu cuenta...");

    useEffect(() => {
        let cancelled = false;

        const verify = async () => {
            try {
                await api.get(`/api/auth/verify-email?token=${token}`);
                if (!cancelled) {
                    setMessage("Cuenta verificada correctamente");
                    toastSuccess("Cuenta verificada, redirigiendo...");
                    setTimeout(() => navigate("/login"), 3000);
                }
            } catch (error) {
                if (!cancelled) {
                    setMessage("El enlace es inválido o expiró");
                    toastError("El enlace es inválido o ya fue usado");
                }
            }
        };

        if (token) verify();

        return () => { cancelled = true; };
    }, [token]);

    return (
        <div style={{ textAlign: "center", marginTop: "120px" }}>
            <h3>{message}</h3>
        </div>
    );
}

export default VerifyEmail;