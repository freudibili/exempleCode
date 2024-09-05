import React from 'react';
import {IconButton} from 'react-native-paper';

interface Props {
  onPress: () => void;
}
const CardMenuAction = ({onPress}: Props) => {
  return <IconButton icon="dots-vertical" onPress={onPress} />;
};

export default CardMenuAction;
