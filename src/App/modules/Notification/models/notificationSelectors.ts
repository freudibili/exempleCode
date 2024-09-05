import {RootState} from '../../../../models/store';
import {SnackBarAlertType} from '../../../../types/snackBarType';
import {NotificationInputData} from '../types/notificationType';

const getSnackBarAlert = (state: RootState) =>
  state.notification.snackBarAlert as SnackBarAlertType;
const getSnackBarAlertIsOpen = (state: RootState) =>
  state.notification.snackBarAlert.isOpen as boolean;
const getUserNotifications = (state: RootState) =>
  state.notification.notifications as NotificationInputData[];

export {getSnackBarAlert, getSnackBarAlertIsOpen, getUserNotifications};
