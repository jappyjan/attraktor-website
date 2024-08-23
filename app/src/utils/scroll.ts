"use client";

import { useState, useEffect } from "react";

export function useIsScrolled(amountPx = 150) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > amountPx);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [amountPx]);

  return isScrolled;
}
