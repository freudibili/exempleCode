import {
  FETCH_EXPLORE_TROC_ITEMS_REQUEST,
  FETCH_EXPLORE_TROC_ITEMS_REQUEST_SUCCESS,
  FETCH_EXPLORE_TROC_ITEMS_REQUEST_FAILURE,
  SET_EXPLORE_FILTERS,
  SET_EXPLORE_FILTERS_SUCCESS,
} from './exploreActionTypes';
import {CardTrocItemType} from '../../TrocItem/types/TrocItemsType';
import {ExploreFilterType} from '../types/ExploreType';

export const fetchExploreTrocItemsRequest = (
  filters: ExploreFilterType,
  page: number,
) => ({
  type: FETCH_EXPLORE_TROC_ITEMS_REQUEST,
  payload: {filters, page},
});
export const fetchExploreTrocItemsRequestSuccess = (
  trocItems: CardTrocItemType[],
  page: number,
  isListEnd: boolean,
) => ({
  type: FETCH_EXPLORE_TROC_ITEMS_REQUEST_SUCCESS,
  payload: {trocItems, page, isListEnd},
});

export const fetchExploreTrocItemsRequestFailure = () => ({
  type: FETCH_EXPLORE_TROC_ITEMS_REQUEST_FAILURE,
  payload: null,
});

export const setExploreFiltersRequest = (filters: ExploreFilterType) => ({
  type: SET_EXPLORE_FILTERS,
  payload: {filters},
});

export const setExploreFiltersRequestSuccess = (
  filters: ExploreFilterType,
) => ({
  type: SET_EXPLORE_FILTERS_SUCCESS,
  payload: {filters},
});
