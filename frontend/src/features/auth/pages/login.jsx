import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import AuthHeader from "../components/AuthHeader";
import FormInput from "../components/FormInput";
import "../components/styles/login.css";
import { loginRequest, saveSession, resendVerification } from "../../../api/authService.js";
import { toastError, toastSuccess } from "../../../api/alerts.js";
import useForm from "../../hooks/useForm";

function Login() {
    const navigate = useNavigate();

    const [showVerifyAlert, setShowVerifyAlert] = useState(false);

    const initialValues = {
        identifier: "",
        password: "",
    };

    const validar = (values) => {
        const e = {};
        const { identifier, password } = values;
        const value = identifier.trim();

        if (!value) {
            e.identifier = "El usuario o correo es obligatorio";
        } else if (value.includes("@")) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) e.identifier = "Correo inválido";
        }

        if (!password.trim()) {
            e.password = "La contraseña es obligatoria";
        }

        return e;
    };

    const { values, errors, submitIntentado, handleChange, handleSubmit } =
        useForm(initialValues, validar);

    const handleResend = async () => {
        try {
            const msg = await resendVerification(values.identifier);
            toastSuccess(msg);
        } catch (e) {
            toastError(e.response?.data || "Espera antes de reenviar");
        }
    };

    const onValidSubmit = async (vals) => {
        try {
            const data = await loginRequest(vals.identifier, vals.password);
            saveSession(data);

            if (data.mustChangePassword) {
                navigate("/change-password");
            } else if (data.role === "LEADER") {
                navigate("/home-leader");
            } else if (data.role === "MUSICIAN") {
                navigate("/home-user");
            }

        } catch (err) {

            const backendMsg =
                err?.response?.data?.message ||
                err?.response?.data?.error;

            if (backendMsg?.includes("verificar tu correo")) {
                setShowVerifyAlert(true);
                return;
            }

            toastError(backendMsg || "Credenciales incorrectas");
        }
    };

    return (
        <div className="login-page">
            <AuthHeader />
            <div className="login-card">

                <h2 className="fw-bold text-center mb-2">
                    Iniciar sesión
                </h2>

                <p className="text-muted text-center mb-4">
                    Accede a tu cuenta de Noisync
                </p>

                {showVerifyAlert && (
                    <div className="alert alert-warning d-flex justify-content-between align-items-center">

                        <div>
                            <strong>Correo no verificado.</strong><br />
                            Verifica tu correo para continuar.
                        </div>

                        <button
                            className="btn btn-sm btn-outline-dark ms-3"
                            onClick={handleResend}
                        >
                            Reenviar
                        </button>

                    </div>
                )}

                <form onSubmit={handleSubmit(onValidSubmit)} noValidate>

                    <FormInput
                        name="identifier"
                        type="text"
                        label="Correo o usuario"
                        placeholder="usuario o tu@email.com"
                        value={values.identifier}
                        onChange={handleChange}
                        required
                        error={errors.identifier}
                        forceValidate={submitIntentado}
                    />

                    <FormInput
                        name="password"
                        label="Contraseña"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={values.password}
                        onChange={handleChange}
                        required
                        error={errors.password}
                        forceValidate={submitIntentado}
                    />

                    <button
                        type="submit"
                        className="btn btn-dark w-100 custom-btn mt-3"
                    >
                        Entrar
                    </button>

                </form>

                <div className="text-center mt-4 small">
                    <Link to="/forgot-password" className="link-text">
                        ¿Olvidaste tu contraseña?
                    </Link>
                    <br />
                    ¿No tienes cuenta?{" "}
                    <Link to="/registro" className="link-text">
                        Registrarse
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Login;