"use client";

import { useSyncExternalStore } from "react";
import { StarsIcon, CloudIcon, MoonIcon, SunIcon } from "@/components/ui/icons";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getThemeSnapshot = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

const getServerSnapshot = (): "light" | "dark" => "light";

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerSnapshot,
  );

  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const isDark = mounted && theme === "dark";

  const handleThemeChange = () => {
    const nextTheme = theme === "light" ? "dark" : "light";

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.cookie = "theme=dark; path=/; max-age=31536000; SameSite=Lax";
    } else {
      document.documentElement.classList.remove("dark");
      document.cookie = "theme=light; path=/; max-age=31536000; SameSite=Lax";
    }

    window.dispatchEvent(new Event("storage"));
  };

  if (!mounted) {
    return (
      <div
        className="relative w-16 h-8 rounded-lg p-1 border border-black/5 shadow-inner bg-gray-200"
        aria-label="Toggle Theme"
      >
        <div className="w-6 h-6 rounded-full bg-gray-300" />
      </div>
    );
  }

  return (
    <button
      onClick={handleThemeChange}
      className="relative w-16 h-7.5 rounded-lg shadow-sm p-1 transition-colors duration-500 focus:outline-none overflow-hidden border border-black/5"
      style={{
        backgroundColor: isDark ? "#2d2e30" : "#38bdf8",
      }}
      aria-label="Toggle Theme"
    >
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      >
        <StarsIcon className="w-full h-full" />
      </div>

      <div
        className={`absolute inset-0 transition-all duration-500 pointer-events-none flex items-center justify-end pr-3 ${
          isDark ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        <CloudIcon className="w-5 h-5 text-white/80 fill-current" />
      </div>

      <div
        className={`relative w-6 h-6 rounded-full transition-transform duration-500 ease-out transform ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <MoonIcon className="w-full h-full transition-all duration-500" />
        ) : (
          <SunIcon className="w-full h-full transition-all duration-500" />
        )}
      </div>
    </button>
  );
}
