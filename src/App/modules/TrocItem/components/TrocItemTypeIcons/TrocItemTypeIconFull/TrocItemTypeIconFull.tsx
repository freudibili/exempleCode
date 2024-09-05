import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {CapitalizeFirstLetter} from '../../../../../utils/textHelper';
import {getItemTypeStyle} from '../../../utils/trocItemHelper';

interface Props {
  trocTypeId: string;
  categoryTypeId: string;
}
const TrocItemTypeIconFull = ({trocTypeId, categoryTypeId}: Props) => {
  const itemTypeStyle = getItemTypeStyle(trocTypeId, categoryTypeId);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.icon,
          {
            backgroundColor: itemTypeStyle.color,
          },
        ]}>
        <Icon name={itemTypeStyle.icon} size={14} color={'white'} />
      </View>
      <View style={styles.text}>
        <Text variant={'titleSmall'} style={{color: itemTypeStyle.color}}>
          {CapitalizeFirstLetter(itemTypeStyle.titleCreation)}
          <Text>{` ${itemTypeStyle.text}`}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 0,
    borderRadius: 20,
  },
  icon: {
    marginTop: 3,
    borderRadius: 5,
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    marginRight: 20,
  },
});

export default memo(TrocItemTypeIconFull);
