import { NextUIProvider } from "@nextui-org/react";
import { getI18nConfig } from "~/i18n-config";
import { MainNavigation } from "../../components/main-navigation";
import {
  fetchAPI,
  type StrapiDocumentFetchResponse,
} from "~/utils/strapi/fetch-api";
import { type NavigationMain } from "~strapi/src/api/navigation-main/content-types/navigation-main/navigation-main";
import { AgencyFB, DroidSans } from "../fonts";
import { Footer } from "~/components/footer";

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
    <html
      lang={params.lang}
      className={`${AgencyFB.variable} ${DroidSans.variable} font-sans`}
    >
      <body
        className={`bg-background-light bg-pattern-light bg-cover bg-center object-cover text-foreground dark:bg-background-dark dark:bg-pattern-dark`}
      >
        <NextUIProvider>
          <div className="min-h-screen">
            <MainNavigation navData={mainNavigation.data} />
            <main>{children}</main>
          </div>
          <Footer lang={params.lang} />
        </NextUIProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  const { locales } = await getI18nConfig();
  return locales.map((locale) => ({ lang: locale }));
}
