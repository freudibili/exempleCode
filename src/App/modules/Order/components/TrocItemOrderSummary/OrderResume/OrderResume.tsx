import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import NegociateTrocItemCardItems from '../NegociateTrocItemCardItems/NegociateTrocItemCardItems';
import OrderPrice from '../OrderPrice/OrderPrice';
import {getOrderSummary} from '../../../utils/orderHelper';
import {OrderInputData} from '../../../types/OrdersType';
import TrocItemCardItem from '../TrocItemCardItem/TrocItemCardItem';
import Icon from 'react-native-vector-icons/Feather';
import {Divider} from 'react-native-paper';
import designSystem from '../../../../../utils/designSystem';

interface Props {
  order: OrderInputData;
  isUserItem?: boolean;
  size: number;
  canInteract?: boolean;
}

const OrderResume = ({order, size, isUserItem, canInteract}: Props) => {
  const {demandedPrice, negotiatedPrice, negotiatedTrocItems} = getOrderSummary(
    order,
    isUserItem,
  );

  if (!order.trocItem) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TrocItemCardItem
        trocItem={order.trocItem}
        size={size}
        canInteract={canInteract}
      />
      <View style={styles.middleContainer}>
        <Divider bold style={styles.divider} />
        <View style={styles.iconContainer}>
          <Icon
            size={22}
            name={'repeat'}
            color={designSystem.theme.colors.onTertiary}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.priceContainer}>
            <OrderPrice
              size={size}
              price={demandedPrice}
              negociatePrice={negotiatedPrice}
            />
          </View>

          {negotiatedTrocItems && (
            <NegociateTrocItemCardItems
              trocItems={negotiatedTrocItems}
              size={size}
              canInteract={canInteract}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: designSystem.theme.colors.surfaceVariant,
  },
  bottomContainer: {
    alignItems: 'flex-start',
  },
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    flex: 1,
    height: 2,
    backgroundColor: designSystem.theme.colors.tertiary,
    marginVertical: 40,
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    backgroundColor: designSystem.theme.colors.tertiary, // Background color to cover the divider
    padding: 10, // Adjust as needed
    borderRadius: 100,
    transform: [{rotate: '270deg'}],
  },
  contentContainer: {
    flexDirection: 'row',
  },
  priceContainer: {
    marginRight: 10,
  },
});

export default memo(OrderResume);
