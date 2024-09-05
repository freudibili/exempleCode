import {STATUS} from '../../../types/storeTypes';
import {ConversationType, MessageType} from '../types/messengerTypes';

import {
  FETCH_USER_CONVERSATIONS_REQUEST,
  FETCH_USER_CONVERSATIONS_REQUEST_SUCCESS,
  FETCH_USER_CONVERSATIONS_REQUEST_FAILURE,
  FETCH_CONVERSATION_MESSAGES_REQUEST,
  FETCH_CONVERSATION_MESSAGES_REQUEST_SUCCESS,
  FETCH_CONVERSATION_MESSAGES_REQUEST_FAILURE,
} from './messengerActionTypes';

let conversations: ConversationType[] = [];

let messages: MessageType[] = [];

export const initialState = {
  conversations: {conversations, status: STATUS.READY},
  messages: {messages, status: STATUS.READY},
};

// reducer
const reducer = (
  state = initialState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case FETCH_USER_CONVERSATIONS_REQUEST: {
      return {
        ...state,
        conversations: {...state.conversations, status: STATUS.LOADING},
      };
    }
    case FETCH_USER_CONVERSATIONS_REQUEST_SUCCESS: {
      const newConversations = action.payload.conversations;
      return {
        ...state,
        conversations: {
          conversations: newConversations,
          status: STATUS.SUCCESS,
        },
      };
    }
    case FETCH_USER_CONVERSATIONS_REQUEST_FAILURE: {
      return {
        ...state,
        conversations: {...state.conversations, status: STATUS.FAILURE},
      };
    }
    case FETCH_CONVERSATION_MESSAGES_REQUEST: {
      const {conversationId} = action.payload;
      const currentConversationId =
        state?.messages?.messages[0]?.conversationId;

      const updatedMessages =
        conversationId === currentConversationId ? state.messages.messages : [];

      return {
        ...state,
        messages: {messages: updatedMessages, status: STATUS.LOADING},
      };
    }
    case FETCH_CONVERSATION_MESSAGES_REQUEST_SUCCESS: {
      const newMessages = action.payload.messages;
      return {
        ...state,
        messages: {messages: newMessages, status: STATUS.SUCCESS},
      };
    }
    case FETCH_CONVERSATION_MESSAGES_REQUEST_FAILURE: {
      return {...state, messages: {messages: [], status: STATUS.FAILURE}};
    }
    default:
      return state;
  }
};

export {reducer};
