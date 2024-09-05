import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  NAVIGATION,
  TrocItemStackParamList,
} from '../../../../types/navigationTypes';
import TrocItemActionsModalContent from '../../components/contents/modals/TrocItemActionsModalContent';
import CloseButton from '../../../../components/Buttons/CloseButton/CloseButton';
import {View} from 'react-native';
import designSystem from '../../../../utils/designSystem';
import {Portal} from 'react-native-paper';

type routeType = RouteProp<
  TrocItemStackParamList,
  NAVIGATION.TROC_ITEM_ACTIONS_MODAL
>;

const TrocItemActionsModal = () => {
  const {params} = useRoute<routeType>();
  const {actionType} = params;

  return (
    <View style={designSystem.styles.customStyle.containerModal}>
      <Portal.Host>
        <TrocItemActionsModalContent actionType={actionType} />
        <CloseButton />
      </Portal.Host>
    </View>
  );
};

export default TrocItemActionsModal;
