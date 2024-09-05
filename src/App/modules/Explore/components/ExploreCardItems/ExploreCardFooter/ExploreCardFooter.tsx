import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useAppSelector} from '../../../../../../hooks/reduxHook';
import {STATUS} from '../../../../../types/storeTypes';
import {getExploreLoadMoreStatus} from '../../../models/exploreSelectors';

const ExploreCardFooter = () => {
  const loadMoreStatus = useAppSelector(getExploreLoadMoreStatus);
  return (
    <View style={styles.loadingContainer}>
      {loadMoreStatus === STATUS.LOADING && <ActivityIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExploreCardFooter;
