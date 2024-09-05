import React from 'react';
import {View} from 'react-native';
import designSystem from '../../../../utils/designSystem';
import UserProfileInformation from '../UserProfile/UserProfileInformation/UserProfileInformation';
import UserProfileItems from '../UserProfile/UserProfileItems/UserProfileItems';

const UserProfileContent = () => {
  return (
    <View style={designSystem.styles.customStyle.container}>
      <UserProfileInformation />
      <UserProfileItems />
    </View>
  );
};

export default UserProfileContent;
