import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useAppSelector} from '../../../../../../hooks/reduxHook';
import {getUserWallet} from '../../../models/user/userSelectors';
import Price from '../../../../../components/Price/Price';
import designSystem from '../../../../../utils/designSystem';
import Icon from 'react-native-vector-icons/Feather';
import {navigate} from '../../../../../utils/navigationHelper';
import {NAVIGATION, STACK} from '../../../../../types/navigationTypes';

const UserProfileBar = () => {
  const wallet = useAppSelector(getUserWallet);

  const goToSettings = () => {
    navigate({stack: STACK.USER_STACK, screen: NAVIGATION.SETTINGS_SCREEN});
  };

  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <Price
          price={wallet}
          size={16}
          color={designSystem.theme.colors.onTertiary}
          textColor={designSystem.theme.colors.onTertiary}
        />
      </View>
      <TouchableOpacity
        style={styles.settingIconContainer}
        onPress={goToSettings}>
        <Icon
          name={'settings'}
          size={26}
          color={designSystem.theme.colors.onBackground}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  settingIconContainer: {
    marginRight: 20,
  },
  priceContainer: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: 10,
    paddingLeft: 20,
    paddingVertical: 5,
    backgroundColor: designSystem.theme.colors.tertiaryContainer,
  },
});

export default UserProfileBar;
