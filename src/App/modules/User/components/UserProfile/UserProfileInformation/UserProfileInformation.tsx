import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../../../../../hooks/reduxHook';
import StatusLoader from '../../../../../components/StatusLoader/StatusLoader';
import designSystem from '../../../../../utils/designSystem';
import {getUserStatus} from '../../../models/user/userSelectors';
import UserListItem from './UserListItem/UserListItem';

const UserProfileInformation = () => {
  const status = useAppSelector(getUserStatus);

  return (
    <View style={styles.container}>
      <StatusLoader status={status}>
        <View style={styles.contentContainer}>
          <UserListItem />
        </View>
      </StatusLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginHorizontal: 20, marginBottom: 10},
  avatarAndNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: designSystem.theme.colors.primaryContainer,
    padding: 10,
    borderRadius: 10,
  },
});

export default memo(UserProfileInformation);
