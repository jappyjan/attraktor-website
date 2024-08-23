"use client";

import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function LocalizedLink(props: React.ComponentProps<typeof Link>) {
  const pathname = usePathname();

  const localeInURL = useMemo(() => {
    if (pathname === "/") {
      return undefined;
    }

    return pathname.split("/")[1];
  }, [pathname]);

  const href = useMemo(() => {
    if (!props.href) {
      return props.href;
    }

    if (!localeInURL) {
      return props.href;
    }

    const hrefString = String(props.href);

    if (hrefString.startsWith("https://") || hrefString.startsWith("http://")) {
      return props.href;
    }

    if (!hrefString.startsWith(localeInURL)) {
      return `/${localeInURL}${hrefString}`;
    }

    return props.href;
  }, [localeInURL, props.href]);

  return <Link {...props} href={href} />;
}
