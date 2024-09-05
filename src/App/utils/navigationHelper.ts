import {createNavigationContainerRef} from '@react-navigation/native';
import {
  AllScreenParamList,
  AuthStackParams,
  NAVIGATION,
  STACK,
  TAB,
} from '../types/navigationTypes';
import {selector} from '../../utils/storeHelper';
import {getTermsAccepted} from '../models/appSelectors';

export const navigationRef = createNavigationContainerRef<any>();

export const navigate = (navigationInfo: {
  stack?: STACK | TAB;
  screen: NAVIGATION | TAB | STACK;
  params?: AllScreenParamList;
}) => {
  if (navigationRef.isReady()) {
    if (navigationInfo.stack) {
      navigationRef.navigate(navigationInfo.stack, {
        screen: navigationInfo.screen,
        params: navigationInfo.params,
      });
    } else {
      navigationRef.navigate(navigationInfo.screen, navigationInfo.params);
    }
  }
};

export const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
};

export const navigateWhenAuth = (params?: AuthStackParams) => {
  const termsAccepted = selector(getTermsAccepted) as unknown as boolean;
  if (!termsAccepted) {
    navigate({
      screen: NAVIGATION.ACCEPT_TERMS_SCREEN,
    });
  } else {
    if (params) {
      const {destination} = params;
      if (destination) {
        navigate({screen: destination as unknown as TAB | NAVIGATION});
      }
    }
  }
};
