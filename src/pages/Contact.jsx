import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, Sparkles } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-black">

      {/* 🌈 background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7c3aed33,transparent_40%),radial-gradient(circle_at_bottom,#06b6d433,transparent_40%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl">
              <Mail className="text-purple-300" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 text-transparent bg-clip-text">
            Contactez HappyBac
          </h1>

          <p className="text-white/50 mt-3">
            Une question ? Une idée ? On répond rapidement 🚀
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >

            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <MessageCircle size={18} className="text-cyan-300" />
              Envoyer un message
            </h2>

            <div className="space-y-4">

              <input
                placeholder="Votre nom"
                className="w-full p-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-purple-400"
              />

              <input
                placeholder="Votre email"
                className="w-full p-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-purple-400"
              />

              <textarea
                rows={5}
                placeholder="Votre message..."
                className="w-full p-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-purple-400 resize-none"
              />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl
                bg-gradient-to-r from-purple-500 to-cyan-500 font-semibold shadow-lg"
              >
                Envoyer <Send size={16} />
              </motion.button>

            </div>
          </motion.div>

          {/* SIDE INFO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h3 className="font-semibold flex items-center gap-2">
                <Sparkles className="text-purple-300" size={18} />
                Support rapide
              </h3>
              <p className="text-white/50 text-sm mt-2">
                Réponse sous 24h pour toutes les demandes étudiantes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h3 className="font-semibold">📧 Email</h3>
              <p className="text-white/50 text-sm mt-2">
                support@happybac.com
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h3 className="font-semibold">⚡ Temps de réponse</h3>
              <p className="text-white/50 text-sm mt-2">
                Généralement moins de 2h en journée
              </p>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}