import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

import { GetVideoQuery, GetVideoQueryHandler } from './queries/get-video';
import { GetVideosQuery, GetVideosQueryHandler } from './queries/get-videos';
import { CreateVideoCommand, CreateVideoCommandHandler, CreateVideoType } from './commands/create-video';
import { UpdateVideoCommand, UpdateVideoCommandHandler, UpdateVideoType } from './commands/update-video';
import { RemoveVideoCommand, RemoveVideoCommandHandler } from './commands/remove-video';
import { RemoveAllVideoCommand, RemoveAllVideoCommandHandler } from './commands/remove-all-video';

export class VideoFasade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
  ) {}
  commands = {
    createVideo: (dto: CreateVideoType) => this.createVideo(dto),
    updateVideo: (videoId: string, dto: UpdateVideoType) => this.updateVideo(videoId, dto),
    removeVideo: (videoId: string) => this.removeVideo(videoId),
    removeAllVideo: () => this.removeAllVideo(),
  };
  events = {};
  queries = {
    getVideo: (videoId: string) => this.getVideo(videoId),
    getVideos: () => this.getVideos(),
  };
  private getVideo(videoId: string) {
    return this.queryBus.execute<GetVideoQuery, Awaited<ReturnType<GetVideoQueryHandler['execute']>>>(
      new GetVideoQuery(videoId),
    );
  }
  private getVideos() {
    return this.queryBus.execute<GetVideosQuery, Awaited<ReturnType<GetVideosQueryHandler['execute']>>>(new GetVideosQuery());
  }
  private createVideo(dto: CreateVideoType) {
    return this.commandBus.execute<CreateVideoCommand, Awaited<ReturnType<CreateVideoCommandHandler['execute']>>>(
      new CreateVideoCommand(dto),
    );
  }
  private updateVideo(videoId: string, dto: UpdateVideoType) {
    return this.commandBus.execute<UpdateVideoCommand, Awaited<ReturnType<UpdateVideoCommandHandler['execute']>>>(
      new UpdateVideoCommand(videoId, dto),
    );
  }
  private removeVideo(videoId: string) {
    return this.commandBus.execute<RemoveVideoCommand, Awaited<ReturnType<RemoveVideoCommandHandler['execute']>>>(
      new RemoveVideoCommand(videoId),
    );
  }
  private removeAllVideo() {
    return this.commandBus.execute<RemoveAllVideoCommand, Awaited<ReturnType<RemoveAllVideoCommandHandler['execute']>>>(
      new RemoveAllVideoCommand(),
    );
  }
}
