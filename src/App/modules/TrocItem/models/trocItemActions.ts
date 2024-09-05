import {
  CategoryType,
  TROC_ITEM_STATUS,
  TrocItemCreationFormType,
  TrocItemType,
} from '../types/TrocItemsType';
import {
  FETCH_TROC_ITEM_REQUEST,
  FETCH_TROC_ITEM_REQUEST_SUCCESS,
  FETCH_TROC_ITEM_REQUEST_FAILURE,
  CREATE_TROC_ITEM_REQUEST,
  UPDATE_TROC_ITEM_REQUEST,
  UPDATE_TROC_ITEM_REQUEST_FAILURE,
  UPDATE_TROC_ITEM_REQUEST_SUCCESS,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_REQUEST_SUCCESS,
  FETCH_CATEGORIES_REQUEST_FAILURE,
  REPORT_TROC_ITEM_REQUEST,
  CREATE_TROC_ITEM_REQUEST_SUCCESS,
  CREATE_TROC_ITEM_REQUEST_FAILURE,
  UPDATE_TROC_ITEM_STATUS_REQUEST,
} from './trocItemActionTypes';

export const fetchTrocItemRequest = (id: string) => ({
  type: FETCH_TROC_ITEM_REQUEST,
  payload: {id},
});
export const fetchTrocItemRequestSuccess = (trocItem: TrocItemType) => ({
  type: FETCH_TROC_ITEM_REQUEST_SUCCESS,
  payload: {trocItem},
});

export const fetchTrocItemRequestFailure = () => ({
  type: FETCH_TROC_ITEM_REQUEST_FAILURE,
  payload: null,
});

export const createTrocItemRequest = (trocItem: TrocItemCreationFormType) => ({
  type: CREATE_TROC_ITEM_REQUEST,
  payload: {trocItem},
});
export const createTrocItemRequestSuccess = () => ({
  type: CREATE_TROC_ITEM_REQUEST_SUCCESS,
  payload: null,
});
export const createTrocItemRequestFailure = () => ({
  type: CREATE_TROC_ITEM_REQUEST_FAILURE,
  payload: null,
});

export const updateTrocItemRequest = (
  id: string,
  trocItem: TrocItemCreationFormType,
) => ({
  type: UPDATE_TROC_ITEM_REQUEST,
  payload: {id, trocItem},
});

export const updateTrocItemRequestSuccess = () => ({
  type: UPDATE_TROC_ITEM_REQUEST_SUCCESS,
  payload: null,
});
export const updateTrocItemRequestFailure = () => ({
  type: UPDATE_TROC_ITEM_REQUEST_FAILURE,
  payload: null,
});

export const updateTrocItemStatusRequest = (
  id: string,
  status: TROC_ITEM_STATUS,
) => ({
  type: UPDATE_TROC_ITEM_STATUS_REQUEST,
  payload: {id, status},
});

export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
  payload: null,
});
export const fetchCategoriesRequestSuccess = (categories: CategoryType[]) => ({
  type: FETCH_CATEGORIES_REQUEST_SUCCESS,
  payload: {categories},
});

export const fetchCategoriesRequestFailure = () => ({
  type: FETCH_CATEGORIES_REQUEST_FAILURE,
  payload: null,
});

export const reportTrocItemRequest = (id: string) => ({
  type: REPORT_TROC_ITEM_REQUEST,
  payload: {id},
});
