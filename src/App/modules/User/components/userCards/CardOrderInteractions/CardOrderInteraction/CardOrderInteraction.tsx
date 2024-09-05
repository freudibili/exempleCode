import React, {memo, useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, IconButton} from 'react-native-paper';
import {useAppSelector} from '../../../../../../../hooks/reduxHook';
import AvatarImage from '../../../../../../components/Images/AvatarImage/AvatarImage';
import {NAVIGATION, STACK} from '../../../../../../types/navigationTypes';
import designSystem from '../../../../../../utils/designSystem';
import {navigate} from '../../../../../../utils/navigationHelper';
import {getConversations} from '../../../../../Messenger/models/messengerSelectors';
import {OrderType, ORDER_STATUS} from '../../../../../Order/types/OrdersType';
import {getOrderDisplayedStatus} from '../../../../../Order/utils/orderHelper';
import {getUserId} from '../../../../models/user/userSelectors';

interface Props {
  order: OrderType;
}

const CardOrderInteraction = ({order}: Props) => {
  const conversations = useAppSelector(getConversations);
  const userId = useAppSelector(getUserId);

  const {requestorUser} = order;
  const {creatorUser} = order;

  const imageUrl = useMemo(() => {
    return userId === creatorUser._id
      ? requestorUser.imageUrl
      : creatorUser.imageUrl;
  }, [creatorUser._id, creatorUser.imageUrl, requestorUser.imageUrl, userId]);

  const goToDiscussion = useCallback(() => {
    const orderConversation = conversations.find(
      conversation => conversation.orderId === order._id,
    );

    if (orderConversation && orderConversation?.otherUser?._id) {
      const params = {
        id: orderConversation._id,
      };
      navigate({
        stack: STACK.MESSENGER_STACK,
        screen: NAVIGATION.CHAT_SCREEN,
        params,
      });
    }
  }, [conversations, order._id]);

  return (
    <TouchableOpacity style={styles.container} onPress={goToDiscussion}>
      <View style={styles.leftContainer}>
        <View style={styles.avatar}>
          <AvatarImage size={30} imageUrl={imageUrl} />
        </View>
        <Text variant="bodyMedium">
          {getOrderDisplayedStatus(order.status as ORDER_STATUS)}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <IconButton
          icon="chevron-right"
          iconColor={designSystem.theme.colors.onSurfaceDisabled}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {flexDirection: 'row', alignItems: 'center'},
  rightContainer: {flexDirection: 'row', alignItems: 'center'},
  avatar: {marginHorizontal: 10},
});

export default memo(CardOrderInteraction);
