import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';

import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useAppSelector} from '../../../../../../../hooks/reduxHook';
import StatusLoader from '../../../../../../components/StatusLoader/StatusLoader';
import {STATUS} from '../../../../../../types/storeTypes';
import {ORDER_STATUS, OrderType} from '../../../../../Order/types/OrdersType';
import {CardOrderType} from '../../../../../TrocItem/types/TrocItemsType';
import {
  getUserOrders,
  getUserOrdersStatus,
} from '../../../../models/user/userSelectors';
import HorizontalCardUserOrderItems from '../../../userCards/HorizontalCardUserOrderItems/HorizontalCardUserOrderItems';
import UserProfileOrderStatusChipBar from './UserProfileOrderStatusChipBar/UserProfileOrderStatusChipBar';
import {OrderChipType} from '../../../../types/UserType';
import i18n from '../../../../../../utils/i18n';

const completedStatus = [
  ORDER_STATUS.REFUSED,
  ORDER_STATUS.CANCELED,
  ORDER_STATUS.COMPLETED,
];

const UserProfileOrders = () => {
  const [selectedChip, setSelectedChip] = useState<OrderChipType>('all');
  const [filteredOrders, setfilteredOrders] = useState<OrderType[]>([]);
  const userOrders = useAppSelector(getUserOrders);
  const status = useAppSelector(getUserOrdersStatus);

  const filterOrdersByStatus = (
    orders: OrderType[],
    filterStatus: 'completed' | 'all' | 'inProgress',
  ) => {
    if (filterStatus === 'all') {
      return orders;
    } else if (filterStatus === 'completed') {
      return orders.filter(order =>
        completedStatus.includes(order.status as ORDER_STATUS),
      );
    } else if (filterStatus === 'inProgress') {
      return orders.filter(
        order => !completedStatus.includes(order.status as ORDER_STATUS),
      );
    }
    return [];
  };

  const onChipClick = useCallback(
    (item: OrderChipType) => {
      setSelectedChip(item);
      const filteredItems = filterOrdersByStatus(userOrders, item);
      setfilteredOrders(filteredItems);
    },
    [userOrders],
  );

  // init
  useEffect(() => {
    onChipClick(selectedChip);
  }, [onChipClick, selectedChip]);

  // displayed loader only when the list is empty
  const updatedStatus = useMemo(() => {
    if (!userOrders?.length) {
      return status;
    }
    return STATUS.SUCCESS;
  }, [userOrders.length, status]);

  const GetItem = useCallback(() => {
    let orderTrocItems: CardOrderType[] = [];
    let archivedOrderTrocItems: CardOrderType[] = [];

    if (filteredOrders) {
      filteredOrders.forEach(order => {
        const orderItem = {...order.trocItem, order};

        if (
          order.status === ORDER_STATUS.COMPLETED ||
          order.status === ORDER_STATUS.REFUSED ||
          order.status === ORDER_STATUS.CANCELED
        ) {
          archivedOrderTrocItems.push(orderItem);
        } else {
          orderTrocItems.push(orderItem);
        }
      });
    }

    const items = [...orderTrocItems, ...archivedOrderTrocItems];

    if (items.length < 1) {
      return (
        <View style={styles.noItem}>
          <Text>{i18n.t('USER_PROFILE_NO_ORDER')}</Text>
        </View>
      );
    }
    return <HorizontalCardUserOrderItems items={items} />;
  }, [filteredOrders]);

  return (
    <View style={styles.container}>
      <View style={styles.chipContainer}>
        <UserProfileOrderStatusChipBar onChipClick={onChipClick} />
      </View>
      <StatusLoader status={updatedStatus}>
        <View style={styles.container}>
          <GetItem />
        </View>
      </StatusLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  chipContainer: {
    marginLeft: 20,
    marginTop: 20,
  },
  cardsContainer: {marginTop: 20},
  title: {marginVertical: 10},
  noItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(UserProfileOrders);
