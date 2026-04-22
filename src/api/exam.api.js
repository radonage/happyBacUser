import api from "./axios";

export const getExams = (countryId) =>
  api.get(`/exams?countryId=${countryId}`);

export const createExam = (countryId, data) =>
  api.post(`/exams?countryId=${countryId}`, data);

export const updateExam = (id, countryId, data) =>
  api.put(`/exams/${id}?countryId=${countryId}`, data);

export const deleteExam = (id, countryId) =>
  api.delete(`/exams/${id}?countryId=${countryId}`);
 
