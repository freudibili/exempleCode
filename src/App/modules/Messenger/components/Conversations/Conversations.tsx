import React, {memo, useCallback, useMemo} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useAppSelector} from '../../../../../hooks/reduxHook';
import {getUserNotifications} from '../../../Notification/models/notificationSelectors';
import {NotificationInputData} from '../../../Notification/types/notificationType';
import {ConversationType} from '../../types/messengerTypes';
import Conversation from './Conversation/Conversation';
import {dispatch} from '../../../../../utils/storeHelper';
import {fetchNotificationsRequest} from '../../../Notification/models/notificationActions';
import i18n from '../../../../utils/i18n';

interface Props {
  conversations: ConversationType[];
}

const Conversations = ({conversations}: Props) => {
  const notifications = useAppSelector(getUserNotifications);

  const updatedConversations = useMemo(() => {
    return conversations.map(conversation => {
      const addNewContent = notifications.find(
        (notification: NotificationInputData) =>
          conversation._id === notification.conversation._id,
      );

      return {...conversation, addNewContent: !!addNewContent};
    });
  }, [conversations, notifications]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchNotificationsRequest(undefined, true));
  }, []);

  if (conversations.length < 1) {
    return (
      <View style={styles.noConversation}>
        <Text>{i18n.t('MESSENGER_NO_CONVERSATION')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        data={updatedConversations}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }
        renderItem={({item}) => (
          <Conversation
            key={item._id}
            conversation={item}
            addNewContent={item.addNewContent}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  noConversation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(Conversations);
