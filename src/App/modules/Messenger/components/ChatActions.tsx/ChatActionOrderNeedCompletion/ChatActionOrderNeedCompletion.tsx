import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/reduxHook';
import {updateOrderRequest} from '../../../../Order/models/orderActions';
import {OrderInputData, ORDER_STATUS} from '../../../../Order/types/OrdersType';
import {getUserId} from '../../../../User/models/user/userSelectors';
import i18n from '../../../../../utils/i18n';

interface Props {
  order: OrderInputData;
  alreadyCompletedByOtherUser?: boolean;
}

const ChatActionOrderNeedCompletion = ({
  order,
  alreadyCompletedByOtherUser,
}: Props) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(getUserId);

  const handleOrder = useCallback(() => {
    if (userId === order.creatorUser._id) {
      dispatch(
        updateOrderRequest(order._id, ORDER_STATUS.COMPLETED_BY_CREATOR_USER),
      );
    } else {
      dispatch(
        updateOrderRequest(order._id, ORDER_STATUS.COMPLETED_BY_REQUESTOR_USER),
      );
    }
  }, [dispatch, order._id, order.creatorUser._id, userId]);

  const text = alreadyCompletedByOtherUser
    ? i18n.t('MESSENGER_CHAT_ACTION_ORDER_NEED_COMPLETION')
    : i18n.t('MESSENGER_CHAT_ACTION_ORDER_ACCEPTED');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.buttonContainer}>
        <Button mode={'contained'} compact onPress={handleOrder}>
          {i18n.t('MESSENGER_CHAT_ORDER_ACTION_CONFIRMED_BUTTON')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 3,
    paddingRight: 10,
  },
  buttonContainer: {
    flex: 2,
  },
});

export default ChatActionOrderNeedCompletion;
