import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {SNACK_BAR_ALERT} from '../../../../types/snackBarType';
import {
  NotificationInputData,
  NOTIFICATION_STATUS,
} from '../types/notificationType';
import {
  SHOW_SNACK_BAR_ALERT,
  HIDE_SNACK_BAR_ALERT,
  FETCH_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATIONS_REQUEST_SUCCESS,
  FETCH_NOTIFICATIONS_REQUEST_FAIL,
  UPDATE_NOTIFICATIONS_STATUS_REQUEST,
} from './notificationActionTypes';

export const showSnackBarAlertRequest = (
  notificationType: SNACK_BAR_ALERT,
  message: string,
) => {
  return {
    type: SHOW_SNACK_BAR_ALERT,
    payload: {notificationType, message},
  };
};
export const hideSnackBarAlertRequest = () => ({
  type: HIDE_SNACK_BAR_ALERT,
  payload: null,
});
export const fetchNotificationsRequest = (
  remoteMessage?: FirebaseMessagingTypes.RemoteMessage,
  forceRefresh?: boolean,
) => ({
  type: FETCH_NOTIFICATIONS_REQUEST,
  payload: {remoteMessage, forceRefresh},
});
export const fetchNotificationsRequestSuccess = (
  notifications: NotificationInputData[],
) => ({
  type: FETCH_NOTIFICATIONS_REQUEST_SUCCESS,
  payload: {notifications},
});
export const fetchNotificationsRequestFail = () => ({
  type: FETCH_NOTIFICATIONS_REQUEST_FAIL,
  payload: null,
});
export const updateNotificationsStatusRequest = (
  id: string,
  status: NOTIFICATION_STATUS,
) => ({
  type: UPDATE_NOTIFICATIONS_STATUS_REQUEST,
  payload: {id, status},
});
