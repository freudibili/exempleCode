import React, {ReactElement} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import designSystem from '../../../../utils/designSystem';

interface Props {
  title: string;
  subtitle?: string;
  rightButton?: ReactElement;
}

const TrocItemFormHeader = ({title, subtitle, rightButton}: Props) => {
  return (
    <View style={styles.container}>
      <Text variant={'headlineMedium'} style={styles.headline}>
        {title}
      </Text>
      {subtitle && (
        <Text variant={'bodyMedium'} style={styles.subtitle}>
          {subtitle}
        </Text>
      )}
      {rightButton && (
        <View style={styles.rightButtonContainer}>{rightButton}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginBottom: 40},
  headline: {
    marginRight: 40,
  },
  subtitle: {marginTop: 5, color: designSystem.theme.colors.onSurfaceVariant},
  rightButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
export default TrocItemFormHeader;
