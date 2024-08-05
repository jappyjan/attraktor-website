import { fetchAPI } from "./utils/strapi/fetch-api";

export interface LocaleDefinition {
  id: number;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  isDefault: boolean;
};

export interface i18nConfig {
  locales: string[];
  defaultLocale: string;
}

export async function getI18nConfig(): Promise<i18nConfig> {
  const localesData = await fetchAPI<Array<LocaleDefinition>>("/i18n/locales");

  const locales: string[] = [];
  let defaultLocale = "de";

  localesData.forEach((locale) => {
    locales.push(locale.code);
    if (locale.isDefault) {
      defaultLocale = locale.code;
    }
  });

  return {
    locales,
    defaultLocale,
  }
}
