import React from 'react';
import {StyleSheet, View} from 'react-native';
import {OrderInputData, ORDER_STATUS} from '../../../../Order/types/OrdersType';
import TitleForm from '../../../../../components/Texts/TitleForm/TitleForm';
import MyMapView from '../../../../../components/MyMapView/MyMapView';
import {TROC_ITEM_PICKING} from '../../../../TrocItem/types/TrocItemsType';
import i18n from '../../../../../utils/i18n';

interface Props {
  order: OrderInputData;
}

const ChatOrderCreator = ({order}: Props) => {
  const {trocItem} = order;

  if (!trocItem) {
    return <View />;
  }

  const GetMapView = () => {
    const shouldDisplayAddress =
      order.status === ORDER_STATUS.ACCEPTED ||
      order.status === ORDER_STATUS.COMPLETED_BY_CREATOR_USER ||
      order.status === ORDER_STATUS.COMPLETED_BY_REQUESTOR_USER;

    if (trocItem.address) {
      return (
        <MyMapView
          address={trocItem.address}
          displayAddress={shouldDisplayAddress}
          picking={trocItem.picking as TROC_ITEM_PICKING}
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TitleForm title={i18n.t('MESSENGER_CHAT_ORDER_ADRESS_TITLE')} />
      </View>
      <GetMapView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {marginBottom: 10},
});

export default ChatOrderCreator;
