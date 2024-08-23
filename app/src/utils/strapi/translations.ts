import { type Translation } from "~strapi/src/api/translation/content-types/translation/translation";
import { fetchAPI, type StrapiDocumentFetchResponse } from "./fetch-api";

type LANGUAGE = string;
const translations: Record<LANGUAGE, Translation["attributes"]> = {};

async function fetchTranslations(lang: LANGUAGE) {
  const result = await fetchAPI<StrapiDocumentFetchResponse<Translation>>(
    "/translation",
    {
      locale: lang,
    },
  );

  translations[lang] = result.data.attributes;
}

export async function translate<TKey extends keyof Translation["attributes"]>(
  key: TKey,
  lang: LANGUAGE,
): Promise<Translation["attributes"][TKey] | TKey> {
  if (!translations[lang]) {
    await fetchTranslations(lang);
  }

  if (!translations[lang]) {
    return key;
  }

  return translations[lang][key] ?? key;
}
