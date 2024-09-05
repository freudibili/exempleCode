import {fetchCategoriesRequest} from '../App/modules/TrocItem/models/trocItemActions';
import {dispatch, selector} from './storeHelper';
import SplashScreen from 'react-native-splash-screen';

import {setAppOpeningNumber, setAppState} from '../App/models/appActions';
import {APP_STATE} from '../App/types/appType';
import {fetchNotificationsRequest} from '../App/modules/Notification/models/notificationActions';
import {getCategories} from '../App/modules/TrocItem/models/trocItemSelectors';
import {CategoryType} from '../App/modules/TrocItem/types/TrocItemsType';
import {checkMinimumVersionAndForceUpdate} from './forceUpdateHelper';

export const initApp = async () => {
  loadCategories();
  await checkMinimumVersionAndForceUpdate();
  dispatch(setAppState(APP_STATE.READY));
  SplashScreen.hide();
};

export const handleAppBackground = async () => {
  dispatch(fetchNotificationsRequest());
  loadCategories();
  await checkMinimumVersionAndForceUpdate();
};

export const handleAppActive = async () => {
  dispatch(setAppOpeningNumber());
};

const loadCategories = () => {
  const categories = selector(getCategories) as unknown as CategoryType[];
  if (categories.length < 1) {
    dispatch(fetchCategoriesRequest());
  }
};
