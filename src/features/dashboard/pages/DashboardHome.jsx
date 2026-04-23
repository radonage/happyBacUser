import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../../../context/UserContext";
import { PlayCircle, TrendingUp, Flame, BookOpen, GraduationCap, Compass } from "lucide-react";

function GlassCard({ icon: Icon, title, desc, value }) {
  return (
    <div className="p-[1px] rounded-2xl bg-gradient-to-r from-emerald-500 via-purple-500 to-pink-500">
      <div className="bg-black/40 backdrop-blur-xl p-5 rounded-2xl border border-white/10 hover:bg-white/5 transition">
        <Icon className="text-white/80 mb-2" />
        <h3 className="font-semibold">{title}</h3>
        {desc && <p className="text-gray-400 text-xs mt-1">{desc}</p>}
        {value && <p className="text-lg font-bold mt-2">{value}</p>}
      </div>
    </div>
  );
}

function UserDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        <GlassCard icon={TrendingUp} title="Progression" value="68%" />
        <GlassCard icon={Flame} title="Streak" value="5 jours" />
        <GlassCard icon={GraduationCap} title="Objectif" value="Bac mention" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <QuickCard icon={BookOpen} title="Cours" />
        <QuickCard icon={PlayCircle} title="Exercices" />
        <QuickCard icon={BookOpen} title="Examens" />
        <QuickCard icon={Compass} title="Orientation" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <GlassCard
          icon={BookOpen}
          title="Maths - Fonctions"
          desc="Continue ton dernier cours"
        />
        <GlassCard
          icon={PlayCircle}
          title="Exercice du jour"
          desc="Probabilités avancées"
        />
      </div>

    </div>
  );
}

function QuickCard({ icon: Icon, title }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex items-center gap-3 hover:bg-white/10 transition cursor-pointer">
      <Icon className="text-white/70" />
      <span className="font-medium">{title}</span>
    </div>
  );
}

function LandingContent({ navigate }) {
  return (
    <div className="max-w-7xl mx-auto space-y-10 text-center">
      <div>
        <h1 style={{ fontSize: "30px" }} className="text-10xl font-extrabold bg-gradient-to-r from-emerald-300 via-purple-300 to-pink-300 text-transparent bg-clip-text">
          🎓 Happy Bac
        </h1>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
          La plateforme intelligente qui te guide vers ton bac avec cours, exercices, examens et orientation personnalisée.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <motion.button
            onClick={() => navigate("/explorer")}
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-purple-600 font-semibold shadow-xl"
          >
            <PlayCircle className="inline mr-2" />
            Commencer les cours
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          onClick={() => navigate("/exams")}
          className="relative rounded-2xl overflow-hidden h-60 text-white shadow-lg cursor-pointer flex items-center justify-center text-center hover:scale-[1.02] transition"
          style={{
            backgroundImage: "url('/certifications.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center">
            <BookOpen className="mb-2" />
            <h3 className="text-xl font-semibold">Examens</h3>
            <p className="text-sm opacity-90">
              Sujets corrigés et entraînement Bac
            </p>
          </div>
        </div>
        <div
          onClick={() => navigate("/orientation")}
          className="relative rounded-2xl overflow-hidden h-60 text-white shadow-lg cursor-pointer flex items-center justify-center text-center hover:scale-[1.02] transition"
          style={{
            backgroundImage: "url('/data-science.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center">
            <Compass className="mb-2" />
            <h3 className="text-xl font-semibold">Orientation</h3>
            <p className="text-sm opacity-90">
              Découvre les filières qui te correspondent
            </p>
          </div>
        </div>
        <div
          onClick={() => navigate("/etudes")}
          className="relative rounded-2xl overflow-hidden h-60 text-white shadow-lg cursor-pointer flex items-center justify-center text-center hover:scale-[1.02] transition"
          style={{
            backgroundImage: "url('/udemy.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center">
            <BookOpen className="mb-2" />
            <h3 className="text-xl font-semibold">Études</h3>
            <p className="text-sm opacity-90">
              Études à l'étranger
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= MAIN ================= */
export default function DashboardHome() {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="min-h-screen text-white relative overflow-hidden">

      {/* BACKGROUND IMAGE ANIMÉE */}
      <div className="absolute inset-0">
        <motion.img
          src="/monimagefordash.avif"
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

        {/* OVERLAYS POUR LISIBILITÉ */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90" />
      </div>

      {/* GLOW EFFECTS (comme Explorer) */}
      <div className="absolute top-[-120px] left-[-120px] w-[450px] h-[450px] bg-emerald-400 blur-[180px] opacity-20 animate-pulse" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[450px] h-[450px] bg-purple-600 blur-[200px] opacity-20 animate-pulse" />

      {/* CONTENT */}
      <div className="relative w-full px-6">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="mt-[50px] text-7xl font-extrabold bg-gradient-to-r from-emerald-300 via-purple-300 to-pink-300 text-transparent bg-clip-text">
            🎓 Happy Bac
          </h1>
          <p className="text-gray-300 text-sm mt-2">
            Plateforme intelligente de réussite scolaire
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-center mb-10">
          <motion.button
            onClick={() => navigate(user ? "/explorer" : "/register")}
            whileHover={{ scale: 1.05 }}
            className="px-10 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-purple-600 shadow-xl flex items-center gap-2"
          >
            <PlayCircle />
            {user ? "Continuer" : "Commencer gratuitement"}
          </motion.button>
        </div>

        {/* CONTENT CONDITIONAL */}
        {user ? <UserDashboard /> : <LandingContent navigate={navigate} />}

      </div>
    </div>
  );
}