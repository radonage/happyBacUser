import { motion } from "framer-motion";
import { BookOpen, PlayCircle, FileText, Sparkles, GraduationCap } from "lucide-react";

export default function EtudesPage() {

  const modules = [
    {
      title: "Cours interactifs",
      desc: "Apprends avec des vidéos structurées comme Udemy",
      icon: PlayCircle,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Fiches de révision",
      desc: "Résumé intelligent de toutes les matières",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Exercices guidés",
      desc: "Pratique avec correction instantanée",
      icon: BookOpen,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const subjects = [
    { name: "Mathématiques", level: "Bac", progress: 70 },
    { name: "Physique-Chimie", level: "Bac", progress: 55 },
    { name: "SVT", level: "Bac", progress: 80 },
    { name: "Philosophie", level: "Bac", progress: 40 },
  ];

  return (
    <div className="min-h-screen bg-[#07070c] text-white relative overflow-hidden">

      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.15),transparent_60%)]" />

      {/* HEADER */}
      <div className="relative p-10">
        <h1 className="text-4xl font-bold flex items-center gap-2">
          <GraduationCap className="text-purple-400" />
          Espace Études
        </h1>
        <p className="text-white/50 mt-2">
          Tout ce qu’il te faut pour réussir ton Bac en un seul endroit
        </p>
      </div>

      {/* MODULES */}
      <div className="grid md:grid-cols-3 gap-6 px-10">

        {modules.map((m, i) => {
          const Icon = m.icon;

          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${m.color} opacity-10`} />

              <Icon size={28} className="text-white mb-3" />

              <h2 className="text-xl font-bold">{m.title}</h2>
              <p className="text-white/50 text-sm mt-1">{m.desc}</p>

              <button className="mt-5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition">
                Explorer
              </button>
            </motion.div>
          );
        })}

      </div>

      {/* PROGRESS SECTION */}
      <div className="px-10 mt-12">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

          <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
            <Sparkles className="text-purple-400" />
            Ton avancée globale
          </h2>

          <div className="space-y-5">

            {subjects.map((s, i) => (
              <div key={i}>

                <div className="flex justify-between text-sm mb-1">
                  <span>{s.name}</span>
                  <span className="text-white/50">{s.progress}%</span>
                </div>

                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{ width: `${s.progress}%` }}
                  />
                </div>

              </div>
            ))}

          </div>

        </div>
      </div>

      {/* CTA BOTTOM */}
      <div className="px-10 mt-10 pb-10">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/10 backdrop-blur-xl flex justify-between items-center">

          <div>
            <h3 className="text-lg font-semibold">
              🚀 Mode Réussite Activé
            </h3>
            <p className="text-white/50 text-sm">
              Continue ton apprentissage pour atteindre 100% de maîtrise
            </p>
          </div>

          <button className="px-5 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl">
            Continuer
          </button>

        </div>
      </div>

    </div>
  );
}