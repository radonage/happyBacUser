import api from "./axios";

export const getLevels = (countryId, filiereId) => {
  const params = new URLSearchParams();

  if (countryId) params.append("countryId", countryId);
  if (filiereId) params.append("filiereId", filiereId);

  return api.get(`/levels/filter?${params.toString()}`);
};

// CREATE level
export const createLevel = (countryId, data) =>
  api.post(`/levels?countryId=${countryId}`, data);

// UPDATE level
export const updateLevel = (id, data) =>
  api.put(`/levels/${id}`, data);

// DELETE level
export const deleteLevel = (id) =>
  api.delete(`/levels/${id}`);