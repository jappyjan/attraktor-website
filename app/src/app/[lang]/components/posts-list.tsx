import {
  Link,
  Card,
  CardHeader,
  Divider,
  Image,
  Button,
} from "@nextui-org/react";
import { ContentBlockRenderer } from "~/components/strapi/ContentBlockRenderer";
import {
  fetchAPI,
  getStrapiMediaURL,
  type StrapiDocumentFetchResponse,
} from "~/utils/strapi/fetch-api";
import { type BlogPost } from "~strapi/src/api/blog-post/content-types/blog-post/blog-post";

interface PostsListProps {
  lang: string;
}

export async function PostsList(props: PostsListProps) {
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
          <Card className="h-[300px]">
            <CardHeader className="absolute top-1 z-10 flex-col !items-start">
              <h4 className="text-large font-medium text-white">
                {post.attributes.title}
              </h4>
            </CardHeader>
            <Divider />
            <Image
              removeWrapper
              alt={
                post.attributes.cover.data.attributes.alternativeText ||
                post.attributes.cover.data.attributes.name
              }
              className="z-0 h-full w-full object-cover"
              src={
                getStrapiMediaURL(
                  post.attributes.cover.data.attributes.url as string,
                )!
              }
            />
          </Card>

          <div className="mb-4 max-h-48 overflow-y-hidden overflow-ellipsis">
            <ContentBlockRenderer
              content={post.attributes.content}
              hidden={["content-block.image"]}
            />
          </div>

          <div className="flex justify-end">
            <Button
              as={Link}
              className="bg-primary text-white"
              href={`/blog/${post.id}-${post.attributes.slug}`}
            >
              Read more
            </Button>
          </div>

          {postIndex < recentPosts.length - 1 && (
            <Divider className="mt-12" />
          )}
        </div>
      ))}
    </div>
  );
}
