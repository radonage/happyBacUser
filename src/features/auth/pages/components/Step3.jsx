export default function Step3({
  filieres,
  levels,
  form,
  setForm,
  acceptTerms,
  setAcceptTerms,
  submit,
  prev,
  input,
}) {
  return (
    <div className="space-y-[4%]">

      {/* FILIERE */}
      <select
        className={input}
        onChange={(e) =>
          setForm({ ...form, filiereId: e.target.value })
        }
      >
        <option value="">Filière</option>
        {filieres.map((f) => (
          <option key={f.id} value={f.id}>
            {f.name}
          </option>
        ))}
      </select>

      {/* LEVEL */}
      <select
        className={input}
        onChange={(e) =>
          setForm({ ...form, levelId: e.target.value })
        }
      >
        <option value="">Niveau</option>
        {levels.map((l) => (
          <option key={l.id} value={l.id}>
            {l.name}
          </option>
        ))}
      </select>

      {/* TERMS */}
      <label className="
        flex items-center gap-2
        text-white/60 text-sm
        cursor-pointer
      ">
        <input
          type="checkbox"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
          className="accent-cyan-500"
        />
        J’accepte les conditions d’utilisation
      </label>

      {/* CREATE ACCOUNT BUTTON (LOGIN STYLE PREMIUM) */}
      <button
        onClick={submit}
        disabled={!acceptTerms}
        className="
          w-full p-[3.5%]
          rounded-xl font-semibold
          bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500
          hover:scale-[1.03] active:scale-[0.97]
          transition duration-300
          shadow-[0_0_30px_rgba(99,102,241,0.4)]
          disabled:opacity-30 disabled:cursor-not-allowed
        "
      >
        Créer compte
      </button>

      {/* BACK BUTTON (LOGIN GLASS STYLE) */}
      <button
        onClick={prev}
        className="
          w-full p-[3%]
          rounded-xl
          bg-black/30
          border border-white/10
          text-white/70
          hover:bg-white/10
          transition
        "
      >
        Retour
      </button>

    </div>
  );
}