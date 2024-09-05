import {takeEvery, put, call, select} from 'redux-saga/effects';
import {
  FETCH_EXPLORE_TROC_ITEMS_REQUEST,
  SET_EXPLORE_FILTERS,
} from './exploreActionTypes';
import {
  fetchExploreTrocItemsRequest,
  fetchExploreTrocItemsRequestFailure,
  fetchExploreTrocItemsRequestSuccess,
  setExploreFiltersRequest,
  setExploreFiltersRequestSuccess,
} from './exploreActions';

import {
  CardTrocItemType,
  TrocItemInputData,
} from '../../TrocItem/types/TrocItemsType';
import {getTrocItems} from '../../TrocItem/services/trocItemApi';
import {ExploreFilterOutputData, ExploreFilterType} from '../types/ExploreType';
import {getExploreFilters} from './exploreSelectors';

function* exploreSaga() {
  yield takeEvery(FETCH_EXPLORE_TROC_ITEMS_REQUEST, fetchExploreTrocItems);
  yield takeEvery(SET_EXPLORE_FILTERS, setExploreTrocItems);
}

function* fetchExploreTrocItems({
  payload,
}: ReturnType<typeof fetchExploreTrocItemsRequest>) {
  try {
    const {filters, page} = payload;
    const outputFilters: ExploreFilterOutputData = {
      search: filters?.search,
      distance: filters?.distance,
      trocTypeId: filters?.trocTypeId,
      categoryTypeId: filters?.categoryTypeId,
      categoriesId: filters?.categoriesId,
      coordinates: filters?.address?.coordinates,
    };

    const {data} = yield call(getTrocItems, {...outputFilters, page});
    const {trocItems, totalTrocItems, limitPerPage} = data.trocItems;

    const fetchedItems: CardTrocItemType[] = yield call(() =>
      Promise.all(
        trocItems?.map(
          async (trocItem: TrocItemInputData): Promise<CardTrocItemType> => {
            const formattedTrocItem: CardTrocItemType = {
              ...trocItem,
              id: trocItem._id,
              categoryTypeId: trocItem.categoryType._id,
              trocTypeId: trocItem.trocType._id,
            };
            return formattedTrocItem;
          },
        ),
      ),
    );

    const isListEnd = totalTrocItems < limitPerPage;

    yield put(
      fetchExploreTrocItemsRequestSuccess(fetchedItems, page, isListEnd),
    );
  } catch (err) {
    yield put(fetchExploreTrocItemsRequestFailure());
  }
}

function* setExploreTrocItems({
  payload,
}: ReturnType<typeof setExploreFiltersRequest>) {
  const {filters} = payload;
  const currentFilters: ExploreFilterType = yield select(getExploreFilters);

  const trocTypeId =
    filters.trocTypeId || filters.trocTypeId === null
      ? filters.trocTypeId
      : currentFilters.trocTypeId;

  const categoryTypeId =
    filters.categoryTypeId || filters.categoryTypeId === null
      ? filters.categoryTypeId
      : currentFilters.categoryTypeId;

  let categoriesId = currentFilters.categoriesId;

  if (filters.categoriesId) {
    categoriesId =
      filters.categoriesId.length > 0 ? filters.categoriesId : undefined;
  }
  let updatedFilters = {
    search: filters.search ?? currentFilters.search,
    distance: filters.distance ?? currentFilters.distance,
    trocTypeId,
    categoryTypeId,
    categoriesId,
    address: filters.address ?? currentFilters.address,
  };

  yield put(setExploreFiltersRequestSuccess(updatedFilters));
}

export default exploreSaga;
