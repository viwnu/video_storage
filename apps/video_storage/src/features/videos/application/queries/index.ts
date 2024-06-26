import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';

import { GetVideosQueryHandler } from './get-videos';
import { GetVideoQueryHandler } from './get-video';

export const QUERIES_HANDLERS: Type<IQueryHandler>[] = [GetVideoQueryHandler, GetVideosQueryHandler];
