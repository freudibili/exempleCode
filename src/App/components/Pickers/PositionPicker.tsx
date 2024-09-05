import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AddressType, PositionType} from '../../types/locationType';
import TitleForm from '../Texts/TitleForm/TitleForm';
import DistancePicker from './DistancePicker';
import LocationPicker from './LocationPicker';
import i18n from '../../utils/i18n';

interface Props {
  getDataCallback: (position: PositionType) => void;
  initValue?: PositionType;
}
const PositionPicker = ({getDataCallback, initValue}: Props) => {
  const [address, setAddress] = useState<AddressType | undefined>();
  const [distance, setDistance] = useState<number | undefined>();

  useEffect(() => {
    getDataCallback({address, distance});
  }, [address, distance, getDataCallback]);

  return (
    <View>
      <TitleForm
        title={`${i18n.t('EXPLORE_MODAL_LOCATION_DISTANCE')} (${distance} km)`}
      />
      <DistancePicker
        initValue={initValue?.distance}
        getDataCallback={setDistance}
      />
      <View style={styles.locationContainer}>
        <LocationPicker
          initValue={initValue?.address}
          getDataCallback={setAddress}
          title={i18n.t('EXPLORE_MODAL_LOCATION_POSITION')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    marginTop: 10,
  },
});

export default memo(PositionPicker);
