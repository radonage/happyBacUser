import api from "./axios";

export const getCourses = (subjectId, countryId) =>
  api.get(`/courses/by-country-subject?subjectId=${subjectId}&countryId=${countryId}`);

export const createCourse = (subjectId, data) =>
  api.post(`/courses?subjectId=${subjectId}`, data);

export const updateCourse = (id, data) =>
  api.put(`/courses/${id}`, data);

export const deleteCourse = (id) =>
  api.delete(`/courses/${id}`);