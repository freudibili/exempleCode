import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SegmentedController from '../../../../components/Pickers/SegmentedController/SegmentedController';
import {SWITCH_CHAT_ITEM} from '../../types/messengerTypes';
import i18n from '../../../../utils/i18n';

interface Props {
  getValueCallback: (value: string) => void;
}
const ChatToggle = ({getValueCallback}: Props) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    getValueCallback(value);
  }, [getValueCallback, value]);

  const items = [
    {value: SWITCH_CHAT_ITEM.ORDER, label: i18n.t('MESSENGER_CHAT_ORDER')},

    {
      value: SWITCH_CHAT_ITEM.CHAT,
      label: i18n.t('MESSENGER_CHAT_MESSAGE'),
    },
  ];

  return (
    <View style={styles.container}>
      <SegmentedController
        items={items}
        getDataCallback={setValue}
        initValue={SWITCH_CHAT_ITEM.CHAT}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  group: {
    backgroundColor: 'white',
    borderRadius: 50,
  },
  button: {
    width: '50%',
  },
});
export default memo(ChatToggle);
