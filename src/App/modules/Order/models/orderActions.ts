import {
  OrderInputData,
  OrderOutputData,
  ORDER_STATUS,
} from '../types/OrdersType';
import {
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_REQUEST_SUCCESS,
  FETCH_ORDER_REQUEST_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_REQUEST_FAILURE,
  CREATE_ORDER_REQUEST_SUCCESS,
  UPDATE_ORDER_STATUS_REQUEST,
  CANCEL_ORDER_REQUEST,
} from './orderActionTypes';

export const fetchOrderRequest = (orderId: string) => ({
  type: FETCH_ORDER_REQUEST,
  payload: {orderId},
});
export const fetchOrderRequestSuccess = (order: OrderInputData) => ({
  type: FETCH_ORDER_REQUEST_SUCCESS,
  payload: {order},
});
export const fetchOrderRequestFailure = () => ({
  type: FETCH_ORDER_REQUEST_FAILURE,
  payload: null,
});

export const createOrderRequest = (orderDatas: {
  order: OrderOutputData;
  message: string;
}) => ({
  type: CREATE_ORDER_REQUEST,
  payload: {orderDatas},
});
export const createOrderRequestSuccess = () => ({
  type: CREATE_ORDER_REQUEST_SUCCESS,
  payload: null,
});
export const createOrderRequestFailure = () => ({
  type: CREATE_ORDER_REQUEST_FAILURE,
  payload: null,
});

export const updateOrderRequest = (id: string, status: ORDER_STATUS) => ({
  type: UPDATE_ORDER_STATUS_REQUEST,
  payload: {id, status},
});

export const cancelOrderRequest = (id: string) => ({
  type: CANCEL_ORDER_REQUEST,
  payload: {id},
});
