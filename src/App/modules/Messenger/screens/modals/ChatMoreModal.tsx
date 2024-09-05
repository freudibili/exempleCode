import React, {useCallback} from 'react';
import BottomSheet from '../../../../components/BottomSheet/BottomSheet';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import designSystem from '../../../../utils/designSystem';
import {useAppDispatch, useAppSelector} from '../../../../../hooks/reduxHook';
import {getMessageOtherUser} from '../../models/messengerSelectors';
import {blockUserRequest} from '../../models/messengerActions';
import {useBottomSheet} from '../../../../utils/BottomSheetContext';
import i18n from '../../../../utils/i18n';

const ChatMoreModal = () => {
  const {closeBottomSheet} = useBottomSheet();
  const otherUser = useAppSelector(getMessageOtherUser);
  const dispatch = useAppDispatch();

  const handleReport = useCallback(() => {
    dispatch(blockUserRequest(otherUser._id));
    closeBottomSheet();
  }, [closeBottomSheet, dispatch, otherUser._id]);

  const showAlert = () =>
    Alert.alert(
      `${i18n.t('MESSENGER_CHAT_BLOCK_USER')} ${otherUser.name}`,
      i18n.t('MESSENGER_CHAT_BLOCK_USER_DESCRIPTION'),
      [
        {
          text: i18n.t('GENERAL_CANCEL_BUTTON'),
          onPress: () => closeBottomSheet(),
          style: 'cancel',
        },
        {
          text: i18n.t('MESSENGER_CHAT_BLOCK_USER_BUTTON'),
          onPress: () => handleReport(),
        },
      ],
    );

  return (
    <BottomSheet>
      <TouchableOpacity style={styles.container} onPress={showAlert}>
        <Icon
          name="slash"
          size={20}
          style={styles.icon}
          color={designSystem.theme.colors.onSurface}
        />
        <Text>{i18n.t('MESSENGER_CHAT_BLOCK_USER')}</Text>
      </TouchableOpacity>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
});
export default ChatMoreModal;
