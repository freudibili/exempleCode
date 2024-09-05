import React, {memo, useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {NAVIGATION} from '../../../../../../types/navigationTypes';
import {getTimeAgo} from '../../../../../../utils/dateHelper';
import designSystem from '../../../../../../utils/designSystem';
import {navigate} from '../../../../../../utils/navigationHelper';
import {
  CardTrocItemOrdersType,
  TROC_ITEM_STATUS,
} from '../../../../../TrocItem/types/TrocItemsType';
import CardOrderInteractions from '../../CardOrderInteractions/CardOrderInteractions';
import CardMenuAction from '../../CardMenuAction/CardMenuAction';
import {CapitalizeFirstLetter} from '../../../../../../utils/textHelper';
import TrocItemImage from '../../../../../TrocItem/components/TrocItemImage/TrocItemImage';
import Price from '../../../../../../components/Price/Price';

interface Props {
  TrocItemOrders: CardTrocItemOrdersType;
}

const HorizontalCardUserTrocItem = ({TrocItemOrders}: Props) => {
  const {
    id,
    title,
    imagesUrl,
    orders,
    price,
    createdAt,
    trocTypeId,
    categoryTypeId,
    status,
  } = TrocItemOrders;

  const timeAgo = useMemo(() => {
    return createdAt ? getTimeAgo(createdAt) : '';
  }, [createdAt]);

  const openUpdateProductModal = useCallback(() => {
    const params = {
      id,
    };
    navigate({screen: NAVIGATION.TROC_ITEM_UPDATE_PRODUCT_SCREEN, params});
  }, [id]);

  const openMenu = useCallback(() => {
    navigate({
      screen: NAVIGATION.USER_TROC_ITEM_ACTIONS_MODAL,
      params: {id, status},
    });
  }, [id, status]);

  const completed = status === TROC_ITEM_STATUS.COMPLETED;

  const completedContainerStyle = completed
    ? styles.completedContainer
    : styles.container;

  return (
    <View style={completedContainerStyle}>
      <TouchableOpacity
        onPress={openUpdateProductModal}
        style={styles.infoContainer}
        disabled={completed}>
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
            <Price size={12} price={price} />
            <Text
              style={styles.subtitle}
              variant={'bodySmall'}
              numberOfLines={2}>
              {timeAgo}
            </Text>
          </View>
        </View>
        <CardMenuAction onPress={openMenu} />
      </TouchableOpacity>
      <CardOrderInteractions orders={orders} />
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
  completedContainer: {
    flex: 1,
    borderRadius: 8,
    marginHorizontal: 20,
    backgroundColor: designSystem.theme.colors.surfaceDisabled,
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

export default memo(HorizontalCardUserTrocItem);
