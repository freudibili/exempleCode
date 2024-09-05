import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getItemTypeStyle} from '../../utils/trocItemHelper';

interface Props {
  trocTypeId: string;
  categoryTypeId: string;
  width: number | string;
  height: number;
  borderRadius: number;
}
const TrocItemTypeIconTitle = ({
  trocTypeId,
  categoryTypeId,
  width,
  height,
  borderRadius,
}: Props) => {
  const itemTypeStyle = getItemTypeStyle(trocTypeId, categoryTypeId);

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          backgroundColor: itemTypeStyle.color,
          borderRadius,
        },
      ]}>
      <Icon
        name={itemTypeStyle.icon}
        size={height / 3}
        color={itemTypeStyle.backgroundColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(TrocItemTypeIconTitle);
