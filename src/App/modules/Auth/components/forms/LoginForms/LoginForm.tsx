import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useFormik} from 'formik';
import {loginSchema} from '../../../utils/authFormHelper';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/reduxHook';
import {
  loginRequest,
  resetPasswordFlowRequest,
} from '../../../models/authActions';
import {UserCredentialsOutputData} from '../../../../User/types/UserType';
import {getAuthStatus} from '../../../models/authSelectors';
import {STATUS} from '../../../../../types/storeTypes';
import MyTextInput from '../../../../../components/MyTextInput/MyTextInput';
import designSystem from '../../../../../utils/designSystem';
import {navigate} from '../../../../../utils/navigationHelper';
import {NAVIGATION} from '../../../../../types/navigationTypes';
import i18n from '../../../../../utils/i18n';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(getAuthStatus);

  const [isLoading, setIsLoading] = useState(false);

  enum FORM {
    EMAIL = 'email',
    PASSWORD = 'password',
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: values => {
      handleLogin({email: values.email, password: values.password});
    },
  });

  useEffect(() => {
    setIsLoading(status === STATUS.LOADING);
  }, [status]);

  const handleLogin = useCallback(
    async (userCredentials: UserCredentialsOutputData) => {
      dispatch(loginRequest(userCredentials));
    },
    [dispatch],
  );

  const goToForgetPassword = () => {
    dispatch(resetPasswordFlowRequest());
    navigate({
      screen: NAVIGATION.FORGET_PASSWORD_SCREEN,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <MyTextInput
          title={i18n.t('AUTH_LOGIN_EMAIL_TITLE')}
          placeholder={i18n.t('AUTH_LOGIN_EMAIL_PLACEHOLDER')}
          onChangeText={formik.handleChange(FORM.EMAIL)}
          onBlur={formik.handleBlur(FORM.EMAIL)}
          value={formik.values.email}
          error={formik.errors.email}
        />

        <MyTextInput
          title={i18n.t('AUTH_LOGIN_PASSWORD_TITLE')}
          placeholder={i18n.t('AUTH_LOGIN_PASSWORD_PLACEHOLDER')}
          onChangeText={formik.handleChange(FORM.PASSWORD)}
          onBlur={formik.handleBlur(FORM.PASSWORD)}
          value={formik.values.password}
          error={formik.errors.password}
          secureTextEntry
        />
        <TouchableOpacity onPress={goToForgetPassword}>
          <Text variant={'labelLarge'} style={styles.forgetPassword}>
            {i18n.t('AUTH_LOGIN_FORGOT_PASSWORD_BUTTON')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionContainer}>
        <Button
          mode={'contained'}
          onPress={formik.handleSubmit}
          loading={isLoading}
          disabled={isLoading}>
          {i18n.t('AUTH_LOGIN_BUTTON')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginBottom: 20,
    justifyContent: 'center',
  },

  title: {
    textTransform: 'uppercase',
    color: designSystem.theme.colors.onSurfaceDisabled,
  },
  formContainer: {
    flexGrow: 1,
  },
  forgetPassword: {
    color: designSystem.theme.colors.onSurfaceDisabled,
    marginTop: 20,
  },
  actionContainer: {marginTop: 20},
});

export default LoginForm;
