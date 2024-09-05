import React, {memo} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getItemTypeStyle} from '../../../utils/trocItemHelper';

interface Props {
  trocTypeId: string;
  categoryTypeId: string;
  size?: number;
}
const TrocItemTypeIcon = ({trocTypeId, categoryTypeId, size}: Props) => {
  const itemTypeStyle = getItemTypeStyle(trocTypeId, categoryTypeId);
  return (
    <Icon
      name={itemTypeStyle.icon}
      size={size || 22}
      color={itemTypeStyle.color}
    />
  );
};

export default memo(TrocItemTypeIcon);
