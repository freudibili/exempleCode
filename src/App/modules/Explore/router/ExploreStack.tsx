import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ExploreStackParamList,
  NAVIGATION,
} from '../../../types/navigationTypes';
import ExploreFilterScreen from '../screens/ExploreFilterScreen';
import {transitions} from '../../../utils/navigationConfig';

const Stack = createNativeStackNavigator<ExploreStackParamList>();

function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={transitions.modal}>
        <Stack.Screen
          name={NAVIGATION.EXPLORE_FILTER_SCREEN}
          component={ExploreFilterScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default ExploreStack;
