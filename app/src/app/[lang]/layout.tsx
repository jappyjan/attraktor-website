import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";
import { getI18nConfig } from "~/i18n-config";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body>
        <NextUIProvider>
          <ThemeProvider>
            <ThemeSwitcher />
            <main className={`text-foreground bg-background`}>{children}</main>
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
