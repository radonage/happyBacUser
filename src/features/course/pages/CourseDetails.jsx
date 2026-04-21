// src/features/course/pages/CourseDetails.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/axios";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    api.get(`/courses/${id}`)
      .then((res) => setCourse(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-gray-400">Loading course...</p>;
  }

  if (!course) {
    return <p className="text-red-400">Course not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-400 mb-6">{course.description}</p>

      {/* VIDEO */}
      {course.videoUrl && (
        <div className="rounded-2xl overflow-hidden border border-white/10 mb-6">
          <video
            src={course.videoUrl}
            controls
            className="w-full"
          />
        </div>
      )}

      {/* FILES */}
      {course.fileUrls?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">📂 Files</h2>

          <div className="flex flex-wrap gap-3">
            {course.fileUrls.map((file, i) => (
              <a
                key={i}
                href={file}
                target="_blank"
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-purple-600/20 transition"
              >
                📄 File {i + 1}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* EXERCISES LINK */}
      <div className="mt-8">
        <a
          href={`/exercises?courseId=${course.id}`}
          className="inline-block px-5 py-3 bg-purple-600 rounded-xl hover:bg-purple-700 transition"
        >
          🧩 Go to Exercises
        </a>
      </div>
    </div>
  );
}