import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {useAppSelector} from '../../../../../../../hooks/reduxHook';
import AvatarImage from '../../../../../../components/Images/AvatarImage/AvatarImage';
import {NAVIGATION, STACK} from '../../../../../../types/navigationTypes';
import designSystem from '../../../../../../utils/designSystem';
import {navigate} from '../../../../../../utils/navigationHelper';
import {getUser} from '../../../../models/user/userSelectors';

const UserListItem = () => {
  const user = useAppSelector(getUser);

  const goUpdateProfile = () => {
    navigate({
      stack: STACK.USER_STACK,
      screen: NAVIGATION.UPDATE_USER_PROFILE_SCREEN,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View>
          <View style={styles.avatarContainer}>
            <AvatarImage size={60} isUser />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text variant={'titleMedium'}>{user.name}</Text>
          <Text variant={'bodyMedium'}>{user.baseline}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.iconContainer} onPress={goUpdateProfile}>
        <Icon
          size={16}
          name={'edit'}
          color={designSystem.theme.colors.onSurface}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  avatarContainer: {
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 2,
    marginLeft: 10,
  },
  iconContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: designSystem.theme.colors.surface,
    borderRadius: 8,
    ...designSystem.styles.customStyle.shadow,
  },
  editButtonContainer: {
    justifyContent: 'center',
  },
});

export default memo(UserListItem);
