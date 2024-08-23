"use client";

import { Button, ButtonGroup } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { MdLightMode, MdAutoAwesome, MdDarkMode } from "react-icons/md";
import { type Theme, useTheme } from "~/utils/theme";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const modes = useMemo(() => {
    return [
      {
        icon: MdLightMode,
        key: "light",
      },
      {
        icon: MdAutoAwesome,
        key: "system",
      },
      {
        icon: MdDarkMode,
        key: "dark",
      },
    ] as Array<{ icon: React.ComponentType; key: Theme }>;
  }, []);

  if (!mounted) return null;

  return (
    <ButtonGroup>
      {modes.map((mode) => (
        <Button
          key={mode.key}
          disabled={theme === mode.key}
          onClick={() => setTheme(mode.key)}
          isIconOnly
          className={theme === mode.key ? "bg-primary" : ""}
        >
          <mode.icon />
        </Button>
      ))}
    </ButtonGroup>
  );
}
