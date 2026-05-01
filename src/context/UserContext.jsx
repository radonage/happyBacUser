import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {

  // ================= USER =================
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // ================= COUNTRY =================
  const [selectedCountry, setSelectedCountry] = useState(() => {
    const stored = localStorage.getItem("selectedCountry");
    return stored ? JSON.parse(stored) : null;
  });

  // ================= SCHOOL FLOW =================
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // ================= THEME (STATE ONLY) =================
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  // ================= PERSIST USER =================
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // ================= PERSIST COUNTRY =================
  useEffect(() => {
    if (selectedCountry) {
      localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
    } else {
      localStorage.removeItem("selectedCountry");
    }
  }, [selectedCountry]);

  // ================= PERSIST THEME ONLY =================
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <UserContext.Provider
      value={{
        // user
        user,
        setUser,

        // country
        selectedCountry,
        setSelectedCountry,

        // school flow
        selectedFiliere,
        setSelectedFiliere,
        selectedLevel,
        setSelectedLevel,
        selectedSubject,
        setSelectedSubject,
        selectedCourse,
        setSelectedCourse,

        // theme (ONLY STATE)
        theme,
        setTheme,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}