import { Field, GraphQLISODateTime, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { availabledResolutions } from 'apps/video_storage/src/const';

registerEnumType(availabledResolutions, { name: 'availabledResolutions' });

@ObjectType()
export class VideoGraphqlModel {
  @Field(() => ID, { nullable: false, description: 'ID видео' })
  id: string;

  @Field({ nullable: false, description: 'Название видео' })
  title: string;

  @Field({ nullable: false, description: 'Имя автора' })
  author: string;

  @Field(() => availabledResolutions, { nullable: true, description: 'Доступные разрешения' })
  availabledResolutions: availabledResolutions;

  @Field({ nullable: true, description: 'Можно ли скачать' })
  canBeDownloaded?: boolean;

  @Field(() => Int, { nullable: true, description: 'Минимальный  разрешенный возраст' })
  minAgeRestriction?: number;

  @Field(() => GraphQLISODateTime, { nullable: true, description: 'Дата создания в формате ISO' })
  createdAt?: string;

  @Field(() => GraphQLISODateTime, { nullable: true, description: 'Дата публикации в формате ISO' })
  publicationDate?: string;
}
