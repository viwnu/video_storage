import { Injectable } from '@nestjs/common';

import { VideosRepository } from '../infrastucture/repository';

@Injectable()
export class VideosService {
  constructor(private videosRepository: VideosRepository) {}
}
