import {authenticatedPostGraphql} from '../../Auth/utils/authHelper';
import {
  ADD_MESSENGER_CONVERSATION_MUTATION,
  ADD_MESSENGER_MESSAGE_MUTATION,
  BLOCK_USER_MUTATION,
} from '../graphql/messengerMutations';
import {
  FETCH_MESSENGER_USER_CONVERSATIONS_QUERY,
  FETCH_MESSENGER_MESSAGES_QUERY,
} from '../graphql/messengerQueries';
import {
  ConversationOutputData,
  MessageOutputData,
} from '../types/messengerTypes';

export const getUserConversations = async () => {
  try {
    const response = await authenticatedPostGraphql(
      FETCH_MESSENGER_USER_CONVERSATIONS_QUERY,
    );

    return response;
  } catch (err) {}
};

export const getConversationMessages = async (conversationId: string) => {
  try {
    const variables = {
      conversationId,
    };
    const response = await authenticatedPostGraphql(
      FETCH_MESSENGER_MESSAGES_QUERY,
      variables,
    );
    return response;
  } catch (err) {}
};

export const addConversation = async (conversation: ConversationOutputData) => {
  try {
    const variables = {
      conversationInput: conversation,
    };
    const response = await authenticatedPostGraphql(
      ADD_MESSENGER_CONVERSATION_MUTATION,
      variables,
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const addConversationMessage = async (message: MessageOutputData) => {
  try {
    const variables = {
      messageInput: message,
    };
    const response = await authenticatedPostGraphql(
      ADD_MESSENGER_MESSAGE_MUTATION,
      variables,
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const addUserBlocked = async (id: string) => {
  try {
    const variables = {
      id,
    };
    const response = await authenticatedPostGraphql(
      BLOCK_USER_MUTATION,
      variables,
    );
    return response;
  } catch (err) {}
};
