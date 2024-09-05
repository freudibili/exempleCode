import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {getOrderUserStatus} from '../../../Order/utils/orderHelper';
import {
  OrderInputData,
  ORDER_STATUS,
  ORDER_USER_STATUS,
} from '../../../Order/types/OrdersType';
import ChatActionOrderNeedValidation from './ChatActionOrderNeedValidation/ChatActionOrderNeedValidation';
import ChatActionOrderNeedCompletion from './ChatActionOrderNeedCompletion/ChatActionOrderNeedCompletion';
import ChatActionOrderMessage from './ChatActionOrderMessage/ChatActionOrderMessage';
import i18n from '../../../../utils/i18n';

interface Props {
  order: OrderInputData;
}

const ChatActions = ({order}: Props) => {
  const [orderStatus, setOrderStatus] = useState<
    ORDER_USER_STATUS | ORDER_STATUS
  >();

  useEffect(() => {
    const orderUserActionStatus = getOrderUserStatus(order);
    setOrderStatus(orderUserActionStatus);
  }, [order]);

  const GetChatAction = useCallback(() => {
    if (orderStatus === ORDER_USER_STATUS.NEED_VALIDATION) {
      return <ChatActionOrderNeedValidation order={order} />;
    }
    if (orderStatus === ORDER_USER_STATUS.VALIDATION_PENDING) {
      return (
        <ChatActionOrderMessage
          text={i18n.t('MESSENGER_CHAT_ORDER_ACTION_VALIDATION_PENDING')}
        />
      );
    }
    if (orderStatus === ORDER_STATUS.ACCEPTED) {
      return <ChatActionOrderNeedCompletion order={order} />;
    }
    if (orderStatus === ORDER_STATUS.REFUSED) {
      return (
        <ChatActionOrderMessage
          text={i18n.t('MESSENGER_CHAT_ORDER_ACTION_REFUSED')}
        />
      );
    }
    if (orderStatus === ORDER_USER_STATUS.NEED_COMPLETION) {
      return (
        <ChatActionOrderNeedCompletion
          order={order}
          alreadyCompletedByOtherUser={true}
        />
      );
    }
    if (orderStatus === ORDER_USER_STATUS.COMPLETION_PENDING) {
      return (
        <ChatActionOrderMessage
          text={i18n.t('MESSENGER_CHAT_ORDER_ACTION_COMPLETION_PENDING')}
        />
      );
    }
    if (orderStatus === ORDER_STATUS.COMPLETED) {
      return (
        <ChatActionOrderMessage
          text={i18n.t('MESSENGER_CHAT_ORDER_ACTION_COMPLETED')}
        />
      );
    }
    if (orderStatus === ORDER_STATUS.CANCELED) {
      return (
        <ChatActionOrderMessage
          text={i18n.t('MESSENGER_CHAT_ORDER_CANCELED')}
        />
      );
    }
    return <View />;
  }, [order, orderStatus]);

  return (
    <View style={styles.container}>
      <GetChatAction />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ChatActions;
