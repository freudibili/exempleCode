import {OtherUserInputData, UserInputData} from '../../User/types/UserType';

export type MessageInputData = {
  _id: string;
  sender: OtherUserInputData | UserInputData;
  conversationId: string;
  text: string;
  createdAt: Date;
};

export type ConversationInputData = {
  _id: string;
  otherUser: {
    _id: string;
    name: string;
    imageUrl?: string;
  };
  order: {
    _id: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type ConversationOutputData = {receiverId: string; orderId: string};

export type ConversationType = {
  _id: string;
  otherUser: OtherUserInputData;
  orderId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MessageOutputData = {conversationId: string; text: string};

export type MessageType = {
  _id: string;
  user: OtherUserInputData | UserInputData;
  conversationId: string;
  text: string;
  createdAt: Date;
};

export enum SWITCH_CHAT_ITEM {
  ORDER = 'order',
  CHAT = 'chat',
}
