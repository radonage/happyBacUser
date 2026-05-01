import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function CountrySelect({ value, onSelect }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    api
      .get("/countries")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error("❌ COUNTRIES ERROR", err));
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Select Country</h2>
      <div className="relative">
        <select
          value={value?.id || ""}
          onChange={(e) => {
            const country = countries.find(
              (c) => c.id === Number(e.target.value)
            );

            onSelect(country || null);
          }}
          className="
            w-full
            p-4
            rounded-xl
            bg-black/40
            border border-white/10
            text-white
            backdrop-blur-xl
            focus:outline-none
            focus:ring-2
            focus:ring-purple-500
          "
        >
          <option value="">-- Choose a country --</option>

          {countries.map((c) => (
            <option key={c.id} value={c.id} className="text-black">
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}