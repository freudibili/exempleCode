import {STATUS} from '../../../types/storeTypes';
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAILURE,
  LOGIN_REQUEST_SUCCESS,
  REFRESH_ACCESS_TOKEN_REQUEST_SUCCESS,
  REFRESH_ACCESS_TOKEN_REQUEST_FAILURE,
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_REQUEST_SUCCESS,
  CREATE_ACCOUNT_REQUEST_FAILURE,
  LOGOUT_REQUEST,
  SEND_OTP_EMAIL_REQUEST,
  SEND_OTP_EMAIL_REQUEST_SUCCESS,
  SEND_OTP_EMAIL_REQUEST_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_FAILURE,
  RESET_FORGOT_PASSWORD_FLOW_REQUEST,
} from './authActionTypes';

export const initialState = {
  auth: {
    isAuth: false,
    accessToken: null,
    refreshToken: null,
    status: STATUS.READY,
  },
  forgetPassword: {
    email: '',
    sendCodeStatus: STATUS.READY,
    resetPasswordStatus: STATUS.READY,
  },
};

// reducer
const reducer = (
  state = initialState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case CREATE_ACCOUNT_REQUEST: {
      return {...state, auth: {...state.auth, status: STATUS.LOADING}};
    }
    case CREATE_ACCOUNT_REQUEST_SUCCESS: {
      const {accessToken, refreshToken} = action.payload;

      return {
        ...state,
        auth: {isAuth: true, accessToken, refreshToken, status: STATUS.SUCCESS},
      };
    }
    case CREATE_ACCOUNT_REQUEST_FAILURE: {
      const accessToken = '';
      const refreshToken = '';
      return {
        ...state,
        auth: {
          isAuth: false,
          accessToken,
          refreshToken,
          status: STATUS.FAILURE,
        },
      };
    }
    case LOGIN_REQUEST: {
      return {...state, auth: {...state.auth, status: STATUS.LOADING}};
    }
    case LOGIN_REQUEST_SUCCESS: {
      const {accessToken, refreshToken} = action.payload;
      return {
        ...state,
        auth: {isAuth: true, accessToken, refreshToken, status: STATUS.SUCCESS},
      };
    }
    case LOGIN_REQUEST_FAILURE: {
      const accessToken = null;
      const refreshToken = null;
      return {
        ...state,
        auth: {
          isAuth: false,
          accessToken,
          refreshToken,
          status: STATUS.FAILURE,
        },
      };
    }
    case LOGOUT_REQUEST: {
      const accessToken = null;
      const refreshToken = null;
      return {
        ...state,
        auth: {...state.auth, isAuth: false, accessToken, refreshToken},
      };
    }
    case REFRESH_ACCESS_TOKEN_REQUEST_SUCCESS: {
      const {accessToken} = action.payload;
      return {...state, auth: {...state.auth, isAuth: true, accessToken}};
    }
    case REFRESH_ACCESS_TOKEN_REQUEST_FAILURE: {
      const accessToken = null;
      return {...state, auth: {...state.auth, isAuth: false, accessToken}};
    }
    case SEND_OTP_EMAIL_REQUEST: {
      return {
        ...state,
        forgetPassword: {
          ...state.forgetPassword,
          sendCodeStatus: STATUS.LOADING,
        },
      };
    }
    case SEND_OTP_EMAIL_REQUEST_SUCCESS: {
      const {email} = action.payload;
      return {
        ...state,
        forgetPassword: {
          ...state.forgetPassword,
          sendCodeStatus: STATUS.SUCCESS,
          email,
        },
      };
    }
    case SEND_OTP_EMAIL_REQUEST_FAILURE: {
      return {
        ...state,
        forgetPassword: {
          ...state.forgetPassword,
          sendCodeStatus: STATUS.FAILURE,
        },
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        forgetPassword: {
          ...state.forgetPassword,
          resetPasswordStatus: STATUS.LOADING,
        },
      };
    }
    case RESET_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        forgetPassword: {
          ...state.forgetPassword,
          resetPasswordStatus: STATUS.SUCCESS,
        },
      };
    }
    case RESET_PASSWORD_REQUEST_FAILURE: {
      return {
        ...state,
        forgetPassword: {
          ...state.forgetPassword,
          resetPasswordStatus: STATUS.FAILURE,
        },
      };
    }
    case RESET_FORGOT_PASSWORD_FLOW_REQUEST: {
      return {
        ...state,
        forgetPassword: {
          ...state.forgetPassword,
          sendCodeStatus: STATUS.READY,
          resetPasswordStatus: STATUS.READY,
        },
      };
    }
    default:
      return state;
  }
};

export {reducer};
