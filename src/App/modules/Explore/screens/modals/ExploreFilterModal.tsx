import React from 'react';
import BottomSheet from '../../../../components/BottomSheet/BottomSheet';
import ExploreFilterModalContent from '../../components/contents/modals/ExploreFitlerModalContent';
import {useBottomSheet} from '../../../../utils/BottomSheetContext';

const ExploreFilterModal = () => {
  const {closeBottomSheet} = useBottomSheet();

  return (
    <BottomSheet showCloseButton>
      <ExploreFilterModalContent onSubmit={closeBottomSheet} />
    </BottomSheet>
  );
};

export default ExploreFilterModal;
