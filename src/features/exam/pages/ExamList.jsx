// src/features/exam/pages/ExamList.jsx

import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { useSearchParams } from "react-router-dom";

export default function ExamList() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get("subjectId");

  useEffect(() => {
    setLoading(true);

    let url = "/exams";

    // si filtré par subject
    if (subjectId) {
      url = `/exams/subject/${subjectId}`;
    }

    api.get(url)
      .then((res) => setExams(res.data))
      .finally(() => setLoading(false));
  }, [subjectId]);

  return (
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">🧪 Exams</h1>
        <p className="text-gray-400">
          Practice and test your knowledge
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-400">Loading exams...</p>
      )}

      {/* EMPTY STATE */}
      {!loading && exams.length === 0 && (
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-gray-400">
          No exams found
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-purple-600/20 hover:scale-[1.03] transition"
          >

            {/* TITLE */}
            <h2 className="text-lg font-bold">
              {exam.title}
            </h2>

            {/* META */}
            <div className="text-sm text-gray-400 mt-2 space-y-1">
              <p>📘 Subject: {exam.subject?.name}</p>
              <p>🎓 Level: {exam.level?.name}</p>
              <p>📅 Year: {exam.year}</p>
              <p>🧪 Type: {exam.type}</p>
            </div>

            {/* DESCRIPTION */}
            {exam.description && (
              <p className="text-sm text-gray-300 mt-3 line-clamp-2">
                {exam.description}
              </p>
            )}

            {/* ACTION */}
            <button className="mt-4 w-full py-2 bg-purple-600 rounded-xl hover:bg-purple-700 transition">
              Start Exam 🚀
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}