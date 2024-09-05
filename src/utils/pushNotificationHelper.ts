import {Platform} from 'react-native';
import {setNotificationDeviceToken} from '../App/modules/Notification/services/notificationApi';
import messaging from '@react-native-firebase/messaging';
import {selector} from './storeHelper';
import {getDeviceToken as getDeviceTokenSelector} from '../App/models/appSelectors';

export const getDeviceToken = async () => {
  try {
    let deviceToken = null;
    if (Platform.OS === 'ios') {
      const apnsToken = await messaging().getAPNSToken();

      if (apnsToken) {
        deviceToken = await messaging().getToken();
      } else {
        await messaging().setAPNSToken('randomAPNStoken', 'sandbox');
        deviceToken = await messaging().getToken();
      }
    } else {
      deviceToken = await messaging().getToken();
    }
    return deviceToken;
  } catch (error) {
    return null;
  }
};

export const sendDeviceToken = async () => {
  const deviceToken = selector(getDeviceTokenSelector) as unknown as string;

  if (deviceToken) {
    await setNotificationDeviceToken(deviceToken);
  }
};
