import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, ArrowLeft } from "lucide-react";

import StepCountry from "./steps/StepCountry";
import StepFiliere from "./steps/StepFiliere";
import StepLevel from "./steps/StepLevel";
import StepSubject from "./steps/StepSubject";
import CourseView from "../../features/dashboard/pages/CourseView";

const steps = ["Pays", "filiere", "niveau", "matière", "cours"];

export default function WizardContainer() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const [selection, setSelection] = useState({
    country: null,
    filiere: null,
    level: null,
    subject: null,
  });

  const goNext = () => {
    setDirection(1);

    setStep((s) => {
      const next = Math.min(s + 1, steps.length - 1);

      // 🎉 Confetti à la fin
      if (next === steps.length - 1) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      }

      return next;
    });
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98,
    }),
  };

  const progress = (step / (steps.length - 1)) * 100;

  return (
    <div className="relative w-full min-h-[600px]">

      {/* 🔥 PROGRESS BAR */}
      <div className="w-full h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-1 bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* 🔥 STEP INDICATORS */}
      <div className="flex justify-center gap-3 mb-6">
        {steps.slice(0, 4).map((s, i) => {
          const status =
            i === step ? "active" : i < step ? "done" : "locked";

          return (
            <div
              key={s}
              className={`
                flex items-center gap-2 px-4 py-1 rounded-full text-xs transition
                ${
                  status === "active"
                    ? "bg-white text-black"
                    : status === "done"
                    ? "bg-emerald-500 text-black"
                    : "bg-white/10 text-white/40"
                }
              `}
            >
              {status === "done" && <Check size={14} />}
              <span className="capitalize">{s}</span>
            </div>
          );
        })}
      </div>

      {/* 🔥 BACK BUTTON */}
      {step > 0 && step < 4 && (
        <button
          onClick={goBack}
          className="absolute top-2 left-2 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      )}

      {/* 🌟 SWIPER AREA */}
      <div className="relative min-h-[500px] overflow-hidden">

        <AnimatePresence mode="wait" custom={direction}>

          {step === 0 && (
            <motion.div
              key="country"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35 }}
              className="absolute w-full"
            >
              <StepCountry
                value={selection.country}
                onSelect={(c) => {
                  setSelection({
                    country: c,
                    filiere: null,
                    level: null,
                    subject: null,
                  });
                  goNext();
                }}
              />
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="filiere"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35 }}
              className="absolute w-full"
            >
              <StepFiliere
                countryId={selection.country?.id}
                onSelect={(f) => {
                  setSelection((p) => ({ ...p, filiere: f }));
                  goNext();
                }}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="level"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35 }}
              className="absolute w-full"
            >
              <StepLevel
                countryId={selection.country?.id}
                filiereId={selection.filiere?.id}
                onSelect={(l) => {
                  setSelection((p) => ({ ...p, level: l }));
                  goNext();
                }}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="subject"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35 }}
              className="absolute w-full"
            >
              <StepSubject
                levelId={selection.level?.id}
                countryId={selection.country?.id}
                onSelect={(s) => {
                  setSelection((p) => ({ ...p, subject: s }));
                  goNext();
                }}
              />
            </motion.div>
          )}

          {step === 4 && selection.subject && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full"
            >
              <CourseView
                subjectId={selection.subject.id}
                countryId={selection.country.id}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}