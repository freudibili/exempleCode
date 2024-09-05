import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  MessengerStackParamList,
  NAVIGATION,
} from '../../../types/navigationTypes';
import ChatScreen from '../screens/ChatScreen';
import ChatHeader from '../components/ChatHeader/ChatHeader';

const Stack = createNativeStackNavigator<MessengerStackParamList>();

function MessengerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NAVIGATION.CHAT_SCREEN}
        component={ChatScreen}
        options={{
          header: ChatHeader,
        }}
      />
    </Stack.Navigator>
  );
}

export default MessengerStack;
