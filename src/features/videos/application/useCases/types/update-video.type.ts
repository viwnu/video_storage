import { availabledResolutions } from 'src/const/availabled-resolutions.enum';

export type UpdateVideoType = {
  title?: string;
  author?: string;
  availabledResolutions?: availabledResolutions[];
  canBeDownloaded?: boolean;
  minAgeRestriction?: number;
  publicationDate?: string;
};
