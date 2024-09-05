import {RootState} from '../../../../models/store';
import {STATUS} from '../../../types/storeTypes';
import {CardTrocItemType} from '../../TrocItem/types/TrocItemsType';
import {ExploreFilterType} from '../types/ExploreType';

const getExploreItems = (state: RootState) =>
  state.explore.trocItems as CardTrocItemType[];
const getCurrentExploreItems = (state: RootState) =>
  state.explore.currentTrocItems as CardTrocItemType[];
const getExploreIsListEnd = (state: RootState) =>
  state.explore.isListEnd as boolean;
const getExploreStatus = (state: RootState) => state.explore.status as STATUS;
const getExploreFilters = (state: RootState) =>
  state.explore.filters as ExploreFilterType;
const getExploreLoadMoreStatus = (state: RootState) =>
  state.explore.loadMoreStatus as STATUS;

export {
  getExploreItems,
  getCurrentExploreItems,
  getExploreStatus,
  getExploreFilters,
  getExploreIsListEnd,
  getExploreLoadMoreStatus,
};
