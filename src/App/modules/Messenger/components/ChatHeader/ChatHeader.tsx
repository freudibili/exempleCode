import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppSelector} from '../../../../../hooks/reduxHook';
import {getOrder, getOrderStatus} from '../../../Order/models/orderSelectors';
import AvatarImage from '../../../../components/Images/AvatarImage/AvatarImage';
import {IconButton, Text} from 'react-native-paper';
import designSystem from '../../../../utils/designSystem';
import {goBack} from '../../../../utils/navigationHelper';
import {CapitalizeFirstLetter} from '../../../../utils/textHelper';
import ChatMoreButton from '../ChatMoreButton/ChatMoreButton';
import {getMessageOtherUser} from '../../models/messengerSelectors';
import {STATUS} from '../../../../types/storeTypes';

const ChatHeader = () => {
  const order = useAppSelector(getOrder);
  const status = useAppSelector(getOrderStatus);
  const otherUser = useAppSelector(getMessageOtherUser);
  const insets = useSafeAreaInsets();

  const renderedContent = useMemo(() => {
    if (status === STATUS.FAILURE) {
      return <></>;
    } else {
      if (otherUser) {
        return (
          <>
            <AvatarImage
              size={40}
              imageUrl={otherUser.imageUrl}
              key={otherUser.name}
            />
            <View style={styles.textContainer}>
              <Text variant={'labelLarge'}>{otherUser.name}</Text>
              <Text
                style={styles.itemTitle}
                variant={'bodySmall'}
                numberOfLines={1}>
                {CapitalizeFirstLetter(order.trocItem?.title || '')}
              </Text>
            </View>
          </>
        );
      }
    }
  }, [status, otherUser, order]);
  return (
    <View style={[{paddingTop: insets.top + 10}, styles.container]}>
      <View>
        <IconButton icon="chevron-left" size={24} onPress={goBack} />
      </View>
      <View style={styles.userInfoContainer}>{renderedContent}</View>
      <ChatMoreButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 40,
    paddingBottom: 10,
    backgroundColor: designSystem.theme.colors.background,
    ...designSystem.styles.customStyle.shadow,
  },
  userInfoContainer: {
    width: '80%',
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  itemTitle: {
    marginTop: 2,
    color: designSystem.theme.colors.onSurfaceDisabled,
  },
});

export default ChatHeader;
