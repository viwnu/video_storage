import { Injectable } from '@nestjs/common';

import { VideosRepository } from '../infrastucture/repository';

@Injectable()
export class VideosService {
  constructor(private videosRepository: VideosRepository) {} // Сюда можно засунуть все что происходит в хандлерах и оттуда уже вызывать их
}
