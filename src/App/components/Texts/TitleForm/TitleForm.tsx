import React from 'react';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';
import {Text} from 'react-native-paper';
import designSystem from '../../../utils/designSystem';

interface Props {
  title: string;
  style?: StyleProp<TextStyle>;
}
const TitleForm = ({title, style}: Props) => (
  <Text style={[styles.title, style]} variant={'titleMedium'}>
    {title.toUpperCase()}
  </Text>
);

const styles = StyleSheet.create({
  title: {color: designSystem.theme.colors.onSurfaceVariant, marginTop: 10},
});

export default TitleForm;
