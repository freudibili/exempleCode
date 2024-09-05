import {RootState} from '../../../../models/store';
import {STATUS} from '../../../types/storeTypes';
import {CategoryType, TrocItemInputData} from '../types/TrocItemsType';

const getTrocItemId = (state: RootState) =>
  state.trocItem.trocItem._id as string;
const getTrocItem = (state: RootState) =>
  state.trocItem.trocItem as TrocItemInputData;
const getTrocItemStatus = (state: RootState) => state.trocItem.status as STATUS;
const getCategories = (state: RootState) =>
  state.trocItem.categories.categories as CategoryType[];
const getCategoriesId = (state: RootState) => {
  return state.trocItem.categories.categories.map(
    (category: CategoryType) => category._id,
  ) as String[];
};
const getCategoriesStatus = (state: RootState) =>
  state.trocItem.categories.status as STATUS;

const getIsOtherUserBlocked = (state: RootState) => {
  const otherUser = state.trocItem.trocItem.creator;
  const blacklist = state.user.user.user.blacklist as [{_id: string}];

  return Boolean(
    blacklist?.find(blackListedUser => blackListedUser._id === otherUser._id),
  );
};

export {
  getTrocItemId,
  getTrocItem,
  getTrocItemStatus,
  getCategories,
  getCategoriesId,
  getCategoriesStatus,
  getIsOtherUserBlocked,
};
