import {imageDataType} from '../../../../types/imageType';
import {AddressType} from '../../../types/locationType';
import {OrderType} from '../../Order/types/OrdersType';
import {OtherUserInputData} from '../../User/types/UserType';

export enum TROC_ITEM_TROC_TYPE {
  SEARCH_ID = '632b2c9838ad3d1bd268b7e7',
  OFFER_ID = '63348785382a78a71dc0c3a1',
}

export enum TROC_ITEM_CATEGORY_TYPE {
  PRODUCT_ID = '632b5f741ac788f191411ad5',
  SERVICE_ID = '632b60811ac788f191411ae4',
}

export enum TROC_ITEM_ACTIONS {
  OFFER = 'offer',
  NEGOCIATE = 'negociate',
  INFO = 'info',
}

export enum TROC_ITEM_STATUS {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
  COMPLETED = 'completed',
}

export enum TROC_ITEM_QUALITY {
  NOT_GOOD = 'notGood',
  MEDIUM = 'medium',
  GOOD = 'good',
}

export enum TROC_ITEM_CONDITION {
  NEW = 'new',
  USED_LIKE_NEW = 'usedNew',
  USED_FAIR = 'usedFair',
  USED_GOOD = 'usedGood',
}

export enum TROC_ITEM_PICKING {
  ON_SITE = 'onSite',
  FLEXIBLE = 'flexible',
}

type TrocItemCreationType = {
  title: string;
  price: number;
  address: AddressType;
  description: string;
  categoriesId: string[];
  trocTypeId: string;
  categoryTypeId: string;
  quality?: string;
  condition?: string;
  negociateDescription?: string;
  picking?: string;
};

export type TrocItemCreationFormType = TrocItemCreationType & {
  imagesData: imageDataType[];
};

export type TrocItemOutputData = TrocItemCreationType & {
  imagesUrl: string[];
};

export type TrocItemInputData = {
  _id: string;
  title: string;
  description: string;
  imagesUrl: string[];
  address: AddressType;
  price: number;
  quality?: string;
  condition?: string;
  negociateDescription?: string;
  picking?: string;
  categories: {_id: string}[];
  categoryType: {_id: TROC_ITEM_CATEGORY_TYPE};
  trocType: {_id: TROC_ITEM_TROC_TYPE};
  creator: OtherUserInputData;
  orders?: OrderType[];
  status?: TROC_ITEM_STATUS;
  createdAt?: string;
};

export type CardTrocItemType = {
  id: string;
  imagesUrl: string[];
  title: string;
  price: number;
  trocTypeId: string;
  categoryTypeId: string;
  status?: TROC_ITEM_STATUS;
  createdAt?: string;
};

export type CardOrderType = CardTrocItemType & {
  order: OrderType;
};

export type CardTrocItemOrdersType = CardTrocItemType & {
  orders: OrderType[];
};

export type TrocItemType = TrocItemInputData;

export type CategoryType = {_id: string; title: string; en: string; fr: string};
