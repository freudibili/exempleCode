import React, {useState, memo, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useFormik} from 'formik';
import {updateProfileSchema} from '../../utils/userFormHelper';
import {
  UserInformationUpdateFormType,
  UserInputData,
} from '../../types/UserType';
import {useAppSelector} from '../../../../../hooks/reduxHook';
import {getUserStatus} from '../../models/user/userSelectors';
import {STATUS} from '../../../../types/storeTypes';
import {goBack} from '../../../../utils/navigationHelper';
import TitleForm from '../../../../components/Texts/TitleForm/TitleForm';
import MyTextInput from '../../../../components/MyTextInput/MyTextInput';
import designSystem from '../../../../utils/designSystem';
import i18n from '../../../../utils/i18n';

interface Props {
  user: UserInputData;
  updateCallback: (values: UserInformationUpdateFormType) => void;
}
const UpdateProfileForm = ({user, updateCallback}: Props) => {
  const status = useAppSelector(getUserStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);

  enum FORM {
    NAME = 'name',
    BASELINE = 'baseline',
    EMAIL = 'email',
  }

  useEffect(() => {
    setIsLoading(status === STATUS.LOADING);
    if (status === STATUS.SUCCESS && isSend) {
      goBack();
    }
  }, [isSend, status]);

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      baseline: user.baseline,
    },
    validationSchema: updateProfileSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: values => {
      updateCallback(values);
      setIsSend(true);
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <MyTextInput
          title={i18n.t('USER_EDIT_PROFILE_NAME')}
          placeholder={FORM.NAME}
          onChangeText={formik.handleChange(FORM.NAME)}
          onBlur={formik.handleBlur(FORM.NAME)}
          value={formik.values.name}
          error={formik.errors.name}
        />

        <MyTextInput
          title={i18n.t('USER_EDIT_PROFILE_BASELINE')}
          placeholder={''}
          onChangeText={formik.handleChange(FORM.BASELINE)}
          onBlur={formik.handleBlur(FORM.BASELINE)}
          value={formik.values.baseline || ''}
        />

        <TitleForm title={i18n.t('USER_EDIT_PROFILE_EMAIL')} />
        <Text style={styles.email} variant={'labelLarge'}>
          {formik.values.email}
        </Text>
      </View>

      <Button
        mode={'contained'}
        onPress={formik.handleSubmit}
        loading={isLoading}
        disabled={isLoading}
        style={styles.button}>
        {i18n.t('USER_EDIT_UPDATE_BUTTON')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  contentContainer: {flex: 1},
  input: {
    marginBottom: 15,
  },
  inputError: {
    borderColor: designSystem.theme.colors.error,
    borderBottomWidth: 1,
  },
  baselineContainer: {maxHeight: '50%'},
  email: {marginTop: 10, color: designSystem.theme.colors.secondary},
  button: {marginBottom: 20},
});

export default memo(UpdateProfileForm);
