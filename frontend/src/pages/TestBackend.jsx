import { useState } from "react";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default function TestBackend() {
    const [log, setLog] = useState("");

    const login = async () => {
        try {
            // 👇 Cambia por un usuario real que tengas en tu BD
            const res = await api.post("/api/auth/login", {
                identifier: "davor1",
                password: "Password2",
            });

            localStorage.setItem("token", res.data.token);
            setLog("✅ Login OK\n" + JSON.stringify(res.data, null, 2));
        } catch (e) {
            setLog("❌ Login error\n" + formatErr(e));
        }
    };

    const me = async () => {
        try {
            const res = await api.get("/api/me");
            setLog("✅ /api/me OK\n" + JSON.stringify(res.data, null, 2));
        } catch (e) {
            setLog("❌ /api/me error\n" + formatErr(e));
        }
    };

    const songs = async () => {
        try {
            const res = await api.get("/api/songs");
            setLog("✅ /api/songs OK\n" + JSON.stringify(res.data, null, 2));
        } catch (e) {
            setLog("❌ /api/songs error\n" + formatErr(e));
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setLog("✅ Token eliminado (logout)");
    };

    const formatErr = (e) => {
        if (e?.response?.data) return JSON.stringify(e.response.data, null, 2);
        return e.message || "Error desconocido";
    };

    return (
        <div style={{ padding: 20, fontFamily: "Arial" }}>
            <h2>Test Backend (CORS + JWT)</h2>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button onClick={login}>1) Login</button>
                <button onClick={me}>2) GET /api/me</button>
                <button onClick={songs}>3) GET /api/songs</button>
                <button onClick={logout}>Logout</button>
            </div>

            <pre style={{ marginTop: 20, background: "#111", color: "#0f0", padding: 12, borderRadius: 8 }}>
        {log}
      </pre>
        </div>
    );
}