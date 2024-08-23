import { type BlocksContent } from "@strapi/blocks-react-renderer";
import { type Media } from "~strapi/src/common/schemas-to-ts/Media";

export interface ContentBlockDefinition {
  id: number;
  __component: string;
  content?: BlocksContent;
  file?: {
    data: Media;
  };
}
