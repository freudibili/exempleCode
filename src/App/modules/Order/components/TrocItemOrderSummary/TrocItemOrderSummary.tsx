import React from 'react';
import {StyleSheet, View} from 'react-native';
import OrderResume from './OrderResume/OrderResume';
import {OrderInputData} from '../../types/OrdersType';
import TitleForm from '../../../../components/Texts/TitleForm/TitleForm';
import WalletResume from './WalletResume/WalletResume';
import i18n from '../../../../utils/i18n';

interface Props {
  order: OrderInputData;
  isUserItem?: boolean;
  canInteract?: boolean;
}

const TrocItemOrderSummary = ({order, isUserItem, canInteract}: Props) => {
  if (!order.trocItem) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TitleForm title={i18n.t('MESSENGER_CHAT_ORDER_DETAILS')} />
      <OrderResume
        order={order}
        isUserItem={isUserItem}
        size={70}
        canInteract={canInteract}
      />
      <WalletResume order={order} isUserItem={isUserItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default TrocItemOrderSummary;
