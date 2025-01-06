import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const LightOnDarkContext = createContext();

function LightOnDarkProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(true, 'isDarkMode');

  useEffect(function () {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  });

  function toggleLightOnDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }
  return (
    <LightOnDarkContext.Provider value={{ isDarkMode, toggleLightOnDarkMode }}>
      {children}
    </LightOnDarkContext.Provider>
  );
}

function useLightOnDarkMode() {
  const context = useContext(LightOnDarkContext);
  if (context === undefined)
    throw new Error('LightOnDarkContext was used outside of LightOnDark Provider');

  return context;
}

export { LightOnDarkProvider, useLightOnDarkMode };
