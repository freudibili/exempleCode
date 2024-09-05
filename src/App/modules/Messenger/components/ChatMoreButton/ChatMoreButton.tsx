import React from 'react';
import MoreButton from '../../../../components/Buttons/MoreButton/MoreButton';
import {navigate} from '../../../../utils/navigationHelper';
import {NAVIGATION} from '../../../../types/navigationTypes';

const ChatMoreButton = () => {
  const handlePress = () => {
    navigate({
      screen: NAVIGATION.CHAT_MORE_MODAL,
    });
  };
  return <MoreButton onPressCallback={handlePress} />;
};

export default ChatMoreButton;
