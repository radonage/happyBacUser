import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import { countries } from "../../../data/countries";

export default function Login() {

  const [form, setForm] = useState({ email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingForgot, setLoadingForgot] = useState(false);
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
        "http://localhost:8080/api/auth/login",
        form
      );
      
      const userData = res.data;
      setUser(userData);
      const userCountry = countries.find(
        (c) => c.id === userData.countryId
      );
      setSelectedCountry(userCountry || null);
      navigate("/");
    } catch (err) {
      setError("Email ou mot de passe invalide");
    } finally {
      setLoading(false);
    }
  };

  
  const handleForgotPassword = async () => {

    setMessage("");
    setError("");
    setLoadingForgot(true);

    try {
      await axios.post(
        "http://localhost:8080/api/auth/forgot-password",
        null,
        {
          params: { email: forgotEmail }
        }
      );

      setMessage("Email envoyé ! Vérifiez votre boîte mail.");
      setShowForgot(false);
      setForgotEmail("");

    } catch (err) {
      setError("Erreur lors de l'envoi de l'email");
    } finally {
      setLoadingForgot(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 scale-110 animate-zoomSlow">
          <img
            src="/lolimop.png"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative w-full max-w-md p-10 rounded-3xl overflow-hidden glass-card animate-float">
        <div className="absolute inset-0 rounded-3xl borderGlow" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-center mb-2">
            Heureux de vous revoir
          </h1>                    
          <p className="text-center text-white/60 mb-8">
            Connectez vous pour suivre vos cours
          </p>
          {error && (
            <div className="mb-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
              {error}
            </div>
          )}
          {message && (
            <div className="mb-3 text-sm text-green-400 bg-green-500/10 border border-green-500/20 p-3 rounded-xl">
              {message}
            </div>
          )}
          <div className="mb-4">
            <label className="text-xs text-white/60">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              placeholder="you@example.com"
              className={`w-full mt-1 p-3 rounded-xl transition bg-black/30 border border-white/10 outline-none ${focus ? "focusGlow" : ""}`}
            />
          </div>
          <div className="mb-2">
            <label className="text-xs text-white/60">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              placeholder="••••••••"
              className={`w-full mt-1 p-3 rounded-xl transition bg-black/30 border border-white/10 outline-none ${focus ? "focusGlow" : ""}`}
            />
          </div>
          <div className="text-right mb-5">
            <button
              type="button"
              onClick={() => setShowForgot(!showForgot)}
              className="text-xs text-white/50 hover:text-white transition"
            >
              Mot de passe oublié ?
            </button>
          </div>
          {showForgot && (
            <div className="mb-5 p-4 rounded-xl bg-white/5 border border-white/10">
              <input
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="Votre email"
                className="w-full p-2 rounded-lg bg-black/30 border border-white/10 outline-none mb-3"
              />
              <button
                onClick={handleForgotPassword}
                disabled={loadingForgot}
                className="w-full p-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition"
              >
                {loadingForgot ? "Envoi..." : "Envoyer le lien"}
              </button>
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full p-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 hover:scale-[1.03] active:scale-[0.97] transition duration-300 shadow-[0_0_30px_rgba(99,102,241,0.4)]"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </div>
      </div>
    </div>
  );
}