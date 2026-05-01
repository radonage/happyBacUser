import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { Check, Sparkles, Star } from "lucide-react";
import { useUser } from "../../../context/UserContext";

export default function StepFiliere({ countryId, onSelect }) {
  const { user } = useUser();

  const [filieres, setFilieres] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!countryId) return;

    setLoading(true);

    api.get(`/filieres?countryId=${countryId}`)
      .then(res => setFilieres(res.data))
      .catch(err => {
        console.error("Erreur filieres:", err);
      })
      .finally(() => setLoading(false));
  }, [countryId]);

  const handlePay = async (f) => {
    try {
      setLoadingId(f.id);

      console.log("👤 USER:", user);

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

      const url = res?.data?.checkoutUrl;

      if (!url) {
        throw new Error("URL de paiement introuvable");
      }

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

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Choisis ta filière
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Accède à tout le contenu avec un seul paiement
        </p>
      </div>

      {/* SCROLL AREA */}
      <div className="max-h-[80vh] overflow-y-auto scrollbar-hide pr-2">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {loading
            ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)

            : filieres.map((f) => (
              <div key={f.id} className="group perspective">

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">

                  <div className="p-5 flex flex-col gap-2">

                    <h3 className="font-semibold text-gray-900 text-lg">
                      {f.name}
                    </h3>

                    <div className="flex items-center gap-1 text-sm">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        4.8 (1200)
                      </span>
                    </div>

                    <p className="text-sm text-gray-500">
                      Parcours structuré pour réussir rapidement avec un guide complet.
                    </p>

                    <div className="text-xs text-gray-600 space-y-1 mt-2">
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-green-500" />
                        Cours + examens corrigés
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-green-500" />
                        Parcours intelligent
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-green-500" />
                        Support IA
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold text-gray-900">
                        49€
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        99€
                      </span>
                      <span className="text-xs text-green-600 font-medium">
                        -50%
                      </span>
                    </div>

                    <button
                      onClick={() => handlePay(f)}
                      disabled={loadingId === f.id}
                      className="mt-3 w-full py-3 rounded-xl font-semibold bg-black text-white hover:bg-gray-900 transition disabled:opacity-50"
                    >
                      {loadingId === f.id ? "En cours ..." : "Acheter maintenant"}
                    </button>

                    <p className="text-[11px] text-gray-400 text-center mt-1">
                      Paiement sécurisé via Stripe
                    </p>

                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

/* Skeleton */
function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="h-40 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-10 bg-gray-200 rounded mt-4" />
      </div>
    </div>
  );
}