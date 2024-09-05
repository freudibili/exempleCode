import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';

export const notificationRequestUserPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      return enabled;
    } else if (Platform.OS === 'android') {
      const {status} = await checkNotifications();
      if (status === 'denied') {
        await requestNotifications(['alert', 'sound']);
      } else {
        return true;
      }
    } else {
      throw new Error('Unsupported platform');
    }
  } catch (error) {
    return false;
  }
};
