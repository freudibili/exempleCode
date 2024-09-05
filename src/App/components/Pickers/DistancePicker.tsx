import React, {memo, useEffect, useState} from 'react';
import Slider from '@react-native-community/slider';
import {StyleSheet} from 'react-native';
import designSystem from '../../utils/designSystem';

interface Props {
  initValue?: number | null;
  getDataCallback: (distance: number) => void;
}

const DistancePicker = memo(({getDataCallback, initValue}: Props) => {
  const MIN_VALUE = 1;
  const MAX_VALUE = 200;

  const [distance, setDistance] = useState(initValue || MIN_VALUE);

  useEffect(() => {
    getDataCallback(distance);
  }, [distance, getDataCallback]);

  return (
    <Slider
      value={initValue || 0}
      style={styles.slider}
      minimumValue={MIN_VALUE}
      maximumValue={MAX_VALUE}
      step={1}
      minimumTrackTintColor={designSystem.theme.colors.secondary}
      maximumTrackTintColor={designSystem.theme.colors.outlineVariant}
      onValueChange={setDistance}
    />
  );
});

const styles = StyleSheet.create({
  slider: {
    width: '100%',
    marginVertical: 5,
  },
});

export default DistancePicker;
