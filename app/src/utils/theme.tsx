"use client";

import { useCallback, useEffect, useState } from "react";

export enum Theme {
  Light = "light",
  Dark = "dark",
  System = "system",
}

export function useTheme() {
  const [theme, _setTheme] = useState<Theme>(Theme.System);

  const setTheme = useCallback((theme: Theme) => {
    localStorage.setItem("theme", theme);
    _setTheme(theme);
  }, []);

  useEffect(() => {
    setTheme(
      (window.localStorage.getItem("theme") as Theme | undefined) ??
        Theme.System,
    );
  }, [setTheme]);

  useEffect(() => {
    if (theme !== Theme.System) {
      return;
    }

    const listener = (event: MediaQueryListEvent) => {
      const prefersDarkTheme = event.matches;
      setTheme(prefersDarkTheme ? Theme.Dark : Theme.Light);
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", listener);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", listener);
    };
  }, [setTheme, theme]);

  useEffect(() => {
    const root = document.documentElement;

    let actualTheme = theme;
    if (theme === Theme.System) {
      const prefersDarkTheme = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      actualTheme = prefersDarkTheme ? Theme.Dark : Theme.Light;
    }

    root.classList.remove(Theme.Light, Theme.Dark);
    root.classList.add(actualTheme);
  }, [theme]);

  return {
    theme,
    setTheme,
  };
}
