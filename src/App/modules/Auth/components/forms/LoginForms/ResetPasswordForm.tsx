import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useFormik} from 'formik';
import {resetPasswordSchema} from '../../../utils/authFormHelper';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/reduxHook';
import {
  getForgetPasswordEmail,
  getResetPasswordStatus,
} from '../../../models/authSelectors';
import {STATUS} from '../../../../../types/storeTypes';
import MyTextInput from '../../../../../components/MyTextInput/MyTextInput';
import designSystem from '../../../../../utils/designSystem';
import {navigate} from '../../../../../utils/navigationHelper';
import {NAVIGATION, STACK} from '../../../../../types/navigationTypes';
import {
  resetPasswordRequest,
  sendOtpEmailRequest,
} from '../../../models/authActions';
import {UserResetPasswordOutputData} from '../../../../User/types/UserType';
import i18n from '../../../../../utils/i18n';

const ResetPasswordForm = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(getResetPasswordStatus);
  const email = useAppSelector(getForgetPasswordEmail);
  const [isLoading, setIsLoading] = useState(false);

  enum FORM {
    CODE = 'code',
    NEW_PASSWORD = 'newPassword',
  }

  const formik = useFormik({
    initialValues: {
      code: '',
      newPassword: '',
    },
    validationSchema: resetPasswordSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: values => {
      handleResetPassword({
        email,
        newPassword: values.newPassword,
        code: Number(values.code),
      });
    },
  });

  useEffect(() => {
    setIsLoading(status === STATUS.LOADING);
    if (status === STATUS.SUCCESS) {
      goToLogin();
    }
  }, [status]);

  const goToLogin = () => {
    navigate({
      stack: STACK.AUTH_STACK,
      screen: NAVIGATION.LOGIN_SCREEN,
    });
  };

  const handleResetPassword = async (
    userCredentials: UserResetPasswordOutputData,
  ) => {
    dispatch(resetPasswordRequest(userCredentials));
  };

  const handleSendAnotherCode = async () => {
    dispatch(sendOtpEmailRequest(email));
  };

  const getOutlineColor = useCallback((error?: string) => {
    return error ? designSystem.theme.colors.error : undefined;
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} variant={'titleMedium'}>
            {i18n.t('AUTH_RESET_PASSWORD_FORM_TITLE')}
          </Text>
        </View>
        <View>
          <Text style={styles.currentEmail}>{email}</Text>
        </View>
        <View style={styles.formContainer}>
          <MyTextInput
            title={i18n.t('AUTH_RESET_PASSWORD_OTP_CODE_TITLE')}
            placeholder={i18n.t('AUTH_RESET_PASSWORD_OTP_CODE_PLACEHOLDER')}
            onChangeText={formik.handleChange(FORM.CODE)}
            onBlur={formik.handleBlur(FORM.CODE)}
            value={formik.values.code}
            outlineColor={getOutlineColor(formik.errors.code)}
            error={formik.errors.code}
          />
        </View>
        <View style={styles.formContainer}>
          <MyTextInput
            title={i18n.t('AUTH_RESET_PASSWORD_NEW_PASSWORD_TITLE')}
            placeholder={i18n.t('AUTH_RESET_PASSWORD_NEW_PASSWORD_PLACEHOLDER')}
            onChangeText={formik.handleChange(FORM.NEW_PASSWORD)}
            onBlur={formik.handleBlur(FORM.NEW_PASSWORD)}
            value={formik.values.newPassword}
            outlineColor={getOutlineColor(formik.errors.newPassword)}
            error={formik.errors.newPassword}
          />
        </View>
        <TouchableOpacity onPress={handleSendAnotherCode}>
          <Text variant={'bodySmall'} style={styles.forgetPassword}>
            {i18n.t('AUTH_RESET_PASSWORD_SEND_AGAIN_BUTTON')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionContainer}>
        <Button
          mode={'contained'}
          onPress={formik.handleSubmit}
          loading={isLoading}
          disabled={isLoading}>
          {i18n.t('AUTH_RESET_PASSWORD_BUTTON')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    textTransform: 'uppercase',
    color: designSystem.theme.colors.onSurfaceDisabled,
  },
  currentEmail: {
    paddingBottom: 40,
    fontWeight: 'bold',
    color: designSystem.theme.colors.secondary,
  },
  formContainer: {
    flexGrow: 1,
  },
  inputError: {
    borderColor: designSystem.theme.colors.error,
    borderBottomWidth: 1,
  },
  forgetPassword: {
    color: designSystem.theme.colors.onSurfaceDisabled,
    marginTop: 20,
  },
  actionContainer: {marginTop: 20},
});

export default ResetPasswordForm;
