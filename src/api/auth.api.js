import api from "./axios";

// REGISTER
export const register = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// LOGIN (si tu ajoutes après)
export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};