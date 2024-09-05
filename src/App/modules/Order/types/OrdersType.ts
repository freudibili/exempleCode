import {
  CardTrocItemType,
  TrocItemInputData,
} from '../../TrocItem/types/TrocItemsType';
import {OtherUserInputData} from '../../User/types/UserType';

export type OrderOutputData = {
  trocItemCreatorId: string;
  trocItemId: string;
  negociatePrice?: number;
  negociateTrocItemIds?: string[];
};

export type OrderCreationType = {
  message: string;
  negociatePrice?: number;
  negociateTrocItemIds?: string[];
};

export type OrderInputData = {
  _id: string;
  status: ORDER_STATUS;
  requestorUser: OtherUserInputData;
  creatorUser: OtherUserInputData;
  price?: number;
  trocItem?: TrocItemInputData;
  negociatePrice?: number;
  negociateTrocItems?: TrocItemInputData[];
};

export type OrderType = {
  _id: string;
  status: string;
  trocItem: CardTrocItemType;
  requestorUser: OtherUserInputData;
  creatorUser: OtherUserInputData;
  price?: number;
  negociatePrice?: number;
  negociateTrocItems?: TrocItemInputData[];
  createdAt?: string;
};

export enum ORDER_STATUS {
  NEW = 'new',
  ACCEPTED = 'accepted',
  REFUSED = 'refused',
  COMPLETED_BY_CREATOR_USER = 'completedCreatorUser',
  COMPLETED_BY_REQUESTOR_USER = 'completedRequestorUser',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export enum ORDER_USER_STATUS {
  VALIDATION_PENDING = 'validationPending',
  NEED_VALIDATION = 'needValidation',
  COMPLETION_PENDING = 'completionPending',
  NEED_COMPLETION = 'needCompletion',
}
