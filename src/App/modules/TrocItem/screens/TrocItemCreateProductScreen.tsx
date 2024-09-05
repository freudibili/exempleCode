import React from 'react';
import {useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/core';
import {
  TrocItemStackParamList,
  NAVIGATION,
} from '../../../types/navigationTypes';
import TrocItemCreateContent from '../components/contents/TrocItemCreateContent';
import designSystem from '../../../utils/designSystem';
import {Portal} from 'react-native-paper';
import {SafeAreaView} from 'react-native';

type routeType = RouteProp<
  TrocItemStackParamList,
  NAVIGATION.TROC_ITEM_CREATE_PRODUCT_SCREEN
>;

const TrocItemCreateProductScreen = () => {
  const {params} = useRoute<routeType>();
  const {trocTypeId, categoryTypeId} = params;

  return (
    <SafeAreaView style={designSystem.styles.customStyle.containerModal}>
      <Portal.Host>
        <TrocItemCreateContent
          trocTypeId={trocTypeId}
          categoryTypeId={categoryTypeId}
        />
      </Portal.Host>
    </SafeAreaView>
  );
};

export default TrocItemCreateProductScreen;
