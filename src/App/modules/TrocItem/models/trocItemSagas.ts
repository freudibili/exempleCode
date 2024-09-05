import {takeEvery, put, call, all} from 'redux-saga/effects';
import {
  FETCH_TROC_ITEM_REQUEST,
  CREATE_TROC_ITEM_REQUEST,
  UPDATE_TROC_ITEM_REQUEST,
  FETCH_CATEGORIES_REQUEST,
  REPORT_TROC_ITEM_REQUEST,
  UPDATE_TROC_ITEM_STATUS_REQUEST,
} from './trocItemActionTypes';
import {
  fetchTrocItemRequest,
  fetchTrocItemRequestSuccess,
  fetchTrocItemRequestFailure,
  createTrocItemRequest,
  createTrocItemRequestFailure,
  updateTrocItemRequest,
  updateTrocItemRequestSuccess,
  updateTrocItemRequestFailure,
  fetchCategoriesRequestSuccess,
  fetchCategoriesRequestFailure,
  reportTrocItemRequest,
  createTrocItemRequestSuccess,
  updateTrocItemStatusRequest,
} from './trocItemActions';

import {getTrocItem as getTrocItemSelector} from './trocItemSelectors';
import {
  addTrocItem,
  getCategories,
  getTrocItem,
  sendUpdateTrocItem,
  sendUpdateTrocItemStatus,
  signalTrocItem,
} from '../services/trocItemApi';
import {
  TrocItemInputData,
  TrocItemOutputData,
  TrocItemType,
} from '../types/TrocItemsType';
import {fetchUserTrocItemsRequest} from '../../User/models/user/userActions';
import {deleteImage, uploadImage} from '../../../services/filesApi';
import {showSnackBarAlertRequest} from '../../Notification/models/notificationActions';
import {IMAGE_TYPE} from '../../../../types/imageType';

import uuid from 'react-native-uuid';
import {SNACK_BAR_ALERT} from '../../../../types/snackBarType';
import {handleErrorMessage} from '../../../../utils/errorHelper';
import {NAVIGATION} from '../../../types/navigationTypes';
import {selector} from '../../../../utils/storeHelper';
import i18n from '../../../utils/i18n';

function* trocItemSaga() {
  yield takeEvery(FETCH_TROC_ITEM_REQUEST, fetchTrocItem);
  yield takeEvery(CREATE_TROC_ITEM_REQUEST, createTrocItem);
  yield takeEvery(UPDATE_TROC_ITEM_REQUEST, updateTrocItem);
  yield takeEvery(FETCH_CATEGORIES_REQUEST, fetchCategories);
  yield takeEvery(REPORT_TROC_ITEM_REQUEST, reportTrocItem);
  yield takeEvery(UPDATE_TROC_ITEM_STATUS_REQUEST, updateTrocItemStatus);
}

function* fetchTrocItem({payload}: ReturnType<typeof fetchTrocItemRequest>) {
  try {
    const id = payload.id;
    const {data} = yield call(getTrocItem, id);

    const {trocItem} = data;

    const {creator} = trocItem;

    const formattedItem: TrocItemType = {
      ...trocItem,
      creator: {...creator},
    };

    yield put(fetchTrocItemRequestSuccess(formattedItem));
  } catch (err) {
    yield put(fetchTrocItemRequestFailure());
  }
}

function* createTrocItem({payload}: ReturnType<typeof createTrocItemRequest>) {
  try {
    const {trocItem} = payload;

    const uploadedImages: {imageUrl: string}[] = yield call(() =>
      Promise.all(
        trocItem.imagesData.map(async imageData => {
          const trocItemImage = {
            imageData,
            imageType: IMAGE_TYPE.TROC_ITEM,
          };

          const newImage = await uploadImage({
            imageData,
            imageType: trocItemImage.imageType,
          });

          return newImage;
        }),
      ),
    );

    const imagesUrl: string[] = uploadedImages.map(
      uploadedImage => uploadedImage.imageUrl,
    );

    const trocItemInput: TrocItemOutputData = {
      title: trocItem.title,
      description: trocItem.description,
      address: trocItem.address,
      price: trocItem.price,
      imagesUrl,
      trocTypeId: trocItem.trocTypeId,
      categoryTypeId: trocItem.categoryTypeId,
      categoriesId: trocItem.categoriesId,
      quality: trocItem.quality,
      condition: trocItem.condition,
      negociateDescription: trocItem.negociateDescription,
      picking: trocItem.picking,
    };

    const {data} = yield call(addTrocItem, trocItemInput);
    if (data.createTrocItem._id) {
      yield all([
        put(createTrocItemRequestSuccess()),
        put(fetchUserTrocItemsRequest()),
        put(
          showSnackBarAlertRequest(
            SNACK_BAR_ALERT.SUCCESS,
            i18n.t('NOTIFICATION_TROC_ITEM_CREATED'),
          ),
        ),
      ]);
    }
  } catch (err: any) {
    yield put(createTrocItemRequestFailure());
    yield put(
      showSnackBarAlertRequest(
        SNACK_BAR_ALERT.ERROR,
        handleErrorMessage(
          NAVIGATION.TROC_ITEM_CREATE_PRODUCT_SCREEN,
          err.status,
        ),
      ),
    );
  }
}

function* updateTrocItem({payload}: ReturnType<typeof updateTrocItemRequest>) {
  try {
    const {trocItem} = payload;
    const {id} = payload;
    const {imagesData} = trocItem;
    let newImageUrls: string[] = [];

    // CHECK IF USER UPDATED THE IMAGE
    for (const imageData of imagesData) {
      let newImageUrl;

      if (imageData.uri && uuid.validate(imageData.uri)) {
        newImageUrl = imageData.uri;
      } else {
        // UPLOAD NEW IMAGE
        const {imageUrl} = yield call(uploadImage, {
          imageData,
          imageType: IMAGE_TYPE.TROC_ITEM,
        });

        newImageUrl = imageUrl;
      }

      newImageUrls.push(newImageUrl);
    }

    // DELETE OLD IMAGE
    const currentTrocItem = selector(
      getTrocItemSelector,
    ) as unknown as TrocItemInputData;

    const imagesToDeleteUrl = currentTrocItem.imagesUrl.filter(
      (imageUrl: string) => !newImageUrls.includes(imageUrl),
    );

    for (const imageUrl of imagesToDeleteUrl) {
      yield call(deleteImage, imageUrl, IMAGE_TYPE.TROC_ITEM);
    }

    const trocItemInput: TrocItemOutputData = {
      title: trocItem.title,
      description: trocItem.description,
      address: trocItem.address,
      price: trocItem.price,
      imagesUrl: newImageUrls,
      trocTypeId: trocItem.trocTypeId,
      categoryTypeId: trocItem.categoryTypeId,
      categoriesId: trocItem.categoriesId,
      quality: trocItem.quality,
      condition: trocItem.condition,
      negociateDescription: trocItem.negociateDescription,
      picking: trocItem.picking,
    };

    const {data} = yield call(sendUpdateTrocItem, {id, trocItemInput});
    if (data.updateTrocItem._id) {
      yield put(fetchTrocItemRequest(id));
      yield all([
        put(updateTrocItemRequestSuccess()),
        put(fetchUserTrocItemsRequest()),
        put(
          showSnackBarAlertRequest(
            SNACK_BAR_ALERT.SUCCESS,
            i18n.t('NOTIFICATION_TROC_ITEM_UPDATED'),
          ),
        ),
      ]);
    }
  } catch (err: any) {
    yield put(
      showSnackBarAlertRequest(
        SNACK_BAR_ALERT.ERROR,
        handleErrorMessage(
          NAVIGATION.TROC_ITEM_UPDATE_PRODUCT_SCREEN,
          err.status,
        ),
      ),
    );
    yield put(updateTrocItemRequestFailure());
  }
}

function* fetchCategories() {
  try {
    const {data} = yield call(getCategories);
    const {categories} = data;

    if (categories) {
      const fetchedCategories = categories.categories;
      yield put(fetchCategoriesRequestSuccess(fetchedCategories));
    }
  } catch (err) {
    yield put(fetchCategoriesRequestFailure());
  }
}

function* reportTrocItem({payload}: ReturnType<typeof reportTrocItemRequest>) {
  try {
    const {id} = payload;

    const {data} = yield call(signalTrocItem, id);

    if (data.reportTrocItem) {
      yield all([
        put(
          showSnackBarAlertRequest(
            SNACK_BAR_ALERT.INFO,
            i18n.t('NOTIFICATION_TROC_ITEM_REPORTED'),
          ),
        ),
      ]);
    }
  } catch (err: any) {}
}

function* updateTrocItemStatus({
  payload,
}: ReturnType<typeof updateTrocItemStatusRequest>) {
  try {
    const {id, status} = payload;

    const {data} = yield call(sendUpdateTrocItemStatus, {id, status});
    const {updateTrocItemStatus: trocItemStatus} = data;

    if (trocItemStatus.status) {
      yield all([put(fetchUserTrocItemsRequest())]);
    }
  } catch (err: any) {}
}

export default trocItemSaga;
