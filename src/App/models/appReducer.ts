import {APP_STATE} from '../types/appType';
import {
  SET_APP_OPENING_NUMBER,
  SET_APP_STATE,
  SET_DEVICE_TOKEN,
  SET_FORCE_UPDATE,
  SET_TERMS_ACCEPTED,
  SET_APP_RATED,
} from './appActionTypes';

const initialState = {
  appState: APP_STATE.INIT,
  termsAccepted: false,
  deviceToken: null,
  forceUpdate: false,
  appRated: false,
  openingNumber: 0,
};

// reducer
const reducer = (
  state = initialState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case SET_APP_STATE: {
      const {appState} = action.payload;
      return {
        ...state,
        appState,
      };
    }
    case SET_TERMS_ACCEPTED: {
      return {
        ...state,
        termsAccepted: true,
      };
    }
    case SET_APP_RATED: {
      return {
        ...state,
        appRated: true,
      };
    }
    case SET_DEVICE_TOKEN: {
      const {deviceToken} = action.payload;
      return {
        ...state,
        deviceToken,
      };
    }
    case SET_FORCE_UPDATE: {
      const {forceUpdate} = action.payload;
      return {
        ...state,
        forceUpdate,
      };
    }
    case SET_APP_OPENING_NUMBER: {
      return {
        ...state,
        openingNumber: state.openingNumber + 1,
      };
    }
    default:
      return state;
  }
};

export {reducer};
