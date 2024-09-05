import React from 'react';
import {SafeAreaView} from 'react-native';
import designSystem from '../../../utils/designSystem';
import TrocItemHandlerContent from '../components/contents/TrocItemContentHandler';

const TrocItemHandlerScreen = () => {
  return (
    <SafeAreaView style={designSystem.styles.customStyle.container}>
      <TrocItemHandlerContent />
    </SafeAreaView>
  );
};

export default TrocItemHandlerScreen;
