import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import LoginForm from '../forms/LoginForms/LoginForm';
import BottomLogin from '../bottoms/BottomLogin';
import HeaderLogin from '../headers/HeaderLogin';

const LoginContent = () => {
  return (
    <View style={styles.container}>
      <HeaderLogin />
      <KeyboardAvoidingView
        style={styles.bottomContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <LoginForm />
        <BottomLogin />
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
});

export default LoginContent;
