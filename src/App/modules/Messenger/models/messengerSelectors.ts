import {RootState} from '../../../../models/store';
import {OrderInputData} from '../../Order/types/OrdersType';
import {ConversationType} from '../types/messengerTypes';

const getConversations = (state: RootState) =>
  state.messenger.conversations.conversations as ConversationType[];
const getConversationsStatus = (state: RootState) =>
  state.messenger.conversations.status;

const getMessages = (state: RootState) => state.messenger.messages.messages;
const getMessagesStatus = (state: RootState) => state.messenger.messages.status;

const getMessageOtherUser = (state: RootState) => {
  const userId = state.user.user.user._id;
  const order = state.order.order as OrderInputData;
  return userId !== order.creatorUser._id
    ? order.creatorUser
    : order.requestorUser;
};

const getIsUserBlocked = (state: RootState) => {
  const otherUser = getMessageOtherUser(state);
  const blacklist = state.user.user.user.blacklist as [{_id: string}];

  return Boolean(
    blacklist?.find(blackListedUser => blackListedUser._id === otherUser._id),
  );
};

export {
  getConversations,
  getConversationsStatus,
  getMessages,
  getMessagesStatus,
  getMessageOtherUser,
  getIsUserBlocked,
};
