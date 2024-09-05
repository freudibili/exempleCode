import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import designSystem from '../../../utils/designSystem';

interface Props {
  width: number;
  height: number;
  disabled?: boolean;
}

const EmptyAvatar = ({width, height, disabled}: Props) => {
  return (
    <View
      style={[
        {
          width,
          height,
          backgroundColor: disabled
            ? designSystem.theme.colors.surfaceDisabled
            : designSystem.theme.colors.secondary,
        },
        styles.container,
      ]}>
      <Icon
        name="user"
        size={width * 0.7}
        color={
          disabled
            ? designSystem.theme.colors.onSurfaceDisabled
            : designSystem.theme.colors.secondaryContainer
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 8,
  },
});
export default EmptyAvatar;
