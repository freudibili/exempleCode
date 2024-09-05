import {
  SHOW_SNACK_BAR_ALERT,
  HIDE_SNACK_BAR_ALERT,
  FETCH_NOTIFICATIONS_REQUEST_SUCCESS,
  FETCH_NOTIFICATIONS_REQUEST_FAIL,
} from './notificationActionTypes';

export const initialState = {
  snackBarAlert: {type: null, message: '', isOpen: false},
  notifications: [],
};

// reducer
const reducer = (
  state = initialState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case SHOW_SNACK_BAR_ALERT: {
      const {notificationType, message} = action.payload;
      return {
        ...state,
        snackBarAlert: {type: notificationType, message, isOpen: true},
      };
    }
    case HIDE_SNACK_BAR_ALERT: {
      return {
        ...state,
        snackBarAlert: {type: null, message: '', isOpen: false},
      };
    }
    case FETCH_NOTIFICATIONS_REQUEST_SUCCESS: {
      const {notifications} = action.payload;
      return {
        ...state,
        notifications,
      };
    }
    case FETCH_NOTIFICATIONS_REQUEST_FAIL: {
      return {
        ...state,
        notifications: [],
      };
    }
    default:
      return state;
  }
};

export {reducer};
