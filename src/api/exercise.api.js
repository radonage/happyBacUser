import api from "./axios";

export const getExercises = (countryId) =>
  api.get(`/exercises?countryId=${countryId}`);

export const getExercisesByCourse = (courseId, countryId) =>
  api.get(`/exercises/course/${courseId}?countryId=${countryId}`);

export const createExercise = (courseId, countryId, data) =>
  api.post(
    `/exercises?courseId=${courseId}&countryId=${countryId}`,
    data
  );

export const updateExercise = (id, data) =>
  api.put(`/exercises/${id}`, data);

export const deleteExercise = (id) =>
  api.delete(`/exercises/${id}`);   