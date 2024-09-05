import React from 'react';
import {SafeAreaView, View} from 'react-native';
import designSystem from '../../../utils/designSystem';
import ForgetPasswordForm from '../components/forms/LoginForms/ForgetPasswordForm';

const ForgetPasswordScreen = () => {
  return (
    <SafeAreaView style={designSystem.styles.customStyle.container}>
      <View style={designSystem.styles.customStyle.contentContainer}>
        <ForgetPasswordForm />
      </View>
    </SafeAreaView>
  );
};

export default ForgetPasswordScreen;
