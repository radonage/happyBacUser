import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { register } from "../../../api/auth.api";
import { useUser } from "../../../context/UserContext";
import { Search, ArrowRight, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { setUser } = useUser();

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

    // 🌍 COUNTRIES
    useEffect(() => {
        const load = async () => {
            const res = await fetch("http://localhost:8080/api/countries");
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

    // 📚 FILIERES
    useEffect(() => {
        if (!form.country?.id) return;

        fetch(`http://localhost:8080/api/filieres?countryId=${form.country.id}`)
            .then((r) => r.json())
            .then(setFilieres);
    }, [form.country]);
    const navigate = useNavigate();
    // 🎓 LEVELS
    useEffect(() => {
        if (!form.country?.id || !form.filiereId) return;

        fetch(
            `http://localhost:8080/api/levels/filter?countryId=${form.country.id}&filiereId=${form.filiereId}`
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
                countryId: form.country?.id, // ✔️ seul champ gardé
            };

            console.log("🚀 CLEAN PAYLOAD:");
            console.log(JSON.stringify(payload, null, 2));

            await register(payload);

              toast.success("Inscription réussie 🎉");

        // ✅ redirection vers accueil
            navigate("/");
            setUser(form);

        } catch (err) {
            console.error(err);
            toast.error("Error");
        }
    };

    const input =
        "w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500 outline-none backdrop-blur-xl";

    // 🧠 progress
    const progress = (step / 3) * 100;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#120018] to-black text-white px-4">

            {/* BACKGROUND GLOW */}
            <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full top-20 left-20" />
            <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-[150px] rounded-full bottom-10 right-10" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl relative z-10"
            >

                {/* HEADER */}
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
                    Create account
                </h1>

                {/* PROGRESS BAR */}
                <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-400"
                        animate={{ width: `${progress}%` }}
                    />
                </div>

                <p className="text-white/40 text-sm mt-3">
                    Step {step} / 3
                </p>

                {/* STEPS */}
                <AnimatePresence mode="wait">

                    {/* STEP 1 */}
                    {step === 1 && (
                        <motion.div
                            key="s1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-4 mt-6"
                        >

                            <input
                                className={input}
                                placeholder="Email"
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />

                            {/* COUNTRY */}
                            <div className="relative">

                                <input
                                    className={input}
                                    placeholder="Search country..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />

                                <div className="max-h-48 overflow-auto mt-2 rounded-xl bg-black/60 border border-white/10 backdrop-blur-xl">

                                    {filtered.map((c) => (
                                        <div
                                            key={c.id}
                                            onClick={() =>
                                                setForm({ ...form, country: c })
                                            }
                                            className="flex items-center gap-3 p-3 hover:bg-white/10 cursor-pointer"
                                        >
                                            {c.flag && (
                                                <img src={c.flag} className="w-5 h-5 rounded-full" />
                                            )}
                                            <span>{c.name}</span>
                                            <span className="ml-auto text-white/40">
                                                {c.dial}
                                            </span>
                                        </div>
                                    ))}

                                </div>
                            </div>

                            {/* PHONE */}
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
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4 mt-6"
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
                            className="space-y-4 mt-6"
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
                                disabled={!form.filiereId}
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
            </motion.div>
        </div>
    );
}

// 🧠 NAV BUTTONS
function Nav({ next, prev, submit }) {
    return (
        <div className="flex gap-3 pt-2">
            {prev && (
                <button onClick={prev} className="w-1/2 p-3 rounded-xl bg-white/10 flex items-center justify-center gap-2">
                    <ArrowLeft size={16} /> Back
                </button>
            )}

            {submit ? (
                <button onClick={submit} className="w-1/2 p-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500">
                    Create 🚀
                </button>
            ) : (
                <button onClick={next} className="w-1/2 p-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center gap-2">
                    Next <ArrowRight size={16} />
                </button>
            )}
        </div>
    );
}