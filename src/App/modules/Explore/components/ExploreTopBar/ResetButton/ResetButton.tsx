import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {IconButton} from 'react-native-paper';
import designSystem from '../../../../../utils/designSystem';

const ResetButton = () => (
  <IconButton
    mode="contained"
    style={styles.button}
    size={15}
    icon={() => (
      <Icon
        name={'refresh-cw'}
        size={15}
        color={designSystem.theme.colors.onBackground}
      />
    )}
    onPress={() => {}}
  />
);

export default ResetButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: designSystem.theme.colors.secondaryContainer,
    marginRight: 10,
    borderRadius: 25,
    padding: 0,
    margin: 0,
  },
});
