import {ConversationInputData} from '../../Messenger/types/messengerTypes';

export enum NOTIFICATION_STATUS {
  NEW = 'new',
  READ = 'read',
}

export enum NOTIFICATION_TYPE {
  ORDER = 'order',
  MESSAGE = 'message',
}

export type NotificationInputData = {
  _id: string;
  status: NOTIFICATION_STATUS;
  conversation: ConversationInputData;
  type: NOTIFICATION_TYPE;
  text: string;
  createdAt?: string;
};
