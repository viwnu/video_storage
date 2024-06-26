import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { CreateFileCommand, CreateFileType } from './commands/create-file';
import { CreateFileCommandHandler } from './commands/create-file/create-file.command.handler';

export class FileFasade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
  ) {}
  commands = {
    createFile: (dto: CreateFileType) => this.createFile(dto),
  };
  events = {};
  queries = {};

  private createFile(dto: CreateFileType) {
    return this.commandBus.execute<CreateFileCommand, Awaited<ReturnType<CreateFileCommandHandler['execute']>>>(
      new CreateFileCommand(dto),
    );
  }
}
