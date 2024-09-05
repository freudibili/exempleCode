import {
  RESET_APP_DATA,
  SET_APP_STATE,
  SET_DEVICE_TOKEN,
  SET_FORCE_UPDATE,
  SET_TERMS_ACCEPTED,
  SET_APP_OPENING_NUMBER,
  SET_APP_RATED,
  SET_APP_CONTACT_US,
} from './appActionTypes';
import {APP_STATE} from '../types/appType';

export const setAppState = (appState: APP_STATE) => ({
  type: SET_APP_STATE,
  payload: {appState},
});

export const setTermsAccepted = () => ({
  type: SET_TERMS_ACCEPTED,
  payload: {},
});

export const setAppRated = () => ({
  type: SET_APP_RATED,
  payload: {},
});

export const resetAppData = () => ({
  type: RESET_APP_DATA,
  payload: {},
});

export const setForceUpdate = (forceUpdate: boolean) => ({
  type: SET_FORCE_UPDATE,
  payload: {forceUpdate},
});

export const setDeviceToken = (deviceToken: string) => ({
  type: SET_DEVICE_TOKEN,
  payload: {deviceToken},
});

export const setAppOpeningNumber = () => ({
  type: SET_APP_OPENING_NUMBER,
  payload: {},
});

export const contactUsRequest = (params: {
  senderEmail: string;
  message: string;
  type: string;
}) => ({
  type: SET_APP_CONTACT_US,
  payload: {params},
});
