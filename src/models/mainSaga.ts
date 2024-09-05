import {spawn, all} from 'redux-saga/effects';
import exploreSaga from '../App/modules/Explore/models/exploreSagas';
import authSaga from '../App/modules/Auth/models/authSagas';
import trocItemSaga from '../App/modules/TrocItem/models/trocItemSagas';
import userSaga from '../App/modules/User/models/user/userSagas';
import otherUserSaga from '../App/modules/User/models/otherUser/otherUserSagas';
import orderSaga from '../App/modules/Order/models/orderSagas';
import messengerSaga from '../App/modules/Messenger/models/messengerSagas';
import notificationSaga from '../App/modules/Notification/models/notificationSagas';
import appSaga from '../App/models/appSaga';

export default function* mainSaga() {
  yield all([
    spawn(appSaga),
    spawn(authSaga),
    spawn(userSaga),
    spawn(otherUserSaga),
    spawn(exploreSaga),
    spawn(trocItemSaga),
    spawn(orderSaga),
    spawn(messengerSaga),
    spawn(notificationSaga),
  ]);
}
