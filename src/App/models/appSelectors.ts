import {RootState} from '../../models/store';
import {APP_STATE} from '../types/appType';

const getAppState = (state: RootState) => state.app.appState as APP_STATE;

const getShouldReceiveNotification = (state: RootState) => {
  return (
    (state.user.trocItems.trocItems.length > 0 ||
      state.user.orders.orders.length > 0) &&
    state.app.termsAccepted
  );
};

const getTermsAccepted = (state: RootState) =>
  state.app.termsAccepted as boolean;

const getDeviceToken = (state: RootState) => state.app.deviceToken as string;
const getForceUpdate = (state: RootState) => state.app.forceUpdate as boolean;
const getAppOpeningNumber = (state: RootState) =>
  state.app.openingNumber as number;

const getShouldRate = (state: RootState) =>
  state.app.openingNumber % 10 === 3 && !state.app.appRated;

export {
  getAppState,
  getShouldReceiveNotification,
  getTermsAccepted,
  getDeviceToken,
  getForceUpdate,
  getAppOpeningNumber,
  getShouldRate,
};
