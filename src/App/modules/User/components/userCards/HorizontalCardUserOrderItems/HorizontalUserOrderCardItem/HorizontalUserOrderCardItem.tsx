import React, {memo, useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {NAVIGATION, STACK} from '../../../../../../types/navigationTypes';
import {getTimeAgo} from '../../../../../../utils/dateHelper';
import designSystem from '../../../../../../utils/designSystem';
import {navigate} from '../../../../../../utils/navigationHelper';
import {CapitalizeFirstLetter} from '../../../../../../utils/textHelper';
import {CardOrderType} from '../../../../../TrocItem/types/TrocItemsType';
import CardOrderInteraction from '../../CardOrderInteractions/CardOrderInteraction/CardOrderInteraction';
import CardPrice from '../../CardPrice/CardPrice';

import {ORDER_STATUS} from '../../../../../Order/types/OrdersType';
import TrocItemImage from '../../../../../TrocItem/components/TrocItemImage/TrocItemImage';
import CardMenuAction from '../../CardMenuAction/CardMenuAction';

interface Props {
  orderedTrocItem: CardOrderType;
}

const HorizontalUserOrderCardItem = ({orderedTrocItem}: Props) => {
  const {imagesUrl, title, order, trocTypeId, categoryTypeId} = orderedTrocItem;

  const timeAgo = useMemo(() => {
    return order?.createdAt ? getTimeAgo(order?.createdAt) : '';
  }, [order.createdAt]);

  const openUpdateProductModal = useCallback(() => {
    const params = {
      id: orderedTrocItem.id,
    };
    navigate({
      stack: STACK.TROC_ITEM_STACK,
      screen: NAVIGATION.TROC_ITEM_SCREEN,
      params,
    });
  }, [orderedTrocItem]);

  const openMenu = useCallback(() => {
    navigate({
      screen: NAVIGATION.USER_ORDER_ACTIONS_MODAL,
      params: {id: order._id},
    });
  }, [order._id]);

  const displayCancelButton = useMemo(() => {
    return !(
      order.status === ORDER_STATUS.COMPLETED ||
      order.status === ORDER_STATUS.REFUSED ||
      order.status === ORDER_STATUS.CANCELED
    );
  }, [order.status]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={openUpdateProductModal}
        style={styles.infoContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.image}>
            <TrocItemImage
              width={60}
              height={60}
              uri={imagesUrl[0]}
              borderRadius={10}
              trocTypeId={trocTypeId}
              categoryTypeId={categoryTypeId}
            />
          </View>
          <View style={styles.textContainer}>
            <Text variant={'titleMedium'} numberOfLines={1}>
              {CapitalizeFirstLetter(title)}
            </Text>
            <CardPrice order={order} />
            <Text
              style={styles.subtitle}
              variant={'bodySmall'}
              numberOfLines={1}>
              {timeAgo}
            </Text>
          </View>
        </View>
        {displayCancelButton && <CardMenuAction onPress={openMenu} />}
      </TouchableOpacity>
      <CardOrderInteraction order={order} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    marginHorizontal: 20,
    backgroundColor: designSystem.theme.colors.surface,
    ...designSystem.styles.customStyle.shadow,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
  image: {
    marginHorizontal: 10,
    width: 60,
    height: 60,
  },
  textContainer: {
    marginRight: 90,
    justifyContent: 'space-between',
  },
  subtitle: {
    color: designSystem.theme.colors.onSurfaceVariant,
  },
});

export default memo(HorizontalUserOrderCardItem);
