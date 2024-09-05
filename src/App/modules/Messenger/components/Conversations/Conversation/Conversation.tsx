import React, {memo, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, Divider} from 'react-native-paper';

import AvatarImage from '../../../../../components/Images/AvatarImage/AvatarImage';
import {NAVIGATION, STACK} from '../../../../../types/navigationTypes';
import {getTimeAgo} from '../../../../../utils/dateHelper';
import designSystem from '../../../../../utils/designSystem';
import {navigate} from '../../../../../utils/navigationHelper';
import {ConversationType} from '../../../types/messengerTypes';
import Icon from 'react-native-vector-icons/Feather';
import EmptyConversation from './EmptyConversation';

interface Props {
  conversation: ConversationType;
  addNewContent?: boolean;
}
const Conversation = ({conversation, addNewContent}: Props) => {
  const goToConversation = () => {
    navigate({
      stack: STACK.MESSENGER_STACK,
      screen: NAVIGATION.CHAT_SCREEN,
      params: {id: conversation._id},
    });
  };

  const timeAgo = useMemo(() => {
    return conversation.updatedAt ? getTimeAgo(conversation.updatedAt) : '';
  }, [conversation.updatedAt]);

  const timeAgoStyle = addNewContent ? styles.timeNewMessage : styles.time;

  if (!conversation.otherUser._id) {
    return <EmptyConversation />;
  }

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={goToConversation}>
        <View style={styles.contentContainer}>
          <AvatarImage
            size={30}
            imageUrl={conversation.otherUser.imageUrl}
            otherUser
          />
          <View style={styles.textContainer}>
            <Text variant={addNewContent ? 'titleMedium' : 'bodyLarge'}>
              {conversation.otherUser.name}
            </Text>
            <Text style={timeAgoStyle} variant={'bodySmall'}>
              {timeAgo}
            </Text>
          </View>
        </View>
        {addNewContent && (
          <Icon
            name={'info'}
            size={20}
            color={designSystem.theme.colors.primary}
          />
        )}
      </TouchableOpacity>
      <Divider bold={addNewContent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {flexDirection: 'row', alignItems: 'center'},
  textContainer: {
    marginLeft: 10,
  },
  time: {
    color: designSystem.theme.colors.onSurfaceDisabled,
  },
  timeNewMessage: {
    color: designSystem.theme.colors.primary,
  },
});
export default memo(Conversation);
