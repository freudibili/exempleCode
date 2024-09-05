import React, {useEffect} from 'react';
import {View} from 'react-native';

import RegisterContent from '../components/contents/RegisterContent';
import designSystem from '../../../utils/designSystem';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AuthStackParamList, NAVIGATION} from '../../../types/navigationTypes';
import {useAppSelector} from '../../../../hooks/reduxHook';
import {getUserIsAuth} from '../models/authSelectors';
import {navigateWhenAuth} from '../../../utils/navigationHelper';
type routeType = RouteProp<AuthStackParamList, NAVIGATION.REGISTER_SCREEN>;

const RegisterScreen = () => {
  const {params} = useRoute<routeType>();
  const isAuth = useAppSelector(getUserIsAuth);
  useEffect(() => {
    if (isAuth) {
      navigateWhenAuth(params);
    }
  }, [isAuth, params]);
  return (
    <View style={designSystem.styles.customStyle.container}>
      <RegisterContent />
    </View>
  );
};

export default RegisterScreen;
