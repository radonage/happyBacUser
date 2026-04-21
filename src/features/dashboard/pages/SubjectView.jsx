import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import { getSubjects } from "../../../api/subject.api";
import CourseView from "./CourseView";

export default function SubjectView({ levelId, countryId }) {
  const [subjects, setSubjects] = useState([]);

  const {
    selectedSubject,
    setSelectedSubject,
    setSelectedCourse,
  } = useUser();

  console.log("📦 SubjectView render");
  console.log("📌 levelId =", levelId);
  console.log("📌 countryId =", countryId);

  useEffect(() => {
    console.log("🚀 SubjectView useEffect");

    if (!levelId || !countryId) {
      console.log("⛔ missing params -> clear subjects");
      setSubjects([]);
      return;
    }

    console.log("📡 FETCH subjects (FILTER)");
    console.log("levelId =", levelId);
    console.log("countryId =", countryId);

    getSubjects(countryId, levelId) // 🔥 FIX ICI
      .then((res) => {
        console.log("🔥 SUBJECTS RESPONSE =", res.data);
        setSubjects(res.data);
      })
      .catch((err) => console.error("❌ SUBJECTS ERROR", err));

    // 🔥 reset course si level change
    setSelectedCourse(null);

  }, [levelId, countryId]);

  const handleSelect = (subject) => {
    console.log("📘 SUBJECT CLICKED =", subject);

    setSelectedSubject(subject);

    // 🔥 reset cascade
    setSelectedCourse(null);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📘 Subjects</h2>

      {/* DEBUG */}
      <div className="text-xs text-gray-400 mb-3">
        levelId: {levelId ?? "null"} | countryId: {countryId ?? "null"} | subjects: {subjects.length}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {subjects.map((s) => (
          <div
            key={s.id}
            onClick={() => handleSelect(s)}
            className={`p-5 rounded-2xl border cursor-pointer transition hover:scale-105 ${
              selectedSubject?.id === s.id
                ? "bg-purple-600 border-purple-400"
                : "bg-white/5 border-white/10 hover:bg-purple-600/20"
            }`}
          >
            {s.name}
          </div>
        ))}
      </div>
      {selectedSubject && (
        <div className="mt-10">
          <CourseView
            subjectId={selectedSubject.id}
            countryId={countryId} 
          />
        </div>
      )}
    </div>
  );
}