import { Divider } from "@nextui-org/react";
import {
  fetchAPI,
  type StrapiDocumentFetchResponse,
} from "~/utils/strapi/fetch-api";
import { type BlogPost } from "~strapi/src/api/blog-post/content-types/blog-post/blog-post";
import { BlogPost as BlogPostComponent } from "./blog-post";

interface PostsListProps {
  lang: string;
}

export async function RecentPostsList(props: PostsListProps) {
  const { data: recentPosts } = await fetchAPI<
    StrapiDocumentFetchResponse<BlogPost[]>
  >("/blog-posts", {
    locale: props.lang,
    "populate[content][populate]": "*",
    "populate[cover][populate]": "*",
  });

  return (
    <div className="flex flex-col gap-12">
      {recentPosts.map((post, postIndex) => (
        <div key={post.id}>
          <BlogPostComponent post={post} lang={props.lang} />

          {postIndex < recentPosts.length - 1 && <Divider className="mt-12" />}
        </div>
      ))}
    </div>
  );
}
