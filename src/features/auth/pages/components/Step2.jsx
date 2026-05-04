export default function Step2({
  form,
  setForm,
  next,
  prev,
  canPasswordNext,
  input,
}) {
  return (
    <div className="space-y-[4%]">

      {/* PASSWORD */}
      <input
        type="password"
        className={input}
        placeholder="Mot de passe"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      {/* CONFIRM PASSWORD */}
      <input
        type="password"
        className={input}
        placeholder="Confirmation"
        onChange={(e) =>
          setForm({ ...form, confirmPassword: e.target.value })
        }
      />

      {/* NEXT BUTTON (LOGIN STYLE GRADIENT) */}
      <button
        onClick={next}
        disabled={!canPasswordNext}
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
        Suivant
      </button>

      {/* BACK BUTTON (LOGIN SUBTLE STYLE) */}
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