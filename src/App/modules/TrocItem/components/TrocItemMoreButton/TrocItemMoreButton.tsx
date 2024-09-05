import React from 'react';
import MoreButton from '../../../../components/Buttons/MoreButton/MoreButton';
import {navigate} from '../../../../utils/navigationHelper';
import {NAVIGATION} from '../../../../types/navigationTypes';

const TrocItemMoreButton = () => {
  const handlePress = () => {
    navigate({
      screen: NAVIGATION.TROC_ITEM_MORE_MODAL,
    });
  };
  return <MoreButton onPressCallback={handlePress} />;
};

export default TrocItemMoreButton;
