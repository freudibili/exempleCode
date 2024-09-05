import React, {memo} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {CardTrocItemOrdersType} from '../../../../TrocItem/types/TrocItemsType';
import HorizontalCardUserTrocItem from './HorizontalCardUserTrocItem/HorizontalCardUserTrocItem';

interface Props {
  items: CardTrocItemOrdersType[];
}

const HorizontalCardUserTrocItems = ({items}: Props) => {
  return (
    <FlatList
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      data={items}
      renderItem={({item}) => (
        <HorizontalCardUserTrocItem key={item.id} TrocItemOrders={item} />
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
export default memo(HorizontalCardUserTrocItems);
