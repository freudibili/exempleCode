import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../hooks/reduxHook';
import PrimaryButton from '../../../../../components/Buttons/PrimaryButton/PrimaryButton';
import PositionPicker from '../../../../../components/Pickers/PositionPicker';
import {AddressType, PositionType} from '../../../../../types/locationType';
import {setExploreFiltersRequest} from '../../../models/exploreActions';
import {getExploreFilters} from '../../../models/exploreSelectors';
import {ExploreFilterType} from '../../../types/ExploreType';
import i18n from '../../../../../utils/i18n';

interface Props {
  onSubmit: () => void;
}
const ExploreFilterModalContent = ({onSubmit}: Props) => {
  const [address, setAddress] = useState<AddressType | undefined>();
  const [distance, setDistance] = useState<number | undefined>();
  const dispatch = useAppDispatch();
  const currentFilters: ExploreFilterType = useAppSelector(getExploreFilters);

  const updatedFilters = useCallback(() => {
    dispatch(setExploreFiltersRequest({distance, address}));
    onSubmit();
  }, [dispatch, distance, address, onSubmit]);

  const handlePosition = useCallback((position: PositionType) => {
    setAddress(position.address);
    setDistance(position.distance);
  }, []);

  return (
    <View style={styles.container}>
      <PositionPicker
        initValue={{
          distance: currentFilters.distance,
          address: currentFilters.address,
        }}
        getDataCallback={handlePosition}
      />
      <View style={styles.buttonContainer}>
        <PrimaryButton
          onPress={updatedFilters}
          label={i18n.t('EXPLORE_MODAL_LOCATION_FILTER_BUTTON')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  buttonContainer: {marginTop: 20},
});

export default ExploreFilterModalContent;
