import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { Check, Sparkles } from "lucide-react";
import { useUser } from "../../../context/UserContext";

export default function StepFiliere({ countryId, onSelect }) {
  const { user } = useUser();

  const [filieres, setFilieres] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // ✅ mieux que boolean

  useEffect(() => {
    if (!countryId) return;

    api.get(`/filieres?countryId=${countryId}`)
      .then(res => setFilieres(res.data))
      .catch(err => {
        console.error("Erreur filieres:", err);
      });
  }, [countryId]);

  const handlePay = async (f) => {
    try {
      setLoadingId(f.id);

      console.log("👤 USER:", user);

      // ✅ check user
      if (!user?.email) {
        alert("Utilisateur non connecté");
        return;
      }

      const payload = {
        filiereId: f.id,
        email: user.email
      };

      console.log("📤 PAYMENT PAYLOAD SENT:", payload);

      const res = await api.post("/payments/checkout", payload);

      console.log("📥 RESPONSE:", res.data);

      // ✅ CORRECTION ICI 👇
      const url = res?.data?.checkoutUrl;

      if (!url) {
        throw new Error("URL de paiement introuvable");
      }

      // ✅ redirection Stripe
      window.location.href = url;

    } catch (err) {
      console.error("❌ PAYMENT ERROR:", err);
      alert("Erreur lors du paiement");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 via-purple-300 to-pink-300 text-transparent bg-clip-text">
          Choisis ta filière
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Accède à tout le contenu avec un seul paiement
        </p>
      </div>

      <div className="relative">

        <div className="pointer-events-none absolute top-0 left-0 right-0 h-10 z-10 from-black/60 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 z-10 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="max-h-[60vh] overflow-y-auto scroll-smooth pr-2
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-8">

            {filieres.map((f) => (
              <div
                key={f.id}
                className="group relative rounded-2xl p-[1px]
                  bg-gradient-to-r from-emerald-500 via-purple-500 to-pink-500
                  hover:scale-[1.02] transition duration-300"
              >

                <div className="rounded-2xl bg-black/40 backdrop-blur-xl
                  p-5 flex flex-col justify-between min-h-[180px]
                  relative overflow-hidden">

                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500 blur-[90px] opacity-20" />

                  <div
                    onClick={() => onSelect(f)}
                    className="cursor-pointer relative z-10"
                  >

                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">
                        {f.name}
                      </h3>

                      <span className="flex items-center gap-1 text-xs text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded-full">
                        <Sparkles size={12} />
                        Premium
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm mt-2">
                      Accès complet aux cours et examens
                    </p>

                    <div className="mt-3 space-y-1 text-xs text-gray-300">
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-emerald-400" />
                        Parcours personnalisé
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-emerald-400" />
                        Examens corrigés
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-emerald-400" />
                        Recommandations IA
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 relative z-10">
                    <button
                      onClick={() => handlePay(f)}
                      disabled={loadingId === f.id}
                      className="w-full py-3 rounded-xl font-semibold
                        bg-gradient-to-r from-emerald-500 to-purple-600
                        shadow-lg shadow-purple-500/20
                        hover:shadow-purple-500/40
                        hover:scale-[1.02]
                        transition-all duration-300
                        disabled:opacity-50"
                    >
                      {loadingId === f.id ? "Traitement..." : "Payer et commencer"}
                    </button>

                    <p className="text-[11px] text-gray-400 text-center mt-2">
                      Paiement sécurisé via Stripe
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}