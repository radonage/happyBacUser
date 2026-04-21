import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import api from "../../../api/axios";
import LevelSelect from "../pages/LevelSelect";

export default function FiliereSelect({ countryId }) {
  const [filieres, setFilieres] = useState([]);

  const {
    selectedFiliere,
    setSelectedFiliere,
    setSelectedLevel,
    setSelectedSubject,
    setSelectedCourse, // 🔥 AJOUT IMPORTANT
  } = useUser();

  console.log("📦 FiliereSelect render");
  console.log("📌 countryId =", countryId);

  useEffect(() => {
    if (!countryId) {
      console.log("⛔ no countryId -> clear filieres");
      setFilieres([]);
      return;
    }

    console.log("📡 FETCH filieres for countryId =", countryId);

    api
      .get(`/filieres?countryId=${countryId}`)
      .then((res) => {
        console.log("🔥 FILIERES RESPONSE =", res.data);
        setFilieres(res.data);
      })
      .catch((err) => console.error("❌ FILIERES ERROR", err));

  }, [countryId]);

  const handleSelect = (filiere) => {
    console.log("🟣 FILIERE CLICKED =", filiere);

    setSelectedFiliere(filiere);

    // 🔥 RESET CASCADE COMPLET
    setSelectedLevel(null);
    setSelectedSubject(null);
    setSelectedCourse(null); // ✅ TRÈS IMPORTANT
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📚 Select Filière</h2>

      {/* DEBUG */}
      <div className="text-xs text-gray-400 mb-2">
        countryId: {countryId ?? "null"} | filieres: {filieres.length}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filieres.map((f) => (
          <div
            key={f.id}
            onClick={() => handleSelect(f)}
            className={`cursor-pointer p-5 rounded-2xl border transition ${
              selectedFiliere?.id === f.id
                ? "bg-purple-600 border-purple-400"
                : "bg-white/5 border-white/10 hover:bg-purple-600/20"
            }`}
          >
            {f.name}
          </div>
        ))}
      </div>

      {/* 🔥 LEVEL */}
      {selectedFiliere && (
        <div className="mt-8">
          <LevelSelect
            countryId={countryId}
            filiereId={selectedFiliere.id}
          />
        </div>
      )}
    </div>
  );
}