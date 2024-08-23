import Image from "next/image";
import { useMemo } from "react";
import { blurHashToDataURL } from "~/utils/blurhashDataURL";
import { getStrapiMediaURL } from "~/utils/strapi/fetch-api";
import { type Media } from "~strapi/src/common/schemas-to-ts/Media";

interface Props {
  image: Media;
}

export function StrapiImage(props: Props) {
  const blurDataURL = useMemo(() => {
    const blurhash = props.image.attributes.hash;
    if (!blurhash) {
      return undefined;
    }

    try {
      return blurHashToDataURL(blurhash);
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }, [props.image]);

  return (
    <Image
      src={getStrapiMediaURL(props.image.attributes.url)!}
      alt={
        props.image.attributes.alternativeText || props.image.attributes.name
      }
      objectFit="contain"
      placeholder={blurDataURL ? "blur" : "empty"}
      width={1200}
      height={278}
      blurDataURL={blurDataURL}
    />
  );
}
