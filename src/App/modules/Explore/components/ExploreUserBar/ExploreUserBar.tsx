import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useAppSelector} from '../../../../../hooks/reduxHook';
import Price from '../../../../components/Price/Price';
import designSystem from '../../../../utils/designSystem';
import {getUserWallet} from '../../../User/models/user/userSelectors';
import {navigate} from '../../../../utils/navigationHelper';
import {NAVIGATION} from '../../../../types/navigationTypes';
import InfoButton from '../../../../components/Buttons/InfoButton/infoButton';

const ExploreUserBar = () => {
  const wallet = useAppSelector(getUserWallet);

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
      <View style={styles.rightContainer}>
        {/* <TouchableOpacity onPress={openRating}>
          <Icon
            name="search"
            size={24}
            color={designSystem.theme.colors.onSurfaceVariant}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.notificationIconContainer}
          onPress={() =>
            navigate({
              screen: NAVIGATION.INFO_SCREEN,
            })
          }>
          <InfoButton size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  priceContainer: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: 10,
    paddingLeft: 20,
    paddingVertical: 5,
    backgroundColor: designSystem.theme.colors.tertiaryContainer,
  },
  rightContainer: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIconContainer: {
    marginLeft: 10,
  },
});

export default ExploreUserBar;
