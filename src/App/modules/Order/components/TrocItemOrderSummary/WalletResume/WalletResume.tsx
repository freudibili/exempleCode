import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {getOrderSummary} from '../../../utils/orderHelper';
import {OrderInputData} from '../../../types/OrdersType';
import {useSelector} from 'react-redux';
import {getUserWallet} from '../../../../User/models/user/userSelectors';
import Price from '../../../../../components/Price/Price';
import designSystem from '../../../../../utils/designSystem';
import {appColorTheme} from '../../../../../utils/colorHelper';
import i18n from '../../../../../utils/i18n';

interface Props {
  order: OrderInputData;
  isUserItem?: boolean;
}

const WalletResume = ({order, isUserItem}: Props) => {
  const {demandedPrice, negotiatedPrice} = getOrderSummary(order, isUserItem);
  const wallet = useSelector(getUserWallet);

  const exchangedPrice =
    negotiatedPrice === 0 ? 0 : negotiatedPrice || demandedPrice;
  const exchangedPriceColor =
    exchangedPrice >= 0 ? appColorTheme.positive : appColorTheme.negative;

  const updatedWallet = exchangedPrice * 1 + wallet;

  return (
    <View style={styles.container}>
      {Boolean(exchangedPrice) && (
        <>
          <View style={styles.detailsContainer}>
            <Text variant={'labelLarge'} style={styles.text}>
              {i18n.t('ORDER_WALLET')}
            </Text>
            <Price
              price={wallet}
              size={14}
              textColor={designSystem.theme.colors.onSurfaceDisabled}
            />
          </View>
          <Divider />
          <View style={styles.detailsContainer}>
            <Text variant={'labelLarge'} style={styles.text}>
              {i18n.t('ORDER_AMOUNT_EXCHANGE')}
            </Text>
            <Price
              price={exchangedPrice}
              size={14}
              textColor={exchangedPriceColor}
              color={exchangedPriceColor}
            />
          </View>
          <Divider />
        </>
      )}

      <View style={styles.detailsContainer}>
        <Text variant={'labelLarge'} style={styles.totalText}>
          {i18n.t('ORDER_UPDATED_WALLET')}
        </Text>
        <Price price={updatedWallet} size={16} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginVertical: 10,
  },
  text: {color: designSystem.theme.colors.onSurfaceDisabled, marginVertical: 5},
  totalText: {color: designSystem.theme.colors.onSurface, marginVertical: 5},
});

export default WalletResume;
