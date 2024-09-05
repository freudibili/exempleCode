import React from 'react';
import CategoryIcon from '../../../../components/Pickers/CategoriesPicker/CategoryPicker/CategoryIcon';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import designSystem from '../../../../utils/designSystem';
import {TROC_ITEM_CONDITION} from '../../types/TrocItemsType';
import {getItemCondition} from '../../utils/trocItemHelper';

interface Props {
  condition: TROC_ITEM_CONDITION;
}
const ConditionSection = ({condition}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <CategoryIcon
          categoryId={condition}
          color={designSystem.theme.colors.primary}
        />
      </View>
      <Text style={styles.text}>{getItemCondition(condition)}</Text>
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

export default ConditionSection;
