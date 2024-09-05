import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useFormik} from 'formik';
import {forgetPasswordSchema} from '../../../utils/authFormHelper';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/reduxHook';
import {sendOtpEmailRequest} from '../../../models/authActions';
import {
  getForgetPasswordEmail,
  getSendOtpCodeStatus,
} from '../../../models/authSelectors';
import {STATUS} from '../../../../../types/storeTypes';
import MyTextInput from '../../../../../components/MyTextInput/MyTextInput';
import designSystem from '../../../../../utils/designSystem';
import {navigate} from '../../../../../utils/navigationHelper';
import {NAVIGATION} from '../../../../../types/navigationTypes';
import i18n from '../../../../../utils/i18n';

const ForgetPasswordForm = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(getSendOtpCodeStatus);
  const resetEmail = useAppSelector(getForgetPasswordEmail);
  const [isLoading, setIsLoading] = useState(false);

  enum FORM {
    EMAIL = 'email',
  }

  const formik = useFormik({
    initialValues: {
      email: resetEmail ?? '',
    },
    validationSchema: forgetPasswordSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: values => {
      handleOtpCode(values.email);
    },
  });

  useEffect(() => {
    setIsLoading(status === STATUS.LOADING);
    if (status === STATUS.SUCCESS) {
      goToResetPassword();
    }
  }, [status]);

  const goToResetPassword = () => {
    navigate({
      screen: NAVIGATION.RESET_PASSWORD_SCREEN,
    });
  };

  const handleOtpCode = async (email: string) => {
    dispatch(sendOtpEmailRequest(email));
  };

  const getOutlineColor = useCallback((error?: string) => {
    return error ? designSystem.theme.colors.error : undefined;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title} variant={'titleMedium'}>
          {i18n.t('AUTH_FORGET_PASSWORD_TITLE')}
        </Text>
      </View>
      <View style={styles.formContainer}>
        <MyTextInput
          title={i18n.t('AUTH_LOGIN_EMAIL_TITLE')}
          placeholder={i18n.t('AUTH_LOGIN_EMAIL_PLACEHOLDER')}
          onChangeText={formik.handleChange(FORM.EMAIL)}
          onBlur={formik.handleBlur(FORM.EMAIL)}
          value={formik.values.email}
          outlineColor={getOutlineColor(formik.errors.email)}
          error={formik.errors.email}
        />
      </View>
      <View style={styles.actionContainer}>
        <Button
          mode={'contained'}
          onPress={formik.handleSubmit}
          loading={isLoading}
          disabled={isLoading}>
          {i18n.t('AUTH_FORGET_PASSWORD_BUTTON')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    textTransform: 'uppercase',
    color: designSystem.theme.colors.onSurfaceDisabled,
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

export default ForgetPasswordForm;
