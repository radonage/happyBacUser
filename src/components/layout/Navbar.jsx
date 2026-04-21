import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import clsx from "clsx";

import { useUser } from "../../context/UserContext";
import {
  Home,
  BookOpen,
  FileText,
  Compass,
  Globe,
  Mail,
  LogIn,
  UserPlus,
} from "lucide-react";

export default function Navbar() {
  const { selectedCountry, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [hovered, setHovered] = useState(null);

  const menu = [
    { label: "Accueil", icon: Home, path: "/" },
    { label: "Matières", icon: BookOpen, path: "/matiere" },
    { label: "Examens", icon: FileText, path: "/exams" },
    { label: "Orientation", icon: Compass, path: "/orientation" },
    { label: "Études", icon: Globe, path: "/etudes" },
    { label: "Contact", icon: Mail, path: "/contact" },
  ];

  const authMenu = [
    { label: "Login", icon: LogIn, path: "/login" },
    { label: "Register", icon: UserPlus, path: "/register" },
  ];

  const countryName = selectedCountry?.name ?? "Choisissez un pays";

  return (
    <div className="relative w-full h-16 flex items-center justify-between px-6
      bg-black/40 backdrop-blur-3xl
      border-b border-white/10
      shadow-[0_20px_80px_rgba(0,0,0,0.6)]
      overflow-hidden"
    >
      {/* glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-cyan-500/10 blur-3xl" />

      {/* LEFT */}
      <div className="relative z-10 flex items-center gap-3 text-xs text-white/70">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span>📍 {countryName}</span>
      </div>

      {/* CENTER MENU */}
      <div className="relative z-10 flex items-center gap-1 md:gap-3 bg-white/5 px-2 py-1 rounded-2xl border border-white/10">

        {menu.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <motion.div
              key={item.path}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHovered(item.path)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={clsx(
                "relative flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-pointer transition-all",
                active
                  ? "bg-gradient-to-r from-purple-500/30 to-cyan-500/20 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              {active && (
                <motion.div
                  layoutId="navbar-pill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              <Icon size={16} className="relative z-10" />

              <span className="text-sm relative z-10">{item.label}</span>

              {hovered === item.path && !active && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
              )}
            </motion.div>
          );
        })}

      </div>

      {/* RIGHT AUTH SECTION */}
      <div className="relative z-10 flex items-center gap-3">

        {/* NOT LOGGED IN */}
        {!user && (
          <div className="flex items-center gap-2">

            {authMenu.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-pointer text-white/70 hover:text-white hover:bg-white/10 transition"
                >
                  <Icon size={14} />
                  <span className="text-sm">{item.label}</span>
                </motion.div>
              );
            })}

          </div>
        )}

        {/* LOGGED IN */}
        {user && (
          <>
            <div className="hidden md:block text-xs text-white/60">
              👋 {user.name}
            </div>

            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-9 h-9 rounded-full
                bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500
                flex items-center justify-center
                text-white font-bold
                shadow-[0_0_25px_rgba(168,85,247,0.6)]
                ring-2 ring-white/20"
            >
              {user?.name?.charAt(0) || "U"}
            </motion.div>
          </>
        )}

      </div>
    </div>
  );
}