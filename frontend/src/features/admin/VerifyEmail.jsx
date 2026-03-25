import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api.js";
import { toastSuccess, toastError } from "../../api/alerts.js";


function VerifyEmail() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const [message, setMessage] = useState(
        token ? "Verificando tu cuenta..." : "Enlace inválido. No se encontró el token."
    );
    const [status, setStatus] = useState(token ? "loading" : "error");

    // useRef para evitar doble ejecución en React StrictMode / doble montaje
    const called = useRef(false);

    useEffect(() => {
        if (!token) return;
        if (called.current) return;
        called.current = true;

        const verify = async () => {
            try {
                await api.get(`/api/auth/verify-email?token=${token}`);
                setMessage("¡Cuenta verificada correctamente!");
                setStatus("success");
                toastSuccess("Cuenta verificada, redirigiendo...");
                setTimeout(() => navigate("/login"), 3000);
            } catch (error) {
                const msg = error?.response?.data?.message || error?.response?.data || "";
                const isExpired = typeof msg === "string" && (
                    msg.toLowerCase().includes("expir") ||
                    msg.toLowerCase().includes("usado") ||
                    msg.toLowerCase().includes("inválido")
                );
                setMessage(isExpired
                    ? "El enlace expiró o ya fue utilizado."
                    : "Ocurrió un error al verificar tu cuenta.");
                setStatus("error");
                toastError(isExpired
                    ? "El enlace es inválido, ya fue usado o expiró."
                    : "Error al verificar el correo.");
            }
        };

        verify();
    }, [token, navigate]);

    const icon = status === "success"
        ? "bi bi-check-circle-fill text-success"
        : status === "error"
            ? "bi bi-x-circle-fill text-danger"
            : "bi bi-envelope-open text-secondary";

    return (
        <div style={{ textAlign: "center", marginTop: "120px", padding: "0 16px" }}>
            {status === "loading" && (
                <div className="spinner-border text-secondary mb-3" role="status" />
            )}
            {status !== "loading" && (
                <i className={`${icon} mb-3`} style={{ fontSize: "3rem", display: "block" }} />
            )}
            <h3>{message}</h3>
            {status === "error" && (
                <p className="text-muted mt-2">
                    Solicita un nuevo enlace desde la pantalla de{" "}
                    <a href="/login">inicio de sesión</a>.
                </p>
            )}
            {status === "success" && (
                <p className="text-muted mt-2">
                    Serás redirigido al inicio de sesión en unos segundos...
                </p>
            )}
        </div>
    );
}

export default VerifyEmail;