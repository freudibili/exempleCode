import {
  UserCredentialsOutputData,
  UserResetPasswordOutputData,
} from '../../User/types/UserType';
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  REFRESH_ACCESS_TOKEN_REQUEST,
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
  DELETE_ACCOUNT_REQUEST,
} from './authActionTypes';

export const createAccountRequest = (
  userCredentials: UserCredentialsOutputData,
) => ({
  type: CREATE_ACCOUNT_REQUEST,
  payload: {userCredentials},
});
export const createAccountRequestSuccess = (
  accessToken: string,
  refreshToken: string,
) => ({
  type: CREATE_ACCOUNT_REQUEST_SUCCESS,
  payload: {accessToken, refreshToken},
});

export const createAccountRequestFailure = () => ({
  type: CREATE_ACCOUNT_REQUEST_FAILURE,
  payload: null,
});

export const loginRequest = (userCredentials: UserCredentialsOutputData) => ({
  type: LOGIN_REQUEST,
  payload: {userCredentials},
});
export const loginRequestSuccess = (
  accessToken: string,
  refreshToken: string,
) => ({
  type: LOGIN_REQUEST_SUCCESS,
  payload: {accessToken, refreshToken},
});

export const loginRequestFailure = () => ({
  type: LOGIN_REQUEST_FAILURE,
  payload: null,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
  payload: null,
});

export const refreshTokenRequest = (refreshToken: string) => ({
  type: REFRESH_ACCESS_TOKEN_REQUEST,
  payload: {refreshToken},
});
export const refreshTokenRequestSuccess = (accessToken: string) => ({
  type: REFRESH_ACCESS_TOKEN_REQUEST_SUCCESS,
  payload: {accessToken},
});

export const refreshTokenRequestFailure = () => ({
  type: REFRESH_ACCESS_TOKEN_REQUEST_FAILURE,
  payload: null,
});

export const sendOtpEmailRequest = (email: string) => ({
  type: SEND_OTP_EMAIL_REQUEST,
  payload: {email},
});
export const sendOtpEmailRequestSuccess = (email: string) => ({
  type: SEND_OTP_EMAIL_REQUEST_SUCCESS,
  payload: {email},
});

export const sendOtpEmailRequestFailure = () => ({
  type: SEND_OTP_EMAIL_REQUEST_FAILURE,
  payload: null,
});

export const resetPasswordRequest = (
  userResetPasswordData: UserResetPasswordOutputData,
) => ({
  type: RESET_PASSWORD_REQUEST,
  payload: {userResetPasswordData},
});
export const resetPasswordRequestSuccess = () => ({
  type: RESET_PASSWORD_REQUEST_SUCCESS,
  payload: null,
});

export const resetPasswordRequestFailure = () => ({
  type: RESET_PASSWORD_REQUEST_FAILURE,
  payload: null,
});

export const resetPasswordFlowRequest = () => ({
  type: RESET_FORGOT_PASSWORD_FLOW_REQUEST,
  payload: null,
});

export const deleteAccountRequest = () => ({
  type: DELETE_ACCOUNT_REQUEST,
  payload: null,
});
