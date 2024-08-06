import {
  fetchAPI,
  fetchSluggedDocument,
  type StrapiDocumentFetchResponse,
} from "~/utils/strapi/fetch-api";
import {
  type BlocksContent,
  BlocksRenderer,
} from "@strapi/blocks-react-renderer";
import type { Page } from "~strapi/src/api/page/content-types/page/page";
import type { NotFound } from "~strapi/src/api/not-found/content-types/not-found/not-found";

interface RouteProps {
  params: {
    lang: string;
    slug: string;
  };
}

export default async function SluggedPage(props: RouteProps) {
  const page = await fetchSluggedDocument<Page>(
    "pages",
    props.params.slug,
    props.params.lang,
  );

  if (!page) {
    const notFoundPage =
      await fetchAPI<StrapiDocumentFetchResponse<NotFound>>("/not-found", {
        locale: props.params.lang,
      });

    return (
      <>
        <BlocksRenderer content={notFoundPage.data.attributes.content} />
      </>
    );
  }

  return (
    <>
      <h1>Page: {page.attributes.title}</h1>
      <hr />
      <BlocksRenderer content={page.attributes.content as BlocksContent} />
    </>
  );
}
