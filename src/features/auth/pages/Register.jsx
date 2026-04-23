import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { register } from "../../../api/auth.api";
import { useUser } from "../../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { setUser } = useUser();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [search, setSearch] = useState("");
    const [openCountry, setOpenCountry] = useState(false);

    const [countries, setCountries] = useState([]);
    const [filieres, setFilieres] = useState([]);
    const [levels, setLevels] = useState([]);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dialCode: "",
        password: "",
        confirmPassword: "",
        country: null,
        filiereId: "",
        levelId: "",
    });

    /* ================= PASSWORD ================= */
    const password = form.password || "";
    const confirm = form.confirmPassword || "";

    const rules = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
    };

    const passwordStrong = Object.values(rules).every(Boolean);
    const passwordMatch = password === confirm && confirm.length > 0;
    const canPasswordNext = passwordStrong && passwordMatch;

    /* ================= COUNTRIES ================= */
    useEffect(() => {
        const load = async () => {
            const res = await fetch("https://happybacbacendfinal.fly.dev/api/countries");
            const backend = await res.json();

            const rest = await fetch(
                "https://restcountries.com/v3.1/all?fields=name,idd,flags"
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

    useEffect(() => {
        const close = () => setOpenCountry(false);
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, []);

    const filtered = useMemo(() => {
        return countries.filter((c) =>
            c.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, countries]);

    /* ================= FILIERES ================= */
    useEffect(() => {
        if (!form.country?.id) return;
        fetch(`https://happybacbacendfinal.fly.dev/api/filieres?countryId=${form.country.id}`)
            .then((r) => r.json())
            .then(setFilieres);
    }, [form.country]);

    /* ================= LEVELS ================= */
    useEffect(() => {
        if (!form.country?.id || !form.filiereId) return;
        fetch(`https://happybacbacendfinal.fly.dev/api/levels/filter?countryId=${form.country.id}&filiereId=${form.filiereId}`)
            .then((r) => r.json())
            .then(setLevels);
    }, [form.country, form.filiereId]);

    const next = () => setStep((s) => s + 1);
    const prev = () => setStep((s) => s - 1);

    /* ================= SUBMIT ================= */
    const submit = async () => {
        const payload = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: `${form.dialCode || ""}${form.phone}`,
            password: form.password,
            filiereId: form.filiereId,
            levelId: form.levelId,
            countryId: form.country?.id,
        };

        console.log("📤 DATA SENT:", payload);

        await register(payload);

        toast.success("Inscription réussie 🎉");
        setUser(form);
        navigate("/");
    };

    const input =
        "w-full p-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500 outline-none backdrop-blur-xl transition";

    /* ================= VALIDATION ================= */
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const isPhoneValid = form.phone.replace(/\D/g, "").length >= 5;
    const isNameValid = form.firstName.trim() && form.lastName.trim();
    const canGoNext = isEmailValid && isPhoneValid && isNameValid;

    return (
        <div className="min-h-screen flex items-center justify-center relative text-white px-4">

            {/* BACKGROUND */}
            <div className="absolute inset-0">
                <motion.img
                    src="/monimage.avif"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* CARD */}
            <div className="w-full max-w-xl p-8 rounded-3xl relative z-10 bg-white/5 backdrop-blur-3xl border border-white/10">

                <h1 className="text-3xl font-bold text-center">Créer un compte</h1>

                <div className="mt-6">
                    <AnimatePresence mode="wait">

                        {/* ================= STEP 1 ================= */}
                        {step === 1 && (
                            <motion.div className="space-y-4">

                                <input
                                    className={input}
                                    placeholder="Prénom"
                                    onChange={(e) =>
                                        setForm({ ...form, firstName: e.target.value })
                                    }
                                />

                                <input
                                    className={input}
                                    placeholder="Nom"
                                    onChange={(e) =>
                                        setForm({ ...form, lastName: e.target.value })
                                    }
                                />

                                <input
                                    className={input}
                                    placeholder="Email"
                                    onChange={(e) =>
                                        setForm({ ...form, email: e.target.value })
                                    }
                                />

                                {/* ================= COUNTRY ================= */}
                                <div className="relative" onClick={(e) => e.stopPropagation()}>

                                    <input
                                        className={input}
                                        placeholder="Cherchez votre pays"
                                        value={search}
                                        onFocus={() => setOpenCountry(true)}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setOpenCountry(true);
                                        }}
                                    />

                                    {openCountry && (
                                        <div className="absolute z-50 mt-2 w-full max-h-44 overflow-auto bg-black/80 backdrop-blur-xl rounded-xl border border-white/10">

                                            {filtered.map((c) => (
                                                <div
                                                    key={c.id}
                                                    onClick={() => {
                                                        setForm({
                                                            ...form,
                                                            country: c,
                                                            dialCode: c.dial,
                                                        });
                                                        setSearch(c.name);
                                                        setOpenCountry(false);
                                                    }}
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
                                    )}
                                </div>

                                {/* ================= STRIPE STYLE PHONE ================= */}
                                <div className="flex items-center gap-2">

                                    <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 min-w-[90px] text-center">
                                        {form.dialCode || "+?"}
                                    </div>

                                    <input
                                        className={input}
                                        placeholder="612345678"
                                        value={form.phone}
                                        onChange={(e) =>
                                            setForm({ ...form, phone: e.target.value })
                                        }
                                    />
                                </div>

                                <button
                                    onClick={next}
                                    disabled={!canGoNext}
                                    className={`w-full p-3 rounded-xl font-semibold transition
                                    ${canGoNext
                                            ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                                            : "bg-white/10 text-white/30 cursor-not-allowed"}`}
                                >
                                    Suivant
                                </button>
                            </motion.div>
                        )}

                        {/* ================= STEP 2 ================= */}
                        {step === 2 && (
                            <motion.div className="space-y-4">

                                <input
                                    type="password"
                                    className={input}
                                    placeholder="Mot de passe"
                                    onChange={(e) =>
                                        setForm({ ...form, password: e.target.value })
                                    }
                                />

                                <input
                                    type="password"
                                    className={input}
                                    placeholder="Confirmer mot de passe"
                                    onChange={(e) =>
                                        setForm({ ...form, confirmPassword: e.target.value })
                                    }
                                />

                                <button
                                    onClick={next}
                                    disabled={!canPasswordNext}
                                    className={`w-full p-3 rounded-xl font-semibold transition
                                    ${canPasswordNext
                                            ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                                            : "bg-white/10 text-white/30 cursor-not-allowed"}`}
                                >
                                    Suivant
                                </button>

                                <button onClick={prev} className="w-full p-3 rounded-xl bg-white/10">
                                    Retour
                                </button>
                            </motion.div>
                        )}

                        {/* ================= STEP 3 ================= */}
                        {step === 3 && (
                            <motion.div className="space-y-4">

                                <select
                                    className={input}
                                    onChange={(e) =>
                                        setForm({ ...form, filiereId: e.target.value })
                                    }
                                >
                                    <option>Select filière</option>
                                    {filieres.map((f) => (
                                        <option key={f.id} value={f.id}>{f.name}</option>
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
                                        <option key={l.id} value={l.id}>{l.name}</option>
                                    ))}
                                </select>

                                <button
                                    onClick={submit}
                                    className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500"
                                >
                                    Créer compte
                                </button>

                                <button onClick={prev} className="w-full p-3 rounded-xl bg-white/10">
                                    Retour
                                </button>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}