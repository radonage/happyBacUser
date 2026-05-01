import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  Menu,
  X
} from "lucide-react";

export default function Navbar() {
  const { selectedCountry, setSelectedCountry, user, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const detectCountryFromIP = async () => {
      if (selectedCountry) return;

      try {
        const res = await fetch("https://api.country.is/");
        const data = await res.json();

        const countryCode = data?.country;

        const country = countries.find(
          (c) => c.code?.toLowerCase?.() === countryCode?.toLowerCase()
        );

        if (country) {
          setSelectedCountry(country);
          localStorage.setItem("selectedCountry", JSON.stringify(country));
        }
      } catch { }
    };

    detectCountryFromIP();
  }, []);

  const menu = [
    { label: "Accueil", icon: Home, path: "/" },
    { label: "Matières", icon: BookOpen, path: "/explorer" },
    { label: "Examens", icon: FileText, path: "/exams" },
    { label: "Orientation", icon: Compass, path: "/orientation" },
    { label: "Études", icon: Globe, path: "/etudes" },
    { label: "Contact", icon: Mail, path: "/contact" },
  ];

  const countryName = selectedCountry?.name ?? "Détection...";

  const NavItem = ({ item, onClick }) => {
    const Icon = item.icon;
    const active = location.pathname === item.path;

    return (
      <motion.div
        onClick={() => {
          if (item.path === "/exams" && !user) {
            navigate("/login");
          } else {
            navigate(item.path);
          }

          onClick?.();
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition",
          active
            ? "bg-white/10 text-white"
            : "text-white/60 hover:text-white hover:bg-white/5"
        )}
      >
        <Icon size={16} />
        <span className="text-sm">{item.label}</span>
      </motion.div>
    );
  };

  return (
    <div className="w-full fixed top-0 z-50">


      <div className="hidden md:flex h-16 items-center justify-between px-6
        bg-black/30 backdrop-blur-2xl border-b border-white/10">

        <div className="text-xs text-white/70 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          📍 {countryName}
        </div>

        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10">
          {menu.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </div>

        <div className="flex items-center gap-3">

          {!user && (
            <>
              <button onClick={() => navigate("/login")} className="text-sm text-white/70 hover:text-white">
                Login
              </button>
              <button onClick={() => navigate("/register")} className="text-sm px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20">
                Register
              </button>
            </>
          )}

          {user && (
            <>
              <div className="text-sm text-white/70 hidden lg:block">
                {user.firstName} {user.lastName}
              </div>

              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                {user.firstName?.charAt(0)}
              </div>

              <button
                onClick={() => {
                  setUser(null);
                  localStorage.clear();
                  navigate("/login");
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/70"
              >
                <LogOut size={14} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="md:hidden flex items-center justify-between h-14 px-4
        bg-black/40 backdrop-blur-xl border-b border-white/10">

        <span className="text-xs text-white/70">📍 {countryName}</span>

        <button onClick={() => setMobileOpen(true)}>
          <Menu />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120 }}
              className="fixed right-0 top-0 h-full w-[80%] max-w-sm
                bg-black/90 backdrop-blur-2xl z-50 p-5 flex flex-col gap-4"
            >

              <div className="flex justify-between items-center">
                <span className="text-white font-semibold">Menu</span>
                <button onClick={() => setMobileOpen(false)}>
                  <X />
                </button>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                {menu.map((item) => (
                  <NavItem
                    key={item.path}
                    item={item}
                    onClick={() => setMobileOpen(false)}
                  />
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-white/10">
                {!user ? (
                  <div className="flex flex-col gap-2">
                    <button onClick={() => navigate("/login")} className="py-2 rounded-xl bg-white/10">
                      Login
                    </button>
                    <button onClick={() => navigate("/register")} className="py-2 rounded-xl bg-white/20">
                      Register
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setUser(null);
                      localStorage.clear();
                      navigate("/login");
                    }}
                    className="w-full py-2 rounded-xl bg-red-500/70"
                  >
                    Logout
                  </button>
                )}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}