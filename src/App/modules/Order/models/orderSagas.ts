import {all, call, put, takeEvery} from 'redux-saga/effects';
import {
  CANCEL_ORDER_REQUEST,
  CREATE_ORDER_REQUEST,
  FETCH_ORDER_REQUEST,
  UPDATE_ORDER_STATUS_REQUEST,
} from './orderActionTypes';
import {
  cancelOrderRequest,
  createOrderRequest,
  createOrderRequestFailure,
  createOrderRequestSuccess,
  fetchOrderRequest,
  fetchOrderRequestFailure,
  fetchOrderRequestSuccess,
  updateOrderRequest,
} from './orderActions';

import {
  addOrder,
  cancelOrder as cancelOrderApi,
  getOrder,
  sendUpdateOrderStatus,
} from '../services/orderApi';
import {
  fetchUserInformationRequest,
  fetchUserOrderedTrocItemsRequest,
  fetchUserTrocItemsRequest,
} from '../../User/models/user/userActions';
import {fetchUserConversationsRequest} from '../../Messenger/models/messengerActions';
import {OrderInputData} from '../types/OrdersType';
import {ConversationInputData} from '../../Messenger/types/messengerTypes';
import {
  addConversation,
  addConversationMessage,
} from '../../Messenger/services/messengerApi';
import {showSnackBarAlertRequest} from '../../Notification/models/notificationActions';
import {SNACK_BAR_ALERT} from '../../../../types/snackBarType';
import {handleErrorMessage} from '../../../../utils/errorHelper';
import {NAVIGATION} from '../../../types/navigationTypes';
import i18n from '../../../utils/i18n';

function* orderSaga() {
  yield takeEvery(FETCH_ORDER_REQUEST, fetchOrder);
  yield takeEvery(CREATE_ORDER_REQUEST, createOrder);
  yield takeEvery(UPDATE_ORDER_STATUS_REQUEST, updateOrderStatus);
  yield takeEvery(CANCEL_ORDER_REQUEST, cancelOrder);
}

function* fetchOrder({payload}: ReturnType<typeof fetchOrderRequest>) {
  try {
    const id = payload.orderId;
    const {data} = yield call(getOrder, id);

    const {order} = data;
    const {trocItem, negociateTrocItems, requestorUser, creatorUser} = order;

    const formattedOrder = {
      ...order,
      trocItem,
      negociateTrocItems,
      creatorUser,
      requestorUser,
    };

    yield put(fetchOrderRequestSuccess(formattedOrder));
  } catch (err) {
    yield put(fetchOrderRequestFailure());
  }
}

function* createOrder({payload}: ReturnType<typeof createOrderRequest>) {
  try {
    // Create Order
    const {orderDatas} = payload;
    const addOrderResponse: {data: {createOrder: OrderInputData}} = yield call(
      addOrder,
      orderDatas.order,
    );

    // Create conversation between user
    if (addOrderResponse.data?.createOrder?.creatorUser) {
      const creatorUserId = addOrderResponse.data.createOrder.creatorUser._id;
      const orderId = addOrderResponse.data.createOrder._id;

      const createConversationResponse: {
        data: {createConversation: ConversationInputData};
      } = yield call(addConversation, {receiverId: creatorUserId, orderId});

      // Send first message from requestor to creator
      if (createConversationResponse.data?.createConversation) {
        const conversationId =
          createConversationResponse.data.createConversation?._id;
        const message = {
          conversationId,
          text: orderDatas.message,
        };
        const {data} = yield call(addConversationMessage, message);

        if (data) {
          yield all([
            put(createOrderRequestSuccess()),
            put(fetchUserConversationsRequest()),
            put(fetchUserOrderedTrocItemsRequest()),
            put(fetchUserInformationRequest()),
            put(
              showSnackBarAlertRequest(
                SNACK_BAR_ALERT.SUCCESS,
                i18n.t('NOTIFICATION_ORDER_CREATED'),
              ),
            ),
          ]);
        }
      }
    }
  } catch (err: any) {
    yield all([
      put(
        showSnackBarAlertRequest(
          SNACK_BAR_ALERT.ERROR,
          handleErrorMessage(NAVIGATION.TROC_ITEM_ACTIONS_MODAL, err.status),
        ),
      ),
      put(createOrderRequestFailure()),
    ]);
  }
}

function* updateOrderStatus({payload}: ReturnType<typeof updateOrderRequest>) {
  try {
    const {status} = payload;
    const {id} = payload;

    const {data} = yield call(sendUpdateOrderStatus, {id, status});

    if (data) {
      yield all([
        put(fetchUserOrderedTrocItemsRequest()),
        put(fetchUserTrocItemsRequest()),
        put(fetchUserInformationRequest()),
        put(
          showSnackBarAlertRequest(
            SNACK_BAR_ALERT.SUCCESS,
            i18n.t('NOTIFICATION_ORDER_UPDATED'),
          ),
        ),
      ]);
    }
  } catch (err: any) {
    yield put(
      showSnackBarAlertRequest(
        SNACK_BAR_ALERT.ERROR,
        handleErrorMessage(NAVIGATION.CHAT_SCREEN, err.status),
      ),
    );
  }
}

function* cancelOrder({payload}: ReturnType<typeof cancelOrderRequest>) {
  try {
    const id = payload.id;

    const {data} = yield call(cancelOrderApi, {id});

    if (data) {
      yield all([
        put(fetchUserOrderedTrocItemsRequest()),
        put(fetchUserInformationRequest()),
      ]);
    }
  } catch (err) {}
}
export default orderSaga;
