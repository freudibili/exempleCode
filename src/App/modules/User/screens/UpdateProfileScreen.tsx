import React from 'react';
import {SafeAreaView} from 'react-native';
import designSystem from '../../../utils/designSystem';
import UpdateProfileContent from '../components/contents/UpdateProfileContent';

const UpdateProfileScreen = () => {
  return (
    <SafeAreaView style={designSystem.styles.customStyle.container}>
      <UpdateProfileContent />
    </SafeAreaView>
  );
};

export default UpdateProfileScreen;
