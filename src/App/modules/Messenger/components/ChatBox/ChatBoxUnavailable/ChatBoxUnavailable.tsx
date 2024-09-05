import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import i18n from '../../../../../utils/i18n';

const ChatBoxUnavailable = () => {
  return (
    <View style={styles.actionContainer}>
      <Text>{i18n.t('MESSENGER_CHAT_MESSAGE_USER_BLOCKED')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingBottom: 20,
  },
});

export default ChatBoxUnavailable;
