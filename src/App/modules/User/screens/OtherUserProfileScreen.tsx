import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {
  NAVIGATION,
  TrocItemStackParamList,
} from '../../../types/navigationTypes';
import designSystem from '../../../utils/designSystem';
import OtherUserProfileContent from '../components/contents/OtherUserProfileContent';

type routeType = RouteProp<
  TrocItemStackParamList,
  NAVIGATION.OTHER_USER_PROFILE_SCREEN
>;

const OtherUserProfileScreen = () => {
  const {params} = useRoute<routeType>();

  return (
    <View style={designSystem.styles.customStyle.container}>
      <OtherUserProfileContent id={params.id} />
    </View>
  );
};

export default OtherUserProfileScreen;
