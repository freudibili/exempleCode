import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CreateTrocItemStackParamList,
  NAVIGATION,
} from '../../../types/navigationTypes';
import {transitions} from '../../../utils/navigationConfig';
import CreateTrocItemScreen from '../screens/CreateTrocItemSreen';

const Stack = createNativeStackNavigator<CreateTrocItemStackParamList>();

function CreateTrocItemStack() {
  return (
    <Stack.Navigator
      initialRouteName={NAVIGATION.CREATE_TROC_ITEM_SCREEN}
      screenOptions={transitions.modal}>
      <Stack.Screen
        name={NAVIGATION.CREATE_TROC_ITEM_SCREEN}
        component={CreateTrocItemScreen}
      />
    </Stack.Navigator>
  );
}

export default CreateTrocItemStack;
