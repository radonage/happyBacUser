import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [selectedCountry, setSelectedCountry] = useState(() => {
    const stored = localStorage.getItem("selectedCountry");
    return stored ? JSON.parse(stored) : null;
  });

  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // 🔁 Sync user -> localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // 🔁 Sync country -> localStorage
  useEffect(() => {
    if (selectedCountry) {
      localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
    } else {
      localStorage.removeItem("selectedCountry");
    }
  }, [selectedCountry]);

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
        selectedCourse,
        setSelectedCourse,
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