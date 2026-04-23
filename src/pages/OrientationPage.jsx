import { motion } from "framer-motion";
import { Compass, Sparkles, BookOpen, TrendingUp, Target } from "lucide-react";

export default function OrientationPage() {
  const paths = [
    {
      title: "Science Mathématique",
      level: "Avancé",
      desc: "Parcours intensif pour ingénierie, data, médecine",
      color: "from-purple-500 to-pink-500",
      subjects: ["Maths", "Physique", "SVT"],
    },
    {
      title: "Sciences Économiques",
      level: "Intermédiaire",
      desc: "Business, gestion, finance et économie moderne",
      color: "from-blue-500 to-cyan-500",
      subjects: ["Économie", "Maths", "Gestion"],
    },
    {
      title: "Lettres & Humanités",
      level: "Accessible",
      desc: "Langues, philosophie et communication",
      color: "from-amber-500 to-orange-500",
      subjects: ["Philosophie", "Français", "Histoire"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#07070c] text-white relative overflow-hidden">

      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]" />

      {/* HEADER */}
      <div className="relative p-10">
        <h1 className="text-4xl font-bold flex items-center gap-2">
          <Compass className="text-purple-400" />
          Orientation intelligente
        </h1>
        <p className="text-white/50 mt-2">
          Découvre ton meilleur parcours académique basé sur ton profil
        </p>
      </div>

      {/* AI BANNER */}
      <div className="mx-10 mb-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="text-purple-400" />
            IA Orientation Engine
          </h2>
          <p className="text-white/50 text-sm mt-1">
            Analyse ton niveau et propose le meilleur parcours pour réussir ton Bac
          </p>
        </div>

        <button className="px-5 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl">
          Générer mon profil
        </button>
      </div>

      {/* PATHS */}
      <div className="grid md:grid-cols-3 gap-6 px-10 pb-20">

        {paths.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden"
          >

            {/* glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-10`} />

            {/* title */}
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Target size={18} />
              {p.title}
            </h2>

            <p className="text-white/50 text-sm mt-2">{p.desc}</p>

            {/* level badge */}
            <div className="mt-3 inline-block text-xs px-3 py-1 rounded-full bg-white/10">
              {p.level}
            </div>

            {/* subjects */}
            <div className="mt-4 space-y-2">
              {p.subjects.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-white/70 text-sm"
                >
                  <BookOpen size={14} />
                  {s}
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="mt-5 w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 transition">
              Explorer ce parcours
            </button>

          </motion.div>
        ))}

      </div>


    </div>
  );
}