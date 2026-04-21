import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function StepLevel({ countryId, filiereId, onSelect }) {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    if (!countryId || !filiereId) return;

    api.get(`/levels/filter?countryId=${countryId}&filiereId=${filiereId}`)
      .then(res => setLevels(res.data))
      .catch(console.error);
  }, [countryId, filiereId]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Level</h2>

      <div className="flex gap-3 flex-wrap">
        {levels.map((l) => (
          <button
            key={l.id}
            onClick={() => onSelect(l)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-purple-600/30"
          >
            {l.name}
          </button>
        ))}
      </div>
    </div>
  );
}