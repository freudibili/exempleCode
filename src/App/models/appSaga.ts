import {all, call, put, takeEvery} from 'redux-saga/effects';
import {showSnackBarAlertRequest} from '../modules/Notification/models/notificationActions';

import {SET_APP_CONTACT_US} from './appActionTypes';
import {contactUsRequest} from './appActions';
import {SNACK_BAR_ALERT} from '../../types/snackBarType';
import {sendContactUS} from '../services/appApi';
import i18n from '../utils/i18n';

function* appSaga() {
  yield takeEvery(SET_APP_CONTACT_US, contactUs);
}

function* contactUs({payload}: ReturnType<typeof contactUsRequest>) {
  try {
    const {senderEmail, message, type} = payload.params;

    const {data} = yield call(sendContactUS, {senderEmail, message, type});

    if (data.contactUs) {
      yield all([
        put(
          showSnackBarAlertRequest(
            SNACK_BAR_ALERT.INFO,
            i18n.t('NOTIFICATION_APP_CONTACT_US'),
          ),
        ),
      ]);
    }
  } catch (err: any) {
    console.log('err', err);
  }
}

export default appSaga;
