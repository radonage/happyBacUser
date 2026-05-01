import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../../../context/UserContext";
import {
  PlayCircle,
  TrendingUp,
  Flame,
  BookOpen,
  GraduationCap,
  Compass
} from "lucide-react";

/* =========================
   GLASS CARD PRO (FLUID)
========================= */
function GlassCard({ icon: Icon, title, desc, value }) {
  return (
    <div className="p-[1px] rounded-2xl bg-gradient-to-r from-emerald-500 via-purple-500 to-pink-500">
      <div className="h-full rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10
        p-[clamp(12px,1.5vw,18px)]
        transition-all duration-300 ease-out
        hover:scale-[1.02] hover:bg-white/5"
      >
        <Icon className="text-white/80 mb-3" size={20} />

        <h3 className="font-semibold text-[clamp(13px,1.1vw,17px)]">
          {title}
        </h3>

        {desc && (
          <p className="text-gray-400 text-[clamp(11px,0.9vw,13px)] mt-1">
            {desc}
          </p>
        )}

        {value && (
          <p className="text-[clamp(15px,1.4vw,20px)] font-bold mt-3">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================
   QUICK CARD (FLUID)
========================= */
function QuickCard({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl
      bg-white/5 backdrop-blur-xl border border-white/10
      p-[clamp(10px,1.2vw,16px)]
      hover:bg-white/10 hover:scale-[1.02]
      transition-all duration-300"
    >
      <Icon className="text-white/70" size={18} />
      <span className="font-medium text-[clamp(11px,1vw,15px)]">
        {title}
      </span>
    </div>
  );
}

/* =========================
   USER DASHBOARD (STRIPE GRID)
========================= */
function UserDashboard() {
  return (
    <div className="max-w-[1200px] mx-auto px-[clamp(12px,3vw,40px)]
      space-y-[clamp(14px,2vw,28px)]"
    >

      {/* STATS (ULTRA FLUID GRID) */}
      <div className="grid
        grid-cols-[repeat(auto-fit,minmax(180px,1fr))]
        gap-[clamp(10px,1.5vw,18px)]"
      >
        <GlassCard icon={TrendingUp} title="Progression" value="68%" />
        <GlassCard icon={Flame} title="Streak" value="5 jours" />
        <GlassCard icon={GraduationCap} title="Objectif" value="Bac mention" />
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid
        grid-cols-[repeat(auto-fit,minmax(140px,1fr))]
        gap-[clamp(8px,1.2vw,14px)]"
      >
        <QuickCard icon={BookOpen} title="Cours" />
        <QuickCard icon={PlayCircle} title="Exercices" />
        <QuickCard icon={BookOpen} title="Examens" />
        <QuickCard icon={Compass} title="Orientation" />
      </div>

      {/* CONTINUE */}
      <div className="grid
        grid-cols-[repeat(auto-fit,minmax(240px,1fr))]
        gap-[clamp(12px,2vw,20px)]"
      >
        <GlassCard icon={BookOpen} title="Maths - Fonctions" desc="Continue ton cours" />
        <GlassCard icon={PlayCircle} title="Exercice du jour" desc="Probabilités avancées" />
      </div>

    </div>
  );
}

/* =========================
   LANDING (FLUID CARDS)
========================= */
function LandingContent({ navigate }) {
  return (
    <div className="max-w-[1200px] mx-auto px-[clamp(12px,3vw,40px)]
      text-center space-y-[clamp(20px,3vw,50px)]"
    >

      <p className="text-gray-400 max-w-[700px] mx-auto
        text-[clamp(12px,1.1vw,17px)] leading-relaxed"
      >
        La plateforme intelligente qui te guide vers ton bac avec cours, exercices, examens et orientation personnalisée.
      </p>

      {/* CTA */}
      <div className="flex justify-center">
        <motion.button
          onClick={() => navigate("/explorer")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="px-[clamp(16px,2.5vw,32px)]
            py-[clamp(10px,1.2vw,14px)]
            rounded-xl bg-gradient-to-r from-emerald-500 to-purple-600
            shadow-xl font-semibold"
        >
          <PlayCircle className="inline mr-2" size={18} />
          Commencer les cours
        </motion.button>
      </div>

      {/* CARDS (FLUID STRIPE STYLE) */}
      <div className="grid
        grid-cols-[repeat(auto-fit,minmax(220px,1fr))]
        gap-[clamp(12px,1.8vw,22px)]"
      >
        {[
          {
            title: "Examens",
            icon: BookOpen,
            img: "/certifications.webp",
            route: "/exams",
            desc: "Sujets Bac corrigés"
          },
          {
            title: "Orientation",
            icon: Compass,
            img: "/data-science.webp",
            route: "/orientation",
            desc: "Découvre les filières"
          },
          {
            title: "Études",
            icon: BookOpen,
            img: "/udemy.webp",
            route: "/etudes",
            desc: "Études à l'étranger"
          }
        ].map((card, i) => (
          <div
            key={i}
            onClick={() => navigate(card.route)}
            className="relative rounded-2xl overflow-hidden cursor-pointer
              aspect-[4/3]
              group hover:scale-[1.02] transition-all duration-300"
            style={{
              backgroundImage: `url(${card.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
              <card.icon className="mb-2 opacity-90" />
              <h3 className="text-[clamp(14px,1.3vw,20px)] font-semibold">
                {card.title}
              </h3>
              <p className="text-[clamp(11px,0.9vw,13px)] opacity-80">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   MAIN
========================= */
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
          animate={{ scale: 1.1 }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90" />
      </div>

      {/* BLOBS */}
      <div className="absolute -top-32 -left-32 w-[40vw] h-[40vw] bg-emerald-400 blur-[150px] opacity-20" />
      <div className="absolute -bottom-32 -right-32 w-[40vw] h-[40vw] bg-purple-600 blur-[160px] opacity-20" />

      {/* HEADER */}
      <div className="relative text-center pt-[clamp(40px,6vw,100px)] px-4">
        <h1 className="font-extrabold bg-gradient-to-r from-emerald-300 via-purple-300 to-pink-300 text-transparent bg-clip-text
          text-[clamp(32px,4.5vw,70px)]"
        >
          🎓 Happy Bac
        </h1>

        <p className="text-gray-300 mt-2 text-[clamp(12px,1vw,15px)]">
          Plateforme intelligente de réussite scolaire
        </p>

        {/* CTA */}
        <div className="flex justify-center mt-[clamp(18px,3vw,35px)]">
          <motion.button
            onClick={() => navigate(user ? "/explorer" : "/register")}
            whileHover={{ scale: 1.05 }}
            className="px-[clamp(16px,2.5vw,30px)]
              py-[clamp(10px,1.2vw,14px)]
              rounded-xl bg-gradient-to-r from-emerald-500 to-purple-600 shadow-xl"
          >
            <PlayCircle size={18} className="inline mr-2" />
            {user ? "Continuer" : "Commencer gratuitement"}
          </motion.button>
        </div>

        {/* CONTENT */}
        <div className="mt-[clamp(25px,4vw,70px)]">
          {user ? <UserDashboard /> : <LandingContent navigate={navigate} />}
        </div>
      </div>
    </div>
  );
}