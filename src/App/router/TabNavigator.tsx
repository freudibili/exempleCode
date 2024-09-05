import React, {useMemo} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import OctIcon from 'react-native-vector-icons/Octicons';
import ExploreScreen from '../modules/Explore/screens/ExploreScreen';
import TrocItemHandlerScreen from '../modules/TrocItem/screens/TrocItemHandlerScreen';
import UserProfileScreen from '../modules/User/screens/UserProfileScreen';
import MessengerScreen from '../modules/Messenger/screens/MessengerScreen';
import {STACK, TAB} from '../types/navigationTypes';
import designSystem from '../utils/designSystem';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAppSelector} from '../../hooks/reduxHook';
import {getUserNotifications} from '../modules/Notification/models/notificationSelectors';
import {NOTIFICATION_STATUS} from '../modules/Notification/types/notificationType';
import {getUserIsAuth} from '../modules/Auth/models/authSelectors';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {navigate} from '../utils/navigationHelper';
import {AUTH_DESTINATION_SCREEN} from '../modules/Auth/utils/authTypes';
import {getTermsAccepted} from '../models/appSelectors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const notifications = useAppSelector(getUserNotifications);
  const isAuth = useAppSelector(getUserIsAuth);
  const termsAccepted = useAppSelector(getTermsAccepted);

  const badgeCount = useMemo(() => {
    let counter = 0;
    notifications.map(notification => {
      if (notification.status === NOTIFICATION_STATUS.NEW) {
        counter += 1;
      }
    });
    return counter ? counter : undefined;
  }, [notifications]);

  const renderAuthTabBarButton = (
    props: TouchableOpacityProps & {destination: AUTH_DESTINATION_SCREEN},
  ) => {
    const {destination} = props;

    const params = {
      destination,
    };

    return (
      <TouchableOpacity
        {...props}
        onPress={e => {
          if (isAuth && termsAccepted) {
            props.onPress && props.onPress(e);
          } else {
            navigate({screen: STACK.AUTH_STACK, params});
          }
        }}
      />
    );
  };

  return (
    <Tab.Navigator
      initialRouteName={TAB.EXPLORE_TAB}
      screenOptions={{
        tabBarLabel: ({focused, color}) =>
          focused ? (
            <OctIcon name={'dot-fill'} size={10} color={color} />
          ) : null,
        headerShown: false,
        tabBarInactiveTintColor: designSystem.theme.colors.onSurfaceDisabled,
        tabBarActiveTintColor: designSystem.theme.colors.secondary,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <Icon name={'search'} size={focused ? 22 : 20} color={color} />
            );
          },
        }}
        name={TAB.EXPLORE_TAB}
        component={ExploreScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <Icon name={'edit'} size={focused ? 22 : 20} color={color} />
            );
          },
        }}
        name={TAB.TROC_ITEM_TAB}
        component={TrocItemHandlerScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <Icon name={'user'} size={focused ? 22 : 20} color={color} />
            );
          },
          tabBarButton: props =>
            renderAuthTabBarButton({
              ...props,
              destination: AUTH_DESTINATION_SCREEN.PROFILE,
            }),
        }}
        name={TAB.USER_TAB}
        component={UserProfileScreen}
      />
      <Tab.Screen
        options={{
          tabBarBadge: badgeCount,
          tabBarIcon: ({focused, color}) => {
            return (
              <Icon
                name={'message-circle'}
                size={focused ? 22 : 20}
                color={color}
              />
            );
          },
          tabBarButton: props =>
            renderAuthTabBarButton({
              ...props,
              destination: AUTH_DESTINATION_SCREEN.MESSENGER,
            }),
        }}
        name={TAB.MESSENGER_TAB}
        component={MessengerScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
