import { motion } from "framer-motion";
import {
  Calculator,
  Atom,
  Globe,
  BookOpen,
  Code,
  Beaker,
  Brain,
  Languages
} from "lucide-react";

export default function Matiere() {

  const subjects = [
    {
      title: "Mathématiques",
      icon: Calculator,
      desc: "Algèbre, analyse, géométrie et probabilités. Développe ta logique et ton esprit scientifique.",
      color: "from-pink-500 to-purple-600"
    },
    {
      title: "Physique",
      icon: Atom,
      desc: "Comprends les lois de l’univers : énergie, mécanique, électricité et ondes.",
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "Chimie",
      icon: Beaker,
      desc: "Réactions chimiques, molécules et transformations de la matière.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      title: "Histoire-Géo",
      icon: Globe,
      desc: "Explore le monde, les civilisations et les événements qui ont façonné l’humanité.",
      color: "from-green-400 to-emerald-600"
    },
    {
      title: "Français",
      icon: BookOpen,
      desc: "Expression écrite, littérature et analyse de textes avec élégance.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Informatique",
      icon: Code,
      desc: "Programmation, algorithmes et technologies du futur.",
      color: "from-sky-500 to-cyan-400"
    },
    {
      title: "Philosophie",
      icon: Brain,
      desc: "Réflexion critique, pensée humaine et grandes idées philosophiques.",
      color: "from-fuchsia-500 to-pink-500"
    },
    {
      title: "Langues",
      icon: Languages,
      desc: "Anglais, espagnol et communication internationale.",
      color: "from-teal-400 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold">
          📚 Matières
        </h1>
        <p className="text-white/50 mt-2">
          Explore toutes les matières disponibles pour ton apprentissage
        </p>
      </motion.div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {subjects.map((s, i) => {
          const Icon = s.icon;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="
                relative p-6 rounded-2xl
                bg-white/5 backdrop-blur-2xl
                border border-white/10
                overflow-hidden
                cursor-pointer
                group
              "
            >

              {/* glow background */}
              <div className={`absolute inset-0 opacity-20 bg-gradient-to-r ${s.color} blur-3xl`} />

              {/* ICON */}
              <div className="relative flex items-center gap-4">

                <div className={`p-3 rounded-xl bg-gradient-to-r ${s.color}`}>
                  <Icon size={22} />
                </div>

                <h2 className="text-xl font-semibold">
                  {s.title}
                </h2>

              </div>

              {/* DESCRIPTION */}
              <p className="text-white/60 text-sm mt-4 leading-relaxed">
                {s.desc}
              </p>

              {/* FOOTER ACTION */}
              <div className="mt-6 flex items-center justify-between">

                <span className="text-xs text-white/40">
                  120+ cours disponibles
                </span>

                <button className="
                  px-3 py-1.5 rounded-xl text-xs
                  bg-white/10 hover:bg-white/20
                  transition
                ">
                  Explorer →
                </button>

              </div>

              {/* hover glow line */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-500" />

            </motion.div>
          );
        })}

      </div>

    </div>
  );
}