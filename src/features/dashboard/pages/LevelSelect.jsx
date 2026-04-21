import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { useUser } from "../../../context/UserContext";
import SubjectView from "./SubjectView";

export default function LevelSelect({ countryId, filiereId }) {
  const [levels, setLevels] = useState([]);

  const {
    selectedLevel,
    setSelectedLevel,
    setSelectedSubject,
    setSelectedCourse, // 🔥 AJOUT IMPORTANT
  } = useUser();


  useEffect(() => {

    if (!countryId || !filiereId) {
      setLevels([]);
      return;
    }
    api
      .get(`/levels/filter?countryId=${countryId}&filiereId=${filiereId}`)
      .then((res) => {
        setLevels(res.data);
      })
      .catch((err) => console.error("❌ LEVELS ERROR", err));

    setSelectedLevel(null);
    setSelectedSubject(null);
    setSelectedCourse(null); 

  }, [countryId, filiereId]);

  const handleSelect = (level) => {

    setSelectedLevel(level);

    setSelectedSubject(null);
    setSelectedCourse(null);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Level</h2>

      {/* DEBUG */}
      <div className="text-xs text-gray-400 mb-3">
        countryId: {countryId ?? "null"} | filiereId: {filiereId ?? "null"} | levels: {levels.length}
      </div>

      <div className="flex flex-wrap gap-3">
        {levels.map((l) => (
          <button
            key={l.id}
            onClick={() => handleSelect(l)}
            className={`px-5 py-3 rounded-xl border transition ${
              selectedLevel?.id === l.id
                ? "bg-purple-600 border-purple-400"
                : "bg-white/5 border-white/10 hover:bg-purple-600/30"
            }`}
          >
            {l.name}
          </button>
        ))}
      </div>

      {/* 🔥 SUBJECT */}
      {selectedLevel && (
        <div className="mt-8">
          <SubjectView
            levelId={selectedLevel.id}
            countryId={countryId}
            filiereId={filiereId}
          />
        </div>
      )}
    </div>
  );
}