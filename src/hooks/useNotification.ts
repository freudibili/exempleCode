import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {getDeviceToken, sendDeviceToken} from '../utils/pushNotificationHelper';
import {useAppDispatch} from './reduxHook';
import {fetchNotificationsRequest} from '../App/modules/Notification/models/notificationActions';
import {notificationRequestUserPermission} from '../utils/permissionHelper';
import {useSelector} from 'react-redux';
import {getShouldReceiveNotification} from '../App/models/appSelectors';
import {setDeviceToken} from '../App/models/appActions';

export const useNotification = () => {
  const dispatch = useAppDispatch();
  const shouldReceiveNotification = useSelector(getShouldReceiveNotification);

  useEffect(() => {
    // Init notif if needed
    if (shouldReceiveNotification) {
      // Register Firebase background handler
      notificationRequestUserPermission();
      sendDeviceToken();
    }
  }, [shouldReceiveNotification]);

  useEffect(() => {
    // Get the device token
    getDeviceToken().then(token => {
      if (token) {
        dispatch(setDeviceToken(token));
      }
    });

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      dispatch(setDeviceToken(token));
    });
  }, [dispatch]);

  // Message handled in the foreground!
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      dispatch(fetchNotificationsRequest(remoteMessage));
    });

    return unsubscribe;
  }, [dispatch]);

  // Message handled in the background!
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      dispatch(fetchNotificationsRequest(remoteMessage));
    });
  }, [dispatch]);
};
