import {
  BlocksRenderer,
} from "@strapi/blocks-react-renderer";
import { RecentPostsList } from "../blog/recent-posts-list";
import { StrapiImage } from "./strapi-image";
import { type ContentBlockDefinition } from "~/types/strapi";


interface Props {
  content: ContentBlockDefinition | ContentBlockDefinition[];
  hidden?: string[];
  lang: string;
}
export function ContentBlockRenderer(props: Props) {
  if (Array.isArray(props.content)) {
    return props.content.map((block, index) => (
      <ContentBlockRenderer key={index} {...props} content={block} />
    ));
  }

  const Component = props.content.__component;

  if (props.hidden?.includes(Component)) {
    return null;
  }

  switch (Component) {
    case "content-block.rich-text":
      return <BlocksRenderer content={props.content.content!} />;

    case "content-block.image":
      const image = props.content.file!.data;

      return <StrapiImage image={image} />;

    case "blog-posts.recent-posts":
      return <RecentPostsList lang={props.lang} />;

    default:
      console.error(`Unknown ContentBlock component: ${Component}`);
      return <div>Unknown component: {Component}</div>;
  }
}
