import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";
import { getI18nConfig } from "~/i18n-config";
import { MainNavigation } from "./components/main-navigation";
import {
  fetchAPI,
  type StrapiDocumentFetchResponse,
} from "~/utils/strapi/fetch-api";
import { type NavigationMain } from "~strapi/src/api/navigation-main/content-types/navigation-main/navigation-main";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const mainNavigation = await fetchAPI<
    StrapiDocumentFetchResponse<NavigationMain>
  >("/navigation-main", {
    locale: params.lang,
    populate: "*",
  });

  return (
    <html lang={params.lang}>
      <body className={`bg-background text-foreground`}>
        <NextUIProvider>
          <ThemeProvider>
            <div className="min-h-screen">
              <MainNavigation navData={mainNavigation.data} />
              <main className="container mx-auto px-4 py-4 max-w-7xl">{children}</main>
            </div>
            <footer className="w-full flex items-center justify-center pb-24 pt-8">
              <p>This is the footer</p>
              <ThemeSwitcher />
            </footer>
          </ThemeProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  const { locales } = await getI18nConfig();
  return locales.map((locale) => ({ lang: locale }));
}
