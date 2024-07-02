export class CreateVideoEvent {
  constructor(
    public videoId: string,
    public title: string,
  ) {}
}
