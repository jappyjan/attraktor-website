import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { ThemeProvider } from "~/providers/theme.provider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
