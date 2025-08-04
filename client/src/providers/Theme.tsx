import { createContext, useState } from "react";

export enum EnumTheme {
  LIGHT = "light",
  DARK = "dark",
}

export const DEFAULT_THEME: EnumTheme = EnumTheme.LIGHT;

export const ThemeContext = createContext<{
  theme: EnumTheme;
  setTheme: (theme: EnumTheme) => void;
}>({
  theme: DEFAULT_THEME,
  setTheme: () => {
    console.log("setTheme");
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  const value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
