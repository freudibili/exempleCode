import React from 'react';
import {goBack} from '../../../utils/navigationHelper';
import Icon from 'react-native-vector-icons/Feather';
import {StyleSheet, TouchableOpacity} from 'react-native';
import designSystem from '../../../utils/designSystem';

interface Props {
  onPress?: () => void;
}

const CloseButton = ({onPress}: Props) => (
  <TouchableOpacity onPress={onPress ?? goBack} style={styles.container}>
    <Icon name="x" size={20} color={designSystem.theme.colors.surfaceVariant} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    right: 15,
    backgroundColor: designSystem.theme.colors.onSurfaceVariant,
    padding: 3,
    borderRadius: 25,
  },
});
export default CloseButton;
