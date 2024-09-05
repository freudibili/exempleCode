import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useAppSelector} from '../../../../../../hooks/reduxHook';
import {NAVIGATION, STACK} from '../../../../../types/navigationTypes';
import {navigate} from '../../../../../utils/navigationHelper';
import TrocItemUserListItem from '../../../../TrocItem/components/TrocItemUserListItem/TrocItemUserListItem';
import InfoSection from '../../../../TrocItem/components/InfoSection/InfoSection';
import {getUserId} from '../../../models/user/userSelectors';
import {OtherUserInputData} from '../../../types/UserType';
import i18n from '../../../../../utils/i18n';

interface Props {
  user: OtherUserInputData;
}
const OtherUserListItem = ({user}: Props) => {
  const userId = useAppSelector(getUserId);

  const goOtherUserProfile = useCallback(() => {
    navigate({
      stack: STACK.TROC_ITEM_STACK,
      screen: NAVIGATION.OTHER_USER_PROFILE_SCREEN,
      params: {id: user._id},
    });
  }, [user._id]);

  const GetCardContent = useCallback(() => {
    const userItemList =
      userId === user._id ? (
        <InfoSection text={i18n.t('TROC_ITEM_USER_OWN')} marginVertical={20} />
      ) : (
        <TrocItemUserListItem
          title={user.name}
          imageUrl={user.imageUrl}
          onPressCallback={goOtherUserProfile}
        />
      );
    return userItemList;
  }, [goOtherUserProfile, user._id, user.imageUrl, user.name, userId]);

  return (
    <View style={styles.container}>
      <GetCardContent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  card: {
    borderRadius: 20,
  },
});

export default OtherUserListItem;
