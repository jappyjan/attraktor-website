"use client";

import { useMemo } from "react";
import { type ContentBlockDefinition } from "~/types/strapi";
import { type Node, renderBlock } from "blocks-html-renderer";
import Ellipsis from "react-ellipsis-component";

interface BlogPostContentProps {
  content: ContentBlockDefinition[];
  maxLines: number;
}
export function BlogPostContentPreview(props: BlogPostContentProps) {
  const html = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      props.content
        .filter((block) => block.__component === "content-block.rich-text")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((textBlock: any) => renderBlock(textBlock.content as Node[]))
        .join("<br />")
    );
  }, [props]);

  return (
    <Ellipsis
      text={html}
      maxLine={props.maxLines}
      dangerouslyUseInnerHTML={true}
      reflowOnResize={true}
      ellipsis={true}
    />
  );
}
