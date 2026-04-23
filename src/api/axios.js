import axios from "axios";

const api = axios.create({
  baseURL: "https://happybacbacendfinal.fly.dev/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;