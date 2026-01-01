import { createContext, useContext, useState, useEffect } from "react";

const DarkModeContext = createContext();
const STORAGE_KEY = "dark-mode";

export const DarkModeProvider = ({ children }) => {
  const getInitialMode = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) return JSON.parse(saved);
    } catch (error) {
      console.log("Could not read dark mode from storage:", error);
    }
    return false;
  };

  const [isDark, setIsDark] = useState(getInitialMode);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(isDark));
    } catch (error) {
      console.log("Could not save dark mode preference:", error);
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark((prev) => !prev);

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
