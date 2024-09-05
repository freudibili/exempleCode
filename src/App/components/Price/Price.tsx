import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import designSystem from '../../utils/designSystem';
import PriceIcon from './PriceIcon';

interface Props {
  size: number;
  color?: string;
  textColor?: string;
  price?: number;
  cuttedPrice?: boolean;
}

const Price = ({price, color, textColor, size, cuttedPrice}: Props) => {
  const containerStyle = [
    styles.priceContainer,
    cuttedPrice ? styles.cuttedPriceContainer : {},
  ];
  const iconPrimaryColor = color ?? designSystem.theme.colors.tertiaryContainer;
  const iconSecondaryColor = color ?? designSystem.theme.colors.tertiary;
  const priceColor = textColor ?? designSystem.theme.colors.onSurface;

  const priceStyle = cuttedPrice
    ? [
        {color: designSystem.theme.colors.onSurfaceDisabled, fontSize: size},
        styles.text,
        styles.cuttedPrice,
      ]
    : [{color: priceColor, fontSize: size}, styles.text];

  return (
    <View style={containerStyle}>
      <Text style={priceStyle} variant={'bodyLarge'} numberOfLines={1}>
        {price}
      </Text>
      <View style={styles.icon}>
        <PriceIcon
          size={size}
          primaryColor={
            cuttedPrice ? designSystem.theme.colors.onSurface : iconPrimaryColor
          }
          secondaryColor={
            cuttedPrice
              ? designSystem.theme.colors.onSurfaceDisabled
              : iconSecondaryColor
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cuttedPriceContainer: {
    opacity: 0.6,
  },
  text: {
    fontWeight: 'bold',
  },
  cuttedPrice: {
    textDecorationLine: 'line-through',
  },
  icon: {
    marginLeft: 2,
  },
});

export default Price;
