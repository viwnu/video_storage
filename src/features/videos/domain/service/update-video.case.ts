import { IVideo } from '../video.interface';

export interface IUpdateVideo {
  update(updateVideoDto: Partial<IVideo>): void;
}

export const UPDATE_VIDEO = function (this: IVideo, updateVideoDto: Partial<IVideo>): void {
  this.author = updateVideoDto.author ?? this.author;
  this.availabledResolutions = updateVideoDto.availabledResolutions ?? this.availabledResolutions;
  this.canBeDownloaded = updateVideoDto.canBeDownloaded ?? this.canBeDownloaded;
  this.minAgeRestriction = updateVideoDto.minAgeRestriction ?? this.minAgeRestriction;
  this.publicationDate = updateVideoDto.publicationDate ?? this.publicationDate;
  this.title = updateVideoDto.title ?? this.title;
};
