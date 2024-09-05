import React from 'react';
import {SafeAreaView} from 'react-native';

import designSystem from '../../../utils/designSystem';
import ExploreFilterContent from '../components/contents/ExploreFilterContent';

const ExploreFilterScreen = () => {
  return (
    <SafeAreaView style={designSystem.styles.customStyle.container}>
      <ExploreFilterContent />
    </SafeAreaView>
  );
};

export default ExploreFilterScreen;
