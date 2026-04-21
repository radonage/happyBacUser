// src/features/course/pages/CourseList.jsx

import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { Link } from "react-router-dom";

export default function CourseList({ subjectId }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subjectId) return;

    setLoading(true);
    api.get(`/courses/subject/${subjectId}`)
      .then((res) => setCourses(res.data))
      .finally(() => setLoading(false));
  }, [subjectId]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">📘 Courses</h2>

      {loading && (
        <p className="text-gray-400">Loading courses...</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((c) => (
          <Link
            to={`/courses/${c.id}`}
            key={c.id}
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-purple-600/20 hover:scale-[1.03] transition"
          >
            <h3 className="text-lg font-bold">{c.title}</h3>

            <p className="text-sm text-gray-300 mt-2 line-clamp-2">
              {c.description}
            </p>

            <div className="mt-4 text-xs text-purple-400">
              ▶ Watch course
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}