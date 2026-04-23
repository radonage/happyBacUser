import { useEffect, useState, useMemo } from "react";
import api from "../../../api/axios";
import { motion } from "framer-motion";
import { Check, Search } from "lucide-react";

const countryFlags = {
  Morocco: "ma",
  Canada: "ca",
  "United States": "us",
  France: "fr",
  Spain: "es",
  Portugal: "pt",
  Italy: "it",
  Germany: "de",
  "United Kingdom": "gb",
  Netherlands: "nl",
  Belgium: "be",
  Switzerland: "ch",
  Austria: "at",
  Sweden: "se",
  Norway: "no",
  Denmark: "dk",
  Finland: "fi",
  Ireland: "ie",
  Poland: "pl",
  "Czech Republic": "cz",
  Slovakia: "sk",
  Hungary: "hu",
  Romania: "ro",
  Bulgaria: "bg",
  Greece: "gr",
  Croatia: "hr",
  Serbia: "rs",
  Slovenia: "si",
  "Bosnia and Herzegovina": "ba",
  Albania: "al",
  "North Macedonia": "mk",
  Montenegro: "me",
  Kosovo: "xk",
  Ukraine: "ua",
  Russia: "ru",
  Belarus: "by",
  Moldova: "md",
  Lithuania: "lt",
  Latvia: "lv",
  Estonia: "ee",
  Turkey: "tr",
  Cyprus: "cy",
  Malta: "mt",
  Luxembourg: "lu",
  Iceland: "is",
  Algeria: "dz",
  Tunisia: "tn",
  Egypt: "eg",
  Libya: "ly",
  Sudan: "sd",
  "South Sudan": "ss",
  Ethiopia: "et",
  Eritrea: "er",
  Somalia: "so",
  Kenya: "ke",
  Uganda: "ug",
  Tanzania: "tz",
  Rwanda: "rw",
  Burundi: "bi",
  "DR Congo": "cd",
  Cameroon: "cm",
  Nigeria: "ng",
  Ghana: "gh",
  "Ivory Coast": "ci",
  Senegal: "sn",
  Mali: "ml",
  Niger: "ne",
  Chad: "td",
  Benin: "bj",
  Togo: "tg",
  Guinea: "gn",
  "South Africa": "za",
  Namibia: "na",
  Botswana: "bw",
  Zimbabwe: "zw",
  Zambia: "zm",
  Mozambique: "mz",
  Angola: "ao",
  Madagascar: "mg",
  China: "cn",
  India: "in",
  Pakistan: "pk",
  Bangladesh: "bd",
  Japan: "jp",
  "South Korea": "kr",
  "North Korea": "kp",
  Indonesia: "id",
  Malaysia: "my",
  Singapore: "sg",
  Thailand: "th",
  Vietnam: "vn",
  Philippines: "ph",
  "Saudi Arabia": "sa",
  "United Arab Emirates": "ae",
  Qatar: "qa"
};

export default function StepCountry({ value, onSelect }) {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/countries")
      .then((res) => setCountries(res.data))
      .catch(console.error);
  }, []);

  // ⚡ memo pour éviter recalcul inutile
  const enrichedCountries = useMemo(() => {
    return countries.map((c) => ({
      ...c,
      code: countryFlags[c.name] || "xx"
    }));
  }, [countries]);

  const filteredCountries = useMemo(() => {
    return enrichedCountries.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [enrichedCountries, search]);

  return (
    <div className="space-y-6 text-white">

      {/* TITLE */}
      <div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-300 to-purple-400 text-transparent bg-clip-text">
          Choisissez votre pays
        </h2>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl 
        bg-white/5 border border-white/10 backdrop-blur-xl">
        <Search size={18} className="text-white/50" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cherchez votre pays"
          className="bg-transparent outline-none w-full text-white placeholder-white/30"
        />
      </div>

      {/* SCROLL AREA WOW */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 gap-4 pr-2 custom-scroll"
        style={{
          maxHeight: "420px",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch" // 🔥 iOS inertial scroll
        }}
      >
        {filteredCountries.map((c, index) => {
          const selected = value?.id === c.id;
          const flagUrl =
            c.code !== "xx"
              ? `https://flagcdn.com/w80/${c.code}.png`
              : null;

          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.01 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(c)}
              className={`
                relative cursor-pointer p-4 rounded-2xl
                border transition-all duration-300
                backdrop-blur-xl overflow-hidden
                ${selected
                  ? "bg-emerald-500/20 border-emerald-400"
                  : "bg-white/5 border-white/10 hover:bg-white/10"}
              `}
            >
              {/* glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition" />

              {/* check */}
              {selected && (
                <div className="absolute top-3 right-3">
                  <Check size={16} className="text-emerald-400" />
                </div>
              )}

              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-black/20 flex items-center justify-center">
                  {flagUrl ? (
                    <img
                      src={flagUrl}
                      alt={c.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-xs text-white/40">🌍</span>
                  )}
                </div>

                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-white/40">
                    Sélectionner pour continuer
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* SCROLL STYLE */}
      <style>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.12);
          border-radius: 20px;
        }

        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(16,185,129,0.5);
        }
      `}</style>
    </div>
  );
}