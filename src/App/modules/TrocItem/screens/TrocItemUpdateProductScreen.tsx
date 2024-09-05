import React from 'react';
import {useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/core';
import {
  TrocItemStackParamList,
  NAVIGATION,
} from '../../../types/navigationTypes';
import {SafeAreaView} from 'react-native';
import designSystem from '../../../utils/designSystem';
import TrocItemUpdateContent from '../components/contents/TrocItemUpdateContent';
import {Portal} from 'react-native-paper';

type routeType = RouteProp<
  TrocItemStackParamList,
  NAVIGATION.TROC_ITEM_UPDATE_PRODUCT_SCREEN
>;

const TrocItemUpdateProductScreen = () => {
  const {params} = useRoute<routeType>();
  const {id} = params;

  return (
    <SafeAreaView style={designSystem.styles.customStyle.containerModal}>
      <Portal.Host>
        <TrocItemUpdateContent id={id} />
      </Portal.Host>
    </SafeAreaView>
  );
};

export default TrocItemUpdateProductScreen;
