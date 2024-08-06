import {
  BlocksRenderer,
} from "@strapi/blocks-react-renderer";
import {
  fetchSluggedDocument,
  fetchAPI,
  type StrapiDocumentFetchResponse,
} from "~/utils/strapi/fetch-api";
import { type NotFound } from "~strapi/src/api/not-found/content-types/not-found/not-found";
import { type BlogPost } from "~strapi/src/api/blog-post/content-types/blog-post/blog-post";
import { ContentBlockRenderer } from "~/components/strapi/ContentBlockRenderer";

interface RouteProps {
  params: {
    lang: string;
    slug: string;
  };
}

export default async function BlogPostPage(props: RouteProps) {
  const post = await fetchSluggedDocument<BlogPost>(
    "blog-posts",
    props.params.slug,
    props.params.lang,
    "populate[content][populate]=*"
  );

  if (!post) {
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
      <h1>Post: {post.attributes.title}</h1>
      <hr />
      <ContentBlockRenderer content={post.attributes.content} />
    </>
  );
}
