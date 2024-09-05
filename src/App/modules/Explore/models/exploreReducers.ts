import {
  FETCH_EXPLORE_TROC_ITEMS_REQUEST,
  FETCH_EXPLORE_TROC_ITEMS_REQUEST_FAILURE,
  FETCH_EXPLORE_TROC_ITEMS_REQUEST_SUCCESS,
  SET_EXPLORE_FILTERS_SUCCESS,
} from './exploreActionTypes';

import {CardTrocItemType} from '../../TrocItem/types/TrocItemsType';
import {ExploreFilterType} from '../types/ExploreType';
import {STATUS} from '../../../types/storeTypes';

let trocItems: CardTrocItemType[] = [];
let currentTrocItems: CardTrocItemType[] = [];
let filters: ExploreFilterType = {
  address: undefined,
  categoriesId: undefined,
  categoryTypeId: undefined,
  distance: undefined,
  search: '',
  trocTypeId: undefined,
};

export const initialState = {
  trocItems,
  currentTrocItems,
  filters,
  status: STATUS.READY,
  loadMoreStatus: STATUS.READY,
  isListEnd: false,
};

// reducer
const reducer = (
  state = initialState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case FETCH_EXPLORE_TROC_ITEMS_REQUEST: {
      const {page} = action.payload;
      if (page === 1) {
        return {
          ...state,
          status: STATUS.LOADING,
          isListEnd: false,
        };
      } else {
        return {...state, loadMoreStatus: STATUS.LOADING, isListEnd: false};
      }
    }
    case FETCH_EXPLORE_TROC_ITEMS_REQUEST_SUCCESS: {
      const fetchedtrocItems = action.payload.trocItems;
      const {isListEnd, page} = action.payload;
      const updatedCurrentTrocItems =
        page === 1
          ? fetchedtrocItems
          : [...state.currentTrocItems, ...fetchedtrocItems];
      return {
        ...state,
        trocItems: fetchedtrocItems,
        currentTrocItems: updatedCurrentTrocItems,
        status: STATUS.SUCCESS,
        loadMoreStatus: STATUS.SUCCESS,
        isListEnd,
      };
    }
    case FETCH_EXPLORE_TROC_ITEMS_REQUEST_FAILURE: {
      return {
        ...state,
        trocItems: [],
        status: STATUS.FAILURE,
        loadMoreStatus: STATUS.FAILURE,
      };
    }

    case SET_EXPLORE_FILTERS_SUCCESS: {
      const updatedFilters = action.payload.filters;
      return {...state, filters: updatedFilters};
    }
    default:
      return state;
  }
};

export {reducer};
