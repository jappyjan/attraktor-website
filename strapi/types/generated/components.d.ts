import type { Schema, Attribute } from '@strapi/strapi';

export interface ContentBlockRichText extends Schema.Component {
  collectionName: 'components_content_block_rich_texts';
  info: {
    displayName: 'RichText';
    icon: 'write';
  };
  attributes: {
    content: Attribute.Blocks & Attribute.Required;
  };
}

export interface ContentBlockImage extends Schema.Component {
  collectionName: 'components_content_block_images';
  info: {
    displayName: 'Image';
    icon: 'picture';
  };
  attributes: {
    file: Attribute.Media<'images'> & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'content-block.rich-text': ContentBlockRichText;
      'content-block.image': ContentBlockImage;
    }
  }
}
