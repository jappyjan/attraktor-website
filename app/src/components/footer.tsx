import {
  fetchAPI,
  type StrapiDocumentFetchResponse,
} from "~/utils/strapi/fetch-api";
import { type Footer } from "~strapi/src/api/footer/content-types/footer/footer";
import { type Link } from "~strapi/src/components/menu/interfaces/Link";
import { ThemeSwitcher } from "./ThemeSwitcher";

export async function Footer(params: { lang: string }) {
  const { data: footer } = await fetchAPI<StrapiDocumentFetchResponse<Footer>>(
    "/footer",
    {
      locale: params.lang,
      "populate[links][populate]": "*",
      "populate[socialMediaButtons][populate]": "*",
    },
  );

  /**
   * A basic footer component with
   * - a list of links
   * - a copyright notice
   * - social media buttons/icons
   */
  return (
    <footer className="w-full items-center text-center pb-24 pt-8">
      <div>
        <p className="text-sm text-foreground">
          &copy; {new Date().getFullYear()} Attraktor e.V.
        </p>
        <ul className="flex gap-4">
          {(footer.attributes.links as Link[]).map((link) => (
            <li key={link.label}>
              <a
                href={link.url}
                target={link.target}
                className="text-sm text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <ThemeSwitcher />
      </div>
    </footer>
  );
}
