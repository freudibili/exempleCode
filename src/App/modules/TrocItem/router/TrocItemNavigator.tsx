import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NAVIGATION,
  TrocItemStackParamList,
} from '../../../types/navigationTypes';
import TrocItemScreen from '../screens/TrocItemScreen';

import {configBackButton, transitions} from '../../../utils/navigationConfig';
import OtherUserProfileScreen from '../../User/screens/OtherUserProfileScreen';

const Stack = createNativeStackNavigator<TrocItemStackParamList>();

function TrocItemStack() {
  return (
    <Stack.Navigator
      initialRouteName={NAVIGATION.TROC_ITEM_SCREEN}
      screenOptions={transitions.screen}>
      <Stack.Screen
        name={NAVIGATION.TROC_ITEM_SCREEN}
        component={TrocItemScreen}
        options={() => configBackButton()}
      />
      <Stack.Screen
        name={NAVIGATION.OTHER_USER_PROFILE_SCREEN}
        component={OtherUserProfileScreen}
        options={() => configBackButton()}
      />
    </Stack.Navigator>
  );
}

export default TrocItemStack;
