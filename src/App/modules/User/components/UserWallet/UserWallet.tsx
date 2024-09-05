import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useAppSelector} from '../../../../../hooks/reduxHook';
import Price from '../../../../components/Price/Price';
import designSystem from '../../../../utils/designSystem';
import {getUserWallet} from '../../models/user/userSelectors';
import i18n from '../../../../utils/i18n';

const UserWallet = () => {
  const wallet = useAppSelector(getUserWallet);

  return (
    <View style={styles.container}>
      <Text variant={'titleMedium'} style={styles.title}>
        {i18n.t('USER_WALLET')}
      </Text>
      <Price
        price={wallet}
        size={16}
        color={designSystem.theme.colors.onTertiaryContainer}
        textColor={designSystem.theme.colors.onTertiaryContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: designSystem.theme.colors.tertiaryContainer,
    ...designSystem.styles.customStyle.shadow,
  },
  title: {
    color: designSystem.theme.colors.onTertiaryContainer,
  },
});

export default UserWallet;
