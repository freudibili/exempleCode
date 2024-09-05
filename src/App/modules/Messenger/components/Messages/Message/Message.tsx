import React, {memo, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useAppSelector} from '../../../../../../hooks/reduxHook';
import AvatarImage from '../../../../../components/Images/AvatarImage/AvatarImage';
import {getTimeAgo} from '../../../../../utils/dateHelper';
import designSystem from '../../../../../utils/designSystem';
import {getUserId} from '../../../../User/models/user/userSelectors';
import {MessageType} from '../../../types/messengerTypes';

interface Props {
  message: MessageType;
}

const Message = ({message}: Props) => {
  const userId = useAppSelector(getUserId);

  const isOwnMessage = userId === message.user._id;

  const timeAgo = useMemo(() => {
    return message.createdAt ? getTimeAgo(message.createdAt) : '';
  }, [message.createdAt]);

  const containerStyle = isOwnMessage ? styles.OwnContainer : null;
  const messageTextStyle = isOwnMessage ? styles.ownMessageText : null;

  const userImage = useMemo(() => {
    return isOwnMessage ? null : (
      <AvatarImage size={34} imageUrl={message.user.imageUrl} />
    );
  }, [isOwnMessage, message.user.imageUrl]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.messageTop}>
        {userImage}
        <View style={styles.messageContainer}>
          <Text
            style={[styles.messageText, messageTextStyle]}
            variant={'bodyLarge'}>
            {message.text}
          </Text>
        </View>
      </View>
      <Text variant={'labelSmall'} style={styles.messageBottom}>
        {timeAgo}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  OwnContainer: {
    alignItems: 'flex-end',
  },
  messageTop: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  messageContainer: {
    flex: 1,
    ...designSystem.styles.customStyle.shadow,
  },
  messageText: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    padding: 10,
    backgroundColor: designSystem.theme.colors.background,
    borderRadius: 10,
    overflow: 'hidden',
    maxWidth: '80%',
    elevation: 2,
  },
  ownMessageText: {
    alignSelf: 'flex-end',
    backgroundColor: designSystem.theme.colors.secondary,
    color: 'white',
  },
  messageBottom: {
    color: designSystem.theme.colors.onSurfaceVariant,
    marginVertical: 10,
  },
});
export default memo(Message);
