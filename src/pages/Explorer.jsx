import { motion } from "framer-motion";
import WizardContainer from "../components/wizard/WizardContainer";

export default function Explorer() {
  return (
    <div className="min-h-screen relative overflow-hidden text-white">

      {/* BACKGROUND IMAGE ANIMÉE */}
      <div className="absolute inset-0">
        <motion.img
          src="/lolilol.jpg"
          initial={{ scale: 1 }}
          animate={{ scale: 1.12 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="w-full h-full object-cover opacity-50"
        />

        {/* OVERLAY DARK + DEPTH */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90" />
      </div>

      {/* GLOW EFFECTS (comme ton register) */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-emerald-400 blur-[160px] opacity-25 animate-pulse" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-purple-600 blur-[180px] opacity-25 animate-pulse" />

      {/* CONTENT */}
      <div className="relative max-w-5xl mx-auto p-6">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Explorer les matières
        </motion.h1>

        {/* GLASS CONTAINER (SAME SAAS STYLE AS REGISTER) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-[1px] bg-gradient-to-r from-emerald-500 via-purple-500 to-pink-500 shadow-2xl"
        >
          <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-8 border border-white/10">

            <WizardContainer />

          </div>
        </motion.div>

      </div>
    </div>
  );
}