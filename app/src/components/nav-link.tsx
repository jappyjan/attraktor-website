"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface IsUrlActiveProps {
  url: string;
  component: (props: { isActive: boolean }) => JSX.Element;
}

export function IsUrlActive(props: IsUrlActiveProps) {
  const pathname = usePathname();

  const pathWithoutLangSlug = useMemo(() => {
    const parts = pathname.split("/");
    parts.shift();
    parts.shift();
    return '/' + parts.join("/");
  }, [pathname]);

  const isActive = useMemo(() => {
    return props.url === pathname || props.url === pathWithoutLangSlug;
  }, [pathname, props.url, pathWithoutLangSlug]);

  return <props.component isActive={isActive} />;
}
