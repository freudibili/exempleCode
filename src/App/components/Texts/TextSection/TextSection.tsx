import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import designSystem from '../../../utils/designSystem';
import {CapitalizeFirstLetter} from '../../../utils/textHelper';

interface Props {
  title: string;
  subtitle: string;
  style?: ViewStyle;
  divider?: boolean;
}
const TextSection = ({title, subtitle, style, divider}: Props) => (
  <View style={style}>
    <View style={divider ? styles.container : styles.containerVariant}>
      <Text variant={'titleMedium'}>{CapitalizeFirstLetter(title)}</Text>
      <Text
        variant={'bodyLarge'}
        style={designSystem.styles.customStyle.contentSubtitle}>
        {subtitle}
      </Text>
    </View>
    {divider && <Divider />}
  </View>
);

const styles = StyleSheet.create({
  container: {marginVertical: 10},
  containerVariant: {marginTop: 10},
});

export default TextSection;
