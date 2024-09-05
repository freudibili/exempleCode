import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import BottomRegister from '../bottoms/BottomRegister';
import RegisterForm from '../forms/LoginForms/RegisterForm';
import {Text} from 'react-native-paper';
import designSystem from '../../../../utils/designSystem';
import i18n from '../../../../utils/i18n';

const RegisterContent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title} variant={'titleMedium'}>
          {i18n.t('AUTH_REGISTER_TITLE')}
        </Text>
      </View>
      <KeyboardAvoidingView
        style={styles.bottomContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <RegisterForm />
        <BottomRegister />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  bottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 2,
  },
  titleContainer: {
    margin: 20,
  },
  title: {
    textTransform: 'uppercase',
    color: designSystem.theme.colors.onSurfaceDisabled,
  },
});

export default RegisterContent;
