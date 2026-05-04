import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../../../context/UserContext";
import {
  PlayCircle,
  BookOpen,
  Compass
} from "lucide-react";

/* =========================
   GLASS CARD (RESPONSIVE %)
========================= */
function GlassCard({ icon: Icon, title, desc, value }) {
  return (
    <div className="p-[0.5%] rounded-2xl bg-gradient-to-r from-emerald-500 via-purple-500 to-pink-500">
      <div className="
        h-full rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10
        p-[2%]
        transition-all duration-300
        hover:scale-[1.02] hover:bg-white/5
      ">
        <Icon className="text-white/80 mb-[3%]" size={18} />

        <h3 className="font-semibold text-[1rem]">
          {title}
        </h3>

        {desc && (
          <p className="text-gray-400 text-[0.85rem] mt-[1%]">
            {desc}
          </p>
        )}

        {value && (
          <p className="text-[1.1rem] font-bold mt-[3%]">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================
   QUICK CARD
========================= */
function QuickCard({ icon: Icon, title }) {
  return (
    <div className="
      flex items-center gap-[3%] rounded-2xl
      bg-white/5 backdrop-blur-xl border border-white/10
      p-[2%]
      hover:bg-white/10 hover:scale-[1.02]
      transition-all duration-300
    ">
      <Icon className="text-white/70" size={16} />
      <span className="font-medium text-[0.9rem]">
        {title}
      </span>
    </div>
  );
}

/* =========================
   LANDING CONTENT
========================= */
function LandingContent({ navigate }) {
  return (
    <div className="
      w-[92%] sm:w-[85%] lg:w-[75%] xl:w-[65%]
      mx-auto text-center
      space-y-[4%]
    ">

      <p className="text-gray-400 max-w-[90%] mx-auto text-[0.95rem] leading-relaxed">
        La plateforme intelligente qui te guide vers ton bac avec cours, exercices, examens et orientation personnalisée.
      </p>

      {/* CTA */}
      <div className="flex justify-center">
        <motion.button
          onClick={() => navigate("/explorer")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="
            px-[4%] py-[1.5%]
            rounded-xl bg-gradient-to-r from-emerald-500 to-purple-600
            shadow-xl font-semibold text-[0.95rem]
          "
        >
          <PlayCircle className="inline mr-2" size={16} />
          Commencer les cours
        </motion.button>
      </div>

      {/* CARDS */}
      <div className="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
        gap-[2%]
      ">
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
            className="
              relative rounded-2xl overflow-hidden cursor-pointer
              aspect-[4/3]
              group transition-all duration-300
              hover:scale-[1.02]
            "
            style={{
              backgroundImage: `url(${card.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-[5%]">
              <card.icon className="mb-[3%] opacity-90" size={18} />
              <h3 className="text-[1rem] font-semibold">
                {card.title}
              </h3>
              <p className="text-[0.8rem] opacity-80">
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
      <div className="absolute -top-32 -left-32 w-[35%] h-[35%] bg-emerald-400 blur-[150px] opacity-20" />
      <div className="absolute -bottom-32 -right-32 w-[35%] h-[35%] bg-purple-600 blur-[160px] opacity-20" />

      {/* HEADER */}
      <div className="
        relative text-center
        pt-[6%]
        px-[3%]
      ">

        <h1 className="
          font-extrabold bg-gradient-to-r from-emerald-300 via-purple-300 to-pink-300
          text-transparent bg-clip-text
          text-[2.5rem] sm:text-[3rem] lg:text-[4rem]
        ">
          🎓 Happy Bac
        </h1>

        <p className="text-gray-300 mt-[1%] text-[0.9rem]">
          Plateforme intelligente de réussite scolaire
        </p>

        {/* CTA */}
        <div className="flex justify-center mt-[3%]">
          <motion.button
            onClick={() => navigate(user ? "/explorer" : "/register")}
            whileHover={{ scale: 1.05 }}
            className="
              px-[4%] py-[1.5%]
              rounded-xl bg-gradient-to-r from-emerald-500 to-purple-600
              shadow-xl text-[0.9rem]
            "
          >
            <PlayCircle size={16} className="inline mr-2" />
            {user ? "Continuer" : "Commencer gratuitement"}
          </motion.button>
        </div>

        {/* CONTENT */}
        <div className="
          mt-[5%]
          scale-[0.96] lg:scale-100 origin-top
        ">
          <LandingContent navigate={navigate} />
        </div>

      </div>
    </div>
  );
}