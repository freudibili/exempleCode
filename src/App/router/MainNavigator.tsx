import React, {useMemo, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../utils/navigationHelper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import {useAppSelector} from '../../hooks/reduxHook';
import {getUserIsAuth} from '../modules/Auth/models/authSelectors';
import {NAVIGATION, STACK} from '../types/navigationTypes';
import AuthStack from '../modules/Auth/router/AuthNavigator';
import TrocItemStack from '../modules/TrocItem/router/TrocItemNavigator';
import MessengerStack from '../modules/Messenger/router/MessengerStack';
import ExploreFilterScreen from '../modules/Explore/screens/ExploreFilterScreen';
import ExploreFilterModal from '../modules/Explore/screens/modals/ExploreFilterModal';
import TrocItemCreateProductScreen from '../modules/TrocItem/screens/TrocItemCreateProductScreen';
import TrocItemUpdateProductScreen from '../modules/TrocItem/screens/TrocItemUpdateProductScreen';
import UserStack from '../modules/User/router/UserStack';
import {
  getAppState,
  getForceUpdate,
  getTermsAccepted,
} from '../models/appSelectors';
import {APP_STATE} from '../types/appType';
import SplashScreen from '../screens/SplashScreen';
import {useNotification} from '../../hooks/useNotification';
import analytics from '@react-native-firebase/analytics';
import TrocItemMoreModal from '../modules/TrocItem/screens/modals/TrocItemMoreModal';
import ChatMoreModal from '../modules/Messenger/screens/modals/ChatMoreModal';
import UserTrocItemActionsModal from '../modules/User/screens/modal/UserTrocItemActionsModal';
import UserOrderActionsModal from '../modules/User/screens/modal/UserOrderActionsModal';
import ForceUpdateScreen from '../screens/ForceUpdateScreen';
import ExploreStack from '../modules/Explore/router/ExploreStack';
import InfoScreen from '../screens/InfoScreen';
import TrocItemActionsModal from '../modules/TrocItem/screens/modals/TrocItemActionsModal';
import {transitions} from '../utils/navigationConfig';
import useDeepLinking from '../../hooks/useDeepLinking';
import TestScreen from '../modules/Explore/screens/TestScreen';
import CreateTrocItemFormNavigator from '../modules/TrocItem/router/CreateTrocItemNavigator';
import RatingModal from '../screens/modals/RatingModal';

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  const isAuth = useAppSelector(getUserIsAuth);
  const termsAccepted = useAppSelector(getTermsAccepted);
  const forceUpdate = useAppSelector(getForceUpdate);

  const appState = useAppSelector(getAppState);

  const routeNameRef = useRef<String>();

  const handleStateChange = async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef?.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName) {
      await analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });
    }
    routeNameRef.current = currentRouteName;
  };

  // HANDLE PUSH NOTIFICATION
  useDeepLinking();
  useNotification();

  // HANDLE SCREENS NAVIGATION
  const screens = useMemo(() => {
    if (appState !== APP_STATE.READY) {
      return (
        <Stack.Screen
          name={NAVIGATION.SPLASH_SCREEN}
          component={SplashScreen}
          options={{headerShown: false}}
        />
      );
    }

    if (forceUpdate) {
      return (
        <Stack.Screen
          name={NAVIGATION.FORCE_UPDATE_SCREEN}
          component={ForceUpdateScreen}
          options={{headerShown: false}}
        />
      );
    }

    return (
      <Stack.Group>
        <Stack.Screen
          name={STACK.TAB_STACK}
          component={TabNavigator}
          options={transitions.screen}
        />

        <Stack.Screen
          name={STACK.TROC_ITEM_STACK}
          component={TrocItemStack}
          options={transitions.screen}
        />
        <Stack.Screen
          name={STACK.USER_STACK}
          component={UserStack}
          options={transitions.screen}
        />
        <Stack.Screen
          name={STACK.MESSENGER_STACK}
          component={MessengerStack}
          options={transitions.screen}
        />
        <Stack.Screen
          name={STACK.EXPLORE_STACK}
          component={ExploreStack}
          options={transitions.screen}
        />
      </Stack.Group>
    );
  }, [appState, forceUpdate]);

  // HANDLE MODALS NAVIGATION
  const modals = (
    <>
      <Stack.Group screenOptions={transitions.transparentModal}>
        <Stack.Screen
          name={NAVIGATION.EXPLORE_FILTER_ADDRESS_MODAL}
          component={ExploreFilterModal}
        />
        <Stack.Screen
          name={NAVIGATION.TROC_ITEM_MORE_MODAL}
          component={TrocItemMoreModal}
        />
        <Stack.Screen
          name={NAVIGATION.USER_TROC_ITEM_ACTIONS_MODAL}
          component={UserTrocItemActionsModal}
        />
        <Stack.Screen
          name={NAVIGATION.USER_ORDER_ACTIONS_MODAL}
          component={UserOrderActionsModal}
        />
        <Stack.Screen
          name={NAVIGATION.CHAT_MORE_MODAL}
          component={ChatMoreModal}
        />
        <Stack.Screen name={NAVIGATION.RATING_MODAL} component={RatingModal} />
      </Stack.Group>
      <Stack.Group screenOptions={transitions.modal}>
        <Stack.Screen
          name={NAVIGATION.TROC_ITEM_CREATE_PRODUCT_SCREEN}
          component={
            isAuth && termsAccepted ? TrocItemCreateProductScreen : AuthStack
          }
        />
        <Stack.Screen
          name={STACK.CREATE_TROC_ITEM_STACK}
          component={
            isAuth && termsAccepted ? CreateTrocItemFormNavigator : AuthStack
          }
        />
        <Stack.Screen
          name={NAVIGATION.TROC_ITEM_UPDATE_PRODUCT_SCREEN}
          component={TrocItemUpdateProductScreen}
        />
        <Stack.Screen
          name={NAVIGATION.EXPLORE_FILTER_SCREEN}
          component={ExploreFilterScreen}
        />
        <Stack.Screen name={NAVIGATION.TEST_SCREEN} component={TestScreen} />
        <Stack.Screen
          name={NAVIGATION.TROC_ITEM_ACTIONS_MODAL}
          component={TrocItemActionsModal}
        />
        <Stack.Screen name={NAVIGATION.INFO_SCREEN} component={InfoScreen} />
        <Stack.Screen name={STACK.AUTH_STACK} component={AuthStack} />
      </Stack.Group>
    </>
  );

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef?.getCurrentRoute()?.name;
      }}
      onStateChange={handleStateChange}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {screens}
        {modals}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
