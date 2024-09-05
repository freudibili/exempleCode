import {imageDataType} from '../../../../types/imageType';
import {TROC_ITEM_STATUS} from '../../TrocItem/types/TrocItemsType';

export type UserCredentialsOutputData = {
  name?: string;
  email: string;
  password: string;
};

export type UserInformationUpdateFormType = {
  name: string;
  baseline?: string;
};

export type UserInformationUpdateType = UserInformationUpdateFormType & {
  imageData?: imageDataType;
};

export type UserInformationOutputData = UserInformationUpdateFormType & {
  imageUrl?: string;
};

export type UserInputData = {
  _id: string;
  name: string;
  email: string;
  wallet: number;
  imageUrl?: string;
  baseline?: string;
  status?: string;
  blacklist?: [{_id: string}];
};

export type OtherUserInputData = {
  _id: string;
  name: string;
  baseline: string;
  imageUrl: string;
};

export enum SWITCH_USER_ITEM {
  ORDER = 'order',
  TROC_ITEM_ORDERS = 'trocItemOrders',
}

export type TrocItemChipType = TROC_ITEM_STATUS | 'all';
export type OrderChipType = 'all' | 'inProgress' | 'completed';

export type UserResetPasswordOutputData = {
  email: string;
  code: number;
  newPassword: string;
};
