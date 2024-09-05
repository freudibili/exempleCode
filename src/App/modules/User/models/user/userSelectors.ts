import {RootState} from '../../../../../models/store';
import {OrderType} from '../../../Order/types/OrdersType';
import {CardTrocItemOrdersType} from '../../../TrocItem/types/TrocItemsType';
import {UserInputData} from '../../types/UserType';

const getUser = (state: RootState) => state.user.user.user as UserInputData;
const getUserStatus = (state: RootState) => state.user.user.status;

const getUserTrocItems = (state: RootState) =>
  state.user.trocItems.trocItems as CardTrocItemOrdersType[];
const getUserTrocItemsStatus = (state: RootState) =>
  state.user.trocItems.status;

const getUserOrders = (state: RootState) =>
  state.user.orders.orders as OrderType[];
const getUserOrdersStatus = (state: RootState) => state.user.orders.status;

const getUserId = (state: RootState) => state.user.user.user._id;

const getUserWallet = (state: RootState) =>
  state.user.user.user.wallet as number;

const getUserImageUrl = (state: RootState) =>
  state.user.user.user.imageUrl as string;

export {
  getUser,
  getUserStatus,
  getUserTrocItems,
  getUserTrocItemsStatus,
  getUserOrders,
  getUserOrdersStatus,
  getUserId,
  getUserWallet,
  getUserImageUrl,
};
