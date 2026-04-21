// src/context/UserContext.jsx

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  // 🎯 Learning state global
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null); // ✅ FIX

  // 👤 (optionnel futur auth)
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,

        selectedFiliere,
        setSelectedFiliere,

        selectedLevel,
        setSelectedLevel,

        selectedSubject,
        setSelectedSubject,

        selectedCourse,      // ✅ FIX
        setSelectedCourse,   // ✅ FIX

        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}