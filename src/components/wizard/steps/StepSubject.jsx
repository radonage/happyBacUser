import { useEffect, useState } from "react";
import { getSubjects } from "../../../api/subject.api";

export default function StepSubject({ levelId, countryId, onSelect }) {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (!levelId || !countryId) return;

    getSubjects(countryId, levelId)
      .then(res => setSubjects(res.data))
      .catch(console.error);
  }, [levelId, countryId]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Subjects</h2>

      <div className="grid grid-cols-2 gap-4">
        {subjects.map((s) => (
          <div
            key={s.id}
            onClick={() => onSelect(s)}
            className="p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-purple-600/20"
          >
            {s.name}
          </div>
        ))}
      </div>
    </div>
  );
}