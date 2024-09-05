import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {useAppSelector} from '../../../../../../../hooks/reduxHook';
import {getCategories} from '../../../../../TrocItem/models/trocItemSelectors';
import {getItemTypeTitle} from '../../../../../TrocItem/utils/trocItemHelper';

interface Props {
  filterId: string;
  onCloseCallback: (filterId: string) => void;
}
const FilterChipButton = ({filterId, onCloseCallback}: Props) => {
  const fetchedCategories = useAppSelector(getCategories);

  const getTitle = useCallback(() => {
    let categoryTitle = null;
    fetchedCategories.forEach(category => {
      if (category._id === filterId) {
        categoryTitle = category.title;
      }
    });
    return categoryTitle ?? getItemTypeTitle(filterId);
  }, [fetchedCategories, filterId]);

  return (
    <View style={styles.container}>
      <Chip
        closeIcon="close"
        onClose={() => {
          onCloseCallback(filterId);
        }}>
        {getTitle()}
      </Chip>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
});

export default memo(FilterChipButton);
