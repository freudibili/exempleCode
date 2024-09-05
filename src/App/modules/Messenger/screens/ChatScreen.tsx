import React, {useCallback, useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/core';
import {View} from 'react-native';
import designSystem from '../../../utils/designSystem';
import ChatContent from '../components/contents/ChatContent';
import {
  MessengerStackParamList,
  NAVIGATION,
} from '../../../types/navigationTypes';
import {ConversationInputData, SWITCH_CHAT_ITEM} from '../types/messengerTypes';
import ChatToggle from '../components/ChatToggle/ChatToggle';
import ChatOrderContent from '../components/contents/ChatOrderContent';
import {fetchOrderRequest} from '../../Order/models/orderActions';
import {useAppDispatch, useAppSelector} from '../../../../hooks/reduxHook';
import {getConversations} from '../models/messengerSelectors';
import {getUserNotifications} from '../../Notification/models/notificationSelectors';
import {NOTIFICATION_STATUS} from '../../Notification/types/notificationType';
import {updateNotificationsStatusRequest} from '../../Notification/models/notificationActions';

type routeType = RouteProp<MessengerStackParamList, NAVIGATION.CHAT_SCREEN>;

const ChatScreen = () => {
  const dispatch = useAppDispatch();
  const conversations = useAppSelector(getConversations);
  const notifications = useAppSelector(getUserNotifications);
  const [value, setValue] = useState('');
  const {params} = useRoute<routeType>();
  const {id} = params;

  const getCurrentOrder = useCallback(() => {
    const currentConversation = conversations?.find(
      (conversation: {_id: string}) => conversation._id === id,
    );

    if (currentConversation?.orderId) {
      dispatch(fetchOrderRequest(currentConversation.orderId));
    }
  }, [conversations, dispatch, id]);

  // Check if it is a new conversation and update to read if needed @TO UPDATE
  const updateNotificationIfNeeded = useCallback(() => {
    const notificationToUpdate = notifications?.find(
      (notification: {conversation: ConversationInputData}) =>
        notification.conversation?._id === id,
    );

    if (notificationToUpdate?.status === NOTIFICATION_STATUS.NEW) {
      dispatch(
        updateNotificationsStatusRequest(
          notificationToUpdate._id,
          NOTIFICATION_STATUS.READ,
        ),
      );
    }
  }, [dispatch, id, notifications]);

  useEffect(() => {
    getCurrentOrder();
    updateNotificationIfNeeded();
  }, [getCurrentOrder, updateNotificationIfNeeded]);

  return (
    <View style={designSystem.styles.customStyle.container}>
      <ChatToggle getValueCallback={setValue} />
      {value === SWITCH_CHAT_ITEM.CHAT && <ChatContent conversationId={id} />}
      {value === SWITCH_CHAT_ITEM.ORDER && <ChatOrderContent />}
    </View>
  );
};

export default ChatScreen;
