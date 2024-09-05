import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Price from '../../../../../components/Price/Price';
import {OrderInputData} from '../../../../Order/types/OrdersType';
import {getOrderSummary} from '../../../../Order/utils/orderHelper';
import {Text} from 'react-native-paper';
import designSystem from '../../../../../utils/designSystem';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  order: OrderInputData;
}

const CardPrice = ({order}: Props) => {
  const {demandedPrice, negotiatedPrice, negotiatedTrocItems} = getOrderSummary(
    order,
    false,
  );

  const areNegotiatedTrocItems =
    negotiatedTrocItems && negotiatedTrocItems.length > 0;
  const isOrderNegociated =
    negotiatedPrice === 0
      ? true
      : Boolean(negotiatedPrice) || areNegotiatedTrocItems;

  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <Price
          size={12}
          price={demandedPrice}
          cuttedPrice={isOrderNegociated}
        />
      </View>
      {isOrderNegociated && <Text style={styles.separation}>|</Text>}
      {negotiatedPrice !== undefined && negotiatedPrice !== null && (
        <Price size={12} price={negotiatedPrice} />
      )}
      {areNegotiatedTrocItems && (
        <>
          {Boolean(negotiatedPrice) && <Text style={styles.separation}>+</Text>}
          <Icon
            name="package"
            size={12}
            color={designSystem.theme.colors.tertiary}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separation: {marginHorizontal: 5, color: designSystem.theme.colors.tertiary},
  negociateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default memo(CardPrice);
