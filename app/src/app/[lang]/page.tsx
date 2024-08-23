import {
  fetchAPI,
  type StrapiDocumentFetchResponse,
} from "~/utils/strapi/fetch-api";
import { type Home } from "~strapi/src/api/home/content-types/home/home";
import { ContentBlockRenderer } from "~/components/strapi/ContentBlockRenderer";
import { Page } from "~/components/page";

interface PageProps {
  params: {
    lang: string;
  };
}

export default async function RootLangPage(props: PageProps) {
  const { data: homePage } = await fetchAPI<StrapiDocumentFetchResponse<Home>>(
    "/home",
    {
      locale: props.params.lang,
      "populate[content][populate]": "*",
    },
  );

  return (
    <Page title={homePage.attributes.title}>
      <ContentBlockRenderer
        lang={props.params.lang}
        content={homePage.attributes.content}
      />
    </Page>
  );
}
