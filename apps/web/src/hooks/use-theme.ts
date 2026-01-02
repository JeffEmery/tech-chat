import { useLayoutEffect, useState } from "react";

type Theme = "dark" | "light";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem("theme");
      return saved === "dark" || saved === "light" ? saved : "dark";
    } catch {
      return "dark";
    }
  });

  // Enable transitions after mount
  useLayoutEffect(() => {
    document.body.classList.add(
      "transition-colors",
      "duration-300",
      "ease-in-out"
    );
  }, []);

  useLayoutEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
};
