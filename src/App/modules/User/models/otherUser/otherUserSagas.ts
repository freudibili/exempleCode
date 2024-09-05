import {takeEvery, put, call} from 'redux-saga/effects';
import {
  FETCH_OTHER_USER_INFORMATION_REQUEST,
  FETCH_OTHER_USER_TROC_ITEMS_REQUEST,
} from './otherUserActionTypes';
import {
  fetchOtherUserInformationRequest,
  fetchOtherUserInformationRequestSuccess,
  fetchOtherUserInformationRequestFailure,
  fetchOtherUserTrocItemsRequestSuccess,
  fetchOtherUserTrocItemsRequestFailure,
  fetchOtherUserTrocItemsRequest,
} from './otherUserActions';
import {getUser, getUserTrocItems} from '../../services/userApi';
import {
  CardTrocItemOrdersType,
  TrocItemInputData,
} from '../../../TrocItem/types/TrocItemsType';
import {OrderType} from '../../../Order/types/OrdersType';

function* otherUserSaga() {
  yield takeEvery(
    FETCH_OTHER_USER_INFORMATION_REQUEST,
    fetchOtherUserInformation,
  );
  yield takeEvery(FETCH_OTHER_USER_TROC_ITEMS_REQUEST, fetchOtherUserTrocItems);
}

function* fetchOtherUserInformation({
  payload,
}: ReturnType<typeof fetchOtherUserInformationRequest>) {
  try {
    const {id} = payload;
    const {data} = yield call(getUser, id);
    const {user} = data;

    yield put(fetchOtherUserInformationRequestSuccess(user));
  } catch (err) {
    yield put(fetchOtherUserInformationRequestFailure());
  }
}

function* fetchOtherUserTrocItems({
  payload,
}: ReturnType<typeof fetchOtherUserTrocItemsRequest>) {
  try {
    const {id} = payload;
    const {data} = yield call(getUserTrocItems, id);
    const {userTrocItems} = data;

    const trocItems: CardTrocItemOrdersType[] = yield call(() =>
      Promise.all(
        userTrocItems?.map(async (trocItem: TrocItemInputData) => {
          let formattedOrders: OrderType[] = [];

          if (trocItem.orders) {
            formattedOrders = trocItem.orders?.map(order => {
              const {requestorUser} = order;

              const requestorImageUrl = '';
              return {
                ...order,
                requestorUser: {...requestorUser, imageUrl: requestorImageUrl},
              };
            });
          }

          const formattedTrocItem: CardTrocItemOrdersType = {
            ...trocItem,
            id: trocItem._id,
            categoryTypeId: trocItem.categoryType._id,
            trocTypeId: trocItem.trocType._id,

            orders: formattedOrders,
          };
          return formattedTrocItem;
        }),
      ),
    );

    yield put(fetchOtherUserTrocItemsRequestSuccess(trocItems));
  } catch (err) {
    yield put(fetchOtherUserTrocItemsRequestFailure());
  }
}

export default otherUserSaga;
