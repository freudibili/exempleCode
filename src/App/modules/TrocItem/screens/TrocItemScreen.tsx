import React, {useEffect, useLayoutEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/core';
import {useAppDispatch, useAppSelector} from '../../../../hooks/reduxHook';
import {fetchTrocItemRequest} from '../models/trocItemActions';
import {getTrocItem, getTrocItemStatus} from '../models/trocItemSelectors';
import {TrocItemType} from '../types/TrocItemsType';
import {
  NAVIGATION,
  TrocItemStackParamList,
} from '../../../types/navigationTypes';
import TrocItemContent from '../components/contents/TrocItemContent';
import StatusLoader from '../../../components/StatusLoader/StatusLoader';
import designSystem from '../../../utils/designSystem';
import {View} from 'react-native';
import TrocItemMoreButton from '../components/TrocItemMoreButton/TrocItemMoreButton';

type routeType = RouteProp<TrocItemStackParamList, NAVIGATION.TROC_ITEM_SCREEN>;

const TrocItemScreen = () => {
  const navigation = useNavigation();
  const {params} = useRoute<routeType>();
  const dispatch = useAppDispatch();

  const trocItem: TrocItemType = useAppSelector(getTrocItem);
  const status = useAppSelector(getTrocItemStatus);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <TrocItemMoreButton />,
    });
  }, [navigation]);

  useEffect(() => {
    if (params) {
      const {id} = params;
      dispatch(fetchTrocItemRequest(id));
    }
  }, [dispatch, params]);

  return (
    <View style={designSystem.styles.customStyle.container}>
      <StatusLoader status={status}>
        <TrocItemContent trocItem={trocItem} />
      </StatusLoader>
    </View>
  );
};

export default TrocItemScreen;
