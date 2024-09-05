import {NAVIGATION} from '../App/types/navigationTypes';
import i18n from '../App/utils/i18n';

export class CustomError extends Error {
  status = 400;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  getErrorMessage() {
    return 'Something went wrong: ' + this.message;
  }
}

export const handleErrorMessage = (screen: NAVIGATION, status: number) => {
  switch (screen) {
    case NAVIGATION.LOGIN_SCREEN: {
      switch (status) {
        case 404:
          return i18n.t('SERVER_ERROR_USER_404');
        case 401:
          return i18n.t('SERVER_ERROR_LOGIN_401');
      }
      break;
    }
    case NAVIGATION.REGISTER_SCREEN: {
      switch (status) {
        case 422:
          return i18n.t('SERVER_ERROR_REGISTER_422');
        case 409:
          return i18n.t('SERVER_ERROR_USER_409');
      }
      break;
    }
    case NAVIGATION.FORGET_PASSWORD_SCREEN: {
      switch (status) {
        case 404:
          return i18n.t('SERVER_ERROR_USER_404');
        case 422:
          return i18n.t('SERVER_ERROR_FORGET_PASSWORD_422');
      }
      break;
    }
    case NAVIGATION.RESET_PASSWORD_SCREEN: {
      switch (status) {
        case 401:
          return i18n.t('SERVER_ERROR_RESET_PASSWORD_401');
        case 403:
          return i18n.t('SERVER_ERROR_RESET_PASSWORD_403');
        case 404:
          return i18n.t('SERVER_ERROR_USER_404');
      }
      break;
    }
    case NAVIGATION.TROC_ITEM_ACTIONS_MODAL: {
      break;
    }
    case NAVIGATION.CHAT_SCREEN: {
      break;
    }
    case NAVIGATION.TROC_ITEM_CREATE_PRODUCT_SCREEN: {
      break;
    }
    case NAVIGATION.TROC_ITEM_UPDATE_PRODUCT_SCREEN: {
      break;
    }
    case NAVIGATION.UPDATE_USER_PROFILE_SCREEN: {
      switch (status) {
        case 404:
          return i18n.t('SERVER_ERROR_USER_404');
      }
      break;
    }
  }
  return i18n.t('SERVER_ERROR_DEFAULT');
};
