import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../../../../hooks/reduxHook';
import {ORDER_STATUS} from '../../../Order/types/OrdersType';
import {getUserOrders, getUserTrocItems} from '../../models/user/userSelectors';
import designSystem from '../../../../utils/designSystem';
import UserWallet from '../UserWallet/UserWallet';
import UserStat from './UserStat/UserStat';
import i18n from '../../../../utils/i18n';

const UserStats = () => {
  const userOrders = useAppSelector(getUserOrders);
  const userTrocItems = useAppSelector(getUserTrocItems);

  const completedOrders = useMemo(() => {
    const orders = userOrders.filter(
      order => order.status === ORDER_STATUS.COMPLETED,
    );
    return orders?.length || 0;
  }, [userOrders]);

  const completedTrocItems = useMemo(() => {
    let numberOfItem = 0;

    userTrocItems.forEach(trocItem =>
      trocItem.orders.forEach(order => {
        if (order.status === ORDER_STATUS.COMPLETED) {
          numberOfItem += 1;
        }
      }),
    );
    return numberOfItem;
  }, [userTrocItems]);

  return (
    <View style={styles.container}>
      <UserWallet />
      <View style={styles.textContainer}>
        <UserStat
          title={i18n.t('USER_PROFILE_STAT_TROC_ITEM_TITLE')}
          value={completedTrocItems}
        />
        <UserStat
          title={i18n.t('USER_PROFILE_STAT_ORDER_TITLE')}
          value={completedOrders}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: designSystem.theme.colors.tertiary,
  },
});
export default UserStats;
