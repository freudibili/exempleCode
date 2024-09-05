import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import designSystem from '../../utils/designSystem';

interface Props {
  error?: string;
}

const ValidationError = ({error}: Props) => {
  if (!error) {
    return null;
  }
  return (
    <Text variant={'bodySmall'} style={styles.text}>
      {error}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: designSystem.theme.colors.error,
  },
});

export default memo(ValidationError);
