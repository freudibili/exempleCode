import {RootState} from '../../../../models/store';
import {STATUS} from '../../../types/storeTypes';

const getAuthStatus = (state: RootState) => state.auth.auth.status as STATUS;
const getUserAccessToken = (state: RootState) =>
  state.auth.auth.accessToken as string;
const getUserRefreshToken = (state: RootState) =>
  state.auth.auth.refreshToken as string;
const getUserIsAuth = (state: RootState) => state.auth.auth.isAuth as boolean;
const getForgetPasswordEmail = (state: RootState) =>
  state.auth.forgetPassword.email as string;
const getSendOtpCodeStatus = (state: RootState) =>
  state.auth.forgetPassword.sendCodeStatus as STATUS;
const getResetPasswordStatus = (state: RootState) =>
  state.auth.forgetPassword.resetPasswordStatus as STATUS;

export {
  getAuthStatus,
  getUserAccessToken,
  getUserRefreshToken,
  getUserIsAuth,
  getForgetPasswordEmail,
  getSendOtpCodeStatus,
  getResetPasswordStatus,
};
