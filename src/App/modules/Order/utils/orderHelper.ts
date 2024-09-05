import {selector} from '../../../../utils/storeHelper';
import i18n from '../../../utils/i18n';
import {TROC_ITEM_TROC_TYPE} from '../../TrocItem/types/TrocItemsType';
import {getUserId} from '../../User/models/user/userSelectors';

import {
  OrderInputData,
  ORDER_STATUS,
  ORDER_USER_STATUS,
} from '../types/OrdersType';

export const getOrderUserStatus = (
  order: OrderInputData,
): ORDER_USER_STATUS | ORDER_STATUS => {
  const userId = selector(getUserId) as unknown as string;

  const isOfferingUser = userId === order.creatorUser._id;

  switch (order.status) {
    case ORDER_STATUS.NEW: {
      return isOfferingUser
        ? ORDER_USER_STATUS.NEED_VALIDATION
        : ORDER_USER_STATUS.VALIDATION_PENDING;
    }
    case ORDER_STATUS.COMPLETED_BY_CREATOR_USER: {
      return isOfferingUser
        ? ORDER_USER_STATUS.COMPLETION_PENDING
        : ORDER_USER_STATUS.NEED_COMPLETION;
    }
    case ORDER_STATUS.COMPLETED_BY_REQUESTOR_USER: {
      return isOfferingUser
        ? ORDER_USER_STATUS.NEED_COMPLETION
        : ORDER_USER_STATUS.COMPLETION_PENDING;
    }
    default: {
      return order.status as ORDER_STATUS;
    }
  }
};

export const getOrderDisplayedStatus = (status: ORDER_STATUS) => {
  switch (status) {
    case ORDER_STATUS.NEW: {
      return i18n.t('MESSENGER_CHAT_ORDER_ACTION_NEW');
    }
    case ORDER_STATUS.ACCEPTED: {
      return i18n.t('MESSENGER_CHAT_ORDER_ACTION_ACCEPTED');
    }
    case ORDER_STATUS.REFUSED: {
      return i18n.t('MESSENGER_CHAT_ORDER_ACTION_REFUSED');
    }
    case ORDER_STATUS.COMPLETED_BY_CREATOR_USER:
    case ORDER_STATUS.COMPLETED_BY_REQUESTOR_USER: {
      return i18n.t('MESSENGER_CHAT_ORDER_ACTION_PENDING');
    }
    case ORDER_STATUS.COMPLETED: {
      return i18n.t('MESSENGER_CHAT_ORDER_ACTION_COMPLETED');
    }
    case ORDER_STATUS.CANCELED: {
      return i18n.t('MESSENGER_CHAT_ORDER_ACTION_CANCELED');
    }
    default: {
      return '';
    }
  }
};
export const getOrderSummary = (
  order: OrderInputData,
  isUserItem?: boolean,
) => {
  const {trocItem, negociateTrocItems, negociatePrice, price} = order;

  const updatedNegociateTrocItems = negociateTrocItems
    ? negociateTrocItems.map(item => ({
        ...item,
        id: order._id,
        trocTypeId: '',
        categoryTypeId: '',
      }))
    : [];

  const isOffer =
    trocItem && trocItem.trocType._id === TROC_ITEM_TROC_TYPE.OFFER_ID;
  const adjustedOfferPrice = isOffer ? -(price || 0) : price || 0;

  const total = negociatePrice ?? adjustedOfferPrice;
  const adjustedOfferTotal = isOffer ? -total : total;

  const demandedPrice = isUserItem ? -adjustedOfferPrice : adjustedOfferPrice;

  // Set negotiatedPrice to undefined if negociatePrice is undefined or null
  const negotiatedPrice =
    isNaN(negociatePrice || 0) ||
    negociatePrice === undefined ||
    negociatePrice === null ||
    price === negociatePrice
      ? undefined
      : isUserItem
      ? -adjustedOfferTotal
      : adjustedOfferTotal;

  return {
    demandedPrice,
    negotiatedPrice,
    negotiatedTrocItems: updatedNegociateTrocItems,
  };
};
