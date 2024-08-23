"use client";

import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarMenu,
  NavbarMenuItem,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getStrapiMediaURL } from "~/utils/strapi/fetch-api";
import { type NavigationMain } from "~strapi/src/api/navigation-main/content-types/navigation-main/navigation-main";
import { type Media } from "~strapi/src/common/schemas-to-ts/Media";
import {
  Target,
  type Link as MenuLink,
} from "~strapi/src/components/menu/interfaces/Link";
import { IsUrlActive } from "./nav-link";
import { Theme, useTheme } from "~/utils/theme";
import { LocalizedLink } from "./localized-link";
import { useIsScrolled } from "~/utils/scroll";

interface LogoProps {
  logoDarkMode: Media;
  logoLightMode: Media;
  large: boolean;
}
function NavLogo(props: LogoProps & React.HTMLAttributes<HTMLDivElement>) {
  const { logoDarkMode, logoLightMode, large, ...divProps } = props;
  const { theme } = useTheme();

  const logoMedia = useMemo(() => {
    if (theme === Theme.Dark) {
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
    <div
      {...divProps}
      className={`${large ? "lg:scale-150 xl:scale-200" : "lg:scale-100"} transition-all duration-300`}
    >
      <Image
        src={logoUrl}
        alt="Attraktor Logo"
        objectFit="contain"
        height={90}
        width={90}
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

  const isScrolled = useIsScrolled();

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="relative bg-attraktor-blue"
      position="sticky"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand
          className={`${isScrolled ? "" : "lg:ml-5 lg:mt-10 xl:-ml-16"} transition-all duration-300`}
        >
          <LocalizedLink href="/">
            <NavLogo
              logoDarkMode={props.navData.attributes.logoDarkMode.data}
              logoLightMode={props.navData.attributes.logoLightMode.data}
              large={!isScrolled}
            />
          </LocalizedLink>
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
                <LocalizedLink
                  color="foreground"
                  className="font-agencyFbBold hover:text-white"
                  href={item.url}
                  target={item.target}
                >
                  {item.label}
                </LocalizedLink>
              </NavbarItem>
            )}
          />
        ))}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <IsUrlActive
            key={`${item.label}-${index}`}
            url={item.url}
            component={({ isActive }) => (
              <NavbarMenuItem key={`${item.label}-${index}`}>
                <LocalizedLink
                  color={isActive ? "primary" : "foreground"}
                  className={"w-full font-agencyFbBold"}
                  href={item.url}
                  size="lg"
                  target={item.target}
                >
                  {item.label}
                </LocalizedLink>
              </NavbarMenuItem>
            )}
          />
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
