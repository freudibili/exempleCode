import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import designSystem from '../../../../utils/designSystem';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  text: string;
  marginVertical?: number;
}
const InfoSection = ({text, marginVertical}: Props) => (
  <View style={[{marginVertical}, styles.container]}>
    <Icon name={'info'} size={20} color={designSystem.theme.colors.primary} />
    <Text style={styles.text} numberOfLines={2} variant={'bodyMedium'}>
      {text}
    </Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 2,
  },
  text: {
    flex: 1,
    marginLeft: 5,
    color: designSystem.theme.colors.onSurfaceDisabled,
  },
});

export default InfoSection;
