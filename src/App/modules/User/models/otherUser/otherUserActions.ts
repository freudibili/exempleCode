import {CardTrocItemOrdersType} from '../../../TrocItem/types/TrocItemsType';
import {UserInputData} from '../../types/UserType';
import {
  FETCH_OTHER_USER_INFORMATION_REQUEST,
  FETCH_OTHER_USER_INFORMATION_REQUEST_SUCCESS,
  FETCH_OTHER_USER_INFORMATION_REQUEST_FAILURE,
  FETCH_OTHER_USER_TROC_ITEMS_REQUEST,
  FETCH_OTHER_USER_TROC_ITEMS_REQUEST_SUCCESS,
  FETCH_OTHER_USER_TROC_ITEMS_REQUEST_FAILURE,
} from './otherUserActionTypes';

export const fetchOtherUserInformationRequest = (id: string) => ({
  type: FETCH_OTHER_USER_INFORMATION_REQUEST,
  payload: {id},
});
export const fetchOtherUserInformationRequestSuccess = (
  user: UserInputData,
) => ({
  type: FETCH_OTHER_USER_INFORMATION_REQUEST_SUCCESS,
  payload: {user},
});

export const fetchOtherUserInformationRequestFailure = () => ({
  type: FETCH_OTHER_USER_INFORMATION_REQUEST_FAILURE,
  payload: null,
});

export const fetchOtherUserTrocItemsRequest = (id: string) => ({
  type: FETCH_OTHER_USER_TROC_ITEMS_REQUEST,
  payload: {id},
});
export const fetchOtherUserTrocItemsRequestSuccess = (
  trocItems: CardTrocItemOrdersType[],
) => ({
  type: FETCH_OTHER_USER_TROC_ITEMS_REQUEST_SUCCESS,
  payload: {trocItems},
});

export const fetchOtherUserTrocItemsRequestFailure = () => ({
  type: FETCH_OTHER_USER_TROC_ITEMS_REQUEST_FAILURE,
  payload: null,
});
