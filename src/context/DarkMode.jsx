import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const DarkModeContext = createContext();
const STORAGE_KEY = "dark-mode";

export const DarkModeProvider = ({ children }) => {
  const getInitialMode = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? false;
    } catch {
      console.warn("Failed to read dark mode from localStorage");
      return false;
    }
  }, []);

  const [isDark, setIsDark] = useState(getInitialMode);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(isDark));
    } catch {
      console.warn("Failed to save dark mode preference");
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
