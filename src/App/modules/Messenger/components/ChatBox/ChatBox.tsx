import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch, useAppSelector} from '../../../../../hooks/reduxHook';
import BottomBar from '../../../../components/BottomBar/BottomBar';
import designSystem from '../../../../utils/designSystem';
import {createMessageRequest} from '../../models/messengerActions';
import {getIsUserBlocked, getMessages} from '../../models/messengerSelectors';
import {MessageOutputData} from '../../types/messengerTypes';
import ChatBoxUnavailable from './ChatBoxUnavailable/ChatBoxUnavailable';
import i18n from '../../../../utils/i18n';

interface Props {
  conversationId: string;
}

const ChatBox = ({conversationId}: Props) => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messages = useAppSelector(getMessages);
  const isUserBlocked = useAppSelector(getIsUserBlocked);

  useEffect(() => {
    setMessage('');
    setIsLoading(false);
  }, [messages]);

  const sendMessage = useCallback(() => {
    if (message.length > 1) {
      const newMessage: MessageOutputData = {
        conversationId,
        text: message,
      };

      dispatch(createMessageRequest(newMessage));
      setIsLoading(true);
    }
  }, [conversationId, dispatch, message]);

  if (isUserBlocked) {
    return (
      <BottomBar>
        <ChatBoxUnavailable />
      </BottomBar>
    );
  }

  return (
    <BottomBar>
      <View style={styles.actionContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          placeholder={i18n.t('MESSENGER_CHAT_MESSAGE_INPUT_PLACEHOLDER')}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.iconContainer} onPress={sendMessage}>
          <Icon
            name={'send'}
            size={25}
            color={
              isLoading
                ? designSystem.theme.colors.onSurfaceDisabled
                : designSystem.theme.colors.secondary
            }
          />
        </TouchableOpacity>
      </View>
    </BottomBar>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginLeft: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: designSystem.theme.colors.surface,
  },
});

export default ChatBox;
