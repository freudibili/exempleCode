import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useAppSelector} from '../../../../../../hooks/reduxHook';
import {NAVIGATION, STACK} from '../../../../../types/navigationTypes';
import {navigate} from '../../../../../utils/navigationHelper';
import {getConversations} from '../../../../Messenger/models/messengerSelectors';
import i18n from '../../../../../utils/i18n';

interface Props {
  orderId: string;
}
const TrocItemActionOrdered = ({orderId}: Props) => {
  const conversations = useAppSelector(getConversations);

  const goToConversation = useCallback(() => {
    const currentConversation = conversations.find(
      conversation => conversation.orderId === orderId,
    );
    if (currentConversation?._id) {
      const params = {
        id: currentConversation?._id,
      };
      navigate({
        stack: STACK.MESSENGER_STACK,
        screen: NAVIGATION.CHAT_SCREEN,
        params,
      });
    }
  }, [conversations, orderId]);

  return (
    <View style={styles.container}>
      <Text style={styles.text} numberOfLines={2} variant={'labelLarge'}>
        {i18n.t('TROC_ITEM_ACTION_ALREADY_ORDERED')}
      </Text>
      <View style={styles.button}>
        <Button mode={'contained'} onPress={goToConversation}>
          {i18n.t('TROC_ITEM_SEE_ORDERS_BUTTON')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  text: {
    flex: 2,
    paddingRight: 20,
  },
  button: {
    flex: 1,
  },
});

export default TrocItemActionOrdered;
