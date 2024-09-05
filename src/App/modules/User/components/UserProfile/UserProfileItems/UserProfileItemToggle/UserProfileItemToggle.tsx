import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SegmentedController from '../../../../../../components/Pickers/SegmentedController/SegmentedController';
import {SWITCH_USER_ITEM} from '../../../../types/UserType';
import i18n from '../../../../../../utils/i18n';

interface Props {
  getValueCallback: (value: string) => void;
}
const UserProfileItemToggle = ({getValueCallback}: Props) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(SWITCH_USER_ITEM.TROC_ITEM_ORDERS);
  }, []);

  useEffect(() => {
    getValueCallback(value);
  }, [getValueCallback, value]);

  const items = [
    {
      value: SWITCH_USER_ITEM.TROC_ITEM_ORDERS,
      label: i18n.t('USER_PROFILE_TROC_ITEMS_TITLE'),
    },
    {
      value: SWITCH_USER_ITEM.ORDER,
      label: i18n.t('USER_PROFILE_ORDERS_TITLE'),
    },
  ];

  return (
    <View style={styles.container}>
      <SegmentedController
        items={items}
        getDataCallback={setValue}
        initValue={SWITCH_USER_ITEM.TROC_ITEM_ORDERS}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  button: {
    width: '50%',
  },
});
export default memo(UserProfileItemToggle);
