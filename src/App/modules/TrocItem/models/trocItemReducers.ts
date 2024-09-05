import {STATUS} from '../../../types/storeTypes';
import {
  TrocItemInputData,
  TROC_ITEM_CATEGORY_TYPE,
  TROC_ITEM_TROC_TYPE,
} from '../types/TrocItemsType';

import {
  CREATE_TROC_ITEM_REQUEST,
  FETCH_TROC_ITEM_REQUEST,
  FETCH_TROC_ITEM_REQUEST_FAILURE,
  FETCH_TROC_ITEM_REQUEST_SUCCESS,
  UPDATE_TROC_ITEM_REQUEST,
  UPDATE_TROC_ITEM_REQUEST_FAILURE,
  UPDATE_TROC_ITEM_REQUEST_SUCCESS,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_REQUEST_FAILURE,
  FETCH_CATEGORIES_REQUEST_SUCCESS,
  CREATE_TROC_ITEM_REQUEST_SUCCESS,
  CREATE_TROC_ITEM_REQUEST_FAILURE,
} from './trocItemActionTypes';

const trocItem: TrocItemInputData = {
  _id: '',
  title: '',
  imagesUrl: [],
  description: '',
  address: {formattedAddress: '', coordinates: []},
  price: 0,
  categories: [],
  categoryType: {_id: TROC_ITEM_CATEGORY_TYPE.PRODUCT_ID},
  trocType: {_id: TROC_ITEM_TROC_TYPE.OFFER_ID},
  creator: {_id: '', name: '', baseline: '', imageUrl: ''},
};

const categories = {categories: [], status: STATUS.READY};

export const initialState = {
  categories,
  trocItem,
  status: STATUS.READY,
};

// reducer
const reducer = (
  state = initialState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case FETCH_TROC_ITEM_REQUEST: {
      return {...state, status: STATUS.LOADING};
    }
    case FETCH_TROC_ITEM_REQUEST_SUCCESS: {
      const newTrocItem = action.payload.trocItem;
      return {...state, trocItem: newTrocItem, status: STATUS.SUCCESS};
    }
    case FETCH_TROC_ITEM_REQUEST_FAILURE: {
      return {...state, status: STATUS.FAILURE};
    }
    case CREATE_TROC_ITEM_REQUEST: {
      return {...state, status: STATUS.LOADING};
    }
    case CREATE_TROC_ITEM_REQUEST_SUCCESS: {
      return {...state, status: STATUS.SUCCESS};
    }
    case CREATE_TROC_ITEM_REQUEST_FAILURE: {
      return {...state, status: STATUS.FAILURE};
    }
    case UPDATE_TROC_ITEM_REQUEST: {
      return {...state, status: STATUS.LOADING};
    }
    case UPDATE_TROC_ITEM_REQUEST_SUCCESS: {
      return {...state, status: STATUS.SUCCESS};
    }
    case UPDATE_TROC_ITEM_REQUEST_FAILURE: {
      return {...state, status: STATUS.FAILURE};
    }
    case FETCH_CATEGORIES_REQUEST: {
      return {
        ...state,
        categories: {...state.categories, status: STATUS.LOADING},
      };
    }
    case FETCH_CATEGORIES_REQUEST_SUCCESS: {
      const fetchedCategories = action.payload.categories;
      return {
        ...state,
        categories: {categories: fetchedCategories, status: STATUS.SUCCESS},
      };
    }
    case FETCH_CATEGORIES_REQUEST_FAILURE: {
      return {...state, categories: {categories: [], status: STATUS.FAILURE}};
    }
    default:
      return state;
  }
};

export {reducer};
