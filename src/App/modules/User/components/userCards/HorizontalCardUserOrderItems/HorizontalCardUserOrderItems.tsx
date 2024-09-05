import React, {memo} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {CardOrderType} from '../../../../TrocItem/types/TrocItemsType';
import HorizontalUserOrderCardItem from './HorizontalUserOrderCardItem/HorizontalUserOrderCardItem';

interface Props {
  items: CardOrderType[];
}

const HorizontalCardUserOrderItems = ({items}: Props) => {
  return (
    <FlatList
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      data={items}
      renderItem={({item}) => (
        <HorizontalUserOrderCardItem key={item.id} orderedTrocItem={item} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    paddingVertical: 20,
  },
  column: {justifyContent: 'space-between'},
  separator: {
    height: 15,
  },
});
export default memo(HorizontalCardUserOrderItems);
