import {STATUS} from '../../../../types/storeTypes';
import {CardTrocItemType} from '../../../TrocItem/types/TrocItemsType';
import {UserInputData} from '../../types/UserType';
import {
  FETCH_OTHER_USER_INFORMATION_REQUEST,
  FETCH_OTHER_USER_INFORMATION_REQUEST_SUCCESS,
  FETCH_OTHER_USER_INFORMATION_REQUEST_FAILURE,
  FETCH_OTHER_USER_TROC_ITEMS_REQUEST,
  FETCH_OTHER_USER_TROC_ITEMS_REQUEST_FAILURE,
  FETCH_OTHER_USER_TROC_ITEMS_REQUEST_SUCCESS,
} from './otherUserActionTypes';

let user: UserInputData = {
  _id: '',
  name: '',
  email: '',
  status: '',
  wallet: 0,
};

let trocItems: CardTrocItemType[] = [];

export const initialState = {
  user: {user, status: STATUS.READY},
  trocItems: {trocItems, status: STATUS.READY},
};

// reducer
const reducer = (
  state = initialState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case FETCH_OTHER_USER_TROC_ITEMS_REQUEST: {
      return {
        ...state,
        trocItems: {trocItems, status: STATUS.LOADING},
      };
    }
    case FETCH_OTHER_USER_TROC_ITEMS_REQUEST_SUCCESS: {
      const fetchedTrocItems = action.payload.trocItems;
      return {
        ...state,
        trocItems: {
          trocItems: fetchedTrocItems,
          status: STATUS.SUCCESS,
        },
      };
    }
    case FETCH_OTHER_USER_TROC_ITEMS_REQUEST_FAILURE: {
      return {
        ...state,
        trocItems: {trocItems, status: STATUS.FAILURE},
      };
    }
    case FETCH_OTHER_USER_INFORMATION_REQUEST: {
      return {...state, user: {user, status: STATUS.LOADING}};
    }
    case FETCH_OTHER_USER_INFORMATION_REQUEST_SUCCESS: {
      const fetchedUser = action.payload.user;
      return {...state, user: {user: fetchedUser, status: STATUS.SUCCESS}};
    }
    case FETCH_OTHER_USER_INFORMATION_REQUEST_FAILURE: {
      return {...state, user: {user, status: STATUS.FAILURE}};
    }
    default:
      return state;
  }
};

export {reducer};
