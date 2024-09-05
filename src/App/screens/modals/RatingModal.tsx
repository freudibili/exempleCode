import React from 'react';
import {useBottomSheet} from '../../utils/BottomSheetContext';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import RatingContent from '../../components/contents/RatingContent';

const RatingModal = () => {
  const {closeBottomSheet} = useBottomSheet();

  return (
    <BottomSheet showCloseButton>
      <RatingContent onClose={closeBottomSheet} />
    </BottomSheet>
  );
};

export default RatingModal;
