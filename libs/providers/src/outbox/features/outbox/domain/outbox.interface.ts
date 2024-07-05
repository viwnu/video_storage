import { outboxStatus } from '../../../const';

export interface IMessage {
  id: string;
  topic: string;
  payload: string;
  status: outboxStatus;
  // entityId: string;
}
