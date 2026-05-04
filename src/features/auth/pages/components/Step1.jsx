export default function Step1({
  form,
  setForm,
  next,
  canGoNext,
  search,
  setSearch,
  openCountry,
  setOpenCountry,
  filteredCountries,
  input,
}) {
  return (
    <div className="space-y-[4%]">

      {/* ================= FIRST NAME ================= */}
      <input
        className={input}
        placeholder="Prénom"
        onChange={(e) =>
          setForm({ ...form, firstName: e.target.value })
        }
      />

      {/* ================= LAST NAME ================= */}
      <input
        className={input}
        placeholder="Nom"
        onChange={(e) =>
          setForm({ ...form, lastName: e.target.value })
        }
      />

      {/* ================= EMAIL ================= */}
      <input
        className={input}
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      {/* ================= COUNTRY DROPDOWN (LOGIN STYLE PREMIUM) ================= */}
      <div className="relative" onClick={(e) => e.stopPropagation()}>

        <input
          className={input}
          placeholder="Pays"
          value={search}
          onFocus={() => setOpenCountry(true)}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpenCountry(true);
          }}
        />

        {openCountry && (
          <div className="
            absolute z-50 mt-[2%] w-full max-h-44 overflow-auto
            bg-black/50 backdrop-blur-2xl
            rounded-xl border border-white/10
            shadow-[0_0_30px_rgba(0,0,0,0.4)]
          ">

            {filteredCountries.map((c) => (
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
                className="
                  p-[3%]
                  flex items-center gap-3
                  hover:bg-white/10
                  cursor-pointer
                  transition
                "
              >
                {c.flag && (
                  <img
                    src={c.flag}
                    className="w-5 h-5 rounded-full object-cover shadow-sm"
                  />
                )}

                <span className="text-white">{c.name}</span>

                <span className="ml-auto text-white/40 text-sm">
                  {c.dial}
                </span>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* ================= PHONE (LOGIN STYLE STRIPE FEEL) ================= */}
      <div className="flex gap-2">

        <div className="
          px-[4%] py-[3%]
          bg-black/30
          border border-white/10
          rounded-xl
          text-white/70
          backdrop-blur-xl
          min-w-[90px]
          text-center
        ">
          {form.dialCode || "+?"}
        </div>

        <input
          className={input}
          placeholder="Téléphone"
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

      </div>

      {/* ================= NEXT BUTTON (LOGIN EXACT GRADIENT SYSTEM) ================= */}
      <button
        onClick={next}
        disabled={!canGoNext}
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

    </div>
  );
}