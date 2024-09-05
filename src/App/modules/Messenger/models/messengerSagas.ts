import {takeEvery, put, call} from 'redux-saga/effects';
import {
  FETCH_USER_CONVERSATIONS_REQUEST,
  FETCH_CONVERSATION_MESSAGES_REQUEST,
  CREATE_MESSAGE_REQUEST,
  BLOCK_USER_REQUEST,
} from './messengerActionTypes';
import {
  fetchUserConversationsRequestSuccess,
  fetchUserConversationsRequestFailure,
  fetchConversationMessagesRequestFailure,
  fetchConversationMessagesRequestSuccess,
  fetchConversationMessagesRequest,
  createMessageRequest,
  fetchUserConversationsRequest,
  blockUserRequest,
} from './messengerActions';
import {
  addConversationMessage,
  addUserBlocked,
  getConversationMessages,
  getUserConversations,
} from '../services/messengerApi';
import {
  ConversationInputData,
  ConversationType,
  MessageInputData,
  MessageType,
} from '../types/messengerTypes';
import {fetchUserInformationRequest} from '../../User/models/user/userActions';
import {SNACK_BAR_ALERT} from '../../../../types/snackBarType';
import {showSnackBarAlertRequest} from '../../Notification/models/notificationActions';
import i18n from '../../../utils/i18n';

function* messengerSaga() {
  yield takeEvery(FETCH_USER_CONVERSATIONS_REQUEST, fetchUserConversations);
  yield takeEvery(
    FETCH_CONVERSATION_MESSAGES_REQUEST,
    fetchUserConversationMessages,
  );
  yield takeEvery(CREATE_MESSAGE_REQUEST, createConversationMessage);
  yield takeEvery(BLOCK_USER_REQUEST, blockUser);
}

function* fetchUserConversations() {
  try {
    const {data} = yield call(getUserConversations);
    const {userConversations} = data;

    const conversations: ConversationType[] = yield call(() =>
      Promise.all(
        userConversations.map(
          async (userConversation: ConversationInputData) => {
            return {
              _id: userConversation._id,
              otherUser: {
                ...userConversation.otherUser,
              },
              orderId: userConversation.order._id,
              createdAt: userConversation.createdAt,
              updatedAt: userConversation.updatedAt,
            };
          },
        ),
      ),
    );

    yield put(fetchUserConversationsRequestSuccess(conversations));
  } catch (err) {
    yield put(fetchUserConversationsRequestFailure());
  }
}

function* fetchUserConversationMessages({
  payload,
}: ReturnType<typeof fetchConversationMessagesRequest>) {
  try {
    const {conversationId} = payload;
    const {data} = yield call(getConversationMessages, conversationId);
    const {conversationMessages} = data;

    const updatedMessages: MessageType[] = yield call(() =>
      Promise.all(
        conversationMessages.map(async (message: MessageInputData) => {
          return {
            _id: message._id,
            user: {
              ...message.sender,
            },
            conversationId: message.conversationId,
            text: message.text,
            createdAt: message.createdAt,
          };
        }),
      ),
    );

    yield put(fetchConversationMessagesRequestSuccess(updatedMessages));
  } catch (err) {
    yield put(fetchConversationMessagesRequestFailure());
  }
}

function* createConversationMessage({
  payload,
}: ReturnType<typeof createMessageRequest>) {
  try {
    const {message} = payload;

    const {data} = yield call(addConversationMessage, message);
    const {createMessage} = data;

    if (createMessage) {
      const {conversationId} = message;
      yield put(fetchConversationMessagesRequest(conversationId));
      yield put(fetchUserConversationsRequest());
    }
  } catch (err) {}
}

function* blockUser({payload}: ReturnType<typeof blockUserRequest>) {
  try {
    const {id} = payload;

    const {data} = yield call(addUserBlocked, id);
    const {blockUser: userBlocked} = data;

    if (userBlocked) {
      yield put(fetchUserInformationRequest());
      yield put(
        showSnackBarAlertRequest(
          SNACK_BAR_ALERT.INFO,
          i18n.t('NOTIFICATION_USER_BLOCKED'),
        ),
      );
    }
  } catch (err: any) {
    yield put(
      showSnackBarAlertRequest(
        SNACK_BAR_ALERT.ERROR,
        i18n.t('SERVER_ERROR_DEFAULT'),
      ),
    );
  }
}

export default messengerSaga;
