import React, {memo, useEffect, useMemo} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../../../../../hooks/reduxHook';
import StatusLoader from '../../../../components/StatusLoader/StatusLoader';
import {STATUS} from '../../../../types/storeTypes';
import {fetchConversationMessagesRequest} from '../../models/messengerActions';
import {getMessages, getMessagesStatus} from '../../models/messengerSelectors';
import ChatBox from '../ChatBox/ChatBox';
import Messages from '../Messages/Messages';

interface Props {
  conversationId: string;
}

const ChatContent = ({conversationId}: Props) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(getMessagesStatus);
  const messages = useAppSelector(getMessages);

  const insets = useSafeAreaInsets();
  const verticalOffset = insets.bottom + 165;

  const chatBox = useMemo(() => {
    if (Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView
          behavior={'position'}
          keyboardVerticalOffset={verticalOffset}>
          <ChatBox conversationId={conversationId} />
        </KeyboardAvoidingView>
      );
    }
    return <ChatBox conversationId={conversationId} />;
  }, [conversationId, verticalOffset]);

  useEffect(() => {
    dispatch(fetchConversationMessagesRequest(conversationId));
  }, [dispatch, conversationId]);

  const updatedStatus = useMemo(() => {
    if (!messages?.length) {
      return status;
    }
    return STATUS.SUCCESS;
  }, [messages.length, status]);

  return (
    <View style={styles.container}>
      <StatusLoader status={updatedStatus}>
        <Messages messages={messages} />
      </StatusLoader>
      {chatBox}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default memo(ChatContent);
