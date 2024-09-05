import {authenticatedPostGraphql} from '../../Auth/utils/authHelper';
import {
  ADD_ORDER_MUTATION,
  CANCEL_ORDER_MUTATION,
  UPDATE_ORDER_STATUS_MUTATION,
} from '../graphql/orderMutations';
import {FETCH_ORDER_QUERY} from '../graphql/orderQueries';

import {OrderOutputData, ORDER_STATUS} from '../types/OrdersType';

export const getOrder = async (id: string) => {
  try {
    const variables = {
      orderId: id,
    };
    const response = await authenticatedPostGraphql(
      FETCH_ORDER_QUERY,
      variables,
    );

    return response;
  } catch (err) {
    throw err;
  }
};

export const addOrder = async (order: OrderOutputData) => {
  try {
    const variables = {orderInput: order};
    const response = await authenticatedPostGraphql(
      ADD_ORDER_MUTATION,
      variables,
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const sendUpdateOrderStatus = async (variables: {
  id: string;
  status: ORDER_STATUS;
}) => {
  try {
    const response = await authenticatedPostGraphql(
      UPDATE_ORDER_STATUS_MUTATION,
      variables,
    );

    return response;
  } catch (err) {
    throw err;
  }
};

export const cancelOrder = async (variables: {id: string}) => {
  try {
    const response = await authenticatedPostGraphql(
      CANCEL_ORDER_MUTATION,
      variables,
    );

    return response;
  } catch (err) {
    throw err;
  }
};
