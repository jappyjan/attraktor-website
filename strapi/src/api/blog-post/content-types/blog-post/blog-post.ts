// Interface automatically generated by schemas-to-ts

import { Media } from '../../../../common/schemas-to-ts/Media';
import { Media_Plain } from '../../../../common/schemas-to-ts/Media';
import { AdminPanelRelationPropertyModification } from '../../../../common/schemas-to-ts/AdminPanelRelationPropertyModification';

export interface BlogPost {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    title: string;
    content: any;
    slug?: any;
    cover: { data: Media };
    locale: string;
    localizations?: { data: BlogPost[] };
  };
}
export interface BlogPost_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title: string;
  content: any;
  slug?: any;
  cover: Media_Plain;
  locale: string;
  localizations?: BlogPost_Plain[];
}

export interface BlogPost_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title: string;
  content: any;
  slug?: any;
  cover: number;
  locale: string;
  localizations?: BlogPost[];
}

export interface BlogPost_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title: string;
  content: any;
  slug?: any;
  cover: AdminPanelRelationPropertyModification<Media_Plain>;
  locale: string;
  localizations?: BlogPost[];
}
