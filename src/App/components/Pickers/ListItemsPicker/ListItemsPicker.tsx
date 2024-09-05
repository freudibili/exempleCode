import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ViewStyle} from 'react-native';
import CategoryPicker from '../CategoriesPicker/CategoryPicker/CategoryPicker';

interface Props {
  items: {value: string; label: string}[];
  onPressItem: (value: string) => void;
  initValue?: string | null;
  enableNoSelection?: boolean;
  style?: ViewStyle;
  numberOfColumn?: number;
}

const ListItemsPicker = ({
  items,
  onPressItem,
  initValue,
  enableNoSelection,
  numberOfColumn = 2,
  style,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState(initValue || '');

  useEffect(() => {
    if (initValue === null) {
      setSelectedValue('');
    }
  }, [initValue]);

  useEffect(() => {
    onPressItem(selectedValue);
  }, [onPressItem, selectedValue]);

  const handleChange = useCallback(
    (newValue: string) => {
      if (enableNoSelection && selectedValue === newValue) {
        setSelectedValue('');
      } else {
        setSelectedValue(newValue);
      }
    },
    [enableNoSelection, selectedValue],
  );
  const getVerticalCategoryItem = useCallback(
    (item: {value: string; label: string}, index: number) => {
      const marginLeft = index % numberOfColumn !== 0 ? 10 : 0;
      return (
        <CategoryPicker
          key={item.value}
          categoryId={item.value}
          title={item.label}
          isSelected={item.value === selectedValue}
          onPressCallback={handleChange}
          style={{marginLeft}}
        />
      );
    },
    [numberOfColumn, selectedValue, handleChange],
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      numColumns={numberOfColumn}
      data={items}
      ItemSeparatorComponent={() => <View style={styles.horizontalSpacing} />}
      style={[style, styles.flatlistContainer]}
      renderItem={({item, index}) => getVerticalCategoryItem(item, index)}
    />
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {marginVertical: 10},
  horizontalFlatlistContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  horizontalSpacing: {marginTop: 10},
  footer: {height: 20},
});
export default ListItemsPicker;
