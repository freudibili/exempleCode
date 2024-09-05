import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {useAppSelector} from '../../../../../../hooks/reduxHook';
import AvatarImage from '../../../../../components/Images/AvatarImage/AvatarImage';
import StatusLoader from '../../../../../components/StatusLoader/StatusLoader';
import designSystem from '../../../../../utils/designSystem';
import {
  getOtherUser,
  getOtherUserStatus,
} from '../../../models/otherUser/otherUserSelectors';

const OtherUserProfileInformation = () => {
  const user = useAppSelector(getOtherUser);
  const status = useAppSelector(getOtherUserStatus);

  return (
    <StatusLoader status={status}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View>
            <View style={styles.avatarContainer}>
              <AvatarImage size={60} imageUrl={user.imageUrl} />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text variant={'titleLarge'}>{user.name}</Text>
            <Text variant={'bodyLarge'}>{user.baseline}</Text>
          </View>
        </View>
      </View>
    </StatusLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: designSystem.theme.colors.secondaryContainer,
    padding: 10,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  avatarContainer: {
    borderWidth: 5,
    borderColor: designSystem.theme.colors.onPrimary,
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 2,
    marginLeft: 10,
  },
});

export default memo(OtherUserProfileInformation);
