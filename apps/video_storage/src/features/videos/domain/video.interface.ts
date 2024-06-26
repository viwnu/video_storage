import { availabledResolutions } from '../../../const';

export type VideoBuildResponse = {
  id: string;
  title: string;
  author: string;
  availabledResolutions: availabledResolutions;
  canBeDownloaded?: boolean;
  minAgeRestriction?: number;
  createdAt?: string;
  publicationDate?: string;
};

export interface IVideo {
  id: string;
  title: string;
  author: string;
  availabledResolutions: availabledResolutions;
  canBeDownloaded: boolean;
  minAgeRestriction: number;
  createdAt: string;
  publicationDate: string;
  update(updateVideoDto: Partial<IVideo>): void;
}
