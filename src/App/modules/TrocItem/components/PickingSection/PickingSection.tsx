import React from 'react';
import CategoryIcon from '../../../../components/Pickers/CategoriesPicker/CategoryPicker/CategoryIcon';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import designSystem from '../../../../utils/designSystem';
import {TROC_ITEM_PICKING} from '../../types/TrocItemsType';
import i18n from '../../../../utils/i18n';

interface Props {
  picking: string;
}
const PickingSection = ({picking}: Props) => {
  const text =
    picking === TROC_ITEM_PICKING.ON_SITE
      ? i18n.t('TROC_ITEM_PICKING_ON_SITE')
      : i18n.t('TROC_ITEM_PICKING_FLEXIBLE');
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <CategoryIcon
          categoryId={picking}
          color={designSystem.theme.colors.primary}
        />
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
  },
  text: {marginLeft: 10},
});

export default PickingSection;
