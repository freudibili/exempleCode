import React from 'react';
import {SafeAreaView} from 'react-native';
import designSystem from '../../../utils/designSystem';
import SettingsContent from '../components/contents/SettingsContent';

const SettingsScreen = () => {
  return (
    <SafeAreaView style={designSystem.styles.customStyle.container}>
      <SettingsContent />
    </SafeAreaView>
  );
};

export default SettingsScreen;
