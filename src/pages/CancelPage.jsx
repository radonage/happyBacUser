import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CancelPage() {
    
  const navigate = useNavigate();


  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="absolute w-[500px] h-[500px] bg-red-500/10 blur-[120px] rounded-full" />
      <div className="relative z-10 text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-red-500/10 border border-red-400/30">
            <XCircle size={50} className="text-red-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-red-400">
          Paiement annulé
        </h1>
        <p className="text-gray-400 mt-3">
          Aucun débit n’a été effectué. Tu peux réessayer quand tu veux.
        </p>
        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-gray-300 text-sm">
            Besoin d’aide ? Contacte le support ou réessaie le paiement.
          </p>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
          >
            Retour
          </button>
          <button
            onClick={() => window.history.back()}
            className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-400 transition font-semibold"
          >
            Réessayer
          </button>
        </div>
      </div>
    </div>
  );
}