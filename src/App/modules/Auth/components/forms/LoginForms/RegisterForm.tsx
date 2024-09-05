import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useFormik} from 'formik';
import {createAccountSchema} from '../../../utils/authFormHelper';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/reduxHook';
import {createAccountRequest} from '../../../models/authActions';
import {UserCredentialsOutputData} from '../../../../User/types/UserType';
import {getAuthStatus} from '../../../models/authSelectors';
import {STATUS} from '../../../../../types/storeTypes';
import MyTextInput from '../../../../../components/MyTextInput/MyTextInput';
import designSystem from '../../../../../utils/designSystem';
import i18n from '../../../../../utils/i18n';

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(getAuthStatus);
  const [isLoading, setIsLoading] = useState(false);

  enum FORM {
    NAME = 'name',
    EMAIL = 'email',
    PASSWORD = 'password',
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: createAccountSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: values => {
      handleRegistration({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    },
  });

  useEffect(() => {
    setIsLoading(status === STATUS.LOADING);
  }, [status]);

  const handleRegistration = useCallback(
    async (userCredentials: UserCredentialsOutputData) => {
      dispatch(createAccountRequest(userCredentials));
    },
    [dispatch],
  );

  const getOutlineColor = useCallback((error?: string) => {
    return error ? designSystem.theme.colors.error : undefined;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <MyTextInput
          title={i18n.t('AUTH_REGISTER_NAME_TITLE')}
          placeholder={i18n.t('AUTH_REGISTER_NAME_PLACEHOLDER')}
          onChangeText={formik.handleChange(FORM.NAME)}
          onBlur={formik.handleBlur(FORM.NAME)}
          value={formik.values.name}
          outlineColor={getOutlineColor(formik.errors.name)}
          error={formik.errors.name}
        />

        <MyTextInput
          title={i18n.t('AUTH_LOGIN_EMAIL_TITLE')}
          placeholder={i18n.t('AUTH_REGISTER_EMAIL_PLACEHOLDER')}
          onChangeText={formik.handleChange(FORM.EMAIL)}
          onBlur={formik.handleBlur(FORM.EMAIL)}
          value={formik.values.email}
          outlineColor={getOutlineColor(formik.errors.email)}
          error={formik.errors.email}
        />

        <MyTextInput
          title={i18n.t('AUTH_LOGIN_PASSWORD_TITLE')}
          placeholder={i18n.t('AUTH_REGISTER_PASSWORD_PLACEHOLDER')}
          onChangeText={formik.handleChange(FORM.PASSWORD)}
          onBlur={formik.handleBlur(FORM.PASSWORD)}
          value={formik.values.password}
          outlineColor={getOutlineColor(formik.errors.password)}
          secureTextEntry
          error={formik.errors.password}
        />
      </View>
      <View style={styles.actionContainer}>
        <Button
          mode={'contained'}
          onPress={formik.handleSubmit}
          loading={isLoading}
          disabled={isLoading}>
          {i18n.t('AUTH_REGISTER_BUTTON')}
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
  actionContainer: {flexGrow: 0, marginTop: 30},
});

export default RegisterForm;
