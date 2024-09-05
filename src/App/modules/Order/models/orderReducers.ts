import {STATUS} from '../../../types/storeTypes';
import {ORDER_STATUS, OrderInputData} from '../types/OrdersType';
import {
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_REQUEST_FAILURE,
  FETCH_ORDER_REQUEST_SUCCESS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_REQUEST_FAILURE,
  CREATE_ORDER_REQUEST_SUCCESS,
} from './orderActionTypes';

const order: OrderInputData = {
  _id: '',
  status: ORDER_STATUS.NEW,
  requestorUser: {_id: '', name: '', baseline: '', imageUrl: ''},
  creatorUser: {_id: '', name: '', baseline: '', imageUrl: ''},
};
export const initialState = {
  order,
  status: STATUS.READY,
};

// reducer
const reducer = (
  state = initialState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case FETCH_ORDER_REQUEST: {
      return {...state, status: STATUS.LOADING};
    }
    case FETCH_ORDER_REQUEST_SUCCESS: {
      const newOrder = action.payload.order;
      return {order: newOrder, status: STATUS.SUCCESS};
    }
    case FETCH_ORDER_REQUEST_FAILURE: {
      return {...state, status: STATUS.FAILURE};
    }
    case CREATE_ORDER_REQUEST: {
      return {...state, status: STATUS.LOADING};
    }
    case CREATE_ORDER_REQUEST_SUCCESS: {
      return {...state, status: STATUS.SUCCESS};
    }
    case CREATE_ORDER_REQUEST_FAILURE: {
      return {...state, status: STATUS.FAILURE};
    }
    default:
      return state;
  }
};

export {reducer};
