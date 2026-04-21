import api from "./axios";

export const getCountries = () => api.get("/countries");

export const createCountry = (data) =>
  api.post("/countries", data);