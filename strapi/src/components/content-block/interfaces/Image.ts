// Interface automatically generated by schemas-to-ts

import { Media } from '../../../common/schemas-to-ts/Media';
import { Media_Plain } from '../../../common/schemas-to-ts/Media';

export interface Image {
  file: { data: Media };
}
export interface Image_Plain {
  file: Media_Plain;
}

export interface Image_NoRelations {
  file: number;
}

