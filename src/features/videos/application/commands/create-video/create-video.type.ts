import { availabledResolutions } from 'src/const';

export type CreateVideoType = {
  title: string;
  author: string;
  availabledResolutions?: availabledResolutions[];
  canBeDownloaded?: boolean;
  minAgeRestriction?: number;
  publicationDate?: string;
};
