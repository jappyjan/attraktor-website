import type { Schema, Attribute } from '@strapi/strapi';

export interface MenuLink extends Schema.Component {
  collectionName: 'components_menu_links';
  info: {
    displayName: 'link';
    icon: 'link';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    target: Attribute.Enumeration<['newTab', 'sameTab']> &
      Attribute.Required &
      Attribute.DefaultTo<'sameTab'>;
  };
}

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
    description: '';
  };
  attributes: {
    file: Attribute.Media<'images'> & Attribute.Required;
  };
}

export interface ButtonIconButton extends Schema.Component {
  collectionName: 'components_button_icon_buttons';
  info: {
    displayName: 'IconButton';
    icon: 'cursor';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    url: Attribute.String & Attribute.Required;
    icon: Attribute.Media<'images'> & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'menu.link': MenuLink;
      'content-block.rich-text': ContentBlockRichText;
      'content-block.image': ContentBlockImage;
      'button.icon-button': ButtonIconButton;
    }
  }
}
