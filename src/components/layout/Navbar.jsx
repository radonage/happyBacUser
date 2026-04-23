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

  /* =========================
     🌍 SAFE IP DETECTION FIXED
  ========================= */
  useEffect(() => {
  const detectCountryFromIP = async () => {
    if (selectedCountry) return;

    try {
      const res = await fetch("https://api.country.is/");
      const data = await res.json();

      const countryCode = data?.country;

      if (!countryCode) return;

      const country = countries.find(
        (c) =>
          c.code?.toLowerCase?.() === countryCode.toLowerCase()
      );

      if (country) {
        setSelectedCountry(country);
        localStorage.setItem(
          "selectedCountry",
          JSON.stringify(country)
        );
      } else {
        console.log("Country not found in list:", countryCode);
      }
    } catch (err) {
      console.log("IP detection failed:", err);
    }
  };

  detectCountryFromIP();
}, [selectedCountry, setSelectedCountry]);

  /* =========================
     LOCAL STORAGE SYNC
  ========================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCountry = localStorage.getItem("selectedCountry");

    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));
    }

    if (storedCountry && !selectedCountry) {
      setSelectedCountry(JSON.parse(storedCountry));
    }
  }, [user, selectedCountry, setUser, setSelectedCountry]);

  const menu = [
    { label: "Accueil", icon: Home, path: "/" },
    { label: "Matières", icon: BookOpen, path: "/explorer" },
    { label: "Examens", icon: FileText, path: "/exams" },
    { label: "Orientation", icon: Compass, path: "/orientation" },
    { label: "Études", icon: Globe, path: "/etudes" },
    { label: "Contact", icon: Mail, path: "/contact" },
  ];

  const countryName =
    selectedCountry?.name ?? "Détection du pays...";

  return (
    <div className="relative w-full h-16 flex items-center justify-between px-6
      bg-black/25 backdrop-blur-3xl
      border-b border-white/10
      shadow-[0_10px_60px_rgba(0,0,0,0.6)]
      overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-cyan-500/10 blur-3xl" />

      <div className="relative z-10 flex items-center gap-3 text-xs text-white/70">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span>📍 {countryName}</span>
      </div>

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
              {active && (
                <motion.div
                  layoutId="navbar-pill"
                  className="absolute inset-0 rounded-xl
                  bg-gradient-to-r from-purple-500/25 to-cyan-500/20
                  shadow-[0_0_25px_rgba(99,102,241,0.25)]"
                />
              )}

              <Icon
                size={16}
                className={clsx(
                  "relative z-10 transition duration-300",
                  active
                    ? "text-cyan-300"
                    : "text-white/70 hover:text-cyan-300"
                )}
              />

              <span className="text-sm relative z-10">{item.label}</span>
            </motion.div>
          );
        })}
      </div>

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

            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-9 h-9 rounded-full
              bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500
              flex items-center justify-center
              text-white font-bold
              shadow-[0_0_30px_rgba(168,85,247,0.6)]"
            >
              {user?.name?.charAt(0) || "U"}
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                setUser(null);
                setSelectedCountry(null);
                localStorage.removeItem("user");
                localStorage.removeItem("selectedCountry");
                navigate("/login");
              }}
              className="w-9 h-9 rounded-full bg-red-500/70 flex items-center justify-center cursor-pointer"
            >
              <LogOut size={16} />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}