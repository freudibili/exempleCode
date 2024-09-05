import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useAppDispatch} from '../../../../../hooks/reduxHook';
import designSystem from '../../../../utils/designSystem';
import {
  fetchOtherUserInformationRequest,
  fetchOtherUserTrocItemsRequest,
} from '../../models/otherUser/otherUserActions';

import OtherUserProfileInformations from '../OtherUserProfile/OtherUserProfileInformations/OtherUserProfileInformations';
import OtherUserTrocItems from '../OtherUserProfile/OtherUserTrocItems/OtherUserTrocItems';

interface Props {
  id: string;
}
const OtherUserProfileContent = ({id}: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOtherUserInformationRequest(id));
    dispatch(fetchOtherUserTrocItemsRequest(id));
  }, [dispatch, id]);

  return (
    <View style={designSystem.styles.customStyle.contentContainer}>
      <OtherUserProfileInformations />
      <OtherUserTrocItems />
    </View>
  );
};

export default OtherUserProfileContent;
