"use client";

import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  Link,
  NavbarMenu,
  NavbarMenuItem,
  NavbarItem,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { getStrapiMediaURL } from "~/utils/strapi/fetch-api";
import { type NavigationMain } from "~strapi/src/api/navigation-main/content-types/navigation-main/navigation-main";
import { type Media } from "~strapi/src/common/schemas-to-ts/Media";
import {
  Target,
  type Link as MenuLink,
} from "~strapi/src/components/menu/interfaces/Link";
import { IsUrlActive } from "./nav-link";

interface LogoProps {
  logoDarkMode: Media;
  logoLightMode: Media;
}
function NavLogo(props: LogoProps & React.HTMLAttributes<HTMLDivElement>) {
  const { logoDarkMode, logoLightMode, ...divProps } = props;
  const { theme } = useTheme();

  const logoMedia = useMemo(() => {
    if (theme === "dark") {
      return logoDarkMode;
    }

    return logoLightMode;
  }, [theme, logoDarkMode, logoLightMode]);

  const logoUrl = useMemo((): string => {
    if (!logoMedia) {
      return "";
    }

    return getStrapiMediaURL(logoMedia.attributes.url)!;
  }, [logoMedia]);

  return (
    <div {...divProps}>
      <Image
        src={logoUrl}
        alt="Attraktor Logo"
        objectFit="contain"
        height={36}
        width={36}
      />
    </div>
  );
}

interface MainNavigationProps {
  navData: NavigationMain;
}

export function MainNavigation(props: MainNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = useMemo(() => {
    const mapTarget = (target?: Target) => {
      switch (target) {
        case Target.NewTab:
          return "_blank";
        case Target.SameTab:
          return "";
        default:
          throw new Error(`Unknown target: ${target}`);
      }
    };

    return (props.navData.attributes.menuItems as MenuLink[]).map((item) => ({
      label: item.label,
      url: item.url,
      target: mapTarget(item.target as Target),
    }));
  }, [props.navData]);

  const isActive = useCallback((url: string) => {
    return url === window.location.pathname;
  }, []);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <NavLogo
              logoDarkMode={props.navData.attributes.logoDarkMode.data}
              logoLightMode={props.navData.attributes.logoLightMode.data}
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden gap-4 sm:flex"
        justify="center"
      ></NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {menuItems.map((item, index) => (
          <IsUrlActive
            key={`${item.label}-${index}`}
            url={item.url}
            component={({ isActive }) => (
              <NavbarItem isActive={isActive}>
                <Link color="foreground" href={item.url} target={item.target}>
                  {item.label}
                </Link>
              </NavbarItem>
            )}
          />
        ))}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              className="w-full"
              href={item.url}
              size="lg"
              target={item.target}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
