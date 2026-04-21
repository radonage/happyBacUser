import api from "./axios";

export const getFilieresByCountry = (countryId) =>
  api.get(`/filieres?countryId=${countryId}`)
    .then((res) => {
      return res;
    });

export const createFiliere = (data) =>
  api.post("/filieres", data);

export const updateFiliere = (id, data) =>
  api.put(`/filieres/${id}`, data);

export const deleteFiliere = (id) =>
  api.delete(`/filieres/${id}`);