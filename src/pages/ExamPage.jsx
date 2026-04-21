import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Globe, GraduationCap, Search } from "lucide-react";

const examsData = [
  {
    id: 1,
    title: "Mathématiques",
    type: "National",
    year: 2025,
    level: "Bac",
    description: "Analyse, algèbre et probabilités niveau examen national",
  },
  {
    id: 2,
    title: "Physique-Chimie",
    type: "Régional",
    year: 2024,
    level: "Bac",
    description: "Mécanique, électricité et chimie organique",
  },
  {
    id: 3,
    title: "SVT",
    type: "National",
    year: 2023,
    level: "Bac",
    description: "Biologie humaine, génétique et écologie",
  },
];

const tabs = ["Tous", "National", "Régional"];

export default function ExamPage() {
  const [active, setActive] = useState("Tous");
  const [search, setSearch] = useState("");

  const filtered = examsData.filter((e) => {
    const matchType = active === "Tous" || e.type === active;
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="min-h-screen text-white bg-[#07070c] relative overflow-hidden">

      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.15),transparent_60%)]" />

      {/* HEADER */}
      <div className="relative p-10">
        <h1 className="text-4xl font-bold">
          Examens <span className="text-purple-400">Intelligents</span>
        </h1>
        <p className="text-white/50 mt-2">
          Explore tous les examens nationaux et régionaux
        </p>

        {/* search */}
        <div className="mt-6 flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-xl w-full md:w-1/2">
          <Search size={18} className="text-white/40" />
          <input
            placeholder="Rechercher un examen..."
            className="bg-transparent outline-none w-full"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* tabs */}
        <div className="flex gap-3 mt-6">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-4 py-2 rounded-xl text-sm transition
                ${
                  active === t
                    ? "bg-purple-500 text-white"
                    : "bg-white/5 text-white/50 hover:bg-white/10"
                }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* TIMELINE STYLE LIST */}
      <div className="relative px-10 pb-20">

        {/* vertical line */}
        <div className="absolute left-14 top-0 bottom-0 w-[2px] bg-white/10" />

        <div className="space-y-10">

          {filtered.map((exam, i) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative flex gap-6 items-start"
            >

              {/* dot */}
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <BookOpen size={18} />
                </div>
              </div>

              {/* content */}
              <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl hover:bg-white/10 transition">

                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{exam.title}</h2>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      exam.type === "National"
                        ? "bg-red-500/20 text-red-300"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {exam.type}
                  </span>
                </div>

                <p className="text-white/50 mt-2">{exam.description}</p>

                <div className="flex gap-4 mt-4 text-sm text-white/60">
                  <span>📅 {exam.year}</span>
                  <span>🎓 {exam.level}</span>
                </div>

                {/* action */}
                <div className="mt-4 flex gap-3">
                  <button className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 transition">
                    Voir sujet
                  </button>

                  <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition">
                    Corrigé
                  </button>
                </div>

              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
}