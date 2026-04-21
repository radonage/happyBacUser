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

      {/* EMPTY */}
      {!loading && courses.length === 0 && (
        <div className="text-center py-16 text-white/40">
          Aucun cours disponible
        </div>
      )}

      {/* MODAL PREMIUM */}
      <AnimatePresence>
        {isModalOpen && selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 z-50
              flex items-center justify-center
              bg-black/70 backdrop-blur-xl
              px-4
            "
            onClick={closeModal}
          >

            {/* CARD */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="
                w-full max-w-5xl
                max-h-[90vh]
                flex flex-col
                rounded-3xl
                border border-white/10
                bg-gradient-to-b from-[#0b0b0b] to-[#141414]
                shadow-2xl
                overflow-hidden
              "
            >

              {/* HEADER */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-semibold">
                    {selectedCourse.title}
                  </h2>
                  <p className="text-white/40 text-sm">
                    {selectedCourse.chapter}
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition"
                >
                  ✕
                </button>
              </div>

              {/* TABS */}
              <div className="flex gap-2 px-5 py-3 border-b border-white/10">
                {["video", "pdf", "info"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`
                      px-4 py-1.5 rounded-full text-sm transition
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
                  <div className="rounded-2xl overflow-hidden border border-white/10">
                    {selectedCourse.videoUrl ? (
                      <video
                        src={selectedCourse.videoUrl}
                        controls
                        className="w-full bg-black"
                      />
                    ) : (
                      <div className="p-6 text-white/50">
                        Aucune vidéo disponible
                      </div>
                    )}
                  </div>
                )}

                {/* PDF */}
                {tab === "pdf" && (
                  <div className="flex gap-4 h-[65vh]">

                    {/* LIST */}
                    <div className="w-1/3 space-y-2 overflow-y-auto pr-2">
                      {selectedCourse.fileUrls?.map((url, i) => (
                        <div
                          key={i}
                          onClick={() => setActivePdf(url)}
                          className={`
                            p-3 rounded-xl text-sm cursor-pointer transition
                            ${activePdf === url
                              ? "bg-white text-black"
                              : "bg-white/5 hover:bg-white/10 text-white"
                            }
                          `}
                        >
                          📄 Document {i + 1}
                        </div>
                      ))}
                    </div>

                    {/* VIEWER */}
                    <div className="flex-1 rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                      {activePdf ? (
                        <iframe
                          src={`https://docs.google.com/gview?url=${encodeURIComponent(
                            activePdf
                          )}&embedded=true`}
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="p-6 text-white/50">
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