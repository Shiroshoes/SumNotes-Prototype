// ThemeContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

// Define light and dark themes
export const lightTheme = {
  container: "#fff",
  text: "#000",
  buttonBackground: "#b7b7b7",
  iconColor: "#000",
  textInputBackground: "#eee",
  topLayoutBackground: "#fff",
  divider: "#585757",
};

export const darkTheme = {
  container: "#121212",
  text: "#fff",
  buttonBackground: "#313131",
  iconColor: "#fff",
  textInputBackground: "#333",
  topLayoutBackground: "#1f1f1f",
  divider: "#9e9e9e",
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === "dark");
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem("IS_DARK_MODE");
        if (saved !== null) setIsDarkMode(saved === "true");
      } catch (e) {
        console.log("Failed to load theme", e);
      }
    };
    loadTheme();
  }, [systemScheme]);

  const toggleDarkMode = async () => {
    try {
      const newValue = !isDarkMode;
      setIsDarkMode(newValue);
      await AsyncStorage.setItem("IS_DARK_MODE", newValue.toString());
    } catch (e) {
      console.log("Failed to save theme", e);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, theme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
