import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class testType {
  @Field()
  title: string;
}
