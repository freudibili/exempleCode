import React from 'react';
import {StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import designSystem from '../../../utils/designSystem';

interface Props {
  onPressCallback: (value: string) => void;
}

const MoreButton = ({onPressCallback}: Props) => (
  <IconButton
    style={styles.container}
    icon={() => (
      <Icon
        name={'more-horizontal'}
        size={20}
        color={designSystem.theme.colors.onSurface}
      />
    )}
    onPress={() => onPressCallback('skdsd')}
  />
);

const styles = StyleSheet.create({
  container: {},
});

export default MoreButton;
