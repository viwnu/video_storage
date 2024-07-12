import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';

import { VideoFasade } from '../../application';
import { VideoGraphqlModel, SuccessModel } from './models/types';
import { CreateVideoInputType, UpdateVideoInputType } from './models/input';

@Resolver()
export class VideosResolver {
  private logger = new Logger(VideosResolver.name);
  constructor(private readonly videoFasade: VideoFasade) {}

  @Mutation(() => VideoGraphqlModel, { name: 'createVideo' })
  async createVideo(@Args('createVideoDto') createVideoDto: CreateVideoInputType): Promise<VideoGraphqlModel> {
    this.logger.log(`controller ${this.createVideo.name} mutation with recieved: ${JSON.stringify(createVideoDto)}`);
    return this.videoFasade.commands.createVideo(createVideoDto);
  }

  @Query(() => [VideoGraphqlModel], { name: 'videos' })
  async getAllVideos(): Promise<VideoGraphqlModel[]> {
    this.logger.log(`controller ${this.getAllVideos.name} query`);
    return this.videoFasade.queries.getVideos();
  }

  @Query(() => VideoGraphqlModel, { name: 'video' })
  async getOneVideo(@Args('id', { nullable: true, description: 'ID видео' }) id: string): Promise<VideoGraphqlModel> {
    this.logger.log(`controller ${this.getOneVideo.name} query`);
    return this.videoFasade.queries.getVideo(id);
  }

  @Mutation(() => SuccessModel, { name: 'updateVideo' })
  async updateVideo(
    @Args('id', { nullable: true, description: 'ID видео' }) id: string,
    @Args('updateVideoDto', { nullable: true, description: 'Данные для изменения видео' }) updateVideoDto: UpdateVideoInputType,
  ): Promise<SuccessModel> {
    this.logger.log(`controller ${this.updateVideo.name} mutation with recieved: ${id} and ${JSON.stringify(updateVideoDto)}`);
    await this.videoFasade.commands.updateVideo(id, updateVideoDto);
    return { success: true };
  }

  @Mutation(() => SuccessModel, { name: 'deleteVideo' })
  async deleteVideo(@Args('id', { nullable: true, description: 'ID видео' }) id: string): Promise<SuccessModel> {
    this.logger.log(`controller ${this.deleteVideo.name} mutation with recieved: ${id}`);
    await this.videoFasade.commands.removeVideo(id);
    return { success: true };
  }

  @Mutation(() => SuccessModel, { name: 'deleteAllVideos' })
  async deleteAllVideos(): Promise<SuccessModel> {
    this.logger.log(`controller ${this.deleteAllVideos.name} mutation`);
    await this.videoFasade.commands.removeAllVideo();
    return { success: true };
  }
}
