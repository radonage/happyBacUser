import { useEffect, useMemo, useState } from "react";
import { register } from "../../../../api/auth.api";

export function useRegister() {
  const [step, setStep] = useState(1);

  const [search, setSearch] = useState("");
  const [openCountry, setOpenCountry] = useState(false);

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);

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

  /* PASSWORD */
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

  /* VALIDATION STEP 1 */
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isPhoneValid = form.phone.replace(/\D/g, "").length >= 5;
  const isNameValid = form.firstName.trim() && form.lastName.trim();
  const canGoNext = isEmailValid && isPhoneValid && isNameValid;

  /* COUNTRIES */
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

  const filteredCountries = useMemo(() => {
    return countries.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, countries]);

  /* FILIERES */
  useEffect(() => {
    if (!form.country?.id) return;

    fetch(
      `https://happybacbacendfinal.fly.dev/api/filieres?countryId=${form.country.id}`
    )
      .then((r) => r.json())
      .then(setFilieres);
  }, [form.country]);

  /* LEVELS */
  useEffect(() => {
    if (!form.country?.id || !form.filiereId) return;

    fetch(
      `https://happybacbacendfinal.fly.dev/api/levels/filter?countryId=${form.country.id}&filiereId=${form.filiereId}`
    )
      .then((r) => r.json())
      .then(setLevels);
  }, [form.country, form.filiereId]);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  const submit = async () => {
    const payload = {
      ...form,
      phone: `${form.dialCode || ""}${form.phone}`,
    };

    await register(payload);
    return payload;
  };

  return {
    step,
    next,
    prev,

    form,
    setForm,

    search,
    setSearch,
    openCountry,
    setOpenCountry,
    filteredCountries,

    filieres,
    levels,

    acceptTerms,
    setAcceptTerms,
    openTerms,
    setOpenTerms,

    canGoNext,
    canPasswordNext,

    submit,
  };
}