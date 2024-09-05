import {AUTH_DESTINATION_SCREEN} from '../modules/Auth/utils/authTypes';
import {
  TROC_ITEM_ACTIONS,
  TROC_ITEM_STATUS,
} from '../modules/TrocItem/types/TrocItemsType';

export enum TAB {
  EXPLORE_TAB = 'ExploreTab',
  TROC_ITEM_TAB = 'TrocItemTab',
  USER_TAB = 'UserTab',
  MESSENGER_TAB = 'MessengerTab',
}

export enum STACK {
  AUTH_STACK = 'AuthStack',
  TAB_STACK = 'TabStack',
  USER_STACK = 'UserStack',
  EXPLORE_STACK = 'ExploreStack',
  TROC_ITEM_STACK = 'TrocItemStack',
  CREATE_TROC_ITEM_STACK = 'CreateTrocItemStack',
  MESSENGER_STACK = 'MessengerStack',
}

export enum NAVIGATION {
  SPLASH_SCREEN = 'SplashScreen',
  ACCEPT_TERMS_SCREEN = 'AcceptTermsScreen',
  FORCE_UPDATE_SCREEN = 'ForceUpdateScreen',
  RATING_MODAL = 'RatingModal',
  INFO_SCREEN = 'InfoScreen',
  EXPLORE_SCREEN = 'ExploreScreen',
  EXPLORE_FILTER_SCREEN = 'ExploreFilterScreen',
  EXPLORE_FILTER_ADDRESS_MODAL = 'ExploreFilterAddressModal',
  TROC_ITEM_SCREEN = 'TrocItemScreen',
  TROC_ITEM_HANDLER_SCREEN = 'TrocItemHandlerScreen',
  TROC_ITEM_CREATE_PRODUCT_SCREEN = 'TrocItemCreateProductScreen',
  TROC_ITEM_UPDATE_PRODUCT_SCREEN = 'TrocItemUpdateProductScreen',
  TROC_ITEM_ACTIONS_MODAL = 'TrocItemActionsModal',
  TROC_ITEM_MORE_MODAL = 'TrocItemMoreModal',
  CREATE_TROC_ITEM_SCREEN = 'CreateTrocItemScreen',
  UPDATE_USER_PROFILE_SCREEN = 'UpdateUserProfileScreen',
  USER_TROC_ITEM_ACTIONS_MODAL = 'UserTrocItemActionModal',
  USER_ORDER_ACTIONS_MODAL = 'UserOrderActionModal',
  OTHER_USER_PROFILE_SCREEN = 'OtherUserProfileScreen',
  MESSENGER_SCREEN = 'MessengerScreen',
  CHAT_SCREEN = 'ChatScreen',
  CHAT_MORE_MODAL = 'ChatMoreModal',
  LOGIN_SCREEN = 'LoginScreen',
  FORGET_PASSWORD_SCREEN = 'ForgetPasswordScreen',
  RESET_PASSWORD_SCREEN = 'ResetPasswordScreen',
  REGISTER_SCREEN = 'RegisterScreen',
  SETTINGS_SCREEN = 'SettingsScreen',
  CONTACT_US_SCREEN = 'ContactUsScreen',
  TEST_SCREEN = 'TestScreen',
}

type OtherUserScreenParams = {id: string};
type UserTrocItemParams = {id: string; status?: TROC_ITEM_STATUS};
type UserOrderParams = {id: string};

type TrocItemScreenParams = {id: string};
type TrocItemActionsModalParams = {actionType: TROC_ITEM_ACTIONS};

type TrocItemCreateScreenParams = {
  trocTypeId?: string;
  categoryTypeId?: string;
};

type ChatScreenParams = {id: string};

export type AuthStackParams = {destination: AUTH_DESTINATION_SCREEN};

export type ExploreStackParamList = {
  [NAVIGATION.EXPLORE_SCREEN]: undefined;
  [NAVIGATION.EXPLORE_FILTER_SCREEN]: undefined;
  [NAVIGATION.EXPLORE_FILTER_ADDRESS_MODAL]: undefined;
  [NAVIGATION.RATING_MODAL]: undefined;
};

export type TrocItemStackParamList = {
  [NAVIGATION.TROC_ITEM_SCREEN]: TrocItemScreenParams;
  [NAVIGATION.TROC_ITEM_ACTIONS_MODAL]: TrocItemActionsModalParams;
  [NAVIGATION.TROC_ITEM_MORE_MODAL]: undefined;
  [NAVIGATION.TROC_ITEM_CREATE_PRODUCT_SCREEN]: TrocItemCreateScreenParams;
  [NAVIGATION.TROC_ITEM_UPDATE_PRODUCT_SCREEN]: TrocItemScreenParams;
  [NAVIGATION.OTHER_USER_PROFILE_SCREEN]: OtherUserScreenParams;
};

export type CreateTrocItemStackParamList = {
  [STACK.CREATE_TROC_ITEM_STACK]: undefined;
  [NAVIGATION.CREATE_TROC_ITEM_SCREEN]: undefined;
};

export type UserStackParamList = {
  [NAVIGATION.UPDATE_USER_PROFILE_SCREEN]: undefined;
  [NAVIGATION.SETTINGS_SCREEN]: undefined;
  [NAVIGATION.CONTACT_US_SCREEN]: undefined;
  [NAVIGATION.USER_TROC_ITEM_ACTIONS_MODAL]: UserTrocItemParams;
  [NAVIGATION.USER_ORDER_ACTIONS_MODAL]: UserOrderParams;
};

export type MessengerStackParamList = {
  [NAVIGATION.CHAT_SCREEN]: ChatScreenParams;
  [NAVIGATION.CHAT_MORE_MODAL]: undefined;
};

export type AuthStackParamList = {
  [STACK.AUTH_STACK]: AuthStackParams;
  [NAVIGATION.LOGIN_SCREEN]: AuthStackParams;
  [NAVIGATION.REGISTER_SCREEN]: AuthStackParams;
  [NAVIGATION.FORGET_PASSWORD_SCREEN]: undefined;
  [NAVIGATION.RESET_PASSWORD_SCREEN]: undefined;
  [NAVIGATION.ACCEPT_TERMS_SCREEN]: AuthStackParams;
};

export interface RootStackParamList
  extends ExploreStackParamList,
    UserStackParamList,
    AuthStackParamList,
    MessengerStackParamList,
    TrocItemStackParamList {}

export type AllScreenParamList =
  | TrocItemScreenParams
  | TrocItemCreateScreenParams
  | ChatScreenParams
  | TrocItemActionsModalParams
  | AuthStackParams
  | UserTrocItemParams;
