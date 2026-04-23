import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { register } from "../../../api/auth.api";
import { useUser } from "../../../context/UserContext";
import { Search, ArrowRight, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [search, setSearch] = useState("");

  const [countries, setCountries] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [levels, setLevels] = useState([]);

  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
    country: null,
    filiereId: "",
    levelId: "",
  });

  /* 🌍 COUNTRIES */
  useEffect(() => {
    const load = async () => {
      const res = await fetch("https://happybacbacendfinal.fly.dev/api/countries");
      const backend = await res.json();

      const rest = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags"
      );
      const restData = await rest.json();

      const enriched = backend.map((c) => {
        const match = restData.find((r) =>
          r.name.common.toLowerCase().includes(c.name.toLowerCase())
        );

        return {
          id: c.id,
          name: c.name,
          flag: match?.flags?.png || "",
          dial: match?.idd?.root
            ? `${match.idd.root}${match.idd.suffixes?.[0] || ""}`
            : "",
        };
      });

      setCountries(enriched);
    };

    load();
  }, []);

  /* 📚 FILIERES */
  useEffect(() => {
    if (!form.country?.id) return;

    fetch(
      `https://happybacbacendfinal.fly.dev/api/filieres?countryId=${form.country.id}`
    )
      .then((r) => r.json())
      .then(setFilieres);
  }, [form.country]);

  /* 🎓 LEVELS */
  useEffect(() => {
    if (!form.country?.id || !form.filiereId) return;

    fetch(
      `https://happybacbacendfinal.fly.dev/api/levels/filter?countryId=${form.country.id}&filiereId=${form.filiereId}`
    )
      .then((r) => r.json())
      .then(setLevels);
  }, [form.country, form.filiereId]);

  const filtered = useMemo(() => {
    return countries.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, countries]);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  const submit = async () => {
    try {
      const payload = {
        email: form.email,
        phone: form.phone,
        password: form.password,
        filiereId: form.filiereId,
        levelId: form.levelId,
        countryId: form.country?.id,
      };

      await register(payload);

      toast.success("Inscription réussie 🎉");

      setUser(payload);
      navigate("/");
    } catch (err) {
      toast.error("Erreur lors de l'inscription");
    }
  };

  const input =
    "w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500 outline-none backdrop-blur-xl transition";

  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden text-white px-4">

      {/* 🌌 BACKGROUND IMAGE ZOOM */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.01 }}
          animate={{ scale: 1.12 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute inset-0"
        >
          <img
            src="/monimage.avif"
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black/30 to-cyan-900/30" />
      </div>

      {/* 🌟 GLOW ORBS */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[160px] rounded-full top-10 left-10" />
      <div className="absolute w-[400px] h-[400px] bg-cyan-400/20 blur-[160px] rounded-full bottom-10 right-10" />

      {/* 💎 CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-xl p-8 rounded-3xl relative z-10
        bg-white/5 backdrop-blur-3xl border border-white/10
        shadow-[0_0_80px_rgba(0,0,0,0.6)]"
      >

        {/* GLOW BORDER */}
        <div className="absolute inset-0 rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(168,85,247,0.15)] animate-pulse pointer-events-none" />

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center">
          Create account
        </h1>

        <p className="text-center text-white/50 mt-2">
          Join the learning experience 🚀
        </p>

        {/* PROGRESS */}
        <div className="w-full h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-400"
            animate={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs text-white/40 mt-2 text-center">
          Step {step} / 3
        </p>

        {/* STEPS */}
        <div className="mt-6">

          <AnimatePresence mode="wait">

            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                className="space-y-4"
              >
                <input
                  className={input}
                  placeholder="Email"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <input
                  className={input}
                  placeholder="Search country..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <div className="max-h-40 overflow-auto bg-black/60 rounded-xl border border-white/10">
                  {filtered.map((c) => (
                    <div
                      key={c.id}
                      onClick={() =>
                        setForm({ ...form, country: c })
                      }
                      className="p-3 flex items-center gap-3 hover:bg-white/10 cursor-pointer"
                    >
                      {c.flag && (
                        <img src={c.flag} className="w-5 h-5 rounded-full" />
                      )}
                      <span>{c.name}</span>
                      <span className="ml-auto text-white/40">{c.dial}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <div className="p-4 bg-white/5 rounded-xl min-w-[110px] text-center">
                    {form.country?.dial || "+?"}
                  </div>

                  <input
                    className={input}
                    placeholder="Phone"
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>

                <Nav next={next} />
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-4"
              >
                <input
                  type="password"
                  className={input}
                  placeholder="Password"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />

                <Nav next={next} prev={prev} />
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <select
                  className={input}
                  onChange={(e) =>
                    setForm({ ...form, filiereId: e.target.value })
                  }
                >
                  <option>Select filière</option>
                  {filieres.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>

                <select
                  className={input}
                  onChange={(e) =>
                    setForm({ ...form, levelId: e.target.value })
                  }
                >
                  <option>Select level</option>
                  {levels.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>

                <Nav prev={prev} submit={submit} />
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
}

/* NAV */
function Nav({ next, prev, submit }) {
  return (
    <div className="flex gap-3 pt-2">
      {prev && (
        <button
          onClick={prev}
          className="w-1/2 p-3 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-xl"
        >
          <ArrowLeft size={16} /> Back
        </button>
      )}

      {submit ? (
        <button
          onClick={submit}
          className="w-1/2 p-3 rounded-xl font-semibold
          bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500"
        >
          Create 🚀
        </button>
      ) : (
        <button
          onClick={next}
          className="w-1/2 p-3 rounded-xl font-semibold
          bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500"
        >
          Next <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}