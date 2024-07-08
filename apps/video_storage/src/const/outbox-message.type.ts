import { availabledResolutions } from '.';

export type OutboxMessageType = {
  id: string;
  fileId: string;
  title: string;
  author: string;
  availabledResolutions?: availabledResolutions;
  canBeDownloaded?: boolean;
  minAgeRestriction?: number;
  publicationDate?: string;
};
