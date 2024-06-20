import { availabledResolutions } from 'src/const/availabled-resolutions.enum';

export type VideoViewType = {
  id: string;
  title: string;
  author: string;
  availabledResolutions: availabledResolutions[];
  canBeDownloaded?: boolean;
  minAgeRestriction?: number;
  createdAt?: string;
  publicationDate?: string;
};
