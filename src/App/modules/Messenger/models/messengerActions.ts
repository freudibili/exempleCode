import {
  ConversationType,
  MessageOutputData,
  MessageType,
} from '../types/messengerTypes';
import {
  FETCH_USER_CONVERSATIONS_REQUEST,
  FETCH_USER_CONVERSATIONS_REQUEST_SUCCESS,
  FETCH_USER_CONVERSATIONS_REQUEST_FAILURE,
  FETCH_CONVERSATION_MESSAGES_REQUEST,
  FETCH_CONVERSATION_MESSAGES_REQUEST_SUCCESS,
  FETCH_CONVERSATION_MESSAGES_REQUEST_FAILURE,
  CREATE_MESSAGE_REQUEST,
  BLOCK_USER_REQUEST,
} from './messengerActionTypes';

export const fetchUserConversationsRequest = () => ({
  type: FETCH_USER_CONVERSATIONS_REQUEST,
  payload: {},
});
export const fetchUserConversationsRequestSuccess = (
  conversations: ConversationType[],
) => ({
  type: FETCH_USER_CONVERSATIONS_REQUEST_SUCCESS,
  payload: {conversations},
});

export const fetchUserConversationsRequestFailure = () => ({
  type: FETCH_USER_CONVERSATIONS_REQUEST_FAILURE,
  payload: null,
});

export const fetchConversationMessagesRequest = (conversationId: string) => ({
  type: FETCH_CONVERSATION_MESSAGES_REQUEST,
  payload: {conversationId},
});
export const fetchConversationMessagesRequestSuccess = (
  messages: MessageType[],
) => ({
  type: FETCH_CONVERSATION_MESSAGES_REQUEST_SUCCESS,
  payload: {messages},
});

export const fetchConversationMessagesRequestFailure = () => ({
  type: FETCH_CONVERSATION_MESSAGES_REQUEST_FAILURE,
  payload: null,
});

export const createMessageRequest = (message: MessageOutputData) => ({
  type: CREATE_MESSAGE_REQUEST,
  payload: {message},
});

export const blockUserRequest = (id: string) => ({
  type: BLOCK_USER_REQUEST,
  payload: {id},
});
