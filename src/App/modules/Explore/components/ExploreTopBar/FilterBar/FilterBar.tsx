import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/reduxHook';
import {
  TROC_ITEM_CATEGORY_TYPE,
  TROC_ITEM_TROC_TYPE,
} from '../../../../TrocItem/types/TrocItemsType';
import {setExploreFiltersRequest} from '../../../models/exploreActions';
import {getExploreFilters} from '../../../models/exploreSelectors';
import {ExploreFilterType} from '../../../types/ExploreType';
import AddressFilterChipButton from './AddressFilterChipButton/AddressFilterChipButton';

import FilterChipButton from './FilterChipButton/FilterChipButton';
import useGeolocation from '../../../../../../hooks/useGeolocation';
import {LOCATION_DISTANCE_DEFAULT} from '../../../../../../utils/locationHelper';
import {navigate} from '../../../../../utils/navigationHelper';
import {NAVIGATION} from '../../../../../types/navigationTypes';
import FilterButton from '../FilterButton/FilterButton';

const FilterBar = () => {
  const dispatch = useAppDispatch();
  const {address, error} = useGeolocation();
  const filters: ExploreFilterType = useAppSelector(getExploreFilters);
  const [filtersId, setFiltersId] = useState<string[]>([]);

  const initLocation = useCallback(() => {
    if (filters.address === undefined) {
      if (error) {
        navigate({
          screen: NAVIGATION.EXPLORE_FILTER_ADDRESS_MODAL,
        });
      } else {
        if (address) {
          dispatch(
            setExploreFiltersRequest({
              distance: LOCATION_DISTANCE_DEFAULT,
              address,
            }),
          );
        }
      }
    }
  }, [address, dispatch, error, filters]);

  const initFilters = useCallback(() => {
    let currentFilters: string[] = [];
    if (filters.trocTypeId) {
      currentFilters.push(filters.trocTypeId);
    }
    if (filters.categoryTypeId) {
      currentFilters.push(filters.categoryTypeId);
    }
    setFiltersId(currentFilters);
  }, [setFiltersId, filters]);

  useEffect(() => {
    initFilters();
    initLocation();
  }, [initFilters, initLocation]);

  const updateFilters = useCallback(
    (filterId: string) => {
      if (
        Object.values(TROC_ITEM_TROC_TYPE).includes(
          filterId as TROC_ITEM_TROC_TYPE,
        )
      ) {
        dispatch(setExploreFiltersRequest({trocTypeId: null}));
      }

      if (
        Object.values(TROC_ITEM_CATEGORY_TYPE).includes(
          filterId as TROC_ITEM_CATEGORY_TYPE,
        )
      ) {
        dispatch(setExploreFiltersRequest({categoryTypeId: null}));
      }
    },
    [dispatch],
  );

  const GetFilters = useCallback(() => {
    const component = filtersId.map(filterId => {
      return (
        <FilterChipButton
          key={filterId}
          filterId={filterId}
          onCloseCallback={updateFilters}
        />
      );
    });
    return <View style={styles.filterContainer}>{component}</View>;
  }, [filtersId, updateFilters]);

  return (
    <ScrollView
      horizontal={true}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <FilterButton />
      <AddressFilterChipButton distance={filters.distance || 0} />
      <GetFilters />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
  },
});
export default memo(FilterBar);
