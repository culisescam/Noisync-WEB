import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";
import FormInput from "../components/FormInput";
import "../components/styles/login.css";
<<<<<<< Updated upstream

import { loginRequest, saveSession } from "../../../api/authService";
=======
import useForm from "../../hooks/useForm";

>>>>>>> Stashed changes

function Login() {
    const navigate = useNavigate();

<<<<<<< Updated upstream
    const [email, setEmail] = useState("");      // aquí guardamos "correo o usuario"
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(""); // para mostrar error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            // backend espera: { identifier, password }
            const data = await loginRequest(email, password);

            saveSession(data);

            // redirección por rol
            if (data.role === "LEADER") navigate("/home-leader");
            else navigate("/"); // o crea /home-musician si quieres
        } catch (err) {
            const backendMsg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Credenciales incorrectas";
            setErrorMsg(backendMsg);
        }
=======
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

    const onValidSubmit = async (vals) => {
        console.log("Login válido:", vals);

        // Aquí normalmente llamas tu API de login:
        // const { token, role } = await api.login(vals);

        // Ejemplo de navegación (ajústalo a tu flujo real):
        // navigate("/home-leader", { replace: true });
>>>>>>> Stashed changes
    };

    return (
        <div className="login-page">
            <AuthHeader />

            <div className="login-card">
                <h2 className="fw-bold text-center mb-2">Iniciar sesión</h2>
<<<<<<< Updated upstream
                <p className="text-muted text-center mb-4">
                    Accede a tu cuenta de Noisync
                </p>

                <form onSubmit={handleSubmit}>
=======
                <p className="text-muted text-center mb-4">Accede a tu cuenta de Noisync</p>

                <form onSubmit={handleSubmit(onValidSubmit)} noValidate>
>>>>>>> Stashed changes
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

                    {/* error visible */}
                    {errorMsg && (
                        <div className="alert alert-danger py-2 mt-2 mb-0">
                            {errorMsg}
                        </div>
                    )}

                    <button type="submit" className="btn btn-dark w-100 custom-btn mt-3">
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