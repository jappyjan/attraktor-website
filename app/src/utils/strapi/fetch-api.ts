import qs from "qs";

export function getStrapiURL(path = "") {
  const strapiHost = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  if (!strapiHost) {
    throw new Error(
      "NEXT_PUBLIC_STRAPI_API_URL environment variable is not set.",
    );
  }

  return `${strapiHost}${path}`;
}

export function getStrapiMediaURL(url: string | null) {
  if (url == null) {
    return null;
  }

  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  // Otherwise prepend the URL path with the Strapi URL
  return `${getStrapiURL()}${url}`;
}

export interface StrapiMeta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export interface StrapiDocumentFetchResponse<TDocType> {
  data: TDocType;
  meta: StrapiMeta;
}

export async function fetchAPI<TReturnType>(
  path: string,
  urlParamsObject = {},
  options: RequestInit & { prefixWithApi?: boolean } = {},
): Promise<TReturnType> {
  const { prefixWithApi = true, ...restOptions } = options;
  const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  if (!STRAPI_TOKEN) {
    throw new Error(
      "NEXT_PUBLIC_STRAPI_API_TOKEN environment variable is not set.",
    );
  }

  try {
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      ...restOptions,
    };

    let queryString = qs.stringify(urlParamsObject);
    if (queryString) {
      queryString = `?${queryString.trim()}`;
    }

    let apiPrefix = "";
    if (prefixWithApi) {
      apiPrefix = "/api";
    }

    const requestUrl = `${getStrapiURL(`${apiPrefix}${path}${queryString}`)}`;

    const response = await fetch(requestUrl, mergedOptions).catch((error) => {
      console.error("fetch did indeed fail");
      console.error(error);
      throw error;
    });

    return (await response.json()) as TReturnType;
  } catch (error) {
    console.error(
      `Please check if your server is running and you set all the required tokens.`,
    );
    throw error;
  }
}

export async function fetchSluggedDocument<TDocType>(
  collection: string,
  slug: string,
  lang: string,
  additionalQuery?: string,
): Promise<TDocType | null> {
  const id = slug.split("-")[0];
  if (!id) {
    console.error(`Could not fetch slugged document of collection ${collection} with slug ${slug}, could not determine id`);
    return null;
  }

  const url = `/${collection}/${id}?locale=${lang}&${additionalQuery}`;
  const response = await fetchAPI<StrapiDocumentFetchResponse<TDocType[]>>(url);

  if (!response.data) {
    console.error(`Could not fetch slugged document of collection ${collection} with slug ${slug}, determined id ${id} -> response.data is not set`);
    return null;
  }

  if (response.data.length === 0) {
    console.error(`Could not fetch slugged document of collection ${collection} with slug ${slug}, determined id ${id} -> response.data is empty array`);
    return null;
  }

  return response.data as TDocType;
}
