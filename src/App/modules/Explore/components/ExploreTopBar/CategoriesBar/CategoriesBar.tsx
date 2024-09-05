import React, {useCallback, useMemo} from 'react';

import CategoriesPicker from '../../../../../components/Pickers/CategoriesPicker/CategoriesPicker';
import {StyleSheet, View} from 'react-native';
import {setExploreFiltersRequest} from '../../../models/exploreActions';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/reduxHook';
import {getExploreFilters} from '../../../models/exploreSelectors';
import {ExploreFilterType} from '../../../types/ExploreType';

const CategoriesBar = () => {
  const dispatch = useAppDispatch();

  const filters: ExploreFilterType = useAppSelector(getExploreFilters);

  const categoriesId = useMemo(() => {
    return filters.categoriesId;
  }, [filters.categoriesId]);

  const updateFilters = useCallback(
    (filterIds: string[]) => {
      dispatch(setExploreFiltersRequest({categoriesId: filterIds}));
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <CategoriesPicker
        initValue={categoriesId}
        getDataCallback={updateFilters}
        horizontal
        contentContainerStyle={styles.categoriesContentContainer}
      />
    </View>
  );
};

export default CategoriesBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  categoriesContentContainer: {
    paddingHorizontal: 20,
  },
});
