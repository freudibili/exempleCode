import React from 'react';
import Price from '../../../../../components/Price/Price';
import {StyleSheet, View} from 'react-native';
import designSystem from '../../../../../utils/designSystem';
import {Divider} from 'react-native-paper';
import {appColorTheme} from '../../../../../utils/colorHelper';

interface Props {
  price: number;
  negociatePrice?: number;
  size: number;
}
const OrderPrice = ({price, size, negociatePrice}: Props) => {
  const PRICE_SIZE = size / 4;

  const negociatePriceColor =
    negociatePrice === 0
      ? undefined
      : negociatePrice && negociatePrice >= 0
      ? appColorTheme.positive
      : appColorTheme.negative;

  if (negociatePrice === undefined || negociatePrice === null) {
    return (
      <View style={[styles.container, {width: size, height: size}]}>
        <Price size={PRICE_SIZE} price={price} />
      </View>
    );
  }

  return (
    <View style={[styles.negociateContainer, {height: size}]}>
      <View style={[styles.priceContainer, {width: size}]}>
        <Price
          size={PRICE_SIZE}
          price={price}
          cuttedPrice={Boolean(negociatePrice || negociatePrice === 0)}
        />
      </View>
      <Divider style={styles.divider} />
      <View style={[styles.priceContainer, {width: size}]}>
        <Price
          size={PRICE_SIZE}
          price={negociatePrice}
          color={negociatePriceColor}
          textColor={negociatePriceColor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: designSystem.theme.colors.surface,
    borderRadius: 8,
  },
  negociateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: designSystem.theme.colors.surface,
    borderRadius: 8,
  },
  priceContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    height: '100%',
  },
});

export default OrderPrice;
