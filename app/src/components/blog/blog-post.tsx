import { Button, Image } from "@nextui-org/react";
import Link from "next/link";
import { getStrapiMediaURL } from "~/utils/strapi/fetch-api";
import { type BlogPost } from "~strapi/src/api/blog-post/content-types/blog-post/blog-post";
import { BlogPostContentPreview } from "./blog-post-content-preview";
import { translate } from "~/utils/strapi/translations";

interface Props {
  post: BlogPost;
  lang: string;
}

export async function BlogPost(props: Props) {
  const readMoreButtonText = await translate("readMoreButtonLabel", props.lang);

  return (
    <div>
      <div className="relative float-start mr-8">
        <div className="absolute left-0 top-0 z-0 h-full max-h-52 w-full max-w-80 -rotate-6 bg-attraktor-blue" />
        <Image
          removeWrapper
          alt={
            props.post.attributes.cover?.data?.attributes.alternativeText ||
            props.post.attributes.cover?.data?.attributes.name
          }
          className={"z-1 h-full max-h-52 w-full max-w-80 object-contain"}
          src={
            getStrapiMediaURL(
              props.post.attributes.cover?.data?.attributes.url as string,
            )!
          }
        />
      </div>

      <h2 className="text-left">{props.post.attributes.title}</h2>

      <div className="clearfix">
        <BlogPostContentPreview
          content={props.post.attributes.content}
          maxLines={16}
        />
      </div>

      <div className="clear-start mt-4 flex justify-end">
        <Button
          as={Link}
          className="bg-attraktor-blue text-white"
          href={`/blog/${props.post.id}-${props.post.attributes.slug}`}
        >
          {readMoreButtonText}
        </Button>
      </div>
    </div>
  );
}
