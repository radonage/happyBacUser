import { useEffect, useState } from "react";
import { getCourses } from "../../../api/course.api";
import { AnimatePresence, motion } from "framer-motion";

export default function CourseView({
  subjectId,
  countryId,
  onSelectCourse,
}) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [tab, setTab] = useState("video");
  const [activePdf, setActivePdf] = useState(null);

  useEffect(() => {
    if (!subjectId || !countryId) return;

    setLoading(true);

    getCourses(subjectId, countryId)
      .then((res) => setCourses(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [subjectId, countryId]);

  const openCourse = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    setTab("video");
    setActivePdf(course.fileUrls?.[0] || null);
    onSelectCourse?.(course);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <div className="text-white">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-purple-400 text-transparent bg-clip-text">
          Courses
        </h2>
        <p className="text-white/50 text-sm mt-1">
          Sélectionne un cours pour commencer
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-white/5 animate-pulse border border-white/10"
            />
          ))}

        {!loading &&
          courses.map((c) => (
            <div
              key={c.id}
              onClick={() => openCourse(c)}
              className="
                relative group cursor-pointer
                rounded-2xl p-5
                bg-white/5 border border-white/10
                backdrop-blur-xl
                transition-all duration-300
                hover:scale-[1.03] hover:bg-white/10
              "
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-pink-500/10 blur-xl rounded-2xl" />

              <div className="relative">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="text-sm text-white/50">{c.chapter}</p>
                <p className="text-xs text-white/30 mt-3">Clique pour ouvrir →</p>
              </div>
            </div>
          ))}
      </div>

      {!loading && courses.length === 0 && (
        <div className="text-center py-16 text-white/40">
          Aucun cours disponible
        </div>
      )}

      {/* MODAL PREMIUM CINEMA */}
      <AnimatePresence>
        {isModalOpen && selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 z-50
              flex items-center justify-center
              bg-black/80 backdrop-blur-2xl
              px-4
            "
            onClick={closeModal}
          >

            {/* BACKDROP GLOW CINEMA */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,197,94,0.15),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.12),transparent_55%)]" />

            {/* MODAL */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative w-full max-w-6xl
                max-h-[92vh]
                flex flex-col
                rounded-3xl
                overflow-hidden
                border border-white/10
                bg-[#0a0a0a]/80
                backdrop-blur-2xl
                shadow-[0_0_120px_rgba(0,0,0,0.9)]
              "
            >

              {/* VIGNETTE */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/70" />

              {/* HEADER */}
              <div className="relative flex items-center justify-between p-5 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-emerald-300 to-purple-400 text-transparent bg-clip-text">
                    {selectedCourse.title}
                  </h2>
                  <p className="text-white/40 text-sm">
                    {selectedCourse.chapter}
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition backdrop-blur-xl"
                >
                  ✕
                </button>
              </div>

              {/* TABS */}
              <div className="relative flex gap-2 px-5 py-3 border-b border-white/10">
                {["video", "pdf", "info"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`
                      px-4 py-1.5 rounded-full text-sm transition
                      border border-white/10 backdrop-blur-xl
                      ${tab === t
                        ? "bg-white text-black"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                      }
                    `}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* CONTENT */}
              <div className="p-5 overflow-y-auto">

                {/* VIDEO */}
                {tab === "video" && (
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

                    {selectedCourse.videoUrl ? (
                      <video
                        src={selectedCourse.videoUrl}
                        controls
                        className="w-full aspect-video object-cover"
                      />
                    ) : (
                      <div className="p-10 text-white/50 text-center">
                        Aucune vidéo disponible
                      </div>
                    )}

                  </div>
                )}

                {/* PDF */}
                {tab === "pdf" && (
                  <div className="flex gap-4 h-[70vh]">

                    <div className="w-1/3 space-y-2 overflow-y-auto pr-2">
                      {selectedCourse.fileUrls?.map((url, i) => (
                        <div
                          key={i}
                          onClick={() => setActivePdf(url)}
                          className={`
                            p-3 rounded-xl text-sm cursor-pointer transition
                            border border-white/10
                            ${activePdf === url
                              ? "bg-gradient-to-r from-emerald-500 to-purple-500 text-black font-semibold"
                              : "bg-white/5 hover:bg-white/10 text-white"
                            }
                          `}
                        >
                          📘 Document {i + 1}
                        </div>
                      ))}
                    </div>

                    <div className="flex-1 rounded-2xl overflow-hidden border border-white/10 bg-black shadow-inner">
                      {activePdf ? (
                        <iframe
                          src={`https://docs.google.com/gview?url=${encodeURIComponent(
                            activePdf
                          )}&embedded=true`}
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="p-6 text-white/40">
                          Sélectionne un document
                        </div>
                      )}
                    </div>

                  </div>
                )}

                {/* INFO */}
                {tab === "info" && (
                  <div className="text-white/70 leading-relaxed">
                    {selectedCourse.description}
                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}