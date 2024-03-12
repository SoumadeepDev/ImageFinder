import { createContext, useContext, useState, useEffect } from "react";

const Appcontext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState("Lake");

  const toggleDarkTheme = () => {
    const newDark = !isDarkTheme;
    setIsDarkTheme(newDark);
    const body = document.querySelector("body");
    body.classList.toggle("dark-theme", newDark);
  };
  const pageNumber = 1;

  return (
    <Appcontext.Provider
      value={{
        isDarkTheme,
        toggleDarkTheme,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </Appcontext.Provider>
  );
};

export const useGlobalContext = () => useContext(Appcontext);
