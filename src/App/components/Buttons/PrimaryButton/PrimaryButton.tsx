import React from 'react';
import {ViewStyle} from 'react-native';
import {Button} from 'react-native-paper';

interface Props {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}
const PrimaryButton = ({label, onPress, style}: Props) => (
  <Button mode={'contained'} style={style} onPress={onPress}>
    {label}
  </Button>
);

export default PrimaryButton;
