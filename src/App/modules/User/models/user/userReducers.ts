import {STATUS} from '../../../../types/storeTypes';
import {OrderType} from '../../../Order/types/OrdersType';
import {CardTrocItemType} from '../../../TrocItem/types/TrocItemsType';
import {UserInputData} from '../../types/UserType';
import {
  FETCH_USER_INFORMATION_REQUEST,
  FETCH_USER_INFORMATION_REQUEST_FAILURE,
  FETCH_USER_INFORMATION_REQUEST_SUCCESS,
  FETCH_USER_TROC_ITEMS_REQUEST,
  FETCH_USER_TROC_ITEMS_REQUEST_FAILURE,
  FETCH_USER_TROC_ITEMS_REQUEST_SUCCESS,
  FETCH_USER_ORDERED_TROC_ITEMS_REQUEST,
  FETCH_USER_ORDERED_TROC_ITEMS_REQUEST_FAILURE,
  FETCH_USER_ORDERED_TROC_ITEMS_REQUEST_SUCCESS,
  UPDATE_USER_INFORMATION_REQUEST_SUCCESS,
  UPDATE_USER_INFORMATION_REQUEST,
  UPDATE_USER_INFORMATION_REQUEST_FAILURE,
} from './userActionTypes';

let user: UserInputData = {
  _id: '',
  name: '',
  email: '',
  status: '',
  wallet: 0,
};

let trocItems: CardTrocItemType[] = [];

let orders: OrderType[] = [];

export const initialState = {
  user: {user, status: STATUS.READY},
  trocItems: {trocItems, status: STATUS.READY},
  orders: {orders, status: STATUS.READY},
};

// reducer
const reducer = (
  state = initialState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case FETCH_USER_INFORMATION_REQUEST: {
      return {...state, user: {user, status: STATUS.LOADING}};
    }
    case FETCH_USER_INFORMATION_REQUEST_SUCCESS: {
      const fetchedUser = action.payload.user;
      return {...state, user: {user: fetchedUser, status: STATUS.SUCCESS}};
    }
    case FETCH_USER_INFORMATION_REQUEST_FAILURE: {
      return {...state, user: {user, status: STATUS.FAILURE}};
    }
    case UPDATE_USER_INFORMATION_REQUEST: {
      return {...state, user: {...state.user, status: STATUS.LOADING}};
    }
    case UPDATE_USER_INFORMATION_REQUEST_SUCCESS: {
      return {...state, user: {...state.user, status: STATUS.SUCCESS}};
    }
    case UPDATE_USER_INFORMATION_REQUEST_FAILURE: {
      return {...state, user: {user, status: STATUS.FAILURE}};
    }
    case FETCH_USER_INFORMATION_REQUEST_FAILURE: {
      return {...state, user: {user, status: STATUS.FAILURE}};
    }
    case FETCH_USER_TROC_ITEMS_REQUEST: {
      return {...state, trocItems: {trocItems, status: STATUS.LOADING}};
    }
    case FETCH_USER_TROC_ITEMS_REQUEST_SUCCESS: {
      const fetchedTrocItems = action.payload.trocItems;
      return {
        ...state,
        trocItems: {trocItems: fetchedTrocItems, status: STATUS.SUCCESS},
      };
    }
    case FETCH_USER_TROC_ITEMS_REQUEST_FAILURE: {
      return {...state, trocItems: {trocItems, status: STATUS.FAILURE}};
    }

    case FETCH_USER_ORDERED_TROC_ITEMS_REQUEST: {
      return {...state, orders: {orders, status: STATUS.LOADING}};
    }
    case FETCH_USER_ORDERED_TROC_ITEMS_REQUEST_SUCCESS: {
      const fetchedOrders = action.payload.orders;
      return {
        ...state,
        orders: {orders: fetchedOrders, status: STATUS.SUCCESS},
      };
    }
    case FETCH_USER_ORDERED_TROC_ITEMS_REQUEST_FAILURE: {
      return {...state, orders: {orders, status: STATUS.FAILURE}};
    }
    default:
      return state;
  }
};

export {reducer};
