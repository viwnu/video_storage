import { availabledResolutions } from '../../../../../const';

export type UpdateVideoType = {
  title?: string;
  author?: string;
  availabledResolutions?: availabledResolutions;
  canBeDownloaded?: boolean;
  minAgeRestriction?: number;
  publicationDate?: string;
};
