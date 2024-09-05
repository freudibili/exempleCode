import React from 'react';
import {StyleSheet, View} from 'react-native';
import {OrderInputData} from '../../../../Order/types/OrdersType';

import ChatOrderTrocItem from '../ChatOrderTrocItem/ChatOrderTrocItem';

import TitleForm from '../../../../../components/Texts/TitleForm/TitleForm';
import i18n from '../../../../../utils/i18n';

interface Props {
  order: OrderInputData;
}

const ChatOrderInformation = ({order}: Props) => {
  const {trocItem} = order;

  return (
    <View style={styles.container}>
      <TitleForm title={i18n.t('MESSENGER_CHAT_ORDER_TROC_ITEM_TITLE')} />
      <ChatOrderTrocItem item={trocItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  priceContainer: {marginTop: 10},
});

export default ChatOrderInformation;
