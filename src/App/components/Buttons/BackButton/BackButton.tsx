import React from 'react';
import {goBack} from '../../../utils/navigationHelper';
import Icon from 'react-native-vector-icons/Feather';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import designSystem from '../../../utils/designSystem';

const BackButton = () => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    <Icon
      name="arrow-left"
      size={20}
      color={designSystem.theme.colors.onSurface}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: designSystem.theme.colors.surface,
    ...designSystem.styles.customStyle.shadow,
    borderRadius: 25,
    padding: 7,
    marginRight: Platform.OS === 'android' ? 15 : 0,
  },
});
export default BackButton;
