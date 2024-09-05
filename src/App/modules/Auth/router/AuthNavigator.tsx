import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import {
  AuthStackParamList,
  NAVIGATION,
  STACK,
} from '../../../types/navigationTypes';
import RegisterScreen from '../screens/RegisterScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import {configBackButton, transitions} from '../../../utils/navigationConfig';
import {RouteProp, useRoute} from '@react-navigation/native';
import AcceptTermsScreen from '../../../screens/AcceptTermsScreen';
import {useAppSelector} from '../../../../hooks/reduxHook';
import {getUserIsAuth} from '../models/authSelectors';
import {getTermsAccepted} from '../../../models/appSelectors';
import {navigateWhenAuth} from '../../../utils/navigationHelper';

const Stack = createNativeStackNavigator<AuthStackParamList>();
type routeType = RouteProp<AuthStackParamList, STACK.AUTH_STACK>;

function AuthStack() {
  const {params} = useRoute<routeType>();
  const isAuth = useAppSelector(getUserIsAuth);
  const termsAccepted = useAppSelector(getTermsAccepted);

  useEffect(() => {
    if (isAuth && termsAccepted) {
      navigateWhenAuth(params);
    }
  }, [isAuth, params, termsAccepted]);

  return (
    <Stack.Navigator
      initialRouteName={NAVIGATION.LOGIN_SCREEN}
      screenOptions={transitions.screen}>
      {!isAuth && (
        <>
          <Stack.Screen
            name={NAVIGATION.LOGIN_SCREEN}
            component={LoginScreen}
            initialParams={params}
          />
          <Stack.Screen
            name={NAVIGATION.REGISTER_SCREEN}
            component={RegisterScreen}
            options={() => configBackButton()}
            initialParams={params}
          />
          <Stack.Screen
            name={NAVIGATION.FORGET_PASSWORD_SCREEN}
            component={ForgetPasswordScreen}
            options={() => configBackButton()}
          />
          <Stack.Screen
            name={NAVIGATION.RESET_PASSWORD_SCREEN}
            component={ResetPasswordScreen}
            options={() => configBackButton()}
          />
        </>
      )}

      <Stack.Screen
        name={NAVIGATION.ACCEPT_TERMS_SCREEN}
        component={AcceptTermsScreen}
        initialParams={params}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
