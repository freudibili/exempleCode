import React from 'react';
import {SafeAreaView} from 'react-native';
import designSystem from '../../../utils/designSystem';
import ContactUsContent from '../components/contents/ContactUsContent';

const ContactUsScreen = () => {
  return (
    <SafeAreaView style={designSystem.styles.customStyle.container}>
      <ContactUsContent />
    </SafeAreaView>
  );
};

export default ContactUsScreen;
