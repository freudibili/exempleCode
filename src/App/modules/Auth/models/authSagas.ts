import {takeEvery, put, call, all} from 'redux-saga/effects';
import {
  CREATE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_REQUEST,
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAILURE,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT_REQUEST,
  REFRESH_ACCESS_TOKEN_REQUEST_FAILURE,
  RESET_PASSWORD_REQUEST,
  SEND_OTP_EMAIL_REQUEST,
} from './authActionTypes';
import {
  createAccountRequest,
  createAccountRequestFailure,
  createAccountRequestSuccess,
  loginRequest,
  loginRequestFailure,
  loginRequestSuccess,
  logoutRequest,
  resetPasswordRequest,
  resetPasswordRequestFailure,
  resetPasswordRequestSuccess,
  sendOtpEmailRequest,
  sendOtpEmailRequestFailure,
  sendOtpEmailRequestSuccess,
} from './authActions';
import {
  createOtpCode,
  createUser,
  deleteUser,
  postLogin,
  resetPasswordUser,
} from '../services/authApi';
import {
  fetchUserInformationRequest,
  fetchUserOrderedTrocItemsRequest,
  fetchUserTrocItemsRequest,
} from '../../User/models/user/userActions';
import {showSnackBarAlertRequest} from '../../Notification/models/notificationActions';
import {SNACK_BAR_ALERT} from '../../../../types/snackBarType';
import {handleErrorMessage} from '../../../../utils/errorHelper';
import {NAVIGATION, TAB} from '../../../types/navigationTypes';
import {persistor} from '../../../../models/store';
import {navigate} from '../../../utils/navigationHelper';
import {resetAppData} from '../../../models/appActions';
import i18n from '../../../utils/i18n';

function* authSaga() {
  yield takeEvery(LOGIN_REQUEST, login);
  yield takeEvery(LOGOUT_REQUEST, logout);
  yield takeEvery(CREATE_ACCOUNT_REQUEST, createAccount);
  yield takeEvery(LOGIN_REQUEST_SUCCESS, loginSuccess);
  yield takeEvery(LOGIN_REQUEST_FAILURE, loginFailure);
  yield takeEvery(
    REFRESH_ACCESS_TOKEN_REQUEST_FAILURE,
    refreshAccessTokenFailure,
  );
  yield takeEvery(SEND_OTP_EMAIL_REQUEST, sendOtpEmail);
  yield takeEvery(RESET_PASSWORD_REQUEST, resetPassword);
  yield takeEvery(DELETE_ACCOUNT_REQUEST, deleteAccount);
}

function* login({payload}: ReturnType<typeof loginRequest>) {
  try {
    const {userCredentials} = payload;
    const {data} = yield call(postLogin, userCredentials);
    const {accessToken, refreshToken} = data.login;

    yield put(loginRequestSuccess(accessToken, refreshToken));
  } catch (err: any) {
    yield put(loginRequestFailure());
    yield put(
      showSnackBarAlertRequest(
        SNACK_BAR_ALERT.ERROR,
        handleErrorMessage(NAVIGATION.LOGIN_SCREEN, err.status),
      ),
    );
  }
}

function* loginSuccess() {
  try {
    yield all([
      put(fetchUserInformationRequest()),
      put(fetchUserOrderedTrocItemsRequest()),
      put(fetchUserTrocItemsRequest()),
    ]);
  } catch (err: any) {}
}

function* loginFailure() {
  try {
    yield call(logoutRequest);
  } catch (err: any) {}
}

function* createAccount({payload}: ReturnType<typeof createAccountRequest>) {
  try {
    const {userCredentials} = payload;
    const {data} = yield call(createUser, userCredentials);
    const {accessToken, refreshToken} = data.createUser;

    yield put(createAccountRequestSuccess(accessToken, refreshToken));

    yield all([
      put(fetchUserInformationRequest()),
      put(fetchUserOrderedTrocItemsRequest()),
      put(fetchUserTrocItemsRequest()),
      put(
        showSnackBarAlertRequest(
          SNACK_BAR_ALERT.SUCCESS,
          i18n.t('NOTIFICATION_AUTH_USER_CREATED'),
        ),
      ),
    ]);
  } catch (err: any) {
    yield put(createAccountRequestFailure());
    yield put(
      showSnackBarAlertRequest(
        SNACK_BAR_ALERT.ERROR,
        handleErrorMessage(NAVIGATION.REGISTER_SCREEN, err.status),
      ),
    );
  }
}

function* logout() {
  try {
    yield persistor.purge();
    yield put(resetAppData());
    navigate({
      screen: TAB.EXPLORE_TAB,
    });
  } catch (err: any) {}
}
function* refreshAccessTokenFailure() {
  try {
    yield call(logoutRequest);
  } catch (err: any) {}
}

function* sendOtpEmail({payload}: ReturnType<typeof sendOtpEmailRequest>) {
  try {
    const {email} = payload;
    const {data} = yield call(createOtpCode, email);
    const {code} = data.sendResetPasswordCode;

    if (code) {
      yield put(sendOtpEmailRequestSuccess(email));
      yield put(
        showSnackBarAlertRequest(
          SNACK_BAR_ALERT.SUCCESS,
          i18n.t('NOTIFICATION_AUTH_OTP_EMAIL_SENT'),
        ),
      );
    }
  } catch (err: any) {
    yield put(sendOtpEmailRequestFailure());
    yield put(
      showSnackBarAlertRequest(
        SNACK_BAR_ALERT.ERROR,
        handleErrorMessage(NAVIGATION.FORGET_PASSWORD_SCREEN, err.status),
      ),
    );
  }
}

function* resetPassword({payload}: ReturnType<typeof resetPasswordRequest>) {
  try {
    const {userResetPasswordData} = payload;
    const {data} = yield call(resetPasswordUser, userResetPasswordData);
    const {_id} = data.changePassword;

    if (_id) {
      yield put(resetPasswordRequestSuccess());
      yield put(
        showSnackBarAlertRequest(
          SNACK_BAR_ALERT.SUCCESS,
          i18n.t('NOTIFICATION_USER_PASSWORD_UPDATE'),
        ),
      );
    }
  } catch (err: any) {
    yield put(resetPasswordRequestFailure());
    yield put(
      showSnackBarAlertRequest(
        SNACK_BAR_ALERT.ERROR,
        handleErrorMessage(NAVIGATION.RESET_PASSWORD_SCREEN, err.status),
      ),
    );
  }
}

function* deleteAccount() {
  try {
    const {data} = yield call(deleteUser);
    if (data.deleteUser) {
      yield all([
        put(logoutRequest()),
        put(
          showSnackBarAlertRequest(
            SNACK_BAR_ALERT.SUCCESS,
            i18n.t('NOTIFICATION_AUTH_USER_DELETED'),
          ),
        ),
      ]);
    }
  } catch (err: any) {}
}

export default authSaga;
