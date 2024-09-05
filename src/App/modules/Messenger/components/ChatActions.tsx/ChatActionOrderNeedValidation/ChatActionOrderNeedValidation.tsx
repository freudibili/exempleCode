import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

import {useAppDispatch} from '../../../../../../hooks/reduxHook';
import {OrderInputData, ORDER_STATUS} from '../../../../Order/types/OrdersType';
import {updateOrderRequest} from '../../../../Order/models/orderActions';
import i18n from '../../../../../utils/i18n';

interface Props {
  order: OrderInputData;
}

const ChatActionOrderNeedValidation = ({order}: Props) => {
  const dispatch = useAppDispatch();

  const handleOrder = useCallback(
    (status: ORDER_STATUS) => {
      dispatch(updateOrderRequest(order._id, status));
    },
    [dispatch, order._id],
  );

  return (
    <View style={styles.container}>
      <Text>{i18n.t('MESSENGER_CHAT_ORDER_ACTION_NEED_VALIDATION')}</Text>
      <View style={styles.buttonContainer}>
        <Button
          mode={'contained'}
          onPress={() => handleOrder(ORDER_STATUS.ACCEPTED)}>
          {i18n.t('MESSENGER_CHAT_ORDER_ACTION_ACCEPTED_BUTTON')}
        </Button>

        <Button
          style={styles.refusedButton}
          mode={'contained-tonal'}
          onPress={() => handleOrder(ORDER_STATUS.REFUSED)}>
          {i18n.t('MESSENGER_CHAT_ORDER_ACTION_REFUSED_BUTTON')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  refusedButton: {
    marginLeft: 10,
  },
});

export default ChatActionOrderNeedValidation;
