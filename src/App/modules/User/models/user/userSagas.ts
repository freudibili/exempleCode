import {takeEvery, put, call, all} from 'redux-saga/effects';
import {
  DELETE_USER_TROC_ITEM_REQUEST,
  FETCH_USER_INFORMATION_REQUEST,
  FETCH_USER_ORDERED_TROC_ITEMS_REQUEST,
  FETCH_USER_TROC_ITEMS_REQUEST,
  UPDATE_USER_INFORMATION_REQUEST,
} from './userActionTypes';
import {
  deleteUserTrocItemRequest,
  fetchUserTrocItemsRequest,
  fetchUserInformationRequestFailure,
  fetchUserInformationRequestSuccess,
  fetchUserTrocItemsRequestFailure,
  fetchUserTrocItemsRequestSuccess,
  fetchUserOrderedTrocItemsRequestSuccess,
  fetchUserOrderedTrocItemsRequestFailure,
  updateUserInformationRequest,
  updateUserInformationRequestSuccess,
  updateUserInformationRequestFailure,
  fetchUserInformationRequest,
} from './userActions';
import {
  getUser,
  getUserOrders,
  getUserTrocItems,
  sendUpdateUserInformations,
} from '../../services/userApi';
import {
  CardTrocItemOrdersType,
  TrocItemInputData,
} from '../../../TrocItem/types/TrocItemsType';
import {removeTrocItem} from '../../../TrocItem/services/trocItemApi';
import {OrderInputData, OrderType} from '../../../Order/types/OrdersType';
import {fetchUserConversationsRequest} from '../../../Messenger/models/messengerActions';
import {deleteImage, uploadImage} from '../../../../services/filesApi';
import {UserInputData} from '../../types/UserType';
import {showSnackBarAlertRequest} from '../../../Notification/models/notificationActions';
import {IMAGE_TYPE} from '../../../../../types/imageType';
import {selector} from '../../../../../utils/storeHelper';
import {
  getUser as getUserSelector,
  getUserTrocItems as getUserTrocItemsSelector,
} from './userSelectors';
import {SNACK_BAR_ALERT} from '../../../../../types/snackBarType';
import {NAVIGATION} from '../../../../types/navigationTypes';
import {handleErrorMessage} from '../../../../../utils/errorHelper';
import uuid from 'react-native-uuid';
import i18n from '../../../../utils/i18n';

function* userSaga() {
  yield takeEvery(FETCH_USER_INFORMATION_REQUEST, fetchUserInformation);
  yield takeEvery(UPDATE_USER_INFORMATION_REQUEST, updateUserInformation);
  yield takeEvery(FETCH_USER_TROC_ITEMS_REQUEST, fetchUserTrocItems);
  yield takeEvery(FETCH_USER_ORDERED_TROC_ITEMS_REQUEST, fetchUserOrders);
  yield takeEvery(DELETE_USER_TROC_ITEM_REQUEST, deleteUserTrocItem);
}

function* fetchUserInformation() {
  try {
    const {data} = yield call(getUser);
    const {user} = data;

    const formattedUser: UserInputData = {
      ...user,
    };

    yield put(fetchUserInformationRequestSuccess(formattedUser));
  } catch (err) {
    yield put(fetchUserInformationRequestFailure());
  }
}

function* updateUserInformation({
  payload,
}: ReturnType<typeof updateUserInformationRequest>) {
  try {
    const currentUser = selector(getUserSelector) as unknown as UserInputData;
    const {user} = payload;
    const {imageData} = user;
    let newImageUrl = null;

    // IF THE IMAGE IS UNCHANGED
    if (imageData?.uri && uuid.validate(imageData.uri)) {
      newImageUrl = imageData.uri;
    }

    if (imageData?.uri) {
      // CHECK IF USER UPDATED THE IMAGE
      if (imageData.uri && uuid.validate(imageData.uri)) {
        newImageUrl = imageData.uri;
      } else {
        // DELETE OLD IMAGE
        if (currentUser.imageUrl) {
          yield call(deleteImage, currentUser.imageUrl, IMAGE_TYPE.USER);
        }

        // UPLOAD NEW IMAGE
        const {imageUrl} = yield call(uploadImage, {
          imageData,
          imageType: IMAGE_TYPE.USER,
        });
        newImageUrl = imageUrl;
      }
    }

    const updatedUser = newImageUrl
      ? {...payload.user, imageUrl: newImageUrl}
      : payload.user;

    const {data} = yield call(sendUpdateUserInformations, updatedUser);

    if (data) {
      yield put(fetchUserInformationRequest());
      yield all([
        put(updateUserInformationRequestSuccess()),
        put(
          showSnackBarAlertRequest(
            SNACK_BAR_ALERT.SUCCESS,
            i18n.t('NOTIFICATION_USER_UPDATED'),
          ),
        ),
      ]);
    }
  } catch (err: any) {
    yield put(
      showSnackBarAlertRequest(
        SNACK_BAR_ALERT.ERROR,
        handleErrorMessage(NAVIGATION.UPDATE_USER_PROFILE_SCREEN, err.status),
      ),
    );
    yield put(updateUserInformationRequestFailure());
  }
}

function* fetchUserTrocItems() {
  try {
    const {data} = yield call(getUserTrocItems);
    const {userTrocItems} = data;

    const trocItems: CardTrocItemOrdersType[] = yield call(() =>
      Promise.all(
        userTrocItems?.map(async (trocItem: TrocItemInputData) => {
          let formattedOrders: OrderType[] = [];

          if (trocItem.orders) {
            formattedOrders = await Promise.all(
              trocItem.orders?.map(async order => {
                const {requestorUser} = order;

                return {
                  ...order,
                  requestorUser: {...requestorUser},
                };
              }),
            );
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

    yield put(fetchUserTrocItemsRequestSuccess(trocItems));
    yield put(fetchUserConversationsRequest());
  } catch (err) {
    yield put(fetchUserTrocItemsRequestFailure());
  }
}

function* fetchUserOrders() {
  try {
    const {data} = yield call(getUserOrders);
    const {userOrders} = data;

    const orders: OrderType[] = yield call(() =>
      Promise.all(
        userOrders?.map(async (order: OrderInputData) => {
          const {trocItem} = order;

          if (trocItem) {
            const formattedOrder = {
              ...order,
              creatorUser: {...order.creatorUser},
              requestorImageUrl: {
                ...order.requestorUser,
              },
              trocItem: {
                ...trocItem,
                id: trocItem._id,
                categoryTypeId: trocItem.categoryType?._id,
                trocTypeId: trocItem.trocType?._id,
              },
            };

            return formattedOrder;
          }
        }),
      ),
    );

    const formattedOrders = orders.filter(order => order);

    yield put(fetchUserOrderedTrocItemsRequestSuccess(formattedOrders));
    yield put(fetchUserConversationsRequest());
  } catch (err) {
    yield put(fetchUserOrderedTrocItemsRequestFailure());
  }
}

function* deleteUserTrocItem({
  payload,
}: ReturnType<typeof deleteUserTrocItemRequest>) {
  try {
    const id = payload.id;
    const {data} = yield call(removeTrocItem, id);

    // DELETE OLD IMAGE
    const userTrocItems = selector(
      getUserTrocItemsSelector,
    ) as unknown as TrocItemInputData[];

    const currentTrocItem = userTrocItems.find(item => item._id === id);
    if (currentTrocItem) {
      for (const imageUrl of currentTrocItem.imagesUrl) {
        yield call(deleteImage, imageUrl, IMAGE_TYPE.TROC_ITEM);
      }
    }

    if (data.deleteTrocItem) {
      yield all([put(fetchUserTrocItemsRequest())]);
    }
  } catch (err) {}
}
export default userSaga;
