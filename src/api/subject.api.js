import api from "./axios";

export const getSubjects = (countryId, levelId) => {
  const params = new URLSearchParams();

  if (countryId) params.append("countryId", countryId);
  if (levelId) params.append("levelId", levelId);

  return api.get(`/subjects/filter?${params.toString()}`);
};

export const createSubject = (levelId, data) =>
  api.post(`/subjects?levelId=${levelId}`, data);

export const updateSubject = (id, data) =>
  api.put(`/subjects/${id}`, data);

export const deleteSubject = (id) =>
  api.delete(`/subjects/${id}`);