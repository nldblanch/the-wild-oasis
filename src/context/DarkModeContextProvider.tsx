import { useEffect } from "react";
import { DarkModeContext } from "./DarkModeContext";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

interface DarkModeProviderProps {
  children: React.ReactNode;
}

function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeProvider;
