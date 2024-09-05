import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../../../../hooks/reduxHook';
import StatusLoader from '../../../../components/StatusLoader/StatusLoader';
import {STATUS} from '../../../../types/storeTypes';
import {CardTrocItemType} from '../../../TrocItem/types/TrocItemsType';
import {fetchExploreTrocItemsRequest} from '../../models/exploreActions';
import {
  getCurrentExploreItems,
  getExploreFilters,
  getExploreIsListEnd,
  getExploreStatus,
} from '../../models/exploreSelectors';
import {ExploreFilterType} from '../../types/ExploreType';
import ExploreCardFooter from '../ExploreCardItems/ExploreCardFooter/ExploreCardFooter';
import ExploreCardItem from '../ExploreCardItems/ExploreCardItem/ExploreCardItem';
import ExploreNoContent from './ExploreNoContent/ExploreNoContent';

const ExploreContent = () => {
  const dispatch = useAppDispatch();

  const currentTrocItems: CardTrocItemType[] = useAppSelector(
    getCurrentExploreItems,
  );
  const filters: ExploreFilterType = useAppSelector(getExploreFilters);
  const isListEnd = useAppSelector(getExploreIsListEnd);
  const status = useAppSelector(getExploreStatus);
  const [page, setPage] = useState(1);

  const updatedStatus = useMemo(() => {
    if (!currentTrocItems?.length) {
      return status;
    }
    return STATUS.SUCCESS;
  }, [currentTrocItems?.length, status]);

  const handleFetch = useCallback(
    (newPage: number) => {
      dispatch(fetchExploreTrocItemsRequest(filters, newPage));
      setPage(newPage);
    },
    [dispatch, filters],
  );

  useEffect(() => {
    handleFetch(1);
  }, [handleFetch]);

  if (status === STATUS.SUCCESS && !currentTrocItems?.length) {
    return <ExploreNoContent />;
  }

  return (
    <StatusLoader status={updatedStatus}>
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={() => <Divider bold />}
          data={currentTrocItems}
          renderItem={({item}) => <ExploreCardItem trocItem={item} />}
          keyExtractor={item => 'item_' + item.id}
          scrollEventThrottle={250}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={status === STATUS.LOADING}
              onRefresh={() => handleFetch(1)}
            />
          }
          onEndReached={() => {
            // TO DO update with the backend limite
            if (!isListEnd && currentTrocItems?.length >= 10) {
              handleFetch(page + 1);
            }
          }}
          onEndReachedThreshold={0.11}
          ListEmptyComponent={() => {
            return <ExploreNoContent />;
          }}
          ListFooterComponent={ExploreCardFooter}
        />
      </View>
    </StatusLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ExploreContent;
