import { UpdateVideoInputModel } from 'src/features/videos/api/models/input';
import { Video } from '../video.entity';
import { UpdateVideoType } from 'src/features/videos/application/useCases/types';

export interface IUpdateVideo {
  update(updateVideoDto: UpdateVideoInputModel): void;
}

export const UPDATE_VIDEO = function (this: Video, updateVideoDto: UpdateVideoType): void {
  this.author = updateVideoDto.author ?? this.author;
  this.availabledResolutions = updateVideoDto.availabledResolutions ?? this.availabledResolutions;
  this.canBeDownloaded = updateVideoDto.canBeDownloaded ?? this.canBeDownloaded;
  this.minAgeRestriction = updateVideoDto.minAgeRestriction ?? this.minAgeRestriction;
  this.publicationDate = updateVideoDto.publicationDate ?? this.publicationDate;
  this.title = updateVideoDto.title ?? this.title;
};
