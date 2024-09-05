import React, {useCallback, useEffect, useState} from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/reduxHook';
import {STATUS} from '../../../../../types/storeTypes';
import {goBack} from '../../../../../utils/navigationHelper';
import {createOrderRequest} from '../../../../Order/models/orderActions';
import {getOrderStatus} from '../../../../Order/models/orderSelectors';
import {
  OrderCreationType,
  OrderOutputData,
} from '../../../../Order/types/OrdersType';
import {getTrocItem} from '../../../models/trocItemSelectors';
import {TROC_ITEM_ACTIONS} from '../../../types/TrocItemsType';
import TrocItemNegociateForm from '../../forms/TrocItemNegociateForm';
import TrocItemOrderForm from '../../forms/TrocItemOrderForm';

interface Props {
  actionType: TROC_ITEM_ACTIONS;
}
const TrocItemActionsModalContent = ({actionType}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const trocItem = useAppSelector(getTrocItem);
  const status = useAppSelector(getOrderStatus);

  const orderItem = useCallback(
    (orderData: OrderCreationType) => {
      const order: OrderOutputData = {
        trocItemCreatorId: trocItem.creator._id,
        trocItemId: trocItem._id,
        negociatePrice: orderData.negociatePrice,
        negociateTrocItemIds: orderData.negociateTrocItemIds,
      };
      dispatch(createOrderRequest({order, message: orderData.message}));
      setIsLoading(true);
    },
    [dispatch, trocItem._id, trocItem.creator._id],
  );

  useEffect(() => {
    setIsLoading(status === STATUS.LOADING);
    if (isLoading && (status === STATUS.SUCCESS || status === STATUS.FAILURE)) {
      goBack();
    }
  }, [isLoading, status]);

  const GetTrocItemForm = useCallback(() => {
    switch (actionType) {
      case TROC_ITEM_ACTIONS.OFFER: {
        return (
          <TrocItemOrderForm
            isLoading={isLoading}
            orderItemCallback={orderItem}
          />
        );
      }
      case TROC_ITEM_ACTIONS.NEGOCIATE: {
        return (
          <TrocItemNegociateForm
            isLoading={isLoading}
            orderItemCallback={orderItem}
          />
        );
      }
      default:
        return null;
    }
  }, [actionType, isLoading, orderItem]);

  return <GetTrocItemForm />;
};

export default TrocItemActionsModalContent;
