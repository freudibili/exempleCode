import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import designSystem from '../../../../../utils/designSystem';
import {CapitalizeFirstLetter} from '../../../../../utils/textHelper';
import {getItemTypeStyle} from '../../../utils/trocItemHelper';

interface Props {
  trocTypeId: string;
  categoryTypeId: string;
  short?: boolean;
}
const TrocItemTypeIconTitle = ({trocTypeId, categoryTypeId, short}: Props) => {
  const itemTypeStyle = getItemTypeStyle(trocTypeId, categoryTypeId);
  const splittedTitle = itemTypeStyle.title.split(' ');

  const title = short ? splittedTitle[0] : itemTypeStyle.title;
  return (
    <View style={styles.container}>
      <View
        style={[styles.icon, {backgroundColor: itemTypeStyle.backgroundColor}]}>
        <Icon name={itemTypeStyle.icon} size={15} color={itemTypeStyle.color} />
      </View>
      <View style={styles.text}>
        <Text
          variant={'labelLarge'}
          style={{color: designSystem.theme.colors.onSurface}}>
          {CapitalizeFirstLetter(title)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  icon: {
    padding: 5,

    borderRadius: 8,
  },
  text: {
    marginLeft: 10,
  },
});

export default memo(TrocItemTypeIconTitle);
