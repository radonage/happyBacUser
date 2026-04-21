// src/features/exercise/pages/ExerciseList.jsx

import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { useSearchParams } from "react-router-dom";

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");

  useEffect(() => {
    setLoading(true);

    let url = "/exercises";

    // filtre par course si présent
    if (courseId) {
      url = `/exercises/course/${courseId}`;
    }

    api.get(url)
      .then((res) => setExercises(res.data))
      .finally(() => setLoading(false));
  }, [courseId]);

  return (
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">🧩 Exercises</h1>
        <p className="text-gray-400">
          Practice exercises and improve your skills
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-400">Loading exercises...</p>
      )}

      {/* EMPTY STATE */}
      {!loading && exercises.length === 0 && (
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-gray-400">
          No exercises found
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exercises.map((ex) => (
          <div
            key={ex.id}
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-purple-600/20 hover:scale-[1.03] transition"
          >

            {/* TITLE */}
            <h2 className="text-lg font-bold">
              {ex.title}
            </h2>

            {/* META */}
            <div className="text-sm text-gray-400 mt-2 space-y-1">
              <p>📘 Course: {ex.course?.title}</p>
              <p>🌍 Country: {ex.country?.name}</p>
            </div>

            {/* STATEMENT PREVIEW */}
            {ex.statement && (
              <p className="text-sm text-gray-300 mt-3 line-clamp-3">
                {ex.statement}
              </p>
            )}

            {/* ACTION */}
            <button className="mt-4 w-full py-2 bg-purple-600 rounded-xl hover:bg-purple-700 transition">
              Solve Exercise 🚀
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}