import {RootState} from '../../../../../models/store';
import {CardTrocItemType} from '../../../TrocItem/types/TrocItemsType';
import {UserInputData} from '../../types/UserType';

const getOtherUser = (state: RootState) =>
  state.otherUser.user.user as UserInputData;
const getOtherUserStatus = (state: RootState) => state.otherUser.user.status;

const getOtherUserTrocItems = (state: RootState) =>
  state.otherUser.trocItems.trocItems as CardTrocItemType[];
const getOtherUserTrocItemsStatus = (state: RootState) =>
  state.otherUser.trocItems.status;

export {
  getOtherUser,
  getOtherUserTrocItems,
  getOtherUserStatus,
  getOtherUserTrocItemsStatus,
};
