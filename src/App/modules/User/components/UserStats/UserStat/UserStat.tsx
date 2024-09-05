import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import designSystem from '../../../../../utils/designSystem';

interface Props {
  title: string;
  value: number;
}
const UserStat = ({title, value}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} variant={'labelMedium'}>
        {title}
      </Text>
      <View style={styles.valueContainer}>
        <Text variant={'titleLarge'} style={styles.valueText}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  valueContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    color: designSystem.theme.colors.secondary,
  },
});

export default UserStat;
