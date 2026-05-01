import { CheckCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">

      <div className="absolute w-[500px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full" />

      <div className="relative z-10 text-center max-w-md">

        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-400/30">
            <CheckCircle size={50} className="text-emerald-400" />
          </div>
        </div>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-green-400 text-transparent bg-clip-text">
          Paiement réussi 🎉
        </h1>

        <p className="text-gray-400 mt-3">
          Ton accès a été activé avec succès. Tu peux maintenant profiter de tout le contenu.
        </p>
        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-center gap-2 text-emerald-300">
            <Sparkles size={16} />
            <span>Accès Premium activé</span>
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 transition font-semibold"
        >
          Commencer maintenant
        </button>
        <p className="text-xs text-gray-500 mt-3">
          Merci pour ta confiance 💚
        </p>
      </div>
    </div>
  );
}