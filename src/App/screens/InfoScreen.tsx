import React from 'react';
import {View, ScrollView} from 'react-native';
import designSystem from '../utils/designSystem';
import CloseButton from '../components/Buttons/CloseButton/CloseButton';
import InfoContent from '../components/contents/InfoContent';

const InfoScreen = () => {
  return (
    <View style={designSystem.styles.customStyle.containerModal}>
      <ScrollView style={designSystem.styles.customStyle.contentContainer}>
        <InfoContent />
      </ScrollView>
      <CloseButton />
    </View>
  );
};

export default InfoScreen;
