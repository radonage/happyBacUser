import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import clsx from "clsx";

import { useUser } from "../../context/UserContext";
import { countries } from "../../data/countries";
import {
  Home,
  BookOpen,
  FileText,
  Compass,
  Globe,
  Mail,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const { selectedCountry, setSelectedCountry, user, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCountry = localStorage.getItem("selectedCountry");

    if (storedUser && !user) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (!storedCountry && parsedUser.countryId) {
        const country = countries.find(c => c.id === parsedUser.countryId);
        if (country) {
          setSelectedCountry(country);
          localStorage.setItem("selectedCountry", JSON.stringify(country));
        }
      }
    }

    if (storedCountry && !selectedCountry) {
      setSelectedCountry(JSON.parse(storedCountry));
    }
  }, [setUser, setSelectedCountry, user, selectedCountry]);

  const menu = [
    { label: "Accueil", icon: Home, path: "/" },
    { label: "Explorer", icon: Compass, path: "/explorer" },
    { label: "Matières", icon: BookOpen, path: "/matiere" },
    { label: "Examens", icon: FileText, path: "/exams" },
    { label: "Orientation", icon: Compass, path: "/orientation" },
    { label: "Études", icon: Globe, path: "/etudes" },
    { label: "Contact", icon: Mail, path: "/contact" },
  ];

  const countryName = selectedCountry?.name ?? "Choisissez un pays";

  return (
    <div className="relative w-full h-16 flex items-center justify-between px-6
      bg-black/25 backdrop-blur-3xl
      border-b border-white/10
      shadow-[0_10px_60px_rgba(0,0,0,0.6)]
      overflow-hidden">

      {/* 🌈 GLOW BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-cyan-500/10 blur-3xl" />

      {/* LEFT */}
      <div className="relative z-10 flex items-center gap-3 text-xs text-white/70">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span>📍 {countryName}</span>
      </div>

      {/* CENTER MENU */}
      <div className="relative z-10 flex items-center gap-2 bg-white/5 px-2 py-1 rounded-2xl border border-white/10 backdrop-blur-xl">

        {menu.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <motion.div
              key={item.path}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHovered(item.path)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className={clsx(
                "relative flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-pointer transition-all",
                active ? "text-white" : "text-white/60 hover:text-white"
              )}
            >
              {/* 🎯 ACTIVE PILL (GLASS + GLOW) */}
              {active && (
                <motion.div
                  layoutId="navbar-pill"
                  className="absolute inset-0 rounded-xl
                  bg-gradient-to-r from-purple-500/25 to-cyan-500/20
                  shadow-[0_0_25px_rgba(99,102,241,0.25)]"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              {/* 🌟 ICON WOW EFFECT */}
              <Icon
                size={16}
                className={clsx(
                  "relative z-10 transition duration-300",
                  active
                    ? "text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                    : "text-white/70 hover:text-cyan-300 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                )}
              />

              <span className="text-sm relative z-10">{item.label}</span>

              {/* 🔵 HOVER DOT */}
              {hovered === item.path && !active && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* RIGHT USER */}
      <div className="relative z-10 flex items-center gap-3">

        {!user && (
          <div className="flex items-center gap-2">
            {[
              { label: "Se connecter", icon: LogIn, path: "/login" },
              { label: "S'inscrire", icon: UserPlus, path: "/register" },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  whileHover={{ scale: 1.08 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl
                    text-white/70 hover:text-white
                    hover:bg-white/10 transition cursor-pointer"
                >
                  <Icon size={14} className="text-cyan-300" />
                  <span className="text-sm">{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        )}

        {user && (
          <>
            <div className="hidden md:block text-xs text-white/60">
              👋 {user.name}
            </div>

            {/* AVATAR 3D GLOW */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-9 h-9 rounded-full
              bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500
              flex items-center justify-center
              text-white font-bold
              shadow-[0_0_30px_rgba(168,85,247,0.6)]
              ring-2 ring-white/20 cursor-pointer"
            >
              {user?.name?.charAt(0) || "U"}
            </motion.div>

            {/* LOGOUT */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              onClick={() => {
                setUser(null);
                setSelectedCountry(null);
                localStorage.removeItem("user");
                localStorage.removeItem("selectedCountry");
                navigate("/login");
              }}
              className="w-9 h-9 rounded-full
              bg-red-500/70 hover:bg-red-600
              flex items-center justify-center
              text-white cursor-pointer
              shadow-[0_0_20px_rgba(239,68,68,0.4)]
              ring-2 ring-white/10"
            >
              <LogOut size={16} />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}