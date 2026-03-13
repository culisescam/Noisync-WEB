import { api } from "./api";

export async function getInstruments() {
    const res = await api.get("/api/instruments");
    return res.data;
}

export async function createInstrument(nombre) {
    const res = await api.post("/api/instruments", { nombre });
    return res.data;
}

export async function updateInstrument(id, nombre) {
    const res = await api.put(`/api/instruments/${id}`, { nombre });
    return res.data;
}

export async function deleteInstrument(id) {
    const res = await api.delete(`/api/instruments/${id}`);
    return res.data;
}