import React from 'react';
import CategoryIcon from '../../../../components/Pickers/CategoriesPicker/CategoryPicker/CategoryIcon';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import designSystem from '../../../../utils/designSystem';
import {TROC_ITEM_QUALITY} from '../../types/TrocItemsType';
import {getItemQuality} from '../../utils/trocItemHelper';

interface Props {
  quality: TROC_ITEM_QUALITY;
}
const QualitySection = ({quality}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <CategoryIcon
          categoryId={quality}
          color={designSystem.theme.colors.primary}
        />
      </View>
      <Text style={styles.text}>{getItemQuality(quality)}</Text>
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

export default QualitySection;
