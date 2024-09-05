import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import designSystem from '../../../utils/designSystem';
import {NAVIGATION} from '../../../types/navigationTypes';
import {navigate} from '../../../utils/navigationHelper';

interface Props {
  size: number;
}

const InfoButton = ({size}: Props) => {
  const goToInfo = () => {
    navigate({
      screen: NAVIGATION.INFO_SCREEN,
    });
  };

  return (
    <TouchableOpacity onPress={goToInfo}>
      <Icon
        name={'help-circle'}
        size={size}
        color={designSystem.theme.colors.secondary}
      />
    </TouchableOpacity>
  );
};

export default InfoButton;
