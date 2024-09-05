import {OrderType} from '../../../Order/types/OrdersType';
import {CardTrocItemOrdersType} from '../../../TrocItem/types/TrocItemsType';
import {UserInformationUpdateType, UserInputData} from '../../types/UserType';
import {
  FETCH_USER_INFORMATION_REQUEST,
  FETCH_USER_INFORMATION_REQUEST_SUCCESS,
  FETCH_USER_INFORMATION_REQUEST_FAILURE,
  DELETE_USER_TROC_ITEM_REQUEST,
  FETCH_USER_TROC_ITEMS_REQUEST,
  FETCH_USER_TROC_ITEMS_REQUEST_SUCCESS,
  FETCH_USER_TROC_ITEMS_REQUEST_FAILURE,
  FETCH_USER_ORDERED_TROC_ITEMS_REQUEST,
  FETCH_USER_ORDERED_TROC_ITEMS_REQUEST_SUCCESS,
  FETCH_USER_ORDERED_TROC_ITEMS_REQUEST_FAILURE,
  UPDATE_USER_INFORMATION_REQUEST,
  UPDATE_USER_INFORMATION_REQUEST_SUCCESS,
  UPDATE_USER_INFORMATION_REQUEST_FAILURE,
} from './userActionTypes';

export const fetchUserInformationRequest = () => ({
  type: FETCH_USER_INFORMATION_REQUEST,
  payload: null,
});
export const fetchUserInformationRequestSuccess = (user: UserInputData) => ({
  type: FETCH_USER_INFORMATION_REQUEST_SUCCESS,
  payload: {user},
});

export const fetchUserInformationRequestFailure = () => ({
  type: FETCH_USER_INFORMATION_REQUEST_FAILURE,
  payload: null,
});

export const updateUserInformationRequest = (
  user: UserInformationUpdateType,
) => ({
  type: UPDATE_USER_INFORMATION_REQUEST,
  payload: {user},
});
export const updateUserInformationRequestSuccess = () => ({
  type: UPDATE_USER_INFORMATION_REQUEST_SUCCESS,
  payload: null,
});
export const updateUserInformationRequestFailure = () => ({
  type: UPDATE_USER_INFORMATION_REQUEST_FAILURE,
  payload: null,
});

export const fetchUserOrderedTrocItemsRequest = () => ({
  type: FETCH_USER_ORDERED_TROC_ITEMS_REQUEST,
  payload: null,
});
export const fetchUserOrderedTrocItemsRequestSuccess = (
  orders: OrderType[],
) => ({
  type: FETCH_USER_ORDERED_TROC_ITEMS_REQUEST_SUCCESS,
  payload: {orders},
});

export const fetchUserOrderedTrocItemsRequestFailure = () => ({
  type: FETCH_USER_ORDERED_TROC_ITEMS_REQUEST_FAILURE,
  payload: null,
});

export const fetchUserTrocItemsRequest = () => ({
  type: FETCH_USER_TROC_ITEMS_REQUEST,
  payload: null,
});
export const fetchUserTrocItemsRequestSuccess = (
  trocItems: CardTrocItemOrdersType[],
) => ({
  type: FETCH_USER_TROC_ITEMS_REQUEST_SUCCESS,
  payload: {trocItems},
});

export const fetchUserTrocItemsRequestFailure = () => ({
  type: FETCH_USER_TROC_ITEMS_REQUEST_FAILURE,
  payload: null,
});

export const deleteUserTrocItemRequest = (id: string) => ({
  type: DELETE_USER_TROC_ITEM_REQUEST,
  payload: {id},
});
