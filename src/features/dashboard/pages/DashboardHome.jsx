import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../../../context/UserContext";
import { PlayCircle, TrendingUp, Flame, BookOpen, GraduationCap, Compass } from "lucide-react";

function GlassCard({ icon: Icon, title, desc, value }) {
  return (
    <div className="p-[1px] rounded-2xl bg-gradient-to-r from-emerald-500 via-purple-500 to-pink-500">
      <div className="bg-black/40 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-white/10 hover:bg-white/5 transition h-full">
        <Icon className="text-white/80 mb-2" size={20} />
        <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
        {desc && <p className="text-gray-400 text-xs mt-1">{desc}</p>}
        {value && <p className="text-lg sm:text-xl font-bold mt-2">{value}</p>}
      </div>
    </div>
  );
}

function QuickCard({ icon: Icon, title }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center gap-3 hover:bg-white/10 transition cursor-pointer">
      <Icon className="text-white/70" size={20} />
      <span className="font-medium text-sm sm:text-base">{title}</span>
    </div>
  );
}

function UserDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <GlassCard icon={TrendingUp} title="Progression" value="68%" />
        <GlassCard icon={Flame} title="Streak" value="5 jours" />
        <GlassCard icon={GraduationCap} title="Objectif" value="Bac mention" />
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <QuickCard icon={BookOpen} title="Cours" />
        <QuickCard icon={PlayCircle} title="Exercices" />
        <QuickCard icon={BookOpen} title="Examens" />
        <QuickCard icon={Compass} title="Orientation" />
      </div>

      {/* CONTINUE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

function LandingContent({ navigate }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">

      <div>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm sm:text-base">
          La plateforme intelligente qui te guide vers ton bac avec cours, exercices, examens et orientation personnalisée.
        </p>

        <div className="flex justify-center mt-6">
          <motion.button
            onClick={() => navigate("/explorer")}
            whileHover={{ scale: 1.05 }}
            className="px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-purple-600 font-semibold shadow-xl text-sm sm:text-base"
          >
            <PlayCircle className="inline mr-2" size={18} />
            Commencer les cours
          </motion.button>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[{
          title: "Examens",
          icon: BookOpen,
          img: "/certifications.webp",
          route: "/exams",
          desc: "Sujets corrigés et entraînement Bac"
        }, {
          title: "Orientation",
          icon: Compass,
          img: "/data-science.webp",
          route: "/orientation",
          desc: "Découvre les filières"
        }, {
          title: "Études",
          icon: BookOpen,
          img: "/udemy.webp",
          route: "/etudes",
          desc: "Études à l'étranger"
        }].map((card, i) => (
          <div
            key={i}
            onClick={() => navigate(card.route)}
            className="relative rounded-2xl overflow-hidden h-48 sm:h-56 lg:h-60 text-white shadow-lg cursor-pointer flex items-center justify-center text-center hover:scale-[1.02] transition"
            style={{
              backgroundImage: `url(${card.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center px-4">
              <card.icon className="mb-2" />
              <h3 className="text-lg sm:text-xl font-semibold">{card.title}</h3>
              <p className="text-xs sm:text-sm opacity-90">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default function DashboardHome() {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="min-h-screen text-white relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <motion.img
          src="/monimagefordash.avif"
          initial={{ scale: 1 }}
          animate={{ scale: 1.12 }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90" />
      </div>

      {/* BLOBS */}
      <div className="absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-emerald-400 blur-[140px] opacity-20 animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600 blur-[160px] opacity-20 animate-pulse" />

      {/* CONTENT */}
      <div className="relative w-full">

        {/* HEADER */}
        <div className="text-center mb-10 px-4">
          <h1 className="mt-10 text-4xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-emerald-300 via-purple-300 to-pink-300 text-transparent bg-clip-text">
            🎓 Happy Bac
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm mt-2">
            Plateforme intelligente de réussite scolaire
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-center mb-10 px-4">
          <motion.button
            onClick={() => navigate(user ? "/explorer" : "/register")}
            whileHover={{ scale: 1.05 }}
            className="px-6 sm:px-10 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-purple-600 shadow-xl flex items-center gap-2 text-sm sm:text-base"
          >
            <PlayCircle size={18} />
            {user ? "Continuer" : "Commencer gratuitement"}
          </motion.button>
        </div>

        {user ? <UserDashboard /> : <LandingContent navigate={navigate} />}
      </div>
    </div>
  );
}
