import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../hooks/reduxHook';
import StatusLoader from '../../../components/StatusLoader/StatusLoader';
import designSystem from '../../../utils/designSystem';
import UserProfileContent from '../components/contents/UserProfileContent';
import {getUserStatus} from '../models/user/userSelectors';
import UserProfileBar from '../components/UserProfile/UserProfileBar/UserProfileBar';

const UserProfileScreen = () => {
  const status = useAppSelector(getUserStatus);

  return (
    <SafeAreaView
      style={[designSystem.styles.customStyle.container, styles.container]}>
      <UserProfileBar />
      <StatusLoader status={status}>
        <UserProfileContent />
      </StatusLoader>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
});

export default UserProfileScreen;
