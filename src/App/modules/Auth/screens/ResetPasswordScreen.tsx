import React from 'react';
import {SafeAreaView, View} from 'react-native';
import designSystem from '../../../utils/designSystem';

import ResetPasswordForm from '../components/forms/LoginForms/ResetPasswordForm';

const ResetPasswordScreen = () => {
  return (
    <SafeAreaView style={designSystem.styles.customStyle.container}>
      <View style={designSystem.styles.customStyle.contentContainer}>
        <ResetPasswordForm />
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
