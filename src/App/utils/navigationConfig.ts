import designSystem from './designSystem';
import BackButton from '../components/Buttons/BackButton/BackButton';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Platform} from 'react-native';

export const configBackButton = (title?: string) => ({
  headerTitle: title ?? '',
  headerShown: true,
  headerTransparent: false,
  headerStyle: {
    backgroundColor: designSystem.theme.colors.background,
  },
  headerShadowVisible: false,
  headerLeft: BackButton,
});

export const transitions = {
  screen: {
    animation: Platform.OS === 'android' ? 'slide_from_right' : undefined,
    headerShown: false,
  } as NativeStackNavigationOptions,
  modal: {
    presentation: 'modal',
    animation: Platform.OS === 'android' ? 'slide_from_bottom' : undefined,
    headerShown: false,
  } as NativeStackNavigationOptions,
  transparentModal: {
    presentation: 'transparentModal',
    animation: Platform.OS === 'android' ? 'slide_from_bottom' : undefined,
    headerShown: false,
  } as NativeStackNavigationOptions,
};
