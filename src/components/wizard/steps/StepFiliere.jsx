import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function StepFiliere({ countryId, onSelect }) {
  const [filieres, setFilieres] = useState([]);

  useEffect(() => {
    if (!countryId) return;

    api.get(`/filieres?countryId=${countryId}`)
      .then(res => setFilieres(res.data))
      .catch(console.error);
  }, [countryId]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Filière</h2>

      <div className="grid grid-cols-2 gap-4">
        {filieres.map((f) => (
          <div
            key={f.id}
            onClick={() => onSelect(f)}
            className="p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-purple-600/20"
          >
            {f.name}
          </div>
        ))}
      </div>
    </div>
  );
}