"use client";

import * as React from "react";
import { ThemeProviderProps } from "./types";

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) => {
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    const activeTheme =
      savedTheme || (defaultTheme === "system" ? systemTheme : defaultTheme);

    if (activeTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [defaultTheme]);

  return <>{children}</>;
};
