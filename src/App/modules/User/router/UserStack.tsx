import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NAVIGATION, UserStackParamList} from '../../../types/navigationTypes';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import {configBackButton, transitions} from '../../../utils/navigationConfig';
import SettingsScreen from '../screens/SettingsScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import i18n from '../../../utils/i18n';

const Stack = createNativeStackNavigator<UserStackParamList>();

function UserStack() {
  return (
    <Stack.Navigator screenOptions={transitions.screen}>
      <Stack.Screen
        name={NAVIGATION.UPDATE_USER_PROFILE_SCREEN}
        component={UpdateProfileScreen}
        options={() => configBackButton()}
      />
      <Stack.Screen
        name={NAVIGATION.SETTINGS_SCREEN}
        component={SettingsScreen}
        options={() => configBackButton(i18n.t('SETTINGS_TITLE'))}
      />
      <Stack.Screen
        name={NAVIGATION.CONTACT_US_SCREEN}
        component={ContactUsScreen}
        options={() => configBackButton(i18n.t('APP_CONTACT_US'))}
      />
    </Stack.Navigator>
  );
}

export default UserStack;
