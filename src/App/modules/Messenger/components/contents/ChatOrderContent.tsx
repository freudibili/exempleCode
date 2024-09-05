import React, {memo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {useAppSelector} from '../../../../../hooks/reduxHook';
import BottomBar from '../../../../components/BottomBar/BottomBar';
import StatusLoader from '../../../../components/StatusLoader/StatusLoader';
import TrocItemOrderSummary from '../../../Order/components/TrocItemOrderSummary/TrocItemOrderSummary';
import {getOrder, getOrderStatus} from '../../../Order/models/orderSelectors';
import InfoSection from '../../../TrocItem/components/InfoSection/InfoSection';
import {getUser} from '../../../User/models/user/userSelectors';
import ChatActions from '../ChatActions.tsx/ChatActions';
import ChatOrderCreator from '../ChatOrder/ChatOrderCreator/ChatOrderCreator';
import i18n from '../../../../utils/i18n';

const ChatOrderContent = () => {
  const order = useAppSelector(getOrder);
  const user = useAppSelector(getUser);
  const status = useAppSelector(getOrderStatus);

  const isUserItem = order.creatorUser._id === user._id;

  if (!order.trocItem) {
    return (
      <Text style={styles.deletedTrocText}>
        {i18n.t('MESSENGER_CHAT_ORDER_TROC_DELETED')}
      </Text>
    );
  }

  return (
    <StatusLoader status={status}>
      <View style={styles.container}>
        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          {isUserItem && (
            <InfoSection
              text={i18n.t('TROC_ITEM_USER_OWN')}
              marginVertical={20}
            />
          )}
          <Divider />

          <TrocItemOrderSummary
            order={order}
            isUserItem={isUserItem}
            canInteract
          />

          <ChatOrderCreator order={order} />
        </ScrollView>

        <BottomBar>
          <ChatActions order={order} />
        </BottomBar>
      </View>
    </StatusLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    marginHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 10,
  },
  deletedTrocText: {
    margin: 20,
  },
});

export default memo(ChatOrderContent);
