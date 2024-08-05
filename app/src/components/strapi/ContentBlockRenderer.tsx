import {
  type BlocksContent,
  BlocksRenderer,
} from "@strapi/blocks-react-renderer";
import Image from "next/image";
import { getStrapiMediaURL } from "~/utils/strapi/fetch-api";
import { type Media } from "~strapi/src/common/schemas-to-ts/Media";

interface ContentBlockDefinition {
  id: number;
  __component: string;
  content?: BlocksContent;
  file?: {
    data: Media;
  };
}

interface Props {
  content: ContentBlockDefinition | ContentBlockDefinition[];
}
export function ContentBlockRenderer(props: Props) {
  if (Array.isArray(props.content)) {
    return props.content.map((block, index) => (
      <ContentBlockRenderer key={index} content={block} />
    ));
  }

  const Component = props.content.__component;

  switch (Component) {
    case "content-block.rich-text":
      return <BlocksRenderer content={props.content.content!} />;

    case "content-block.image":
      const image = props.content.file!.data;
      return (
        <div style={{ position: 'relative', width: "500px", height: '200px' }}>
          <Image
            src={getStrapiMediaURL(image.attributes.url)!}
            alt={image.attributes.alternativeText || image.attributes.name}
            fill={true}
            objectFit="contain"
          />
        </div>
      );

    default:
      console.error(`Unknown ContentBlock component: ${Component}`);
      return <div>Unknown component: {Component}</div>;
  }
}
