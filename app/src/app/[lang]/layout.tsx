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
        <main>{children}</main>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  const { locales } = await getI18nConfig();
  return locales.map((locale) => ({ lang: locale }));
}
