import React from 'react';
import {View, ViewStyle} from 'react-native';
import designSystem from '../../utils/designSystem';
import PriceSvg from './icon/PriceSvg';

interface Props {
  size: number;
  style?: ViewStyle;
  primaryColor?: string;
  secondaryColor?: string;
}
const PriceIcon = ({size, style, primaryColor, secondaryColor}: Props) => (
  <View style={style}>
    <PriceSvg
      width={size}
      height={size}
      primaryColor={primaryColor || designSystem.theme.colors.tertiaryContainer}
      secondaryColor={secondaryColor || designSystem.theme.colors.tertiary}
    />
  </View>
);

export default PriceIcon;
