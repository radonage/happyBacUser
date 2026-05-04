import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useUser } from "../../../context/UserContext";
import { useRegister } from "./hooks/useRegister";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

export default function Register() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const hook = useRegister();

  const handleSubmit = async () => {
    try {
      const data = await hook.submit();

      toast.success("Inscription réussie 🎉");

      setUser(data);
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'inscription");
    }
  };

  // INPUT IDENTIQUE LOGIN
  const input =
    "w-full mt-[1%] p-[3%] rounded-xl bg-black/30 border border-white/10 text-white placeholder-white/40 outline-none transition backdrop-blur-xl";

  return (
    <div className="min-h-screen flex items-center justify-center text-white relative overflow-hidden">

      {/* ================= BACKGROUND (LOGIN EXACT STYLE) ================= */}
      <div className="absolute inset-0 overflow-hidden">

        {/* zoom layer */}
        <div className="absolute inset-0 scale-110 animate-zoomSlow">
          <motion.img
            src="/monimage.avif"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        {/* dark overlay (important LOGIN FEEL) */}
        <div className="absolute inset-0 bg-black/40" />

        {/* extra vignette like Login premium feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
      </div>

      {/* ================= CARD CONTAINER (LOGIN IDENTICAL) ================= */}
      <div className="
        relative z-10
        w-[60%] sm:w-[50%] md:w-[65%] lg:w-[35%] xl:w-[28%]
      ">

        <div className="
          relative
          p-[6%]
          rounded-[2vw]
          overflow-hidden
          bg-white/5
          backdrop-blur-3xl
          border border-white/10
        ">

          {/* glow border (LOGIN STYLE EXACT) */}
          <div className="
            absolute inset-0
            rounded-[2vw]
            border border-white/10
            pointer-events-none
          " />

          {/* subtle inner glow */}
          <div className="
            absolute inset-0
            bg-gradient-to-br from-white/5 via-transparent to-transparent
            pointer-events-none
          " />

          {/* ================= CONTENT ================= */}
          <div className="relative z-10">

            <h1 className="text-center text-[1.4rem] font-bold mb-[4%]">
              Créer un compte
            </h1>

            <p className="text-center text-white/60 mb-[6%] text-[0.95rem]">
              Rejoignez la plateforme et commencez à apprendre
            </p>

            <div className="mt-6">

              <AnimatePresence mode="wait">

                {hook.step === 1 && (
                  <Step1 {...hook} input={input} />
                )}

                {hook.step === 2 && (
                  <Step2 {...hook} input={input} />
                )}

                {hook.step === 3 && (
                  <Step3 {...hook} submit={handleSubmit} input={input} />
                )}

              </AnimatePresence>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}