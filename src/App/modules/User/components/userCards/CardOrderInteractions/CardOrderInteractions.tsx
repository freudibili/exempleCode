import React, {memo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {OrderType} from '../../../../Order/types/OrdersType';
import CardOrderInteraction from './CardOrderInteraction/CardOrderInteraction';

interface Props {
  orders: OrderType[];
}

const CardOrderInteractions = ({orders}: Props) => {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={orders}
      renderItem={({item}) => <CardOrderInteraction order={item} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default memo(CardOrderInteractions);
