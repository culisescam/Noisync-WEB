import { api } from "./api";

export async function getMusicians() {
  const res = await api.get("/api/musicians");
  return res.data;
}

export async function removeMusician(musicianId, removeInstruments = false) {
  const res = await api.delete(`/api/musicians/${musicianId}`, {
    params: { removeInstruments },
  });
  return res.data;
}

export async function activateMusician(musicianId, forcePasswordChange = false) {
  const res = await api.put(`/api/musicians/${musicianId}/activate`, null, {
    params: { forcePasswordChange },
  });
  return res.data;
}

export async function resetMusicianPassword(musicianId) {
  const res = await api.post(`/api/musicians/${musicianId}/reset-password`);
  return res.data;
}
export async function updateMusicianInstruments(musicianId, instrumentos) {
    const res = await api.put(`/api/musicians/${musicianId}/instruments`, instrumentos);
    return res.data;
}