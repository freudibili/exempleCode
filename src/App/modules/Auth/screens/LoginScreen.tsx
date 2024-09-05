import React, {useEffect} from 'react';
import {View} from 'react-native';
import designSystem from '../../../utils/designSystem';

import LoginContent from '../components/contents/LoginContent';
import CloseButton from '../../../components/Buttons/CloseButton/CloseButton';
import {AuthStackParamList, NAVIGATION} from '../../../types/navigationTypes';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useAppSelector} from '../../../../hooks/reduxHook';
import {getUserIsAuth} from '../models/authSelectors';
import {navigateWhenAuth} from '../../../utils/navigationHelper';

type routeType = RouteProp<AuthStackParamList, NAVIGATION.LOGIN_SCREEN>;
const LoginScreen = () => {
  const {params} = useRoute<routeType>();
  const isAuth = useAppSelector(getUserIsAuth);

  useEffect(() => {
    if (isAuth) {
      navigateWhenAuth(params);
    }
  }, [isAuth, params]);

  return (
    <View style={designSystem.styles.customStyle.container}>
      <LoginContent />
      <CloseButton />
    </View>
  );
};

export default LoginScreen;
