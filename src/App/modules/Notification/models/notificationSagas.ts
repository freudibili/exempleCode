import {all, call, put, takeEvery} from 'redux-saga/effects';
import {selector} from '../../../../utils/storeHelper';
import {
  fetchConversationMessagesRequest,
  fetchUserConversationsRequest,
} from '../../Messenger/models/messengerActions';
import {
  getConversations,
  getMessages,
} from '../../Messenger/models/messengerSelectors';
import {
  ConversationType,
  MessageType,
} from '../../Messenger/types/messengerTypes';
import {fetchOrderRequest} from '../../Order/models/orderActions';
import {
  fetchUserInformationRequest,
  fetchUserOrderedTrocItemsRequest,
  fetchUserTrocItemsRequest,
} from '../../User/models/user/userActions';
import {
  getNotifications,
  sendUpdateNotificationStatus,
} from '../services/notificationApi';
import {
  NotificationInputData,
  NOTIFICATION_STATUS,
  NOTIFICATION_TYPE,
} from '../types/notificationType';
import {
  fetchNotificationsRequest,
  fetchNotificationsRequestFail,
  fetchNotificationsRequestSuccess,
  updateNotificationsStatusRequest,
} from './notificationActions';
import {
  FETCH_NOTIFICATIONS_REQUEST,
  UPDATE_NOTIFICATIONS_STATUS_REQUEST,
} from './notificationActionTypes';

function* notificationSaga() {
  yield takeEvery(FETCH_NOTIFICATIONS_REQUEST, fetchNotifications);
  yield takeEvery(
    UPDATE_NOTIFICATIONS_STATUS_REQUEST,
    updateNotificationStatus,
  );
}

function* fetchNotifications({
  payload,
}: ReturnType<typeof fetchNotificationsRequest>) {
  try {
    const {remoteMessage, forceRefresh} = payload;
    const {data} = yield call(getNotifications);
    const {userNotifications} = data;

    const newNotfications = userNotifications?.filter(
      (notification: NotificationInputData) =>
        notification.status === NOTIFICATION_STATUS.NEW,
    );

    if (newNotfications.length >= 1 || forceRefresh) {
      yield all([
        put(fetchNotificationsRequestSuccess(newNotfications)),
        put(fetchUserConversationsRequest()),
      ]);

      if (remoteMessage) {
        const {type, conversationId} = remoteMessage.data ?? {};
        const messages = selector(getMessages) as unknown as MessageType[];
        const {conversationId: currentConversationId} = messages[0] || {};
        // Message update only if the conversation open is the same that need to be update
        if (
          type === NOTIFICATION_TYPE.MESSAGE &&
          currentConversationId === conversationId
        ) {
          yield put(fetchConversationMessagesRequest(conversationId));
        }
        // Order update
        else if (type === NOTIFICATION_TYPE.ORDER) {
          const userConversations = selector(
            getConversations,
          ) as unknown as ConversationType[];

          const conversation = userConversations.find(
            userConversation => userConversation._id === conversationId,
          );

          if (conversation) {
            yield all([
              put(fetchOrderRequest(conversation.orderId)),
              put(fetchUserOrderedTrocItemsRequest()),
              put(fetchUserTrocItemsRequest()),
              put(fetchUserInformationRequest()),
            ]);
          }
        }
      }
    }
  } catch {
    yield put(fetchNotificationsRequestFail());
  }
}

function* updateNotificationStatus({
  payload,
}: ReturnType<typeof updateNotificationsStatusRequest>) {
  try {
    const {status, id} = payload;

    const {data} = yield call(sendUpdateNotificationStatus, {id, status});

    if (data) {
      yield put(fetchNotificationsRequest(undefined, true));
    }
  } catch (err) {}
}

export default notificationSaga;
