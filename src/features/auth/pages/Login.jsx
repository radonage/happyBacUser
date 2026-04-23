import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import { countries } from "../../../data/countries";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false);

  const { setUser, setSelectedCountry } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://happybacbacendfinal.fly.dev/api/auth/login",
        form
      );

      const userData = res.data;

      setUser(userData);

      const userCountry = countries.find(
        (c) => c.id === userData.countryId
      );

      setSelectedCountry(userCountry || null);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("selectedCountry", JSON.stringify(userCountry));

      navigate("/");
    } catch (err) {
      setError("Email ou mot de passe invalide");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white relative overflow-hidden">

      {/* 🌈 BACKGROUND ANIMÉ ZOOM */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 scale-110 animate-zoomSlow">
          <img
            src="/lolimop.png"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 💎 FLOATING GLASS CARD */}
      <div className="relative w-full max-w-md p-10 rounded-3xl overflow-hidden
        glass-card animate-float">

        {/* 🌟 BORDER GLOW ANIMÉ */}
        <div className="absolute inset-0 rounded-3xl borderGlow" />

        <div className="relative z-10">

          <h1 className="text-3xl font-bold text-center mb-2">
            Heureux de vous revoir
          </h1>

          <p className="text-center text-white/60 mb-8">
            Connectez vous pour suivre vos cours
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
              {error}
            </div>
          )}

          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-xs text-white/60">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              placeholder="you@example.com"
              className={`w-full mt-1 p-3 rounded-xl transition
                bg-black/30 border border-white/10 outline-none
                ${focus ? "focusGlow" : ""}`}
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <label className="text-xs text-white/60">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              placeholder="••••••••"
              className={`w-full mt-1 p-3 rounded-xl transition
                bg-black/30 border border-white/10 outline-none
                ${focus ? "focusGlow" : ""}`}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full p-3 rounded-xl font-semibold
            bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500
            hover:scale-[1.03] active:scale-[0.97]
            transition duration-300
            shadow-[0_0_30px_rgba(99,102,241,0.4)]"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

          <p className="text-center text-xs text-white/40 mt-6">
            Mot de passe oublié ?
          </p>

        </div>
      </div>
    </div>
  );
}