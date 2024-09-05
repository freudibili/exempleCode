import React, {memo, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {getTimeAgo} from '../../../../utils/dateHelper';
import designSystem from '../../../../utils/designSystem';
import Price from '../../../../components/Price/Price';
import {CapitalizeFirstLetter} from '../../../../utils/textHelper';

interface Props {
  title: string;
  price: number;
  createdAt?: string;
}
const TrocItemTitleSection = ({title, price, createdAt}: Props) => {
  const timeAgo = useMemo(() => {
    return createdAt ? getTimeAgo(createdAt) : '';
  }, [createdAt]);

  return (
    <View>
      <Text variant={'titleLarge'}>{CapitalizeFirstLetter(title)}</Text>
      <View style={styles.infoContainer}>
        <Text
          variant={'bodyMedium'}
          style={[
            styles.subtitle,
            designSystem.styles.customStyle.contentSubtitle,
          ]}>
          {timeAgo}
        </Text>
        <Price price={price} size={18} />
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {marginVertical: 10},
  subtitle: {
    marginBottom: 10,
  },
});

export default memo(TrocItemTitleSection);
