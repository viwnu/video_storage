import { IsUUID } from 'class-validator';

export class QueryParamsDto {
  @IsUUID()
  id: string;
}
