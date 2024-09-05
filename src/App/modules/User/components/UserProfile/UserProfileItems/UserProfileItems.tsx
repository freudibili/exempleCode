import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {SWITCH_USER_ITEM} from '../../../types/UserType';
import UserProfileItemToggle from './UserProfileItemToggle/UserProfileItemToggle';
import UserProfileOrders from './UserProfileOrders/UserProfileOrders';
import UserProfileTrocItems from './UserProfileTrocItems/UserProfileTrocItems';

const UserProfileItems = () => {
  const [value, setValue] = useState('');

  const GetUserItems = useCallback(() => {
    if (value === SWITCH_USER_ITEM.ORDER) {
      return <UserProfileOrders />;
    }
    return <UserProfileTrocItems />;
  }, [value]);

  return (
    <View style={[styles.container]}>
      <UserProfileItemToggle getValueCallback={setValue} />
      <View style={styles.itemsContainer}>
        <GetUserItems />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsContainer: {
    flex: 1,
  },
});

export default memo(UserProfileItems);
