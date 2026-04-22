// src/pages/auth/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import { countries } from "../../../data/countries"; // Ajuste le chemin selon ton projet

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); 
  const { setUser, setSelectedCountry } = useUser(); // utiliser le contexte
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login", // URL API
        form
      );

      const userData = response.data;

      // 🔹 Mettre à jour le contexte utilisateur
      setUser(userData);

      // 🔹 Récupérer le vrai pays depuis countries.js
      const userCountry = countries.find(c => c.id === userData.countryId);
      setSelectedCountry(userCountry || null); // fallback si non trouvé

      // 🔹 Persister dans localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("selectedCountry", JSON.stringify(userCountry));

      // 🔹 Rediriger vers la page principale
      navigate("/");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Email ou mot de passe invalide");
      } else {
        setError("Erreur serveur. Réessayez plus tard.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-xl bg-black/40 border border-white/10"
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-xl bg-black/40 border border-white/10"
        />

        <button
          onClick={handleSubmit}
          className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500"
        >
          Login
        </button>
      </div>
    </div>
  );
}